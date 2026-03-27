const searchMusic = document.getElementById("searchMusic");
const btnSearch = document.getElementById("btnSearch");
const result = document.getElementById("result");

let currentLyrics = null;

async function getLyrics() {
  const music = searchMusic.value.trim();

  if (!music) {
    result.innerHTML = `<p class="text-red-500 text-center font-medium">Por favor, digite o nome de uma música!</p>`;
    return;
  }

  result.innerHTML = `<div class="flex justify-center py-4"><p class="text-gray-500 animate-pulse">Buscando letra...</p></div>`;

  try {
    const response = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(music)}`,
    );
    const data = await response.json();

    if (data.length === 0) {
      result.innerHTML = `<p class="text-center text-gray-500">Nenhuma música encontrada.</p>`;
      return;
    }

    const firstMusic = data[0];
    currentLyrics = firstMusic.plainLyrics;

    result.innerHTML = `
      <div class="border-t pt-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">${firstMusic.trackName}</h2>
          <p class="text-emerald-600 font-medium uppercase text-sm tracking-wide">${firstMusic.artistName}</p>
          
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div class="flex justify-end"> 
              <button onclick="copyLyrics()" class="px-6 py-1 font-semibold text-white transition-colors shadow-md bg-gray-500 hover:bg-gray-700 rounded-xl active:scale-95">Copy</button>
          </div>
              <pre class="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">${firstMusic.plainLyrics || "Letra não disponível para esta música."}</pre>
          </div>
      </div>
    `;

    searchMusic.value = "";
  } catch (error) {
    console.error(error);
    result.innerHTML = `<p class="text-red-500 text-center">Erro ao buscar letra. Verifique sua conexão.</p>`;
  }
}

function copyLyrics() {
  navigator.clipboard.writeText(currentLyrics)
   Swal.fire({
    title: "Copiado!",
    text: "Letra copiada para área de transferência",
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  });
}

searchMusic.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getLyrics();
  }
});

btnSearch.addEventListener("click", getLyrics);
