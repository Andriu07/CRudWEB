
//endpoint de integrantes - API
const API_URL = "https://retoolapi.dev/G3FYLQ/data";

//funcion que manda a traer el JSON con get
async function ObtenerIntegrantes(){
    //respuesta del servidor
    const respuesta = await fetch(API_URL);

    //pasamos a JSON la respuesta
    const data = await respuesta.json();//esto es un JSON (increible)

    //enviamos el JSON a la funcion que genera las filas ne la tabla
    MostrarDatos(data);
}

//funcion para crear las filas de las tablas en base a un 
//DATOS representara al JSON donde viene la informacion
function MostrarDatos(datos){
     //se llama a la tabla con elemento ID y luego al tbody
     const tabla = document.querySelector("#tabla tbody");

     //para inyectar codigo html usamos "inner html"
     tabla.innerHTML = "";//vaciamos el contenido de la tabla

     datos.forEach(integrante => {
        tabla.innerHTML += `
          <tr>
              <td>${integrante.id}</td>
              <td>${integrante.nombre}</td>
              <td>${integrante.apellido}</td>
              <td>${integrante.correo}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
          </tr>
        `;
     });
}

ObtenerIntegrantes();