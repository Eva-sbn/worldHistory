const { Router } = require("express");

const router = Router();

router.use(require("./user.route"));
router.use(require("./timeLine.router"))
router.use(require("./event.route"))

module.exports = router;
