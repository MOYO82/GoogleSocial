let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already registered"],
      },
      password: { 
        type: String, 
        require: true,
        unique: true,  
        minlength: 8,
        maxlength: 20
       },
    });  

const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;