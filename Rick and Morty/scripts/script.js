const root = document.querySelector("#root");
root.innerHTML =
  '<div class="div-name-api"></div><div class="div-panels-api"><div class="left-panel"></div><div class="right-panel"></div></div>';
const rutaRightPanel = document.querySelector(".right-panel");

const nameApi = document.querySelector(".div-name-api");
const imgTittle = document.createElement("img");
imgTittle.src =
  "https://www.firstcomicsnews.com/wp-content/uploads/2017/09/Rick-and-Morty-logo-600x257.png";
nameApi.appendChild(imgTittle);

const obtenerEpisodios = async (episodio) => {
  const url = `https://rickandmortyapi.com/api/episode?page=${episodio}`;
  const response = await fetch(url);
  const listaEpisodios = await response.json();
  pintarEpisodios(listaEpisodios);
};

const pintarEpisodios = (episodios) => {
  const rutaLeftPanel = document.querySelector(".left-panel");
  episodios.results.forEach((episodio) => {
    const divCadaEpisodio = document.createElement("div");
    divCadaEpisodio.textContent = episodio.name;
    divCadaEpisodio.classList = "episodios-individuales ";
    rutaLeftPanel.appendChild(divCadaEpisodio);
    divCadaEpisodio.addEventListener("click", () => {
      obtenerDescripcionEpisodio(episodio.id);
    });
  });

  const btnLoadMore = document.createElement("button");
  btnLoadMore.type = "button";
  btnLoadMore.classList = "boton-load-more";
  btnLoadMore.innerText = "Load More";
  rutaLeftPanel.appendChild(btnLoadMore);
};

obtenerEpisodios(1);

const caracteres = async (caracter) => {
  const resultados = await Promise.all(
    caracter.map(async (caracter) => {
      const response = await fetch(caracter);
      return response.json();
    })
  );
  pintarCaracteres(resultados);
};

const obtenerDescripcionEpisodio = async (episodio) => {
  const url = `https://rickandmortyapi.com/api/episode/${episodio}`;
  const response = await fetch(url);
  const infEpisodio = await response.json();
  pintarInfoEpisodio(infEpisodio);
  caracteres(infEpisodio.characters);
};

obtenerDescripcionEpisodio(1);

const pintarInfoEpisodio = (episodio) => {
  rutaRightPanel.innerHTML = `<h1>${episodio.name}</h1><h5>${episodio.air_date} | ${episodio.episode}</h5>`;
};

const pintarCaracteres = (lista) => {
  const personajesPresentes = document.createElement("div");
  personajesPresentes.innerHTML = "";
  personajesPresentes.classList = "container-personajes";
  rutaRightPanel.appendChild(personajesPresentes);
  console.log(lista);
  lista.forEach((personaje) => {
    const tarjetaIndividual = document.createElement("div");
    tarjetaIndividual.classList = "tarjeta";
    tarjetaIndividual.innerHTML = `<img class="img-personaje" src="${personaje.image}" alt="#"><div class="name-personaje"><h2>${personaje.name}</h2></div><div class="estado-personaje"><h3>${personaje.species} | ${personaje.status}</h3></div>`;
    personajesPresentes.appendChild(tarjetaIndividual);
    tarjetaIndividual.addEventListener("click", () => {
      descripcionPersonaje(personaje);
    });
  });
};

const descripcionPersonaje = (personaje) => {
  rutaRightPanel.innerHTML = "";
  const datosPersonaje = document.createElement("div");
  datosPersonaje.classList = "container-datos-personaje";
  datosPersonaje.innerHTML = `<img class="img-personaje" src="${personaje.image}" alt="#"><div class="datos-personajes"><div class="name-personaje2"><h2>${personaje.name}</h2></div><div class="estado-personaje2"><h3>${personaje.species} | ${personaje.status} | ${personaje.gender} | <span class="planeta-personaje">${personaje.origin.name}</span></h3></div></div>`;
  rutaRightPanel.appendChild(datosPersonaje);
  const containerPresentes = document.createElement("div");
  containerPresentes.classList = "container-episodios-presentes";
  rutaRightPanel.appendChild(containerPresentes);
  document
    .querySelector("span")
    .addEventListener("click", () =>
      obtenerDescripcionPlaneta(personaje.origin.url)
    );

  obtenerEpisodiosPresente(personaje.episode);
};

const obtenerDescripcionPlaneta = async (planetaURL) => {
  if (planetaURL !== "") {
    const response = await fetch(planetaURL);
    const infPlaneta = await response.json();
    pintarInfoPlaneta(infPlaneta);
    caracteres(infPlaneta.residents);
  } else {
    alert("Lo siento, planeta desconocido");
  }
};

const pintarInfoPlaneta = (planeta) => {
  rutaRightPanel.innerHTML = `<h1>${planeta.name}</h1><h5>${planeta.type} | ${planeta.dimension}</h5>`;
};

const obtenerEpisodiosPresente = async (urlEpisodios) => {
  const resultados = await Promise.all(
    urlEpisodios.map(async (urlEpisodio) => {
      const response = await fetch(urlEpisodio);
      return response.json();
    })
  );
  pintarEpisodiosPresentes(resultados);
};

const pintarEpisodiosPresentes = (episodios) => {
  const boxEpisodioPresente = document.querySelector(
    ".container-episodios-presentes"
  );
  episodios.forEach((episodio) => {
    const crearEpisodio = document.createElement("div");
    crearEpisodio.classList = "datos-episodio-personaje";
    crearEpisodio.innerHTML = `<div class="numEpisodio"><h2>Episodio ${episodio.id}</h2></div><div class="seasonEpisodio"><h3>${episodio.episode}</h3></div>`;
    boxEpisodioPresente.appendChild(crearEpisodio);
  });
};
