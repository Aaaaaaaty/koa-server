const { TaskModel } = require('../models/index');
// version1.0不做权限控制，由前端控制接口的暴露情况
class TaskController {
  // 新建任务
  static async createTask(ctx) {
    const _body = ctx.request.body
    const {  name, demandPerson, type, emergency, fields, systemFunction } = ctx.request.body;
    if(undefined === ( name && demandPerson && type && emergency && fields && systemFunction ))
        return ctx.error({ msg: '缺少必要的任务信息!'})
    const isHas = await TaskModel.findOne({ name: { title: name.title, type: name.type }})
    if(isHas) return ctx.error({ msg: '该任务已存在!' })
    const result = await TaskModel.create(_body)
    return ctx.success({ data: { taskId: result._id }, msg: '创建任务成功!' }) 
  }
  //修改任务
  static async updateTask(ctx) {
    const _body = ctx.request.body
    const {  _id, name, demandPerson, type, emergency, fields, systemFunction } = ctx.request.body;
    if(undefined === ( name && demandPerson && type && emergency && fields && systemFunction ))
        return ctx.error({ msg: '缺少必要的任务信息!'})
    const isUpdate = await TaskModel.findOneAndUpdate({ _id: _id },{
        $set:_body
    })
    if (isUpdate) //没有更新失败因为中间件会拦截所有错误并提前返回
        return ctx.success({ msg: '任务已更新!' })
  }
  //删除任务
  static async deleteTask(ctx) {
    const _body = ctx.request.body
    const { _id, name } = ctx.request.body;
    const isRemove = await TaskModel.remove({_id: _id})
    if (isRemove) 
        return ctx.success({ msg: '任务已删除!' })
  }
}

module.exports = TaskController;