const { UserController } = require('../controllers/export');
const router = require('koa-router')();

// cors 处理跨域
// router.all('/api/*', async (ctx,next)=>{  
//   ctx.set("Access-Control-Allow-Origin", "*");  
//   await next();  
// });    


router 
  // 用户相关api                                     
  .post('/api/user/register',UserController.register)                                  // 用户注册                

  
module.exports = router;
