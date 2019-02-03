// token
module.exports = function(orm, db) {
    var admin_token = db.define("admin_token", {
      id: Number,
      token: String,
      deadline:Number,
      admin_id:Number
    });
  };
  