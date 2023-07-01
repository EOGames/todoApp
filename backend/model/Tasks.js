const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;
mongoose.connect(url+`/TodoTasks`);


const TaskSchema = new mongoose.Schema({
    taskName:String,
    description:String,
    completed:
    {
        type:Boolean,
        default:false,
    },
    startTime:String,
    completionTime:String,
});

module.exports.Task = mongoose.model('task',TaskSchema);
