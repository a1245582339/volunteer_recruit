// 模块列表
module.exports = function(orm, db) {
  var order = db.define("order", {
    id: Number,
    course_id: Number,
    stu_id: Number,
    create_time: Number,
    isDel: Number,
    spend:Number
  });
};
