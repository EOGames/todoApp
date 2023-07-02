const express = require('express');
const { addTask, getAllTasks, completeTask, editTask, deleteTask } = require('../controllers/task.controller');
const Router = express.Router();

Router.post('/addTask',addTask);
Router.get('/getAllTasks',getAllTasks);
Router.put('/completeTask',completeTask);
Router.put('/editTask',editTask);
Router.delete('/deleteTask/:id',deleteTask);

module.exports = Router;
