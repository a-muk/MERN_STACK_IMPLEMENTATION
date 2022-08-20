const express=require("express");
const recordRoutes=express.Router();
//recordRoutes is an instance of the express router.- we use it to define our routes.The routes will be added as a middleware and will take control of requests starting with path/record.
const dbo=require("../db/conn"); //connecting to the database
const ObjectId=require("mongodb").ObjectId; //This will convert the id from string to ObjectId from the _id


//This section helps in getting a list of all the records 
recordRoutes.route("/record").get(function(req,res){
    let db_connect=dbo.getDb("employee");
    db_connect
    .collection("records")
    .find({})
    .toArray(function(err,result){
        if(err) throw err;
        res.json(result);
    });
});

//this section is used to get a single record by id 
recordRoutes.route("/record/:id").get(function(req,res){
    let db_connect=dbo.getDb();
    let myquery={
        _id:ObjectId(req.params.id)};
    db_connect.collection("records")
    .findOne(myquery,function(err,result){
        if(err) throw err;
        res.json(result);
    });

});

//this section is used to create a new record
recordRoutes.route("/record/add").post(function(req,response){
    let db_connect=dbo.getDb();
    let myobj={
        name:req.body.name,
        position:req.body.position,
        level:req.body.level,
    };
    db_connect.collection("records").insertOne(myobj,function(err,res){
        if(err) throw err;
        response.json(res);
    });
});

//this section will help in updating a record by id

recordRoutes.route("/record/:id").post(function(req,response){
    let db_connect=dbo.getDb();
    let myquery={_id:ObjectId(req.params.id)};
    let newvalues={
        $set:{
            name:req.body.name,
            position:req.body.position,
            level:req.body.level,
        },
    };
    db_connect
    .collection("records")
    .updateOne(myquery,newvalues,function(err,res){
        if(err) throw err;
            console.log("1 document updated");
            repose.json(res);
    })
})

//this section will help you delete a record

recordRoutes.route("/:id").delete((req,response)=>{
    let db_connect=dbo.getDb();
    let myquery={
        _id:ObjectId(req.params.id)
    };
    db_connect.collection("records").deleteOne(myquery,function(err,obj){
        if(err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    })
})

module.exports=recordRoutes;