const TimeLine = require("../models/TimeLine.model")

module.exports.timeLineController = {
  createTimeLine: async (req, res) => {
    try {
      const { title, img, description, timeId } = req.body
      await TimeLine.create({
        title,
        img,
        description,
        timeId
      })
      res.status(200).json({success: 'таймлайн успешно добавлен'})
    }catch (err){
      res.status(400).json({error: err})
    }
  },
  deleteTimeLine: async (req,res) => {
    try {
      await TimeLine.findByIdAndDelete(req.params.id)
      res.json({ success:'таймлайн успешно удален' })
    } catch (err){
      res.status(400).json({error: err})
    }
  },
  patchTimeLine: async (req,res) => {
    try {
      const { id } = req.params
      const { title, img, description, timeId } = req.body
      await TimeLine.findByIdAndUpdate(id,{
        title,
        img,
        description,
        timeId
      })
      res.json({ success:"таймлайн успешно обновлен" })
    } catch (err){
      res.status(400).json({error: err})
    }
  },
  getTimeLine: async (req,res) => {
    try {
      const timeLine = await TimeLine.find({})
      res.status(200).json(timeLine)
    }catch (err){
      res.status(400).json({error: err})
    }
  },
  getTimeLineById: async (req,res) => {
    try {
      const timeLineById = await TimeLine.findById(req.params.id)
      res.json(timeLineById)
    }catch (err){
      res.status(400).json({error: err})
    }
  },

}