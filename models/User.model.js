const mongo = require("mongoose");

const userSchema = new mongo.Schema({
  firstName: String,
  lastName: String,
  login: String,
  password: String,
  listChanged: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

const User = mongo.model("User", userSchema);

module.exports = User;
