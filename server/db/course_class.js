// 课程
module.exports = function(orm, db) {
    var course_class = db.define("course_class", {
      id: Number,
      course_class_name: String,
      isDel: Number
    });
  };
  