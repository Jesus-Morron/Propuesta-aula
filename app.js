const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port: 3303,
    database:'serviciotecnico'
})
//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("¡Conexión exitosa a la base de datos!")
    }
})
app.get('/', function(req,res){
    res.send('Ruta INICIO')
})
//Mostrar todos los artículos
app.get('/solicitud', (req,res)=>{
    conexion.query('SELECT * FROM solicitud', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})
//Mostrar un solicitud
app.get('/solicitud/:id', (req,res)=>{
    conexion.query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})
//Crear una solicitud
app.post('/solicitud', (req,res)=>{
    let data = {nombre:req.body.nombre, apellido:req.body.apellido, cedula:req.body.cedula, telefono:req.body.telefono, correo:req.body.correo, motivo_solicitud:req.body.motivo_solicitud, fechayhora:req.body.fechayhora}
    let sql = "INSERT INTO solicitud SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             Object.assign(data, {id: result.insertId }) 
             res.send(data) //enviamos los valores                         
        }
    })
})
//Editar solicitud
app.put('/solicitud/:id', (req, res)=>{
    let id_solicitud = req.params.id_solicitud
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let cedula = req.body.cedula
    let telefono = req.body.telefono
    let correo = req.body.correo
    let motivo_solicitud = req.body.motivo_solicitud
    let fechayhora = req.body.fechayhora
    let sql = "UPDATE solicitud SET descripcion = ?, nombre = ?, apellido = ?, cedula = ?, telefono = ?, correo = ?, motivo_solicitud = ?, fechayhora = ? WHERE id_solicitud = ?"
    conexion.query(sql, [nombre, apellido, cedula, telefono, correo, motivo_solicitud, fechayhora, id_solicitud], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})
//Eliminar solicitud
app.delete('/solicitud/:id', (req,res)=>{
    conexion.query('DELETE FROM solicitud WHERE id_solicitud = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})

//////Orden Ascendente//////////

app.get('/asc', (req,res)=>{

    conexion.query('SELECT * FROM solicitud ORDER BY nombre asc', (error,filas)=>{

        if(error){

            throw error

        }else{

            res.send(filas)

        }

    })

})

////// Orden Descendente/////////////

app.get('/desc', (req,res)=>{

    conexion.query('SELECT * FROM solicitud ORDER BY nombre desc', (error,filas)=>{

        if(error){

            throw error

        }else{

            res.send(filas)

        }

    })

})

app.get('/suma', (req,res)=>{
    conexion.query('SELECT SUM(cedula) as suma FROM proceso', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

app.get('/minimo', (req,res)=>{
    conexion.query('SELECT MIN(cedula) as minimo FROM proceso', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

app.get('/maximo', (req,res)=>{
    conexion.query('SELECT MAX(cedula) as maximo FROM proceso', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

app.get('/avg', (req,res)=>{

    conexion.query('SELECT AVG(ALL cedula) as promedio FROM proceso', (error,filas)=>{

        if(error){

            throw error

        }else{

            res.send(filas)

        }

    })

})

// Validar

app.get('/login', (req, res) => {
    const customerObj = {
      usuario: req.body.usuario,
      contraseña: req.body.contraseña
    }
    const sql = 'SELECT * FROM acceso WHERE usuario=usuario and password=password';
  
    res.json(results);
  });

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
})