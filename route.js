'use strict';


var request = require('request');

var Promises = require('promise');

var mongoose = require('mongoose');

 var login = require("./functions/login")
// var landdetails = require("./functions/landdetails")
var registerUser= require('./functions/registerUser')

var path = require('path');
var cors = require('cors');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();



module.exports = router => {

  router.post('/registerUser', cors(), (req, res) => { 

    const username = req.body.username;
    console.log(username);
    const phonenumber = parseInt(req.body.phonenumber);
    console.log(phonenumber);
    const dateofbirth = req.body.dateofbirth;
    console.log(dateofbirth);
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    const retypepassword = req.body.retypepassword;
    console.log(retypepassword);
    const usertype = req.body.usertype;
    console.log(usertype);
 


    if (!username || !phonenumber|| !dateofbirth || !email || !password || !retypepassword || !usertype ) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        registerUser
            .registerUser(username,phonenumber,dateofbirth,email,password, retypepassword,usertype)
            .then(result => {

                res.send({
                    "message": "user has been registered successfully",
                    "status": true,


                });


            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    }
});


 router.post('/login',cors(),(req,res)=> {
    var username=req.body.username;
    console.log("username:",username);
     var email =req.body.email;
     console.log("email:",email);
     var password=req.body.password;
     console.log("password",password);

     login
      .login(username,email,password)
      .then(result => {   
         console.log("result ===>>>",result)
         console.log("hello")
         res.send({
             "message": "Login sucessfully",
             "status": true,
             
         });

     })
     .catch(err => res.status(err.status).json({
         message: err.message
     }).json({
         status: err.status
     }));
 }
 )}


//  router.post('/landdetails', cors(), (req, res) => {
//      console.log("Land  Details");
//      var sellername=req.body.sellername;
//      console.log("person Name:",sellername);
//         var addresses=req.body.addresses;
//      console.log("addresses",addresses);
//      var landsqft=req.body.landsqft;
//      console.log("landsqft:",landsqft);
//      var landvalue=req.body.landvalue;
//      console.log("landvalue:",landvalue)

//    landdetails
//          .landdetails(sellername,addresses,landsqft,landvalue)
//          console.log("arjun")
//          .then(result => {   
//              console.log("result ===>>>",result)

//              res.send({
//                  "message": "Seller details Adding Successful",
//                  "status": true,
//                  "usertype":result.users.usertype
//              });

//        })
//         .catch(err => res.status(err.status).json({
//             message: err.message
//         }).json({
//             status: err.status
//         }));
//     });

// }

