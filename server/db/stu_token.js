// token
module.exports = function(orm, db) {
    var stu_token = db.define("stu_token", {
      id: Number,
      token: String,
      deadline:Number,
      stu_id:Number
    });
  };
  