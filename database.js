const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'bookmanager',
    charset:'utf8_general_ci'
})
module.exports=connection;