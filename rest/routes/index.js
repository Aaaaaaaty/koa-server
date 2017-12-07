const { UserController, TaskController } = require('../controllers/export');
const router = require('koa-router')();

// cors 处理跨域
// router.all('/api/*', async (ctx,next)=>{  
//   ctx.set("Access-Control-Allow-Origin", "*");  
//   await next();  
// });    


router 
  // 用户相关api                                     
  .post('/api/user/create_member', UserController.createMember)                                  // 用户注册                
  .post('/api/user/update_member', UserController.updateMember)                                  // 更新用户
  .post('/api/user/delete_member', UserController.deleteMember)                                  // 删除用户
  .post('/api/user/get_memberInfo', UserController.getMemberInfo)
  // 任务相关api
  .post('/api/task/create_task', TaskController.createTask)                                      // 创建任务
  .post('/api/task/update_task', TaskController.updateTask)                                      // 更新任务
  .post('/api/task/delete_task', TaskController.deleteTask)                                      // 删除任务
  .post('/api/task/get_taskList', TaskController.getTaskList)                                    // 获取任务列表
  .post('/api/task/get_postTaskList', TaskController.getPostTaskList)                            // 获取提交任务列表（编辑权限）
  .post('/api/task/get_waitingScheduleTaskList', TaskController.getWaitingScheduleTaskList)      // 获取待排期任务列表（组长权限）
  .post('/api/task/get_waitingDealTaskList', TaskController.getWaitingDealTaskList)              // 获取待处理任务列表（组员、组长权限）
module.exports = router;
