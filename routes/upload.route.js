const { Router } = require("express")
const path = require("path")
const User = require("../models/User.model")
const TimeLine = require("../models/TimeLine.model")
const authMiddleware = require("../middlewares/authMiddleware")

const router = Router()

/*router.post("/upload/avatar/", authMiddleware, (req, res) => {
  const img = req.files.image

  const fileName = `./image/${Math.random() * 10000}${path.extname(img.name)}`
  img.mv(fileName, async(err) => {
    if (err) {
      console.log(err)
    }else {
      const user = await User.findById(req.user.id)
      user.pathToImage = fileName
      await user.save()
      res.json({
        success: "file uploader",
        image: fileName
      })
    }
  })
})
*/
router.post("/upload", (req, res) => {
  const img = req.files.image
  const fileName = `./image/${Math.random() * 10000000000000000000}${path.extname(img.name)}`
  try {
    img.mv(fileName, async (err) => {
      if(err) {
        res.json({error: "Ошибка при добаалении изображения..."})
      }else {
        res.json({
          success: "file upload",
          image: fileName
        })
      }
    })
  }catch (e) {
    console.log(e)
  }
})
module.exports = router