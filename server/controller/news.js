var formidable = require("formidable");
var fs = require("fs");

// 获取资讯列表
exports.GetNewsList = function(req, res, next) {
  req.models.news.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      var classIdArr = [];
      list.map((item, index) => {
        classIdArr[index] = item.news_type_id;
      });
      var findPro = params =>
        new Promise((resolve, reject) =>
          req.models.news_type.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        ); // find的promise操作
      Promise.all(classIdArr.map((item, index) => findPro({ id: item }))).then(
        result => {
          result.map((item, index) => {
            list[index].news_type_name = item[0].news_type_name;
          });
          res.json({ title: "newsList", code: 20000, data: list.reverse() });
        }
      );
    }
  });
};

// 根据id获取资讯
exports.GetNewsById = function(req, res, next) {
  var id = req.query.id;
  req.models.news.find({ id: id }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1 });
    } else {
      if(list.length == 0){
        res.json({title:"无此资讯",code:-1,data:{message:'无此资讯'}})
      }else{
        req.models.news_type.find({ id: list[0].news_type_id }, function(
          err,
          _list
        ) {
          list[0].news_type_name = _list[0].news_type_name;
          res.json({ title: "资讯详情", code: 20000, data: list[0] });
        });
      }
    }
  });
};

// 根据资讯类型获取资讯
exports.GetNewsBytype = function(req, res, next) {
  var id = req.query.id;
  req.models.news.find({ news_type_id: id }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1 });
    } else {
      res.json({ title: "newsList", code: 20000, data: list.reverse() });
    }
  });
};

// 获取首页资讯列表
exports.GetIndexNews = function(req, res, next) {
  req.models.news.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      var length = list.length;
      var data = [list[length - 1], list[length - 2], list[length - 3]];
      res.json({ title: "newsList", code: 20000, data: data });
    }
  });
};

// 删除资讯
exports.DelNews = function(req, res, next) {
  var id = req.body.data;

  req.models.news
    .find({ id: id })
    .each(function(list) {
      list.isDel = 1;
    })
    .save(function(err) {
      if (err) {
        res.json({ code: -1 });
      } else {
        res.json({ code: 20000, title: "删除成功" });
      }
    });
};

// 修改资讯(新增和修改用的同一个接口，通过id判断)
exports.UpdateNews = function(req, res, next) {
  var id = req.body.id;
  console.log(JSON.stringify(req.body));
  if (!id) {
    var create_time = Date.parse(new Date()) / 1000;
    req.models.news.create(
      {
        news_name: req.body.name,
        news_type_id: req.body.type,
        news_desp: req.body.desp,
        content: req.body.content,
        cover: req.body.avatar,
        create_time: create_time,
        page_view: 0,
        isDel: 0
      },
      function(err) {
        if (err) {
          throw err;
        }
        res.json({ code: 20000, title: "添加成功" });
      }
    );
  } else {
    req.models.news
      .find({ id: id })
      .each(function(list) {
        list.news_name = req.body.name;
        list.news_type_id = req.body.type;
        list.news_desp = req.body.desp;
        list.content = req.body.content;
        list.cover = req.body.avatar;
      })
      .save(function(err) {
        if (err) {
          res.json({ code: -1 });
        }
        res.json({ code: 20000 });
      });
  }
};

// 获取资讯类型列表
exports.GetNewsType = function(req, res, next) {
  req.models.news_type.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      var findPro = params =>
        new Promise((resolve, reject) =>
          req.models.news.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        ); // find的promise操作
      Promise.all(
        list.map((item, index) => findPro({ news_type_id: item.id, isDel: 0 }))
      ).then(result => {
        result.map((item, index) => {
          list[index].count = item.length;
        });
        res.json({ code: 20000, title: "课程类型", data: list });
      });
    }
  });
};

// 删除资讯类型
exports.DelNewsType = function(req, res, next) {
  var id = req.body.data;
  console.log(id);
  var findPro = params =>
    new Promise((resolve, reject) =>
      req.models.news
        .find(params)
        .each(function(list) {
          list.isDel = 1;
        })
        .save(function(err) {
          err ? reject(err) : resolve();
        })
    ); // find的promise操作

  findPro({ news_type_id: id }).then(() => {
    req.models.news_type
      .find({ id: id })
      .each(function(_list) {
        _list.isDel = 1;
      })
      .save(function(err) {
        if (err) {
          res.json({ code: -1 });
        }
        res.json({ code: 20000 });
      });
  });
};

