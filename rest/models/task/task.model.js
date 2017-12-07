const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: { type: Object, required: true},                // 任务名称{type:String, title.String}
	demandPerson: { type: String, required: true},        // 需求人
	status: { type: Number }, 							  // 0-11: 需求沟通、等待排期、排期完毕、设计中、设计完毕、开发中、开发完毕、资料填充、系统开发、嵌套联调、系统测试、已上线
	type: { type: Object, required: true},                // 任务类型：{topCategory: String, subCategory: String}
	degree: { type: Number },                             // 难易度，0-4
	emergency: { type: Boolean, required: true },         // 是否紧急
	fields: { type: Number, required: true },             // 0：fe; 1:design; 2:all
	systemFunction: { type: Number, required: true },     // 0:none; 1:api; 2:nest
	releaseTime: { type: Number },                          // 上线时间
	expectReleaseTime: { type: Object },                    // 预计上线时间
	expectDesignTime: { type: Object },                     // 预计设计时间
	expectMakeTime: { type: Object },                       // 预计制作时间
	expectDesigner: { type: Object },                     // 预计设计人员{boss: String, subordinate: String}
	expectMaker: { type: Object },                        // 预计制作人员{boss: String, subordinate: String}
	designTime: { type: Object },                           // 设计时间
	makeTime: { type: Object },                             // 制作时间
	designer: { type: String },                           // 设计人员
	maker: { type: String },                              // 制作人员
	serverUrl: { type: String },						  // 服务器地址
	onlineUrl: { type: String }, 						  // 上线地址
	memorandum: { type: String },						  // 任务描述

});

module.exports = mongoose.model('Task', TaskSchema);

/**
 * mock 数据
{
	"name": {
		"type": "平台",
		"title": "QAQ132"	},
	"demandPerson": "editor1",
	"status": 0,
	"type": {
		"topCategory": "pwrd",
		"subCategory": "website"	},
	"degree": 1,
	"emergency": true,
	"fields": 0,
	"systemFunction": 1,
	"releaseTime": 1512458881305,
	"expectReleaseTime": {
		"start":1512458881305,
		"end": 1512458881305
	},
	"expectDesignTime": {
		"start":1512458881305,
		"end": 1512458881305
	},
	"expectMakeTime": {
		"start":1512458881305,
		"end": 1512458881305
	},
	"expectDesigner": {
		"boss": "leader1",
		"subordinate": "user1"	},
	"expectMaker": {
		"boss": "leader2",
		"subordinate": "user2"
	},
	"designTime": {
		"start":1512458881305,
		"end": 1512458881305
	},
	"makeTime": {
		"start":1512458881305,
		"end": 1512458881305
	},
	"designer": "user1",
	"maker": "user2",
	"serverUrl": "123.206.95.98",
	"onlineUrl": "123.206.95.96",
	"memorandum": "",
	"asas":123
}
 */