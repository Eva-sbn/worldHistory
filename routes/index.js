const { Router } = require("express");

const router = Router();

router.use(require("./user.route"));
router.use(require("./timeLine.router"))
router.use(require("./event.route"))
router.use(require("./upload.route") )

module.exports = router;
