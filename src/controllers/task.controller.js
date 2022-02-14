
const httpStatus = require('http-status');
const { User,Task , Notification} = require('../models');
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
    task.author=req.user.id;
    task.save(function(err,result){
      if (err){
          console.log(err);
      }
      else{
          console.log(result)
      }})
      await Notification.create(
        {
          user:req.user.id,
          task:task.id,
          action:'create'
        }
      )
      await Notification.create(
        {
          user:req.user.id,
          task:task.id,
          action:'follower'
        }
      )
// console.log('live==',liveUrl)
    res.status(httpStatus.CREATED).send(task);
  });
  const getTasks = catchAsync(async (req, res) => {
    console.log('heyy',Task)
    const tasks = await Task.find()
    .populate({ 
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      } 

   })
   .populate("follower");
    res.send(tasks);
  });
  
  const updateStatus = catchAsync(async (req, res) => {
    console.log('heyy',Task)
    let task = await Task.findById(req.params.taskId);
   task.status=req.body.status;
  await task.save();
   await Notification.create(
    {
      user:req.user.id,
      task:task.id,
      action:'status',
      statusName:req.body.status
    }
  )
    res.send(task);
  });
  
  const createComment = catchAsync(async (req, res) => {
   
   
    let comment={
      title:req.body.title,
      user:req.user.id
    }
    // console.log('heyy',Task,req.user,comment,task.comments)
    // let com=task.comments;
      await Task.updateOne({_id:req.params.taskId}, { $push: {comments:comment}})
  //  task.comments.create(comment);
  // await task.save();
  let task = await Task.findById(req.params.taskId) .populate({ 
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User'
    } 
 });
    res.send(task);
  });

  const updateTask = catchAsync(async (req, res) => {
    
    let task = await Task.findById(req.params.taskId);
    console.log('heyy',task,req.body)
    Object.assign(task, req.body);
    await task.save();
  
  
    res.send(task);
  });



  const getNotifications = catchAsync(async (req, res) => {
    console.log('heyy',Task)
    const Notifications = await Notification.find()
    .populate("user")
    .populate("task")
    res.send(Notifications);
  });
  



  module.exports = {
    createTask,
    getTasks,
    updateStatus,
    createComment,
    getNotifications,
    updateTask
  };
  