var formidable = require("formidable");
var fs = require("fs");

// 获取课程列表
exports.CourseList = function(req, res, next) {
  req.models.course.find({ isDel: 0 }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1});
    } else {
      var classIdArr = [];
      var classArr = [];
      list.map((item, index) => {
        classIdArr[index] = item.course_class_id;
      });
      var findPro = params =>
        new Promise((resolve, reject) =>
          req.models.course_class.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        ); // find的promise操作
      Promise.all(classIdArr.map((item, index) => findPro({ id: item }))).then(
        result => {
          result.map((item, index) => {
            list[index].course_class_name = item[0].course_class_name;
          });
          res.json({ title: "courseList", code: 20000, data: list.reverse() });
        }
      );
    }
  });
};

// 根据id获取课程
exports.GetCourseById = function(req, res, next) {
  var id = req.query.id
  req.models.course.find({ id: id }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1});
    } else {
      if(list.length == 0){
        res.json({title:"无此课程",code:-1,data:{message:'无此课程'}})
      }else{
        req.models.course_class.find({id: list[0].course_class_id}, function(err,_list){
          list[0].course_class_name=_list[0].course_class_name
          res.json({title:"课程详情",code:20000,data:list[0]})
        })
      }
    }
  });
};

// 获取首页课程列表
exports.GetIndexCourse = function(req, res, next) {
  req.models.course.find({ isDel: 0 }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1});
    } else {
      var length=list.length
      var data=[list[length-1],list[length-2],list[length-3]]
      res.json({ title: "courseList", code: 20000, data: data });
    }
  });
};

// 根据课程类型获取课程
exports.GetCourseByclass = function(req, res, next) {
  var id=req.query.id
  req.models.course.find({ course_class_id: id }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1});
    } else {
      res.json({ title: "courseList", code: 20000, data: list.reverse() });
    }
  });
};

// 删除课程
exports.DelCourse = function(req, res, next) {
  var id = req.body.data;

  req.models.course
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

// 修改课程(新增和修改用的同一个接口，通过id判断)
exports.UpdateCourse = function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    req.models.course.create(
      {
        course_name: req.body.name,
        course_price: req.body.price,
        course_desp: req.body.desp,
        course_class_id: req.body.type,
        video_url: req.body.url,
        isBanner:0,
        cover: req.body.avatar,
        isDel: 0
      },
      function(err) {
        if (err) {
          res.json({ title: "请求异常", code: -1});
        }
        res.json({ code: 20000, title: "添加成功" });
      }
    );
  } else {
    req.models.course
      .find({ id: id })
      .each(function(list) {
        list.course_name = req.body.name;
        list.course_price = req.body.price;
        list.course_desp = req.body.desp;
        list.course_class_id = req.body.type;
        list.video_url = req.body.url;
        list.cover = req.body.avatar;
        list.isBanner =req.body.isBanner;
      })
      .save(function(err) {
        if (err) {
          res.json({ code: -1 });
        }
        res.json({ code: 20000, title: "修改成功" });
      });
  }
};

// 获取课程类型列表
exports.CourseClass = function(req, res, next) {
  req.models.course_class.find({ isDel: 0 }, function(err, list) {
    if (err) {
      res.json({ title: "请求异常", code: -1});
    } else {
      var findPro = params =>
        new Promise((resolve, reject) =>
          req.models.course.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        ); // find的promise操作
      Promise.all(list.map((item, index)=>findPro({course_class_id: item.id, isDel: 0}))).then(
        result=>{
          result.map((item,index)=>{
            list[index].count=item.length
          });
          res.json({ code: 20000, title: "课程类型", data: list });
        }
      )

      
    }
  });
};

// 删除课程类型
exports.DelCourseClass=function(req,res,next){

  var id = req.body.data;
  console.log(id)
  var findPro = params =>
      new Promise((resolve, reject) =>
          req.models.course.find(params).each(function(list){
            list.isDel=1;
          }).save(function(err){
            err ? reject(err) : resolve();
          })
        ); // find的promise操作
  
  findPro({course_class_id:id}).then(()=>{
    req.models.course_class.find({id: id}).each(function(_list){
      _list.isDel=1
    }).save(function(err){
      if(err){
        res.json({ code: -1 });
      }
      res.json({ code: 20000 });
     })
  })
}

// 修改课程类型(新增和修改用的同一个接口，通过id判断)
exports.UpdateCourseClass = function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    req.models.course_class.create(
      {
        course_class_name: req.body.name,
        isDel: 0
      },
      function(err) {
        if (err) {
          res.json({ title: "请求异常", code: -1});
        }
        res.json({ code: 20000, title: "添加成功" });
      }
    );
  } else {
    req.models.course_class
      .find({ id: id })
      .each(function(list) {
        list.course_class_name = req.body.name;
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
exports.UpdateCourseCover = function(req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/course_cover"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req,function(err, fields, files){ 
    if(err) {  
        res.send(err);  
        return;  
    }  
    
    var extraName='.'+files.file.path.split('.')[1]
    var randomName = 'course_cover'+(new Date()).getTime()+ parseInt(Math.random() * 8999 +10000);

    var newName=randomName+extraName
    var newpath =  'public/course_cover/'+newName;
    var oldpath =  files.file.path
    fs.rename(oldpath,newpath,function(err){
      if(err){
            console.error("改名失败"+err);
      }
      var resPath = 'http://localhost:3000/course_cover/'+newName
      res.json({ code: 20000, title: "上传成功",data:{path:resPath} });
    });
    
  });  
};

// 上传视频
exports.UpdateCourseVedio = function(req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/vedio"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req,function(err, fields, files){ 
    if(err) {  
        res.send(err);  
        return;  
    }  
    
    var extraName='.'+files.file.path.split('.')[1]
    var randomName = 'vedio'+(new Date()).getTime()+ parseInt(Math.random() * 8999 +10000);

    var newName=randomName+extraName
    var newpath =  'public/vedio/'+newName;
    var oldpath =  files.file.path
    fs.rename(oldpath,newpath,function(err){
      if(err){
            console.error("改名失败"+err);
      }
      var resPath = 'http://localhost:3000/vedio/'+newName
      res.json({ code: 20000, title: "上传成功",data:{path:resPath} });
    });
    
  });  
};

// 修改首页轮播图
exports.UpdateBanner=function(req,res,title){
  var data = req.body.data
  req.models.course.find({isDel:0}).each(function(list){
    data.map(item =>{
      if(item.id == list.id){
        list.isBanner = item.isBanner
      }
    })
  }).save(function(err){
    if(err){
      res.json({ code: -1, title: "修改失败" });
    }
    res.json({ code: 20000, title: "修改成功" });
  })
}

