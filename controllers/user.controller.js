const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

module.exports.UserController = {
  async getUsers(req, res) {
    try {
      const user = await User.find({});

      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },

  async addToUser(req, res) {
    try {
      const { firstName, lastName, login, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors });
      }

      const hashPassword = await bcrypt.hash(password, 3);

      const candidate = await User.findOne({ login });
      if (candidate) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким логином существует..." });
      }

      const user = await User.create({
        firstName,
        lastName,
        login,
        password: hashPassword,

      });
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },

  async editUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, login, password } = req.body;

      await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        login,
        password,
      });
      res.status(200).json({ success: "Данные изменены..." });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },

  async login(req, res) {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json({ error: "Неправильный логин..." });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неправильный пароль..." });
      }

      const payload = {
        id: candidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({ token });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },
};
