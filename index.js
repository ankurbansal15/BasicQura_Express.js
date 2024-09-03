const express = require("express");
const path = require("path");
const {urlencoded} = require("express");
const app = express();
const PORT = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

let posts = [
    {
        id:uuidv4(),
        username:"ankurbansal",
        content:"I Love Coding"
    },
    {
        id:uuidv4(),
        username: "bansalji",
        content: "Not For All",
    },
    {
        id:uuidv4(),
        username: "mrBansal",
        content: "It's for all"
    }
]

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/CSS")));
app.use(express.static(path.join(__dirname, "/public/JS")));

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id)
    console.log(post)
    res.render("show.ejs",{post})
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts")


})
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
})
app.listen(PORT,()=>{
    console.log(`Server is starting on Port:${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
})
