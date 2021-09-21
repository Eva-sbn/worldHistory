const mongoose = require("mongoose")

const TimelinesSchema = mongoose.Schema ({
  img: String,
  title: String,
  description: String,
  timeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
})

const Timelines = mongoose.model("Timelines", TimelinesSchema)

module.exports = Timelines
