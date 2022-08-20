const {MongoClient}=require("mongodb");
const Db=process.env.ATLAS_URI;
const client=new MongoClient(Db,{
    useNewUrlParser:true, //https://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html

    //useNewUrlParser-Determines whether or not to use the new url parser. Enables the new, spec-compliant, url parser shipped in the core driver. This url parser fixes a number of problems with the original parser, and aims to outright replace that parser in the near future.

    useUnifiedTopology:true,
    //Enables the new unified topology layer

}
    );

var _db;

module.exports={
    connectToServer:function(callback){
        client.connect(function(err,db){
            if(db){
                _db=db.db("employee");
                console.log("Succesfully connected to MongoDB");
            }
            return callback(err);

        });
    },
    getDb:function(){
        return _db;
    },
};