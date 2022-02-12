const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const taskSchema = mongoose.Schema(
  {
    taskType: {
      type: String,
      required: true,
    
    }, 
    status: {
      type: String,
      required: true,
    
    }, 
    name: { 
        type: String,
        required: true,
       
      },
     taskList:[
        {
        title: String,
        check:{type:Boolean,  default: false,}
      } 
    ],
    imgs:[
      {
      base: String,
    } 
  ],
  location: { 
    type: String,
    
   
  },
  website: { 
    type: String,
    
   
  },
    isRepeat: {
      type: Boolean,
      default: false,
    },
    date:{
      type:Date,
      default:Date.now()
    },
    comments:[
      {
      title: String,
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      date:{ type:Date,
        default:Date.now()}
    } 
  ],
  },
  
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
