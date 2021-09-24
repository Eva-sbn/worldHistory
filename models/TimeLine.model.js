const mongoose = require("mongoose")

const TimelinesSchema = new mongoose.Schema ({
  img: String,
  title: String,
  description: String,
  timeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false
  }
})

const Timelines = mongoose.model("Timelines", TimelinesSchema)

module.exports = Timelines
