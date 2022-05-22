const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: '127.0.0.1', // 'localhost'
    port: 3306,
    user: 'Dev',
    password: '1F.2a.3c.4u',
    database: 'organizerapp'
})

function query(sql,data){
    const miPromesa = new Promise(function(resolve, reject){
        connection.query(sql,data,function(error,result,fields){
            if(error!=null){
                return reject({
                    error:true,
                    message:error.sqlMessage
                })
            }else{
                return resolve(result)
            }
        })
    })

    return miPromesa
}

module.exports = {
    connection, // connection:connection
    query
}
