var formidable = require("formidable");
var fs = require("fs");
// 获取学生列表
exports.StudentList = function(req, res, next) {
  req.models.student.find({ isDel: 0 }, function(err, list) {
    if (err) {
      res.json({ code: -1 });
    } else {
      res.json({ title: "学生列表", code: 20000, data: list.reverse() });
    }
  });
};

// 审核学生
exports.CheckStudent = function(req, res, next) {
  var id = req.query[0];

  req.models.student
    .find({ id: id })
    .each(function(list) {
      list.ischecked = 1;
      list.balance+=100
    })
    .save(function(err) {
      if (err) {
        res.json({ code: -1 });
      }
      res.json({ title: "审核成功", code: 20000 });
    });
};

// 删除学生
exports.DelStudent = function(req, res, next) {
  var id = req.body.data;

  req.models.student
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

// 修改学生
exports.UpdateStudent = function(req, res, next) {
  var id = req.body.id;
  req.models.student
    .find({ id: id })
    .each(function(list) {
      list.stu_name = req.body.name;
      list.balance = req.body.price;
      list.sex = req.body.typeName;
      list.tel = req.body.tel;
      list.avatar=req.body.avatar;
      list.password=req.body.password
    })
    .save(function(err) {
      if (err) {
        res.json({ code: -1 });
      } else {
        res.json({ code: 20000, title: "更改成功" });
      }
    });
};

// 上传头像
exports.UpdateStuAvatar = function(req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/stu_avatar"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req,function(err, fields, files){ 
    if(err) {  
        res.send(err);  
        return;  
    }  
    
    var extraName='.'+files.file.path.split('.')[1]
    var randomName = 'stu_avatar'+(new Date()).getTime()+ parseInt(Math.random() * 8999 +10000);

    var newName=randomName+extraName
    var newpath =  'public/stu_avatar/'+newName;
    var oldpath =  files.file.path
    fs.rename(oldpath,newpath,function(err){
      if(err){
            console.error("改名失败"+err);
      }
      var resPath = 'http://localhost:3000/stu_avatar/'+newName
      res.json({ code: 20000, title: "上传成功",data:{path:resPath} });
    });
    
  });  
};

// 检验当前密码
exports.CheckCurrentPassApi = function(req,res,next){
  var id = req.query.id;
  var password = req.query.password
  req.models.student.find({id:id},function(err,list){
    if(list[0].password==password){
      res.json({ code: 20000, title: "密码正确" });
    }else{
      res.json({ code: -1, title: "密码错误" });
    }
  })
  
}

// 客户端修改密码
exports.UpdatePassword = function(req,res,next){
  var id = req.body.id;
  var password = req.body.password
  console.log(id,password,JSON.stringify(req.body))
  req.models.student.find({id:id}).each(function(list){
    list.password = password
  }).save(function(err){
    if (err) {
      res.json({ code: -1 });
    } else {
      res.json({ code: 20000, title: "更改成功" });
    }
  })
  
}

// 客户端修改头像
exports.UpdateAvatar = function(req,res,next){
  var id = req.body.id;
  var avatar = req.body.avatar
  req.models.student.find({id:id}).each(function(list){
    if(list.avatar=='http://localhost:3000/stu_avatar/默认.jpg'){
      list.balance=list.balance+100
    }
    list.avatar = avatar
  }).save(function(err){
    if (err) {
      res.json({ code: -1 });
    } else {
      res.json({ code: 20000, title: "更改成功" });
    }
  })
  
}

// 客户端修改手机号
exports.UpdateTel = function(req,res,next){
  var id = req.body.id;
  var tel = req.body.tel
  req.models.student.find({id:id}).each(function(list){
    list.tel = tel
  }).save(function(err){
    if (err) {
      res.json({ code: -1 });
    } else {
      res.json({ code: 20000, title: "更改成功" });
    }
  })
  
}