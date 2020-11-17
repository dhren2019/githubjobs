const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
})

function validarBusqueda(e) {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if(busqueda.length < 3){
        mostrarMensaje('Busqueda muy corta... Añade mas información')
        return;
    }
    consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
    const githubURL = `https://jobs.github.com/positions.json?search=${busqueda}`;

    console.log(githubURL)
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent(githubURL)}`;
  console.log(url)
    axios.get(githubURL)
    .then(respuesta => console.log(respuesta) );

}
// function  mostrarMensaje(msg)  {

//     const alertaPrevia = document.querySelector('.alerts');

//     if (!alertaPrevia) {
        
//         const alerta = document.createElement('div');
//         alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
//         alerta.textContent = msg;
    
//         formulario.appendChild(alerta);
    
//         setTimeout(() => {
//             alerta.remove();
//         }, 3000);
//     }
// }

function consultarAPI(busqueda) {
    const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`
   
    console.log(url)
   
    const config = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
   
    axios
      .get(url, config)
      .then(respuesta => mostrarPuestos(JSON.parse(respuesta.data.contents)))
      .catch(error => console.log(error))
  }

const mostrarPuestos = (vacantes) => {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }

    if (vacantes.length > 0) {
        resultado.classList.add('grid')

        vacantes.forEach(vacante => {
            const {company,company_url, title, type, url,description } = vacante;

            resultado.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
            <h2 class="text-2xl font-light mb-4">${title}</h2>
            <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
            <p class="font-bold uppercase">Web:   <a class="font-light normal-case">${company_url} </a>
            <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
            <p class="font-bold uppercase">Descripción del puesto:   <span class="font-light normal-case">${description} </span></p>
            <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;
        });
    }else {
        const noResults = document.createElement('p');
        noResults.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
        resultado.classList.remove('grid');
        noResults.textContent = 'No hay puestos disponibles';
        resultado.appendChild(noResults);
    }
  }