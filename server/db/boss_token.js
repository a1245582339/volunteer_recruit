// token
module.exports = function(orm, db) {
    var boss_token = db.define("boss_token", {
      id: Number,
      token: String,
      deadline:Number,
      boss_id:Number
    });
  };
  