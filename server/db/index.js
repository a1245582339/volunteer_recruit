var orm = require('orm');
var connection = null;

function setup(db, cb) {
  require('./order')(orm, db);
  require('./admin_user')(orm, db);
  require('./admin_token')(orm, db);
  require('./stu_token')(orm, db);
  require('./roles')(orm, db);
  require('./course')(orm, db);
  require('./course_class')(orm, db);
  require('./course_favorite')(orm, db);
  require('./student')(orm, db);
  require('./sign')(orm, db);
  require('./news')(orm, db);
  require('./news_type')(orm, db);
  require('./news_favorite')(orm, db);
  require('./news_visit_log')(orm, db);

  return cb(null, db);
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);
// orm.express("mysql://root:1@localhost/question_system"
  orm.connect("mysql://root:1@localhost/question_system", function (err, db) {
    if (err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};
