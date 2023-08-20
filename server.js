const express =require('express');
const path=require ('path');
const bodyParser = require('body-parser');
const knex = require('knex');



const db=knex({
    client:'pg',
    connection:{
        host: '127.0.0.1',
        user:'postgres',
        password:'123456',
        database:'loginform1'

    }
})


const app=express();

let initialPath=path.join(__dirname,"public");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath,"index.html"));
})


app.get('/login',(req,res)=>{
    res.sendFile(path.join(initialPath,"login.html"));
})


app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialPath,"register.html"));
})

//forgot  password
app.get('/forgot',(req,res)=>{
    res.sendFile(path.join(initialPath,"forgot.html"));
})


app.post('/register-user',(req,res)=>{
    const {name, email, password } = req.body;


    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');

    }

    else{
        db("users").insert({
            name:name,
            email:email,
            password:password
        })
        .returning(["name", "email"])
        .then(data=>{
            res.json(data[0])
        })
        .catch(err =>{
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })

    }


})




app.post('/login-user',(req,res)=>{
    const{email, password}=req.body;

    db.select('name','email')
    .from('users')
    .where({
        email:email,
        password:password
    })
    .then(data=>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.json('email or password is incorrect');
        }
    })
})







//forgot password

app.put('/forgot-user',(req,res)=>{  //changed
    const{reemail, repassword}=req.body;

   // Update query
const updateQuery = db("users")
.where({ email:"0@gmail.com" }) // Specify the condition for the record to update
.update({
password:"000"
});

// Execute the update query
updateQuery
.then(rowsAffected => {
  console.log(`Updated ${rowsAffected} row(s)`);
})
.catch(error => {
  console.error('Error updating record:', error);
})
.finally(() => {
  res.json("password changed")
});



   
    

})


app.listen(3000,(req,res)=>{
    console.log('listening on port 3000......')
})