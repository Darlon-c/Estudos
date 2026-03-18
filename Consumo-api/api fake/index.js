const item = document.getElementById("item");

async function getProduct() {
  try {
    const response = await fetch("db.json");
    const data = await response.json();

    item.innerHTML = data.map(produto => `
      <div class="produto">
        <h3>${produto.nome}</h3>
        <p>Preço: R$ ${produto.preco}</p>
        <img src="${produto.imagem}" alt="${produto.nome}" width="100">
      </div>
    `).join('')
  } catch (err) {
    console.log(err);
  }
}

getProduct();
