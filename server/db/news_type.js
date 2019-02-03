// 课程
module.exports = function(orm, db) {
    var news_type = db.define("news_type", {
      id: Number,
      news_type_name: String,
      isDel: Number
    });
  };
  