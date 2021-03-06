
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
    
    const tasks = await Task.find()
    .populate({ 
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      } 

   })
   .populate("follower")
   .populate("author");
  

   
    res.send(tasks);
  });
  
  const updateStatus = catchAsync(async (req, res) => {
   
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

  const updateImg= catchAsync(async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    let imgs=req.body.imgs;
    imgs && imgs.map( async i=>{
      let liveUrl=  await base64ToFile(i.base,task.id,"task");
      task.imgs={base:liveUrl};
      // task.imgs.push({base:liveUrl});
    })
    task.save();

    res.send(task)
  })
  
  const createComment = catchAsync(async (req, res) => {
    let base=''
  
    if(req.body.img){
     base = await base64ToFile(req.body.img,req.user.id,"comment");
   }
   
    let comment={
      title:req.body.title,
      user:req.user.id,
      img:req.body.img?base:''
    }
  
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

 await Notification.create(
  {
    user:req.user.id,
    task:task.id,
    action:'comment',
   
  }
)
    res.send(task);
  });

  const deleteComment = catchAsync(async (req, res) => {
 
      // await Task.updateOne({_id:req.params.taskId}, { $push: {comments:comment}})
  
  
  let task = await Task.findById(req.params.taskId) .populate({ 
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User'
    } 
 });
let l= task.comments.id(req.params.cid).remove();
 task.save()
    res.send(l);
  });

  const updateTask = catchAsync(async (req, res) => {
    
    let task = await Task.findById(req.params.taskId);
    
    Object.assign(task, req.body);
    await task.save();
  
    const taskss = await Task.findById(req.params.taskId)
    .populate({ 
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      } 

   })
   .populate("follower")
   .populate("author");
    res.send(taskss);
  });



  const getNotifications = catchAsync(async (req, res) => {
  
    const Notifications = await Notification.find()
    .populate("user")
    .populate("task")
    .sort({_id:-1})
    res.send(Notifications);
  });
  

  const deleteDbData = catchAsync(async (req, res) => {
    console.log('heyy',Task)
     await Notification.deleteMany({})
     await Task.deleteMany({})
   
    res.send('done');
  });
  

  module.exports = {
    createTask,
    getTasks,
    updateStatus,
    createComment,
    getNotifications,
    updateTask,
    deleteComment,
    deleteDbData,
    updateImg
  };
  