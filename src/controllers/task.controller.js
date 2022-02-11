
const httpStatus = require('http-status');
const { User,Task } = require('../models');
const ApiError = require('../utils/ApiError');
const  base64ToFile  = require('../utils/base64ToFile');
const catchAsync = require('../utils/catchAsync');

const createTask = catchAsync(async (req, res) => {
    // console.log('heyy',req.body.imgs)
    const task = await Task.create(req.body);
    let imgs=req.body.img;
    imgs && imgs.map( async i=>{
      let liveUrl=  await base64ToFile(i.base,task.id,"task");
      task.imgs.push({base:liveUrl});
     
    })
    task.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result)
      }})
// console.log('live==',liveUrl)
    res.status(httpStatus.CREATED).send(task);
  });
  const getTasks = catchAsync(async (req, res) => {
    console.log('heyy',Task)
    const tasks = await Task.find();
    res.send(tasks);
  });
  

  module.exports = {
    createTask,
    getTasks
  };
  