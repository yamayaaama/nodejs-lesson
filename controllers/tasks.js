const Task = require("../models/Task");

const getAllTasks = async (req,res) => {
  try {
    const allTask = await Task.find(req.body);
    res.status(200).json(allTask);
  }catch(e) {
    res.status(500).json(e);
  }
}

const createTasks = async (req,res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  }catch(e) {
    res.status(500).json(e);
  }

}

const getSingleTask = async (req,res) => {
  try {
    const getSingleTask = await Task.findOne({_id: req.params.id });

    if(!getSingleTask ) {
      return res.status(404).json(`_id:${req.params.id} doesn't exist `);
    }
    res.status(200).json(getSingleTask);

  }catch(e) {
    res.status(500).json(e);
  }
}

const updateTask =async (req,res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id }, // 更新対象の条件
      { name: req.body.name , completed: req.body.completed }, // 更新内容
      { new: true } // 更新後のドキュメントを取得するためのオプション
    );

    if(!updateTask ) {
      return res.status(404).json(`_id:${req.params.id} doesn't exist `);
    }
    res.status(200).json(updateTask);

  }catch(e) {
    res.status(500).json(e);
  }
}

const deleteTask = async (req,res) => {
  try {
    const deleteTask = await Task.findOneAndDelete(
      {_id: req.params.id },
      req.body,
      {new: true}
      );

    if(!deleteTask ) {
      return res.status(404).json(`_id:${req.params.id} doesn't exist `);
    }
    res.status(200).json(deleteTask);

  }catch(e) {
    res.status(500).json(e);
  }
}

module.exports = {
  getAllTasks,
  createTasks,
  getSingleTask,
  updateTask,
  deleteTask
};