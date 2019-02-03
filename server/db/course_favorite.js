// 课程
module.exports = function(orm, db) {
  var course_favorite = db.define("course_favorite", {
    id: Number,
    course_id: Number,
    stu_id: Number,
    create_time: Number,
    isDel:Number
  })
};
