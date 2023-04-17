

// import express from "express"
// import cors from "cors"
// import {Server} from "socket.io"
const express = require("express")
const cors = require("cors")
const {Server} = require("socket.io")

//Creating a Node Server
const app  = express()
app.use(cors())
const server = app.listen(5000,()=>{
    console.log("Surver is Running")
})

//Assign server to Socket IO

const io = new Server(server,{
    cors:{
        origin:server
    }
})
const user = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // console.log(name)
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      user: user[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("left", user[socket.id]);
   
  });

});


