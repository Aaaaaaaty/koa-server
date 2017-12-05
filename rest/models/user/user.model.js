const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: { type: String, required: true },            // 账户名
  password: { type: String, required: true },           // 密码
  name: { type: String, required: true},                // 姓名
  authorityLevel: { type: Number, required: true},      // 0：普通权限，1：组长，2：编辑
  boss: { type: String },                               // authorityLevel = 0才有该字段，值为组长的_id
  subordinate: { type: Array },                         // authorityLevel = 1才有该字段，值为组员_id组成的数组
  occupation: { type: String },                         // 职位信息fe||designer||editor
});

module.exports = mongoose.model('User', UserSchema);