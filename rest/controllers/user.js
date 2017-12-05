const mongoose = require('mongoose');
const { UserModel } = require('../models/index');
class UserController {
  // 用户注册
  static async register(ctx) {
    const { name, password } = ctx.request.body;
    if(!name||!password) {
      return ctx.error({ msg: '用户名或密码不能为空!' });
    }
    // if(password!=apassword) {
    //   return ctx.error({ msg: '两次输入的密码不一致!' });
    // }
    const ishas = await UserModel.findOne({ name });
    if(ishas){
      return ctx.error({ msg: '该用户已存在!' });
    }     
    const result = await UserModel.create({ name, password });
    if(!result) {
     return ctx.error({ msg: '注册失败!' });
    }
    return ctx.success({ msg:'注册成功' });
  }
}

module.exports = UserController;