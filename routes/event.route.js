const { Router } = require("express")
const { eventController } = require("../controllers/event.controller")

const router = Router()

router.get("/events", eventController.getEvents)
router.post("/events", eventController.addToEvent)
router.patch("/events/:id", eventController.editEvent)
router.delete("events/:id", eventController.deleteEvent)

module.exports = router