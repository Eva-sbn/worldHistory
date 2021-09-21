const timeLine = require("../models/TimeLine.model")

module.exports.filmsController = {
  createTimeLine: async (req, res) => {
    try {
      await timeLine.create({
        img: req.body.img,
        description: req.body.description,
      })
      res.json('таймлайн успешно добавлен')
    }catch (err){
      console.log(err)
    }
  },
  deleteTimeLine: async (req,res) => {
    try {
      await timeLine.findByIdAndDelete(req.params.id)
      res.json('таймлайн успешно удален')
    } catch (err){
      console.log(err)
    }
  },
  patchTimeLine: async (req,res) => {
    try {
      await timeLine.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description
      })
      res.json("таймлайн успешно обновлен")
    } catch (err){
      console.log(err)
    }
  },
  getTimeLine: async (req,res) => {
    try {
      const timeLine = await timeLine.find().populate('timeId', 'name')
      res.json(timeLine)
    }catch (err){
      console.log(err)
    }
  },
  getTimeLineById: async (req,res) => {
    try {
      const timeLineById = await timeLine.findById(req.params.id)
      res.json(timeLineById)
    }catch (err){
      console.log(err)
    }
  },

}