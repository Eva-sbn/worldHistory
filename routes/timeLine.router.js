const {Router} = require("express")
const { timeLineController } = require("../controllers/timeLine.controller")
const router = Router();

router.post("/timeLine", timeLineController.createTimeLine)
router.delete("/timeLine/:id", timeLineController.deleteTimeLine)
router.patch("/timeLine/:id", timeLineController.patchTimeLine)
router.get("/timeLine", timeLineController.getTimeLine)
router.get("/timeLine/:id", timeLineController.getTimeLineById)

module.exports = router;