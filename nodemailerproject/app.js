
// const fs= require('fs')//delete image to not being stored in the image folder everytime

const nodemailer= require('nodemailer')// for sending emails
const multer= require('multer')// for uploading images 
const express= require('express')//back end web application framework for Node.js
const bodyParser=require ('body-parser')//responsible for parsing the incoming request bodies in a middleware before handling it
const app= express()
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
var to;
var subject;
var body;
var path; // path of the image

var Storage= multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads')},// foldername
    filename:function(req,file,callback){
        callback(null,file.fieldname + "_" + Date.now()+ "_"+ file.originalname) //for assigning unique file name  when upload images
    }
})

var upload= multer({
    storage:Storage
}).single('image'); //multiple files or single files being uploaded





app.use(express.static('public'))




app.get('/',(req,res)=>{
    res.sendFile('/index.html')
})  // getting input from index.html to,subject,message and attachments


// /sendemail that exists in index.html "action form"
app.post('/sendemail',(req,res)=> {
    // execute this middleware to upload image
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong")
        }
        else{
            to=req.body.to
            subject= req.body.subject
            body=req.body.body
            path=req.file.path
            console.log(to)
            console.log(subject)
            console.log(body)
            console.log(path)


            var transporter= nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'habibatarekmohamed6@gmail.com',
                     pass:'Thinktwice2'

                }
            })
            var mailOptions={
                from:'habibatarekmohamed6@gmail.com',
                to:to,
                subject:subject,
                text:body,
                attachments:[
                    {
                        path:path
                    }
                ]
            }
            //transporter is the transport configuration object
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Email sent "+ info.response)
                    return res.redirect('/result.html')
                }
            })
        }
    })


})

app.listen(5000,()=>{
    console.log("App started on port 5000")
})

//res: response that an Express app sends when it gets an HTTP request
//req: represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.


















