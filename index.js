const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// middeleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("brand server is running")
})

app.listen(port, ()=>{
    console.log(`brand server is running at port ${port}`)
})