const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./src/Config/db")
const PORT = process.env.PORT || 8080;

app.use(cors());   
app.use(bodyParser.json());

app.get("/",(req,res) =>{

    res.send('Hello World');
    
});

app.post("/add-data", (req, res) => {
    const {sub1, sub2, sub3, sub4, sub5} = req.body;
    console.log(req.body)
    const query = `INSERT INTO marks (sub1, sub2, sub3, sub4, sub5)
                    VALUES(?,?,?,?,?)`

    db.query(query,[sub1, sub2, sub3, sub4, sub5], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({error: "Failed to add marks"});
        }

        res.status(200).json({message: "Marks inserted succesfully"})
    })
})
app.listen(PORT,() => {
 
    console.log(`Server is running on the port ${PORT}`);
});

    

