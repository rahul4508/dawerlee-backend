const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const notificationSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      task: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
   
    action: {
      type: String,
    
    
    }, 
    statusName: {
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
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

/**
 * @typedef Notification
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
