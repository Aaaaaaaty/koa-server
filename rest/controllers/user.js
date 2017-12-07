const { UserModel } = require('../models/index')
class UserController {
  // 新建用户
  static async createMember(ctx) {
    const _body = ctx.request.body
    const { name, password, account, authorityLevel } = _body;
    if(undefined === (name && password && account && authorityLevel)) {
      return ctx.error({ msg: '信息填写不完整!' })
    }
    const isHas = await UserModel.findOne({ account })
    if(isHas){
      return ctx.error({ msg: '该用户已存在!' })
    }     
    const result = await UserModel.create( _body )
    if(!result) {
     return ctx.error({ msg: '注册失败!' })
    }
    return ctx.success({ msg:'注册成功' })
  }
}

module.exports = UserController;