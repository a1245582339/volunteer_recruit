var formidable = require("formidable");
var fs = require("fs");

// 获取管理员类型
exports.AdminRoles = function(req, res, next) {
    req.models.roles.find({ isDel: 0 }, function(err, list) {
      if (err) {
        res.json({ code: -1 });
      } else {
        res.json({code: 20000,data: list})
      }
    });
  };

// 获取管理员列表
exports.AdminList = function(req, res, next) {
    req.models.admin_user.find({ isDel: 0 }, function(err, list) {
      if (err) {
        res.json({ code: -1 });
      } else {
        var rolesIdArr = [];
        list.map((item, index) => {
            rolesIdArr[index] = item.roles_id;
          });
        var findPro = params =>
        new Promise((resolve, reject) =>
          req.models.roles.find(params, function(err, result) {
            err ? reject(err) : resolve(result);
          })
        ); // find的promise操作
        Promise.all(rolesIdArr.map((item, index) => findPro({ id: item }))).then(
            result => {
              result.map((item, index) => {
                list[index].roles_name = item[0].roles;
              });
              res.json({ title: "管理员列表", code: 20000, data: list.reverse() });
            }
          );
      }
    });
  };

// 获取当前管理员
exports.PersonalAdmin = function(req, res, next) {
  var id=req.query[0]
  req.models.admin_user.find({ id: id }, function(err, list) {
    if (err) {
      res.json({ code: -1 });
    } else {
      req.models.roles.find({id:list[0].roles_id},function(err,_list){
        list[0].roles_name=_list[0].roles
        res.json({ title: "管理员列表", code: 20000, data: list });
      })
    }
  });
};
  
  // 删除管理员
  exports.DelAdmin = function(req, res, next) {
    var id = req.body.data;
  
    req.models.admin_user
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
  
// 修改管理员(新增和修改用的同一个接口，通过id判断)
exports.UpdateAdmin = function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    req.models.admin_user.create(
      {
        name: req.body.name,
        roles_id: req.body.type,
        create_time: req.body.create_time,
        tel: req.body.tel,
        password: req.body.password,
        avatar: req.body.avatar,
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
    console.log(JSON.stringify(req.body))
    req.models.admin_user
      .find({ id: id })
      .each(function(list) {
        list.name = req.body.name;
        list.roles_id = req.body.type;
        list.create_time = req.body.create_time;
        list.tel = req.body.tel;
        list.password = req.body.password;
        list.avatar = req.body.avatar
      })
      .save(function(err) {
        if (err) {
          res.json({ code: -1 });
        }
        res.json({ code: 20000 });
      });
  }
};

// 上传头像
exports.UpdateAdminAvatar = function(req, res, next) {
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = "public/admin_avatar"; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 20 * 1024 * 1024; //文件大小 k
  form.parse(req,function(err, fields, files){ 
    if(err) {  
        res.send(err);  
        return;  
    }  
    
    var extraName='.'+files.file.path.split('.')[1]
    var randomName = 'admin_avatar'+(new Date()).getTime()+ parseInt(Math.random() * 8999 +10000);

    var newName=randomName+extraName
    var newpath =  'public/admin_avatar/'+newName;
    var oldpath =  files.file.path
    fs.rename(oldpath,newpath,function(err){
      if(err){
            console.error("改名失败"+err);
      }
      var resPath = 'http://localhost:3000/admin_avatar/'+newName
      res.json({ code: 20000, title: "上传成功",data:{path:resPath} });
    });
    
  });  
};