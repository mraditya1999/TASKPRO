const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const utils = require('../utils');

//get all tasks (not required for frontend, only for postman testing)
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.taskDetails.findMany();
    res.status(201).json(utils.createSuccess(tasks));
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

// add task by userId
router.post('/user/:id', async (req, res) => {
  const id = req.params.id;
  console.log('create task', req.body);
  const { task, status, timeSpend, dueDate, priority, remarks, accepted } =
    req.body;
  try {
    const taskDetail = await prisma.taskDetails.create({
      data: {
        task,
        status,
        timeSpend,
        dueDate,
        priority,
        remarks,
        accepted,
        userId: Number(id),
      },
    });
    res.status(201).json(utils.createSuccess(taskDetail));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task by taskId (PUT)
router.put('/task/:id', async (req, res) => {
  const id = req.params.id;
  const { task, status, timeSpend, dueDate, priority, remarks, accepted } =
    req.body;
  try {
    const updatedTask = await prisma.taskDetails.update({
      where: { id: Number(id) },
      data: {
        task,
        status,
        timeSpend,
        dueDate,
        priority,
        remarks,
        accepted,
      },
    });
    res.status(200).json(utils.createSuccess(updatedTask));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task by taskId (PATCH)
router.patch('/task/:id', async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const dataToUpdate = req.body;
  try {
    const updatedTask = await prisma.taskDetails.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });
    res.status(200).json(utils.createSuccess(updatedTask));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task by taskId
router.delete('/task/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.taskDetails.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(utils.createSuccess('Task deleted'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
