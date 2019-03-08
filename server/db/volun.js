// 学生
module.exports = function(orm, db) {
    var volun = db.define("volun", {
      id: Number,
      volun_name: String,
      tel: String,
      avatar:String,
      ischecked:Number,
      sex: String,
      password: String,
      isDel: Number,
      create_time: Number
    })
  };
  