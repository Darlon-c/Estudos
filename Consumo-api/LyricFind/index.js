const searchMusic = document.getElementById("searchMusic");
const btnSearch = document.getElementById("btnSearch");
const result = document.getElementById("result");

async function getLyrics() {
  const music = searchMusic.value.trim();

  if (!music) {
    result.innerHTML = "<p>Digite o nome de uma música!</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(music)}`,
    );
    const data = await response.json();

    console.log(data);

    const firstMusic = data[0];
    result.innerHTML = `
      <div>
        <h2><strong>Música:</strong> ${firstMusic.trackName}</h2>
        <p><strong>Artista:</strong> ${firstMusic.artistName}</p>
        <pre class="whitespace-pre-wrap">${firstMusic.plainLyrics || "Letra não disponível"}</pre>
      </div>
    `;

    searchMusic.value = "";
  } catch (error) {
    console.log(error);
    result.innerHTML = "<p>Erro ao buscar letra. Tente novamente.</p>";
  }
}

searchMusic.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getLyrics();
  }
});
btnSearch.addEventListener("click", getLyrics);
