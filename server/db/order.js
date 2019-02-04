// 学生
module.exports = function(orm, db) {
    var order = db.define("order", {
      id: Number,
      recruit_id: Number,
      stu_id: Number,
      isDel: Number,
      create_time: Number
    })
  };
  