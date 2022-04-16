const root = document.querySelector("#root")
const divsApi= '<div class="div-name-api"></div><div class="div-panels-api"><div class="left-panel"></div><div class="right-panel"></div></div>'
console.log(root);
root.innerHTML =divsApi;

const nameApi = document.querySelector(".div-name-api")
const imgTittle = document.createElement("img")
imgTittle.src ="https://www.firstcomicsnews.com/wp-content/uploads/2017/09/Rick-and-Morty-logo-600x257.png"
nameApi.appendChild(imgTittle)

const obtenerEpisodios = async (episodio) =>{
    const url = `https://rickandmortyapi.com/api/episode?page=${episodio}`
    const response = await fetch(url)
    const listaEpisodios = await response.json()
    pintarEpisodios(listaEpisodios)
}

const pintarEpisodios = (episodios)=>{
    const rutaLeftPanel = document.querySelector(".left-panel")
   episodios.results.forEach(episodio => {
       const divCadaEpisodio = document.createElement("a")
       divCadaEpisodio.textContent = episodio.name
       divCadaEpisodio.setAttribute("href","#")
       divCadaEpisodio.classList = "episodios-individuales "
       rutaLeftPanel.appendChild(divCadaEpisodio)
       divCadaEpisodio.addEventListener("click",()=>{
           obtenerDescripcionEpisodio(episodio.id)
       })
   }); 
}

obtenerEpisodios(1)

const caracteres = async (caracter) =>{
    const resultados = await Promise.all(caracter.map(async (caracter)=>{
      const response = await fetch(caracter)
      return response.json()
    }))
  pintarCaracteres(resultados)
    }


const obtenerDescripcionEpisodio = async (episodio) =>{
    const url = `https://rickandmortyapi.com/api/episode/${episodio}`
    const response = await fetch(url)
    const infEpisodio = await response.json()
    pintarInfoEpisodio(infEpisodio)
    caracteres(infEpisodio.characters)
    console.log(infEpisodio);   
}

obtenerDescripcionEpisodio(1)

const pintarInfoEpisodio = (episodio)=>{
const rutaRightPanel = document.querySelector(".right-panel")
const descripcionEp = `<h1>${episodio.name}</h1><h5>${episodio.air_date} | ${episodio.episode}</h5>`
rutaRightPanel.innerHTML =descripcionEp;
}

const pintarCaracteres = (lista)=>{
    const rutaRightPanel = document.querySelector(".right-panel")
    const personajesPresentes = document.createElement("div")
    personajesPresentes.classList ="container-personajes"
    rutaRightPanel.appendChild(personajesPresentes)
    console.log(lista);
    lista.forEach ((personaje)=>{
        const estructuraTarjetas  = `<div class="tarjeta"> <img src="${personaje.image}" alt=""><div class="name-personaje">${personaje.name}</div><div class="estado-personaje">${personaje.species} | ${personaje.status}</div></div>`
        personajesPresentes.innerHTML = personajesPresentes.innerHTML+estructuraTarjetas;
    })
}