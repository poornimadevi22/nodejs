const express = require("express");
const router = express.Router();
const mentor = require("../models/mentor");

router.get("/" ,async(req,res)=>{
    try {
        const mentors = await mentor.find({}).exec();
        res.send(mentors);
      } catch (error) {
        console.log(error)
        res.status(500).send(error);
      }
})

router.put("/",async (req,res)=>{
    try {
        console.log(req.body)
        const newMentor=await new mentor(req.body).save();
        console.log(newMentor)
        res.json(newMentor);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.post("/update/:id",async (req,res)=>{
    try {
        console.log(req.body,req.params)
        const newMentor=await mentor.findOneAndUpdate({id:req.params.id},req.body,{new:true}).exec()
        console.log(newMentor)
        res.json(newMentor);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

module.exports=router;