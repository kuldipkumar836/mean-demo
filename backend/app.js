const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
MONGODB_URI = 'mongodb+srv://peter:fV4TfT1XxuigUCaq@cluster0-sgzoy.mongodb.net/node-angular?retryWrites=true&w=majority'
const url = process.env.MONGODB_URI;
//const url = "mongodb://localhost:27017/MyDb";
//const url = 'mongodb+srv://peter:fV4TfT1XxuigUCaq@cluster0-sgzoy.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose
  .connect(url||'mongodb://localhost:27017/MyDb')
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/dist"));
app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname,'dist','index.html'));
});
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
