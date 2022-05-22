//Usando modulos nátivos:
const path = require("path") // path: nos permite admistrar rutas de archivos

//Usando modules externos
const express = require("express")
const port = 4000

const users = require("./routes/users")//Importando router

const app = express() //Creamos la app


//Sección para los middlewares
app.use("/static",express.static(path.join(__dirname,"static"))) //Middleware para archivos estáticos
app.use(express.json())
//Sección para los routers
app.use(users) //Usando router


// req: request(peticion) y res: response(respuesta)
app.get("/",function(req,res){
    console.log(__dirname) // Ubicación o ruta de nuestro proyecto
    return res.sendFile(path.join(__dirname,"views","index.html"))
})

app.listen(port,()=>{
    console.log("Escuchando en: http://localhost:"+port)
})