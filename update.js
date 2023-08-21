


  
  
  

const express =require('express');
const path=require ('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const app=express();
const { Client } = require('pg');

app.use(bodyParser.json());

let initialPath=path.join(__dirname,"public");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/forgot',(req,res)=>{app.get('/forgot',(req,res)=>{
    res.sendFile(path.join(initialPath,"forgot.html"));
})
    res.sendFile(path.join(initialPath,"forgot.html"));
})

// Configure the database connection
const client = new Client({
    host: '127.0.0.1',
    user:'postgres',
    password:'123456',
    database:'loginform1',
  port: 5432, // Default PostgreSQL port
});


  




// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');

       
   

    // Raw update query
    const updateQuery = `
    UPDATE users
    SET password = $1
    WHERE email = $2
  `;

    // Execute the update query
    return client.query(updateQuery, ["0", "0@gmail.com"] )})


  .then(result => {
    console.log('Update successful:', result.rowCount, 'row(s) affected');
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    // Close the database connection
    client.end();
  });


