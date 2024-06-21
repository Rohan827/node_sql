const mysql = require('mysql2');
const {faker} = require('@faker-js/faker');


const connection  = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : 'shreya'

});

let getRandomuser = () => {
    return [
         faker.string.uuid(),
         faker.internet.userName(),
         faker.internet.email(),
         faker.internet.password(),
];
};
let data = [];

let q = "insert into user values ?";

for(let i =0;i<=100;i++){
    data.push(getRandomuser());
}
try{
    connection.query(q, [data],(err,result)=>{
        if(err) throw err;
        console.log(data);
        console.log(result);
    
    }
)

} catch(err){
    console.log(err);
}

connection.end();

