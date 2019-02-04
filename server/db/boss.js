// 学生
module.exports = function(orm, db) {
    var boss = db.define("boss", {
      id: Number,
      boss_name: String,
      tel: String,
      ischecked:Number,
      sex: String,
      password: String,
      isDel: Number
    })
  };
  