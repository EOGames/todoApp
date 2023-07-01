const express = require('express');
const { addTask, getAllTasks, completeTask } = require('../controllers/task.controller');
const Router = express.Router();

Router.post('/addTask',addTask);
Router.get('/getAllTasks',getAllTasks);
Router.put('/completeTask',completeTask);

module.exports = Router;