// 修改资讯类型(新增和修改用的同一个接口，通过id判断)
exports.UpdateNewsType = function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    req.models.news_type.create(
      {
        news_type_name: req.body.name,
        isDel: 0
      },
      function(err) {
        if (err) {
          throw err;
        }
        res.json({ code: 20000, title: "添加成功" });
      }
    );
  } else {
    req.models.news_type
      .find({ id: id })
      .each(function(list) {
        list.news_type_name = req.body.name;
      })
      .save(function(err) {
        if (err) {
          res.json({ code: -1 });
        }
        res.json({ code: 20000 });
      });
  }
};

// 上传封面
exports.UpdateNewsCover = function(req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/news_cover"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }

    var extraName = "." + files.file.path.split(".")[1];
    var randomName =
      "news_cover" +
      new Date().getTime() +
      parseInt(Math.random() * 8999 + 10000);

    var newName = randomName + extraName;
    var newpath = "public/news_cover/" + newName;
    var oldpath = files.file.path;
    fs.rename(oldpath, newpath, function(err) {
      if (err) {
        console.error("改名失败" + err);
      }
      var resPath = "http://localhost:3000/news_cover/" + newName;
      res.json({ code: 20000, title: "上传成功", data: { path: resPath } });
    });
  });
};

exports.AddPageView = function(req, res, next) {
  var news_id = req.body.news_id;
  var stu_id = req.body.stu_id;
  var create_time = Date.parse(new Date()) / 1000;
  req.models.news_visit_log.create(
    {
      news_id: news_id,
      stu_id: stu_id,
      create_time: create_time
    },
    function(err) {
      res.json({ code: 20000, title: "访问" });
    }
  );
};

// 获取访问日志
exports.GetNewsVisitLog = function(req, res, next) {
  var current_time = Date.parse(new Date()) / 1000;
  var duration = req.query.duration;

  req.models.news_visit_log.find({}, function(err, list) {
    if (err) {
      console.log(err);
    }
    var findstu, findnews;
    list.map((item, index) => {
      if (item.create_time < current_time - duration) {
        item.index.splice(index, 1);
      }
    });
    /* 获取学生 */
    var stuIdArr = [];
    var newsIdArr = [];
    var newsTpyeIdArr = [];
    list.map((item, index) => {
      stuIdArr[index] = item.stu_id;
      newsIdArr[index] = item.news_id;
    });
    var findstu = params =>
      new Promise((resolve, reject) =>
        req.models.student.find(params, function(err, result) {
          err ? reject(err) : resolve(result);
        })
      ); // find的promise操作
    var findnews = params =>
      new Promise((resolve, reject) =>
        req.models.news.find(params, function(err, result) {
          err ? reject(err) : resolve(result);
        })
      ); // find的promise操作
      var findnewsType = params =>
      new Promise((resolve, reject) =>
        req.models.news_type.find(params, function(err, result) {
          err ? reject(err) : resolve(result);
        })
      ); // find的promise操作

    var stuRes = stuIdArr.map((item,index)=>findstu({id:item}))
    var newsRes = newsIdArr.map((item,index)=>findnews({id:item}))
    var newsTypeRes = newsTpyeIdArr.map((item,index)=>findnews({id:item}))
    //console.log("aaa", JSON.stringify(stuRes));
    Promise.all(stuRes).then(
      result => {
        result.map((item, index) => {
          if(item[0]){
            list[index].stu_info = item[0];
          }else{
            list[index].stu_info = {id:-1,stu_name:'游客'}
          }
        });
        Promise.all(newsRes).then(
          result=>{
            result.map((item, index) => {
              list[index].news_info = item[0];
            });
            Promise.all(newsTypeRes).then(
              result=>{
                result.map((item, index) => {
                  list[index].news_info.news_type_name = item[0].news_type_name;
                });
                res.json({ code: 20000, title: "访问日志", data: list });
              }
            )
            
          }
        )
          
        

        
      }
    );
    
    /* 获取学生 */

    /* 获取资讯 */
    // findnews = req.models.news.find({ id: item.news_id }, function(err, _list) {
    //   req.models.news_type.find({ id: _list.news_type_id }, function(
    //     err,
    //     result
    //   ) {
    //     console.log();
    //     _list[0].news_name = result[0].news_name;
    //     item.news_info = _list[0];
    //   });
    // });
    /* 获取资讯 */
    // Promise.all([findnews,findstu]).then(()=>{
    //   console.log('aaa',JSON.stringify())
    // })
  });
};
