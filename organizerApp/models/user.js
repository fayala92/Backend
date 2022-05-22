const database = require("../libs/database")
const bcrypt = require("bcrypt")

class User{
    constructor(data){
        this.name = data.name
        this.email = data.email
        this.username = data.username
        this.password = data.password
        this.birthday = data.birthday
    }

    validate(){
        if(!(this.email && this.name && this.birthday && this.password && this.username)){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        if(this.username.length<5){
            return {
                message:"El nombre de usuario debe ser de al menos 5 caracteres",
                validated:false
            }
        }
        if(this.password.length<8){
            return {
                message:"La contraseña debe contener al menos 8 caracteres",
                validated:false
            }
        }

        return {
            validated:true
        }
    }   

    async save(){
        const data = {
            name:this.name,
            email:this.email,
            username:this.username,
            password:await this.encrypt(this.password),
            birthday:this.birthday
        }
        try {
        const result = await database.query(
            "INSERT INTO users(??) VALUES(?)",
            [Object.keys(data),Object.values(data)]
        )

        return {
            success:true,
            message:"Usuario registrado correctamente"
        }

        } catch(error){
            return error
        }

    }

    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string,salt)

        return hash
    }
}

module.exports = User