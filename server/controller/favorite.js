// 获取课程收藏夹
exports.CourseFavorite = function(req, res, next) {
  req.models.course_favorite.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      var findcourse = params =>
        new Promise((resolve, reject) =>
          req.models.course.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var course_name = Promise.all(
        list.map(item => findcourse({ id: item.course_id }))
      ).then(res => {
        return res;
      });
      var findstu = params =>
        new Promise((resolve, reject) =>
          req.models.student.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var student_name = Promise.all(
        list.map(item => findstu({ id: item.stu_id }))
      ).then(res => {
        return res;
      });
      Promise.all([course_name, student_name]).then(result => {
        result[0].map((item, index) => {
          list[index].course_name = item[0].course_name;
        });
        result[1].map((item, index) => {
          list[index].stu_name = item[0].stu_name;
        });
        res.json({ code: 20000, title: "课程收藏夹", data: list });
      });
    }
  });
};

// 获取资讯收藏夹
exports.NewsFavorite = function(req, res, next) {
  req.models.news_favorite.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      var findnews = params =>
        new Promise((resolve, reject) =>
          req.models.news.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var news_name = Promise.all(
        list.map(item => findnews({ id: item.news_id }))
      ).then(res => {
        return res;
      });
      var findstu = params =>
        new Promise((resolve, reject) =>
          req.models.student.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var student_name = Promise.all(
        list.map(item => findstu({ id: item.stu_id }))
      ).then(res => {
        return res;
      });
      Promise.all([news_name, student_name]).then(result => {
        result[0].map((item, index) => {
          list[index].news_name = item[0].news_name;
        });
        result[1].map((item, index) => {
          list[index].stu_name = item[0].stu_name;
        });
        res.json({ code: 20000, title: "课程收藏夹", data: list });
      });
    }
  });
};

