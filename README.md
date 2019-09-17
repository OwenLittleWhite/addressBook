# README #



### What is this repository for? ###

* It's a RESTful api for AddressBook app that enables its users to manage a simple contact list by adding
* Version 1.0


### How do I get set up? ###

* Summary of set up  
```
npm install;
npm start
```
* Configuration:  
node > 7; mysql; mongodb;
* Dependencies
* Database configuration  
add an addressbook database in each db server; and create a users collection in mysql;
* How to run tests  
npm run test


### How to use ###

#### create a user ####
* user model  
```JSON
{
 id:number,
 name:string,
 password:string
}
```
* api  
  POST /users;
* body  
  name,password;
* response  
  user model;

#### login ####
* api  
  POST /login;
* body  
  username,password;
* response  
  user model;

#### add a contact ####
* contact model
```JSON
{
 _id:ObjectId,
 name:string,
 phone:string,
 address:string,
 owner:number
}
```
* api  
  POST /users/:userId/contacts;
* body  
    name is nessesary, others are optional
* response  
  created contact model;
* auth  
   need to login first

#### remove a contact ####

* api  
  DELETE /users/:userId/contacts/contactId;
* auth  
   need to login first
* response  
  deleted contact model;

#### get all contacts ####

* api  
  GET /users/:userId/contacts;
* auth  
   need to login first
* response  
  a list of contact model;
