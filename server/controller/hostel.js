var formidable = require("formidable");
var fs = require("fs");

// 获取旅社
exports.HostelList = function (req, res, next) {
  req.models.hostel.find({}, function (err, list) {

    if (req.query.id) {
      var id = req.query.id
      list = list.filter(item => {
        return item.id == id
      })
    } else {
      list = list.filter(item => {
        return item.isDel == 0
      })
    }


    var findboss = params =>
      new Promise((resolve, reject) =>
        req.models.boss.find(params, function (err, result) {
          err ? reject(err) : resolve(result);
        })
      );
    var boss_name = Promise.all(
      list.map(item => findboss({
        id: item.boss_id
      }))
    ).then(res => {
      console.log('res' + JSON.stringify(res))
      return res;
    });

    Promise.all([boss_name]).then(result => {
      result[0].map((item, index) => {
        list[index].boss_name = item[0].boss_name
        list[index].tel = item[0].tel
      });
      res.json({
        code: 20000,
        title: "青旅列表",
        data: list.reverse()
      });
    });
  });
};

exports.bossHostelList = function (req, res, next) {
  //console.log(req.query.boss_id)
  req.models.hostel.find({
    boss_id: req.query.boss_id,
    isDel: 0
  }, function (err, list) {
    res.json({
      code: 20000,
      title: "青旅列表",
      data: list.reverse()
    });
  });
};


// 删除青旅
exports.DelHostel = function (req, res, next) {
  var id = req.body.data;
  req.models.hostel
    .find({
      id: id
    })
    .each(function (list) {
      list.isDel = 1;
    })
    .save(function (err) {
      if (err) {
        res.json({
          code: -1
        });
      } else {
        req.models.recruit.find({
          hostel_id: id
        }).each(item => {
          if (item) {
            item.isDel = 1
          }
        }).save(err => {
          if (err) {
            res.json({
              code: -1
            });
          } else {
            res.json({
              code: 20000,
              title: "删除成功"
            });
          }
        })
      }
    });
};

// 上传照片
exports.updateHostelPhotos = function (req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/hostel_photos"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }

    var extraName = '.' + files.file.path.split('.')[1]
    var randomName = 'hostel_photos' + (new Date()).getTime() + parseInt(Math.random() * 8999 + 10000);

    var newName = randomName + extraName
    var newpath = 'public/hostel_photos/' + newName;
    var oldpath = files.file.path
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.error("改名失败" + err);
      }
      var resPath = 'http://localhost:3000/hostel_photos/' + newName
      res.json({
        code: 20000,
        title: "上传成功",
        data: {
          path: resPath
        }
      });
    });

  });
};

// 新建/修改青旅信息
exports.updataHostel = function (req, res, next) {
  // console.log(JSON.parse(req.body.data).form)
  var data = JSON.parse(req.body.data).form
  var boss_id = JSON.parse(req.body.data).boss_id
  console.log(data.name)
  if (data.id) {
    req.models.hostel.find({
        id: data.id
      }).each(item => {
        item.name = data.name
        item.address = data.address
        item.desp = data.desp
        item.province = data.province
        item.photos = JSON.stringify(JSON.stringify(data.photos))
      })
      .save(err => {
        if (err) {
          res.json({
            code: -1
          })
        }
        res.json({
          code: 20000,
          title: '修改成功'
        })
      })
  } else {
    req.models.hostel.create({
      boss_id: boss_id,
      name: data.name,
      address: data.address,
      desp: data.desp,
      province: data.province,
      photos: JSON.stringify(JSON.stringify(data.photos)),
      isDel: 0
    }, err => {
      if (err) {
        res.json({
          title: "请求异常",
          code: -1
        });
      }
      res.json({
        code: 20000,
        title: "添加成功"
      });
    })
  }
}