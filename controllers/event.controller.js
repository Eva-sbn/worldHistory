const Event = require("../models/Event.model")

module.exports.eventController = {
  async getEvents (req, res) {
    try {
      const events = await Event.find({})
      res.status(200).json(events)
    } catch (e) {
      res.status(400).json({ error: "Ошибка при запросе..." });
    }
  },

  async addToEvent (req, res) {
    try {
      const { title, image, priority, timelineId } = req.body
      const event = await Event.create({
        title,
        image,
        priority,
        timelineId
      })
      res.status(200).json(event)
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },

  getEventsById: async (req, res) => {
    try {
      const events = await Event.find({timelineId: req.params.id})
      res.status(200).json(events)
    } catch (e) {
      res.status(400).json({ error: "Ошибка при запросе..." });
    }
  },

  async editEvent (req, res) {
    try {
      const { id } = req.params
      const { title, image, priority, timelineId } = req.body

      await Event.findByIdAndUpdate(id, { title, image, priority, timelineId })
      res.status(200).json({success: "Событие изменено..."})

    } catch (e) {
      res.status(400).json({ error: e });
    }
  },

  async deleteEvent (req, res) {
    try {
      const { id } = req.params
      await Event.findById(id)
      res.status(200).json({success: "Успешно удалено..."})
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
}