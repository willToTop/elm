const mysql = require('mysql');
const config = require('./config')

var connection = mysql.createConnection(config);
 
connection.connect(err => {
  if(err){
    console.log('连接错误');
  }else{
    console.log('连接mysql成功');
  }
});

module.exports = connection;