const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const taskTypeSchema = mongoose.Schema(
  {
  
    color: {
      type: String,
    }, 
    name: {
        type: String,
      }, 
    
    date:{
      type:Date,
      default:Date.now()
    },
  },
  
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskTypeSchema.plugin(toJSON);
taskTypeSchema.plugin(paginate);

/**
 * @typedef TaskType
 */
const TaskType = mongoose.model('TaskType', taskTypeSchema);

module.exports = TaskType;
