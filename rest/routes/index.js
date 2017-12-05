const { UserController, TaskController } = require('../controllers/export');
const router = require('koa-router')();

// cors 处理跨域
// router.all('/api/*', async (ctx,next)=>{  
//   ctx.set("Access-Control-Allow-Origin", "*");  
//   await next();  
// });    


router 
  // 用户相关api                                     
  .post('/api/user/register',UserController.register)                                  // 用户注册                
  // 任务相关api
  .post('/api/task/create_task', TaskController.createTask)                            // 创建任务
  .post('/api/task/update_task', TaskController.updateTask)                            // 更新任务
  .post('/api/task/delete_task', TaskController.deleteTask)                            // 删除任务
module.exports = router;
