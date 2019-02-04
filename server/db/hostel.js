// 模块列表
module.exports = function(orm, db) {
  var hostel = db.define("hostel", {
    id: Number,
    boss_id: Number,
    name: String,
    desp: String,
    address: String,
    province:String,
    photos:String,
    isDel: Number
  });
};
