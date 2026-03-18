const item = document.getElementById("item");
const carrinho = document.getElementById("carrinho");
const totalResult = document.getElementById("totalResult");

let products = [];
let cart = [];

async function getProduct() {
  try {
    const response = await fetch("db.json");
    products = await response.json();

    item.innerHTML = products
      .map(
        (produto) => `
      <div class="shadow-lg min-h-[300px] min-w[250px] bg-white">
        <h3 class="flex justify-center py-2">${produto.nome}</h3>
        <img class="mx-auto"  src="${produto.imagem}" alt="${produto.nome}" width="200">
        <p class="flex justify-center py-1">Preço: R$ ${produto.preco.toFixed(2)}</p>
        <div class="flex justify-center">
            <button class="shadow-md bg-orange-400 cursor-pointer px-4 rounded-2xl hover:bg-orange-700" onclick="buyProduct(${produto.id})" >Comprar</button>
         </div>
        </div>
    `,
      )
      .join("");
  } catch (err) {
    console.log(err);
  }
}

function renderProduct() {
  carrinho.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between items-center border-b py-2">
            <span class="font-semibold">${item.nome}</span>
            <div class="flex justify-between items-center gap-2">
                <span>R$ ${item.preco}</span>
                <span class="bg-gray-200 px-2 py-1 rounded">x${item.quantity}</span>
                <span class="font-bold">
                R$ ${(item.preco * item.quantity).toFixed(2)}
                </span>
                <button class="bg-red-700 cursor-pointer" onclick="removeProduct(${item.id})">X</button>
            </div>
        </div>
        `;
    carrinho.appendChild(div);
  });
}

function buyProduct(id) {
  const product = products.find((p) => p.id === id);

  const exists = cart.find((item) => item.id === id);

  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderProduct();
  cartValue();
}

//remover produto
function removeProduct(id) {
  cart = cart.filter((product) => {
    return product.id !== id;
  });

  renderProduct();
  cartValue();
}

//calcula o valor total do carrinho
function cartValue() {
  const valueTotal = cart.reduce((acc, product) => {
    return acc + product.preco * product.quantity;
  }, 0);

  if (cart.length === 0) {
    totalResult.innerHTML = "Não há itens no carrinho";
  } else {
    totalResult.innerHTML = `R$ ${valueTotal.toFixed(2)}`;
  }
}

getProduct();
