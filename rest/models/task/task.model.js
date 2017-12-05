const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: { type: Object, required: true},                // 任务名称
	demandPerson: { type: String, required: true},        // 需求人
	status: { type: Number }, 							  // 0-11: 需求沟通、等待排期、排期完毕、设计中、设计完毕、开发中、开发完毕、资料填充、系统开发、嵌套联调、系统测试、已上线
	type: { type: Object, required: true},                // 任务类型：{topCategory: String, subCategory: String}
	degree: { type: Number },                             // 难易度，0-4
	emergency: { type: Boolean, required: true },         // 是否紧急
	fields: { type: Number, required: true },             // 0：all; 1:design; 2:fe 
	systemFunction: { type: Number, required: true },     // 0:none; 1:api; 2:nest
	releaseTime: { type: Date },                          // 上线时间
	expectReleaseTime: { type: Date },                    // 预计上线时间
	expectDesignTime: { type: Date },                     // 预计设计时间
	expectMakeTime: { type: Date },                       // 预计制作时间
	expectDesigner: { type: Object },                     // 预计设计人员{boss: String, subordinate: String}
	expectMaker: { type: Object },                        // 预计制作人员{boss: String, subordinate: String}
	designTime: { type: Date },                           // 设计时间
	makeTime: { type: Date },                             // 制作时间
	designer: { type: String },                           // 设计人员
	maker: { type: String },                              // 制作人员
	serverUrl: { type: String },						  // 服务器地址
	onlineUrl: { type: String }, 						  // 上线地址
	memorandum: { type: String },						  // 任务描述

});

module.exports = mongoose.model('User', TaskSchema);