// 根据id获取课程收藏夹
exports.GetCourseFavoriteById = function(req, res, next) {
  var stu_id = req.query.stu_id;

  req.models.course_favorite.find({ stu_id: stu_id }, function(err, list) {
    if (err) {
      throw err;
    } else {
      list.map((item, index) => {
        if (item.isDel == 1) {
          list.splice(index, 1);
        }
      });

      var findcourse = params =>
        new Promise((resolve, reject) =>
          req.models.course.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var course_name = Promise.all(
        list.map(item => findcourse({ id: item.course_id }))
      ).then(res => {
        return res;
      });
      var findstu = params =>
        new Promise((resolve, reject) =>
          req.models.student.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var student_name = Promise.all(
        list.map(item => findstu({ id: item.stu_id }))
      ).then(res => {
        return res;
      });
      Promise.all([course_name, student_name]).then(result => {
        result[0].map((item, index) => {
          list[index].course_name = item[0].course_name;
        });
        result[1].map((item, index) => {
          list[index].stu_name = item[0].stu_name;
        });
        res.json({ code: 20000, title: "课程收藏夹", data: list.reverse() });
      });
    }
  });
};

// 根据id获取资讯收藏夹
exports.GetNewsFavoriteById = function(req, res, next) {
  var stu_id = req.query.stu_id;
  req.models.news_favorite.find({ isDel: 0 }, function(err, list) {
    if (err) {
      throw err;
    } else {
      list.map((item, index) => {
        if (item.isDel == 1) {
          list.splice(index, 1);
        }
      });
      var findnews = params =>
        new Promise((resolve, reject) =>
          req.models.news.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var news_name = Promise.all(
        list.map(item => findnews({ id: item.news_id }))
      ).then(res => {
        return res;
      });
      var findstu = params =>
        new Promise((resolve, reject) =>
          req.models.student.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        );
      var student_name = Promise.all(
        list.map(item => findstu({ id: item.stu_id }))
      ).then(res => {
        return res;
      });
      Promise.all([news_name, student_name]).then(result => {
        result[0].map((item, index) => {
          list[index].news_name = item[0].news_name;
        });
        result[1].map((item, index) => {
          list[index].stu_name = item[0].stu_name;
        });
        res.json({ code: 20000, title: "资讯收藏夹", data: list.reverse() });
      });
    }
  });
};

// 删除课程收藏夹记录
exports.DelCourseFav = function(req,res,next){
  var id = req.body.id;
  req.models.course_favorite.find({id:id}).each(function(list){
    list.isDel = 1
  }).save(function(err){
    if(err){
      res.json({code:-1})
    }else{
      res.json({ code: 20000, title: "删除成功" });
    }
  })
}

// 删除资讯收藏夹记录
exports.DelNewsFav = function(req,res,next){
  var id = req.body.id;
  req.models.news_favorite.find({id:id}).each(function(list){
    list.isDel = 1
  }).save(function(err){
    if(err){
      res.json({code:-1})
    }else{
      res.json({ code: 20000, title: "删除成功" });
    }
  })
}

// 客户端检查课程是否被收藏，并返回被收藏量
exports.CheckCourseFav = function(req,res,next){
  var stu_id = req.query.stu_id
  var course_id = req.query.course_id
  req.models.course_favorite.exists({stu_id:stu_id,course_id:course_id,isDel:0},function(err,exist){
    req.models.course_favorite.count({course_id:course_id,isDel:0},function(err,count){
      if(err){
        res.json({code:-1,title:"请求异常"})
      }else{
        res.json({code:20000,data:{exist:exist,count:count}})
      }
    })
  })
}

// 课程添加收藏
exports.AddCourseFav = function(req,res,next){
  var stu_id = req.body.stu_id
  var course_id = req.body.course_id
  req.models.course_favorite.exists({stu_id:stu_id,course_id:course_id,isDel:0},function(err,exist){
    if(exist){
      res.json({code:20000,title:"重复请求"})
    }else{
      var create_time = Date.parse(new Date()) / 1000;
      req.models.course_favorite.create({
        course_id:course_id,
        stu_id:stu_id,
        create_time:create_time,
        isDel:0
      },function(err){
        if (err) {
          throw err;
        }
        res.json({ code: 20000, title: "添加成功" });
      })
    }
  })
}
// 课程取消收藏
exports.CancelCourseFav = function(req,res,next){
  var stu_id = req.body.stu_id
  var course_id = req.body.course_id
  req.models.course_favorite.find({course_id:course_id}).each(function(list){
    if(list.stu_id = stu_id){
      list.isDel = 1
    }
  }).save(function(err){
    if(err){
      res.json({ code: -1, title: "请求异常" });
    }else{
      res.json({ code: 20000, title: "取消成功" });
    }
  })
}


// 客户端检查资讯是否被收藏，并返回被收藏量
exports.CheckNewsFav = function(req,res,next){
  var stu_id = req.query.stu_id
  var news_id = req.query.news_id
  req.models.news_favorite.exists({stu_id:stu_id,news_id:news_id,isDel:0},function(err,exist){
    req.models.news_favorite.count({news_id:news_id,isDel:0},function(err,count){
      if(err){
        res.json({code:-1,title:"请求异常"})
      }else{
        res.json({code:20000,data:{exist:exist,count:count}})
      }
    })
  })
}

// 资讯添加收藏
exports.AddNewsFav = function(req,res,next){
  var stu_id = req.body.stu_id
  var news_id = req.body.news_id
  req.models.news_favorite.exists({stu_id:stu_id,news_id:news_id,isDel:0},function(err,exist){
    if(exist){
      res.json({code:20000,title:"重复请求"})
    }else{
      var create_time = Date.parse(new Date()) / 1000;
      req.models.news_favorite.create({
        news_id:news_id,
        stu_id:stu_id,
        create_time:create_time,
        isDel:0
      },function(err){
        if (err) {
          throw err;
        }
        res.json({ code: 20000, title: "添加成功" });
      })
    }
  })
}
// 资讯取消收藏
exports.CancelNewsFav = function(req,res,next){
  var stu_id = req.body.stu_id
  var news_id = req.body.news_id
  req.models.news_favorite.find({news_id:news_id}).each(function(list){
    if(list.stu_id = stu_id){
      list.isDel = 1
    }
  }).save(function(err){
    if(err){
      res.json({ code: -1, title: "请求异常" });
    }else{
      res.json({ code: 20000, title: "取消成功" });
    }
  })
}
