
const { User,Task , TaskType} = require('../models');
var randomColor = require('randomcolor');
const catchAsync = require('../utils/catchAsync');


const createType = catchAsync(async (req, res) => {
    var color = randomColor();
 let type= await TaskType.create({
      name:req.body.name,
      color
  })
 res.send(type)
})
const list = catchAsync(async (req, res) => {
   
 let type= await TaskType.find();
 res.send(type)
})



module.exports = {
    createType,
    list
  };