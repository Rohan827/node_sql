const express = require('express');
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
const path = require("path");

app.set("views",path.join(__dirname,"/views"));


const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost' , 
    user : 'root',
    database : 'delta_app',
    password : "shreya"
});

let getRandomuser = () => {
    return [
         faker.string.uuid(),
         faker.internet.userName(),
         faker.internet.email(),
         faker.internet.password(),
];
};
//inserting new data
let q = "insert into user(id,username,email,password) values ?";


  

// home route
app.get("/",(req,res)=>{

    let q = "select count(*) from user"
    try{
        
        connection.query(q, (err,result)=>{
                if(err) throw err;
            let count = result[0]["count(*)"];
               res.render("home.ejs", {count});
       
            } )
           
       
        }catch(err){
            console.log(err);
            res.send("some error occured");
      }
    
})

// show route
app.get("/user",(req,res)=>{
    let q = "select * from user";
    try{
        
        connection.query(q, (err,users)=>{
                if(err) throw err;
                res.render("showusers.ejs",{users});
       
            } )
           
       
        }catch(err){
            console.log(err);
            res.send("some error occured");
      }
    
})

// edit

app.get("/user/:id/edit", (req,res)=>{
    let {id} = req.params;
    let q = `select * from user where id = '${id}'`;

    try{
        
        connection.query(q, (err,result)=>{
                if(err) throw err;
                let user = result[0];
                res.render("edit.ejs",{user});
                console.log(result);
       
            } )
           
       
        }catch(err){
            console.log(err);
            res.send("some error occured");
      }

    
})

// update

app.patch("/user/:id/edit",(req,res)=>{
    res.send("updated");
})
app.listen("8080" , ()=>{
    console.log("server islistening to port")
})


