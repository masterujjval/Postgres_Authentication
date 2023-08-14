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

app.post('/forgot-user',(req,res)=>{
    const{reemail, repassword}=req.body;

    db.select('password','email')
    .from('users')
    .update({
        password:repassword
    })
    .where({
        email:reemail
        
    })
    .then(data=>{
        res.json(data[0])
    })

})


app.listen(3000,(req,res)=>{
    console.log('lsitening on port 3000......')
})