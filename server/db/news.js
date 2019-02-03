// 课程
module.exports = function(orm, db) {
  var news = db.define("news", {
    id: Number,
    news_name: String,
    page_view: Number,
    news_type_id: Number,
    news_desp:String,
    create_time:Number,
    cover:String,
    isDel: Number,
    content:String
  })
};
