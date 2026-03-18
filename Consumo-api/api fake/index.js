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
      <div class="min-h-[250px] min-w[250px] bg-white">
        <h3 class="flex justify-center py-2">${produto.nome}</h3>
        <img class="mx-auto"  src="${produto.imagem}" alt="${produto.nome}" width="200">
        <p>Preço: R$ ${produto.preco}</p>
        <button onclick="buyProduct(${produto.id})" class="bg-orange-300 cursor-pointer">Comprar</button>
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
            <div class="flex items-center gap-2">
                <span>R$ ${item.preco}</span>
                <span class="bg-gray-200 px-2 py-1 rounded">x${item.quantity}</span>
                <span class="font-bold">
                R$ ${(item.preco * item.quantity).toFixed(2)}
                </span>
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

//calcula o valor total do carrinho
function cartValue() {
  const valueTotal = cart.reduce((acc, product) => {
    return acc + product.preco * product.quantity;
  }, 0);

  totalResult.innerHTML = valueTotal.toFixed(2);
}

getProduct();
