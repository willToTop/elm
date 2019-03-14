var mysqlConnection = require('../mysql/index');
class Mysql{
    constructor(){

    }
    requireData(sql){
        return new Promise((resolve,reject)=>{
            mysqlConnection.query(sql,(err,result)=>{
                if(err){
                    reject(err);                    
                }else{
                    resolve(result);
                }
            });
        }).then(data=>{
            return Promise.resolve(data);
        }).catch(err => {
            console.log(err);
            throw err
        })
    }
    saveData(sql,params){
        return new Promise((resolve,reject)=>{
            mysqlConnection.query(sql,params,(err,result)=>{
                if(err){
                    reject(err);                    
                }else{
                    resolve(result);
                }
            });
        }).then(data=>{
            return Promise.resolve(data);
        }).catch(err => {
            console.log(err);
            throw err
        })
    }
}
module.exports = new Mysql;