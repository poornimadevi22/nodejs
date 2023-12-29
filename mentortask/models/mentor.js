const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name:String,
  emailId:String,
  id:Number
});
module.exports = mongoose.model('mentors', mentorSchema);