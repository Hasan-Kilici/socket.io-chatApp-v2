const express = require("express");

var online_users = 0;

const today = new Date();
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
var cookieParser = require('cookie-parser')
const port = 8080;
const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket, msg) => {
console.log('a user connected');
io.emit('join message')
online_users++
socket.on('disconnect', (msg) => {
console.log('user disconnected');
io.emit('leave message');
online_users--
});
socket.on('chat message', (msg) => {
io.emit('chat message', "<span class='mesaj'>"+msg+"</span>");
});
});

const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("src", "path/to/views");

app.get("/", (req, res, err) => {
res.render(__dirname + "/src/pages/index.ejs",{today, online_users});
console.log("Sayfaya giriş yapıldı");
});
app.get("*", (req,res)=>{
res.render(__dirname + "/src/pages/error.ejs");  
});
server.listen(port, () => {
console.log(port, " Portu dinleniyor");
});
