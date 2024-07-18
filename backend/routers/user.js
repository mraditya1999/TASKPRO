const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../prismaClient');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res
      .status(201)
      .json(utils.createSuccess({ name: newUser.name, email: newUser.email }));
  } catch (error) {
    res.status(500).json(utils.createError('User registration failed'));
    console.error(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(401)
        .json(utils.createError('Invalid email or password'));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(utils.createError('Invalid email or password'));
    }
    const token = jwt.sign({ id: user.id, role: user.role }, config.secret);
    res
      .status(200)
      .json(
        utils.createSuccess({ id: user.id, name: user.name, email, token })
      );
  } catch (error) {
    res.status(500).json(utils.createError('Login failed'));
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });
//     if (!user) {
//       return res
//         .status(401)
//         .json(utils.createError("Invalid email or password"));
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json(utils.createError("Invalid email or password"));
//     }
//     const token = jwt.sign({ id: user.id, role: user.role }, config.secret);
//     res
//       .status(200)
//       .json(
//         utils.createSuccess({
//           id: user.id,
//           name: user.name,
//           email,
//           role: user.role,
//           token,
//         })
//       );
//   } catch (error) {
//     res.status(500).json(utils.createError("Login failed"));
//   }
// });

// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(utils.createSuccess(users));
  } catch (error) {
    res.status(500).json(utils.createError('Something went wrong'));
    console.error(error);
  }
});

module.exports = router;
