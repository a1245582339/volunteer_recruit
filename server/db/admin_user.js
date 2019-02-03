// 用户
module.exports = function(orm, db) {
  var admin_user = db.define("admin_user", {
    id: Number,
    name: String,
    roles_id: Number,
    tel: String,
    password:String,
    avatar:String,
    isDel:Number,
    create_time:Number
  });
};
