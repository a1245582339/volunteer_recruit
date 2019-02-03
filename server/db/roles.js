// 角色
module.exports = function(orm, db) {
    var roles = db.define("roles", {
      id: Number,
      roles: String,
      isDel:Number
    });
  };
  