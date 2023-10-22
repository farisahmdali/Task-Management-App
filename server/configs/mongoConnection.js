const  {MongoClient } = require("mongodb")





let db = null

module.exports={
    connectDb:async()=>{
        try{
            const url = "mongodb://127.0.0.1:27017/task-management-app"
            const client = await MongoClient.connect(url+"")
            console.log('db conected');
            db = client.db('task-management-app')
        }catch(err){
            console.log(err)
        }
        
    },

    getDb:()=>{
        if(!db){
            console.log("database not connected")
        }
    
        return db;
    }

}



  
    