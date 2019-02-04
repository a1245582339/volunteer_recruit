// 检查用户名是否已被注册
exports.CheckNameExist = function (req, res, next) {
  var name = req.query.name
  req.models.boss.find({
    boss_name: name
  }, function (err, list) {
    if (err) {
      res.json({
        title: "校验失败",
        code: -1
      });
    } else if (list.length == 0) {
      res.json({
        title: "可以注册",
        code: 20000,
        data: 1
      });
    } else {
      res.json({
        title: "已被占用",
        code: 20000,
        data: 2
      });
    }
  })
};

// 用户注册
exports.Register = function (req, res, next) {
  var reg = req.body
  req.models.boss.find({
    boss_name: reg.user_name
  }, function (err, list) {
    if (list.length == 0) {
      req.models.boss.create({
        boss_name: reg.username,
        tel: reg.tel,
        create_time: Date.parse(new Date()) / 1000,
        ischecked: 0,
        sex: reg.sex,
        password: reg.password,
        isDel: 0,
      }, function (err) {
        res.json({
          title: "注册成功",
          code: 20000
        });
      })
    } else {
      res.json({
        title: "已被占用",
        code: -1
      });
    }
  })
}

// 用户登录
exports.Login = function (req, res, next) {
  var log = req.body
  req.models.boss.find({
    boss_name: log.username,
    password: log.password,
    ischecked: 1
  }, function (err, list) {
    if (list.length == 0) {
      res.json({
        title: "登录失败",
        code: -1
      });
    } else {
      var timestamp = new Date().getTime();
      var deadline = timestamp + 604800000;
      var boss_id = list[0].id
      req.models.boss_token.create({
          token: timestamp,
          deadline: deadline,
          boss_id: boss_id
        },
        function (err) {
          if (err) {
            res.json({
              title: "token创建异常",
              code: -1
            });
          }
          res.json({
            code: 20000,
            data: {
              token: timestamp
            }
          });
        }
      );
    }
  })
}

// 根据token拉用户信息
exports.GetInfo = function (req, res, next) {
  var token = req.query.token
  console.log(req.query)
  req.models.boss_token.find({
    token: token
  }, function (err, list) {
    if (err) {
      res.json({
        code: -1,
        list: "错误"
      });
    }
    var boss_id = list[0].boss_id
    req.models.boss.find({
      id: boss_id
    }, function (err, list) {
      res.json({
        code: 20000,
        data: list
      });
    })
  })
}

exports.CheckIfSigned = function (req, res, next) {
  var boss_id = req.query.boss_id
  req.models.sign.find({
    boss_id: boss_id
  }, function (err, list) {
    var current_time = Math.floor(((new Date().getTime()) + 28800000) / 86400000);
    console.log(current_time, (new Date().getTime()) / 86400000, new Date().getTime())
    if (list.length == 0 || list[list.length - 1].sign_time != current_time) {
      res.json({
        code: 20000,
        data: {
          haveSign: false
        }
      })
    } else {
      res.json({
        code: 20000,
        data: {
          haveSign: true
        }
      })
    }
  })
}


exports.Logout = function(req, res, next) {
  res.json({ code: 20000 });
};