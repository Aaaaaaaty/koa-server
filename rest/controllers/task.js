/**
 * version1.0不做权限控制，由前端控制接口的暴露情况
 * 没有失败判断因为中间件会拦截所有错误并提前返回 
 */
const { TaskModel, UserModel } = require('../models/index');
class TaskController {
    // 新建任务
	static async createTask(ctx) {
		const _body = ctx.request.body
		const {  name, demandPerson, type, emergency, fields, systemFunction } = _body;
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
		const {  _id, name, demandPerson, type, emergency, fields, systemFunction, makeTime, designTime, maker, designer } = _body;
		if(undefined === ( _id && name && demandPerson && type && emergency && fields && systemFunction ))
			//数据必须数据 防止修改后更改成undefined
			return ctx.error({ msg: '缺少必要的任务信息!'})
		const isUpdate = await TaskModel.findOneAndUpdate({ _id: _id },{
			$set:_body
		})
		if (undefined !== ((makeTime && maker) || (designTime && designer))) {
			async function updateScheduleTask(time, user) { //更新任务中如果修改了排期信息则添加到个人排期中
				let { scheduleTaskList } = await UserModel.findOne({ account: designer })
				if (!scheduleTaskList && scheduleTaskList.length) {
					scheduleTaskList = []
				} else {
					let isHasSchedule = false
					scheduleTaskList = scheduleTaskList.map((item, index) => {
						if (item.taskId === _id) {
							isHasSchedule = true
							return { name: name, time: designTime, taskId: _id }
						} else {
							return item
						}
					})
					if (!isHasSchedule) scheduleTaskList.push({ name: name, time: designTime, taskId: _id })
				}
				const result = await UserModel.findOneAndUpdate({ account: designer }, {
					$set: { scheduleTaskList }
				})
				return result
			}
			if(makeTime && maker) {
				if(!updateScheduleTask(makeTime, maker)) return ctx.error({ msg: '排期更新出错!'})
			}
			if(designTime && designer) {
				
				if(!updateScheduleTask(designTime, designer)) return ctx.error({ msg: '排期更新出错!'})
			}
		}
		return ctx.success({ msg: '任务已更新!' })
	}

	

	//删除任务
	static async deleteTask(ctx) {
		const { _id } = ctx.request.body;
		const isRemove = await TaskModel.remove({_id: _id})
		if (isRemove) 
			return ctx.success({ msg: '任务已删除!' })
	}

    //获取任务列表
	static async getTaskList(ctx) {
		const { page, limit } = ctx.request.body
		let pageNum = parseInt(page) || 1,
			pageLimit = parseInt(limit) || 10
		const result = await TaskModel.find().limit(pageLimit).skip((pageNum - 1) * pageLimit)
		if (result)
			return ctx.success({ data: result, msg: '获取任务列表成功!' })
	}
	//提交的任务（编辑权限）
	static async getPostTaskList(ctx) {
		const { account, page, limit } = ctx.request.body //editor's account; 第几页； 每页多少条数据
		const { authorityLevel } = await UserModel.findOne({ account })
		if (authorityLevel === 2) {
			let pageNum = parseInt(page) || 1,
				pageLimit = parseInt(limit) || 10
			const postTaskList = await TaskModel.find({ demandPerson: account }).limit(pageLimit).skip((pageNum - 1) * pageLimit)
			if (postTaskList)
				return ctx.success({ data: postTaskList, msg: '获取提交任务成功!' })
		} else {
			return ctx.error({ msg: '该权限无法获取已提交任务' })
		}
	}
    //待排期任务（组长权限）
	static async getWaitingScheduleTaskList(ctx) {
		const { account, page, limit } = ctx.request.body // leader's account
		if (!account) return ctx.error({ msg: '缺少关键查询信息!' })
		const { authorityLevel, occupation } = await UserModel.findOne({ account })
		//通过级别与职业信息匹配出待排期任务
		// authorityLevel 0：普通权限，1：组长，2：编辑
		// occupation 0:fe; 1:designer; 2:editor
		if (authorityLevel === 1 && (occupation === 0 || occupation === 1)) {
			let waitingScheduleTaskList = [] //如果没有具体日期与相关人员则为待排期状态
			if (occupation === 0) { //fe
				let findResult = await TaskModel.find({ "expectMaker.boss": account })
				waitingScheduleTaskList = findResult.filter((item, index) => {
					return undefined === ( item.makeTime && item.maker ) 
				})
			} else if (occupation === 1) { //designer
				let findResult = await TaskModel.find({ "expectDesigner.boss": account })
				waitingScheduleTaskList = findResult.filter((item, index) => {
					return undefined === ( item.designTime && item.designer )
				})
			}
			if (waitingScheduleTaskList) {
				let pageNum = parseInt(page) || 1,
					pageLimit = parseInt(limit) || 10
				let taskList = waitingScheduleTaskList.slice(pageNum - 1, pageNum * pageLimit) //pageLimit = 0会取出第一个
				return ctx.success({ data: taskList, msg: '获取待排期任务成功!' })
			}
		} else {
			ctx.error({ msg: '该账户没有此权限!'})
		}
	}
    //待处理任务（组员权限、组长权限）
	static async getWaitingDealTaskList(ctx) {
		const { account, page, limit } = ctx.request.body
		if(!account) return ctx.error({ msg: '缺少关键请求信息!'})
		const { authorityLevel, occupation } = await UserModel.findOne({ account })
		if (authorityLevel === 1 && (occupation === 0 || occupation === 1)) {
			let waitingDealTaskList = [] //如果没有具体日期与相关人员则为待排期状态
			if (occupation === 0) { //fe
				waitingDealTaskList = await TaskModel.find({ maker: account })
			} else if (occupation === 1) { //designer
				waitingDealTaskList = await TaskModel.find({ designer: account })
			}
			if (waitingDealTaskList) {
				let pageNum = parseInt(page) || 1,
					pageLimit = parseInt(limit) || 10
				let taskList = waitingDealTaskList.slice(pageNum - 1, pageNum * pageLimit)
				return ctx.success({ data: taskList, msg: '获取待处理任务成功!' })
			}
		} else {
			ctx.error({ msg: '该账户没有此权限!'})
		}
	}
}

module.exports = TaskController;