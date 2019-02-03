// 签到
module.exports = function(orm, db) {
    var sign = db.define("sign", {
      id: Number,
      stu_id: Number,
      sign_time:Number
    });
  };
  