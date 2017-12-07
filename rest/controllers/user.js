const { UserModel } = require('../models/index')
class UserController {
	// 新建用户
	static async createMember(ctx) {
		const _body = ctx.request.body
		const { name, password, account, authorityLevel } = _body;
		if (undefined === (name && password && account && authorityLevel)) {
			return ctx.error({ msg: '信息填写不完整!' })
		}
		const isHas = await UserModel.findOne({ account })
		if (isHas) {
			return ctx.error({ msg: '该用户已存在!' })
		}
		const result = await UserModel.create(_body)
		if (!result) {
			return ctx.error({ msg: '注册失败!' })
		}
		return ctx.success({ msg: '注册成功' })
	}
	// 修改用户
	static async updateMember(ctx) {
		const _body = ctx.request.body
		const { _id, account, password, name, authorityLevel } = _body;
		if (undefined === ( _id && account && password && name && authorityLevel ))
			//数据必须数据 防止修改后更改成undefined
			return ctx.error({ msg: '缺少必要的用户信息!' })
		const isUpdate = await UserModel.findOneAndUpdate({ _id: _id }, {
			$set: _body
		})
		if (isUpdate)
			return ctx.success({ msg: '任务已更新!' })
	}

	//删除用户
	static async deleteMember(ctx) {
		const { _id } = ctx.request.body;
		const isRemove = await UserModel.remove({ _id: _id })
		if (isRemove)
			return ctx.success({ msg: '用户已删除!' })
	}
	// 获取用户信息
	static async getMemberInfo(ctx) {
		const { _id } = ctx.request.body 
		const info = await UserModel.findOne({ _id }) 
		if(info)
			return ctx.success({ data: info, msg: '获取用户信息成功!'})
	}
}

module.exports = UserController;