// 课程
module.exports = function(orm, db) {
  var news_favorite = db.define("news_favorite", {
    id: Number,
    news_id: Number,
    stu_id: Number,
    create_time: Number,
    isDel:Number
  })
};
