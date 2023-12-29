const express=require("express");
const app=express();
const mongoose=require("mongoose");
const parser=require("body-parser");
const mentorRoute = require("./routes/mentor");
const studentRoute = require("./routes/studentRoute");

const port=5000;
const student=require("./models/student")
const mentor=require("./models/mentor") 

// app.use("/students",studRoute)

app.use(parser.json());


mongoose
.connect("mongodb://localhost/schoolDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {console.log("Connected to mongoDB...",)
    
}).catch((err) => {
    console.error("not connected to db..",err)
}); 

app.use("/mentor", mentorRoute);
app.use("/student", studentRoute);
app.use(express.static("Public"));





app.listen(port, () => console.log("Listening on port ",port,"..."));

