const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/" ,async(req,res)=>{
    try {
        const studentData = await Student.find({}).exec();
        res.send(studentData);
      } catch (error) {
        console.log(error)
        res.status(500).send(error);
      }
})

router.get("/listWithoutMentors",async(req,res)=>{
    try {
        const list=await Student.find({mentors:{$size:0}})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/ListWithMentors",async(req,res)=>{
    try {
        const list=await Student.find.mentor()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.put("/",async (req,res)=>{
    try {
        console.log(req.body)
        const newStudent=await new Student(req.body).save();
        console.log(newStudent)
        res.json(newStudent);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.post("/update/:id",async (req,res)=>{
    try {
        console.log(req.body,req.params)
        const newStudent=await Student.findOneAndUpdate({id:req.params.id},req.body,{new:true}).exec()
        console.log(newStudent)
        res.json(newStudent);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

module.exports=router;