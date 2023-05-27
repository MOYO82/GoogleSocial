const User = require("./models/userModel.js");
const UserService = require("./Validators/authValidator");

module.exports = UserService(User);