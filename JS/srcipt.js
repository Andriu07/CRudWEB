
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
                <button onclick="AbrirModalEditar('${integrante.id}','${integrante.nombre}','${integrante.apellido}','${integrante.correo}')">Editar</button>
                <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
              </td>
          </tr>
        `;
     });
}

ObtenerIntegrantes();




//proceso para agregar un nuevo integrante
const model = document.getElementById("mdAgregar");//cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar");//boton para agregar
const btnCerrar = document.getElementById("btnCerrar");//btono de cerrar


btnAgregar.addEventListener("click" , ()=>{
  model.showModal();
});


btnCerrar.addEventListener("click", ()=>{
  model.close();
})


//agregar nuevo integrante dessde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
  e.preventDefault();//"e"  representa el evento submit evita que el formulario se envie de una vez
  
  //capturar los valores del formulario
  const nombre = document.getElementById("txtNombre").value.trim();
  const apellido= document.getElementById("txtApellido").value.trim();
  const correo = document.getElementById("txtEmail").value.trim();

  //validacion basica
  if(!nombre || !apellido || !correo){
    alert("Ingrese los vañlores correctamente");
    return;//para evitar que el codigo que e siga ejecutando
  }

  //llamar a la API
  //fetch es para llamar a la API
  const respuesta = await fetch(API_URL, {
    method: "POST",//tipo de solicitud
    headers: {'Content-Type' : 'application/json'},//tipo de dato enviado
    body: JSON.stringify({nombre, apellido, correo})//datos enviados
  });


   //validacion: Verififcar si la API responde que los datos que fueron enviados correctamente
    if(respuesta.ok){
      alert("El registro fue agregado correctamente");

      //limpiar el formulario
      document.getElementById("frmAgregar").reset();
    
      //cerrar el modal dialog
      model.close();

      //recargar la tabla
      ObtenerIntegrantes();
      
    } else{
      //en caso de que la API devuelva un codigo diferente a 200-299
      alert("El registro no pudo ser agregado")
    }

});


//funcion para borrar si el usuario si escogio borrar
async function EliminarPersona(id){
  const confirmacion = confirm("¿Realmente desea eliminar el registro?");

  if(confirmacion){
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    ObtenerIntegrantes();
  }
}



/*PROCESO PAR EDITAR UN REGISTRO*/
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");


btnCerrarEditar.addEventListener("click", ()=>{
  modalEditar.close();//cerrar
});


function AbrirModalEditar(id, nombre, apellido, correo){
  //se agregan los valores de registro en los input
  document.getElementById("txtIdEditar").value = id;
  document.getElementById("txtNombreEditar").value = nombre;
  document.getElementById("txtApellidoEditar").value = apellido;
  document.getElementById("txtEmailEditar").value = correo;

//abrimos el modal despues de pasdar
  modalEditar.showModal();
}



document.getElementById("frmEditar").addEventListener("submit", async e => {
   e.preventDefault();//evita que el formulario se envie
   //capturamos los Valores de los input
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    //validacion de las constantes
    if(!id || !nombre || !apellido || !correo){
      alert("Complete todos los campos");
      return;//evita que el codigo se siga ejecutando
    }

    //llamado a la api
    const respuesta = await fetch(`${API_URL}/${id}`,{
      method: "PUT",//tipo de solicitud
      headers: {'Content-Type' : 'application/json'},//tipo de dato enviado
      body: JSON.stringify({nombre, apellido, correo})//datos enviados
      });

      if(respuesta.ok){
        alert("El registro fue actualizado con exito");//confirmacion
        modalEditar.close();//cerrar el modal
        ObtenerIntegrantes();//actualizamos la lista para ver los cambios
      }else{
        alert("El registro no pudo ser actualizado");
      }
});
