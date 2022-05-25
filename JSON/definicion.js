//Definición de variables
const url = 'http://localhost:3000/solicitud/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalsolicitud = new bootstrap.Modal(document.getElementById('modalsolicitud'))
const formsolicitud = document.querySelector('form')
const id_solicitud = document.getElementById('id_solicitud')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const cedula = document.getElementById('cedula')
const telefono = document.getElementById('telefono')
const correo = document.getElementById('correo')
const motivo_solicitud = document.getElementById('motivo_solicitud')
//const fechayhora = document.getElementById('fechayhora')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    id_solicitud.value = ''
    nombre.value = ''
    apellido.value = ''
    cedula.value = ''
    telefono.value = ''
    correo.value = ''
    motivo_solicitud.value = ''
    //fechayhora.value = ''
    modalsolicitud.show()
    opcion = 'crear'
})

//mostrar los resultados
const mostrar = (solicitud) => {
    solicitud.forEach(solicitud => {
        resultados += `<tr>
                            <td>${solicitud.id_solicitud}</td>
                            <td>${solicitud.nombre}</td>
                            <td>${solicitud.apellido}</td>
                            <td>${solicitud.cedula}</td>
                            <td>${solicitud.telefono}</td>
                            <td>${solicitud.correo}</td>
                            <td>${solicitud.motivo_solicitud}</td>
                            <td>${solicitud.fechayhora}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

// Borrar

on(document, 'click', '.btnBorrar', e => {

    const fila = e.target.parentNode.parentNode

    const id = fila.firstElementChild.innerHTML

    alertify.confirm("This is a confirm dialog.",

    function  (){

        fetch(url+id, {

            method: 'DELETE'

        })

        .then( res => res.json() )

        .then( ()=> location.reload())
    },

    function(){

        alertify.error('Cancel')

    })

})

// Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const apellidoForm = fila.children[2].innerHTML
    const cedulaForm = fila.children[3].innerHTML
    const telefonoForm = fila.children[4].innerHTML
    const correoForm = fila.children[5].innerHTML
    const motivo_solicitudForm = fila.children[6].innerHTML
    const fechayhoraForm = fila.children[7].innerHTML
    nombre.value =  nombreForm
    apellido.value =  apellidoForm
    cedula.value =  cedulaForm
    telefono.value =  telefonoForm
    correo.value =  correoForm
    motivo_solicitud.value =  motivo_solicitudForm
    fechayhora.value =  fechayhoraForm
    opcion = 'editar'
    modalsolicitud.show()
     
})

//Crear y Editar
formsolicitud.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                apellido:apellido.value,
                cedula:cedula.value,
                telefono:telefono.value,
                correo:correo.value,
                motivo_solicitud:motivo_solicitud.value,
                fechayhora:fechayhora.value,
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevosolicitud = []
            nuevosolicitud.push(data)
            mostrar(nuevosolicitud)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                apellido:apellido.value,
                cedula:cedula.value,
                telefono:telefono.value,
                correo:correo.value,
                motivo_solicitud:motivo_solicitud.value,
                fechayhora:fechayhora.value,
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalsolicitud.hide()
})