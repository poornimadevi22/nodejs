//1.web developer task

const { time } = require("console");
const express=require("express");
const fs=require("fs");
const path=require("path")
const app=express();

//filepath-"C:\Users\ASUS\Documents\Nodejs\web developer task\timestamp.txt"
const folderPath=path.join(__dirname,"folder-content")

//create textfile
app.post("/createfile", (req,res)=>{
  try {
    console.log("ff",req)
    const timestamp= new Date().getTime();
    
   console.log("ff",timestamp)
   const fileName=`date-${timestamp}.txt`;
     const filePath=path.join(folderPath, fileName);
   
   fs.writeFile(filePath, `${fileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }
    res.status(200).send(`Text File '${fileName}' created successfully`); 
  });
  } catch (error) {
    console.log(error)
  }
   

})




//retrieving
app.get("/textfile",(req,res)=>{
      fs.readdir(folderPath, (err,files)=>{
        if(err){
            console.error(err);
            return res.status(500).send("error reading folder")
        }
      })
      const textfile=files.filter(file=>path.extname(file) ==='.txt');
        res.json({textfile});
});



const PORT=8000;
app.listen(PORT,()=>{
    console.log("server is Running on `${8000}`")
})