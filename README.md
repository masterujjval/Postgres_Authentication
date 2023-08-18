# Login-form-validation

## About

Login-form-validation is a simple website that can run locally on any platform.
The user can register and then log in then land on the greeting page, it will store data on Postgresql locally to validate the registered users during the login process.

Postgresql for database, express for fetch, and post and node have been used to create this project.

![Screenshot from 2023-07-29 16-38-24](https://github.com/masterujjval/Login-form-validation/assets/64778409/e188fc49-5534-4ecb-89f4-53bb060182a7)


![Screenshot from 2023-07-29 16-35-41](https://github.com/masterujjval/Login-form-validation/assets/64778409/e0488583-81fa-4a6a-85cf-d01a89a33855)


![Screenshot from 2023-07-29 16-38-50](https://github.com/masterujjval/Login-form-validation/assets/64778409/3047e422-32f5-464a-ab6c-afc771634a9b)


![Screenshot from 2023-07-29 16-38-30](https://github.com/masterujjval/Login-form-validation/assets/64778409/55062899-48b2-4bd0-9134-503e5c2a3873)
---
## Prerequisite to run the website and server
* Postgresql
* NodeJs
* Knex.js

* To install Postgresql watch these tutorials for
  * [windows](https://www.youtube.com/watch?v=0n41UTkOBb0)
  * [ubuntu](https://www.youtube.com/watch?v=tducLYZzElo&t=329shttps://www.youtube.com/watch?v=tducLYZzElo&t=329s)

## Changes to be made after setup up the environment
Now to create a database to store registration and then for validation, we have to first create a database.
After, successfully installing Postgresql made some changes:-

![Screenshot from 2023-07-29 17-09-09](https://github.com/masterujjval/Login-form-validation/assets/64778409/af750891-f831-438f-9b4e-6dbb886d2434)

Change the password and enter your password which was entered while creating a server with username ***postgres***.

---
Open the folder in vs code where you have cloned the project and follow the below steps to create a database:

***For Linux***
```shell
sudo -i -u postgres
```
![Screenshot from 2023-07-29 17-19-01](https://github.com/masterujjval/Login-form-validation/assets/64778409/f162339e-fb4b-4c54-9258-0b528b67b086)

Now create a database and name it 'loginform1'
```
createdb loginform
```
![Screenshot from 2023-07-29 17-25-28](https://github.com/masterujjval/Login-form-validation/assets/64778409/021d8b82-501d-4717-a1b6-549bfd2ccf02)

Now, switch to loginform1 database to create table
```
psql -d loginform1
```
![Screenshot from 2023-07-29 17-30-12](https://github.com/masterujjval/Login-form-validation/assets/64778409/18646df2-b4c2-4f3a-acec-b19b7b591cbe)

Now copy the below lines to create a table to register users
```
CREATE TABLE users (id serial not null primary key, name varchar(255) not null, email varchar(255), not null unique, password varchar(255) not null);
```
run : ```SELECT * FROM users;``` to check whether the table is created or not.

Now you can run the project on your Linux. 

---
***For Windows***

run: ```psql -U postgres```
then enter the password you have entered while creating a server with username ```postgres```

Create database: ```CREATE DATABASE loginform1```

switch to database: ```\c loginform1```

then copy the same command for creating a table:
```
CREATE TABLE users (id serial not null primary key, name varchar(255) not null, email varchar(255), not null unique, password varchar(255) not null);
```
Execute ```npm start``` in the vs code terminal to run the server.

### Update

Making changes to provide forgot password feature and is in progress. In this user will enter their email and a new password, if the entered email is correct it updates the password of that particular email.




  
