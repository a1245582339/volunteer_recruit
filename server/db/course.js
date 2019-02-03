// 课程
module.exports = function(orm, db) {
  var course = db.define("course", {
    id: Number,
    course_name: String,
    course_price: Number,
    course_class_id: Number,
    video_url: String,
    cover:String,
    course_desp:String,
    isDel: Number,
    isBanner: Number
  })
};
