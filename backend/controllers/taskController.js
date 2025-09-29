const Task = require('../models/task');

exports.createTask = async (req,res) =>{
  try {
    const newTask = new Task({...req.body,userId: req.user.userId});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

exports.getTasks = async (req,res) =>{
  try {
    const tasks = await Task.find({$or:[{userId: req.user.userId},{sharedWith: req.user.userId}]});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getTaskById = async (req,res) =>{
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({error: 'Task not found'});
    if(task.userId.toString() !== req.user.userId && !req.sharedWith.includes(req.user.userId)){
      return res.status(403).json({error: 'You are not authorized to view this task'});
    }
    res.json(task)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

exports.updateTask = async (req,res) =>{
  try {
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if(!task) return res.status(404).json({error: 'Task not found'});
    res.json(task)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

exports.deleteTask = async (req,res) =>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({error: 'Task not found'});
    res.json({message: 'Task deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.sharedTask = async (req,res) =>{
  try {
    const {shareUserId} = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, {$addToSet: {sharedWith: shareUserId}},{new: true});
    res.json(task);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
