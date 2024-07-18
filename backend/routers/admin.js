const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const utils = require('../utils');

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'employee' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(utils.createSuccess({ users }));
  } catch (error) {
    res.status(500).json(utils.createError('Something went wrong'));
    console.error(error);
  }
});

//get task by userId
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tasks = await prisma.taskDetails.findMany({
      where: { userId: Number(id) },
    });
    res.status(201).json(utils.createSuccess(tasks));
  } catch (error) {
    res.status(500).json(utils.createError('Something went wrong'));
    console.error(error);
  }
});

module.exports = router;
