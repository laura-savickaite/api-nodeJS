var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port    : '8889',
    database : 'api-nodejs'
});

connection.connect(function(error){
    if(error) {
        throw error;
    }
    else {
        console.log('database connected');
    }
});

module.exports = connection
