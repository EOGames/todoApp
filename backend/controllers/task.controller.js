const { Task } = require("../model/Tasks");



module.exports.addTask = async (req, res) => {
    try {
        const { taskName, description } = req.body;

        const foundBranch = await Task.findOne({ taskName: taskName });
        if (foundBranch) {
            return res.status(409).json({ status: false, message: 'TaskName Already Exist' });
        } else {
            const newTask = new Task({
                taskName: taskName,
                description: description,
                completed: false,
                startTime: new Date().toGMTString(),
                completionTime:'',
            });
            const data = await newTask.save();
            console.log('New Task Added ',data);
            return res.status(200).json({status:true,message:`Task Added Successfully`,data});
        }
    } catch (error) {
        console.log(`Error While Saving New Task :${error}`);
        return res.status(500).json({status:false,message:'Error While Saving New Task ',error:error});
    }
}

module.exports.completeTask = async (req,res)=>
{
    const {id} = req.body;
    try {
        const foundTask = await Task.findOne({_id:id});
        let response;
        if (foundTask)
        {
            foundTask.completed = true;
            foundTask.completionTime = new Date().toGMTString();
            response = await foundTask.save();
            return res.status(200).json({status:true,message:'successfully completed Task',response});
        }else
        {
            return res.status(404).json({status:false,message:'task not found'});
        }
    } catch (error) {
        console.log('error while completing task',error);
        return res.status(500).json({status:false,message:'Error while completing task',error:error});
    }
}

module.exports.editTask = async(req,res)=>
{
    const {id,taskName,description} = req.body;

    try {
        const foundTask = await Task.findOne({_id:id});

        if (!foundTask)
        {
            return res.status(404).json({status:false,message:'No Task Found For Updating'});
        }else
        {
            foundTask.taskName = taskName;
            foundTask.description = description;
            foundTask.completed = false;
            const response = await foundTask.save();
            return res.status(200).json({status:true,message:'successfully Edited Task',response:response});
        }
    } catch (error) {
        console.log('Error while editing task',error);
        return res.status(500).json({status:false,message:'Error while editing task',error:error});
    }
}

module.exports.deleteTask = async (req,res)=>
{
    const id = req.params.id;
    console.log('id for delete',id);
    try {
        const response = await Task.deleteOne({_id:id});
        console.log('delete',response);
        return res.status(200).json({status:true,message:'Successfully Deleted Task',response:response});
    } catch (error) {
        console.log('Error While deleting task',error);
        return res.status(500).json({status:false,message:'Error While deleting task',error:error});
    }
}

module.exports.getAllTasks = async(req,res)=>
{
    try {
        const data = await Task.find();
        return res.status(200).json({status:true, data});
    } catch (error) {
        return res.status(500).json({status:false,message:`Error While Getting Task List`,error:error});
    }
}