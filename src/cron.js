var cron = require('node-cron');
const util = require('util')
const { User,Task } = require('../src/models');


let task=cron.schedule('*/10 * * * * *', async() => {
  let tas=await AllTask();
  console.log('running aoutside',tas)
  tas.map(t=>{
      console.log('d',t);
      cron.schedule('*/10 * * * * *', async() => {
          Task.create({
              name:t.name,
              taskType:'notInHurry'
          })
      })

    })

});
console.log('cron',task)



async function AllTask(){
    return await Task.find({isRepeat:true,isScheduled:false});
   
}


//   ,util.inspect(c, {showHidden: false, depth: 3, colors: true}));