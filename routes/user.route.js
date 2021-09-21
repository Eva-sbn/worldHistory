const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");
const { check } = require("express-validator");

const router = Router();

router.get("/users", UserController.getUsers);
router.post(
  "/users",
  check("login", "Логин должен быть не меньше пяти символов!").isLength({
    min: 5,
    max: 10,
  }),
  check("password", "Пароль должен быть не меньше четырех символов!").isLength({
    min: 4,
    max: 10,
  }),
  UserController.addToUser
);
router.patch("/users/:id", UserController.editUser);
router.post("/login", UserController.login);

module.exports = router;
