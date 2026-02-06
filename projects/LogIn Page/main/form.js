import fs from "fs";
import http from "http";
import { parse } from "querystring";
import dbConnect from "./mongoConfig.js";

const port = 8000;
export const myServer = http.createServer((req,res)=>{
    if(req.url == '/'){
        res.writeHead(200, {"Content-type":"text/html"})
        fs.createReadStream("index.html","utf-8").pipe(res)
        
        if(req.method == "POST"){
            req.on("data",(chunk)=>{
                let formData = parse(chunk.toString())
                console.log(formData)

                let getData = async () => {
                    let data = await dbConnect()

                    data = await data.find({email:formData.email},{email:1,_id:0}).toArray()
                    // console.log(data[0].email)

                    if(data.length === 0){
                        let insertData = async () => {
                            let data = await dbConnect()
                            data = await data.insertOne(formData)
                            console.log(data)
                        }
                        insertData()
                    }
                    
                    else if((data[0].email == formData.email) && (formData.newPassword == formData.confirmPassword)){
                        let updateData = async () => {
                            let data = await dbConnect()
                            data = await data.updateOne({email:formData.email},{$set:{password:formData.newPassword}})
                            console.log(data)
                        }
                        updateData()
                    }

                }
                getData()
            })
        }
    }
    else if(req.url == '/home'){
        res.writeHead(200, {"Content-type":"text/html"})
        fs.createReadStream("home.html","utf-8").pipe(res)
        
        if(req.method == "POST"){
            req.on("data",(chunk)=>{
                let formData = parse(chunk.toString())

                let getData = async () => {
                    let data = await dbConnect()
                    

                    data = await data.find({email:formData.email},{email:1,password:1,_id:0}).toArray()
                    // console.log(formData)
                    // console.log(data)

                    if(data.length === 0){
                        console.log("User not found!")
                    }
                    else if((data[0].email == formData.email) && (data[0].password == formData.password) ){
                        console.log("Successfully Logged In")
                    }
                    else if((data[0].email == formData.email) && (data[0].password != formData.password)) { 
                        console.log("Wrong Password! Change your password if forgotten.")
                    }
                    
                }
                getData()
            })
        }
    }
    else if(req.url === "/signup"){
        res.writeHead(200, {"Content-type":"text/html"})
        fs.createReadStream("signup.html","utf-8").pipe(res)
    }
    else if(req.url === "/forgotPassword"){
        res.writeHead(200, {"Content-type":"text/html"})
        fs.createReadStream("forgotPassword.html","utf-8").pipe(res)
    }
    else if(req.url === "/styles"){
        res.writeHead(200, {"Content-type":"text/css"})
        fs.createReadStream("style.css","utf-8").pipe(res)
    }
    else{
        res.writeHead(404, {"Content-type":"text/html"})
        fs.createReadStream("error.html","utf-8").pipe(res)
    }
})

myServer.listen(port, (err)=>{
    if (err) throw err
    console.log(`Server is running on ${port}.`)
})

export default {myServer}
