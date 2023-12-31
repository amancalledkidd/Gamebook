const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: String,
  firstName: String,
  lastName: String,
  signupTimeAndDate: { type: String, required: true },
  friends:[{type: String}],
  profilePic: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  photoCollection: { type: Array, default: [] },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
