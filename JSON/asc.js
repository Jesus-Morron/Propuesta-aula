/////jssssssssssss///////
const url = 'http://localhost:3000/asc'
    const contenedor = document.querySelector('tbody')
    let resultados = ''
    //funcion para mostrar los resultados de forma ascendente  
    const mostrar = (citas) => {
        citas.forEach(cita => {
            resultados += `<tr>
                                <td>${cita.id_solicitud}</td>
                                <td>${cita.nombre}</td>
                                <td>${cita.apellido}</td>
                                <td>${cita.cedula}</td>   
                                <td>${cita.telefono}</td> 
                                <td>${cita.correo}</td>  
                                <td>${cita.motivo_solicitud}</td>                  <td>${cita.fechayhora}</td>                                
                           </tr>
                        `    
        })
        contenedor.innerHTML = resultados   
    }
    
    fetch(url)
        .then( response => response.json() )
        .then( data => mostrar(data) )
        .catch( error => console.log(error))
     
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            if(e.target.closest(selector)){
                handler(e)
            }
        })
     }