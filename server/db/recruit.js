// 学生
module.exports = function(orm, db) {
    var recruit = db.define("recruit", {
      id: Number,
      recruit_title: String,
      desp: String,
      ischecked:Number,
      hostel_id: Number,
      salary: Number,
      isDel: Number,
      create_time: Number
    })
  };
  