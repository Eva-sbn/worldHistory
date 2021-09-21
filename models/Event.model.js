const mongo = require("mongoose")

const eventSchema = new mongo.Schema({
  title: String,
  image: String,
  priority: Number,
  timelineId: {
    type: mongo.Schema.Types.ObjectId,
    ref: "timeline"
  }
}, {timestamps: true})

const Event = mongo.model("Event", eventSchema)

module.exports = Event