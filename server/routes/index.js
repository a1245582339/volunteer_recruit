var express = require('express');

var orm = require('orm')
var router = express.Router();

var User = require('../controller/admin_user')
var Hostel = require('../controller/hostel')
var Course = require('../controller/course')
var Student = require('../controller/student')
var Boss = require('../controller/boss')
var Volun = require('../controller/volun')
var Recruit = require('../controller/recruit')
var Admin = require('../controller/change_admin')
var News = require('../controller/news')
var Favorites = require('../controller/favorite')
var Banner = require('../controller/banner')
var Client = require('../controller/client_login_reg')
var bossClient = require('../controller/boss_login_reg')

// **********************************用户方面**************************************

router.post('/user/login',User.Login);
router.post('/user/logout', User.Logout);
router.get('/user/info', User.Userinfo);

// **********************************青旅老板登录方面**************************************

router.get('/bosscheckNameExist', bossClient.CheckNameExist);
router.post('/bosslogin',bossClient.Login);
router.post('/bossregister', bossClient.Register);
router.get('/bossgetInfo', bossClient.GetInfo);
router.get('/bosscheckIfSigned',  bossClient.CheckIfSigned)
router.post('/bossLogout', bossClient.Logout);


// **********************************客户端登录注册**************************************

router.get('/checkNameExist', Client.CheckNameExist);
router.post('/login',Client.Login);
router.post('/register', Client.Register);
router.get('/getInfo', Client.GetInfo);
router.get('/checkIfSigned',  Client.CheckIfSigned)
router.post('/SignIn', Client.SignIn);



// **********************************青旅老板****************************************

router.get('/boss', Boss.BossList)
router.put('/checkBoss', Boss.CheckBoss);
router.put('/delBoss', Boss.DelBoss);
router.get('/checkpassword', Boss.checkpassword)
router.put('/updateBoss', Boss.updateBoss)
router.put('/boss/updatePassword', Boss.UpdatePassword)

// **********************************义工用户****************************************

router.get('/volun', Volun.VolunList)
router.put('/checkVolun', Volun.CheckVolun);
router.put('/delVolun', Volun.DelVolun);

//**********************************义工客户端************************************** 
// 检验当前密码
router.get('/checkCurrentPassApi', Volun.CheckCurrentPassApi);
// 客户端修改密码
router.post('/updatePassword', Volun.UpdatePassword);
// 客户端修改头像
router.post('/updateAvatar', Volun.UpdateAvatar);
// 客户端修改手机号
router.post('/updateTel', Volun.UpdateTel);

// **********************************青旅信息****************************************

router.get('/hostList', Hostel.HostelList)
router.get('/boss/hostList', Hostel.bossHostelList)
router.put('/delHostel', Hostel.DelHostel);
router.post('/updateHostelPhotos', Hostel.updateHostelPhotos)
router.put('/updataHostel', Hostel.updataHostel)

// **********************************招募信息***************************************

router.get('/recruit', Recruit.RecruitList)
router.get('/boss/recruit', Recruit.bossRecruitList)
router.get('/checkOrderExist', Recruit.CheckOrderExist)
router.put('/checkRecruit', Recruit.CheckRecruit);
router.put('/delRecruit', Recruit.DelRecruit);
router.post('/upDataRecruit', Recruit.upDataRecruit);



// 应召信息

router.post('/createOrder', Recruit.CreateOrder);
router.get('/getOrder', Recruit.getOrder);
router.get('/getRecruitList', Recruit.getRecruitList);


// ****************************更改学生接口***************************


// 获取学生列表
router.get('/studentList', Student.StudentList);
// 审核学生
router.post('/checkStudent', Student.CheckStudent);
// 删除学生
router.post('/delStudent', Student.DelStudent);
// 更改学生
router.post('/updateStudent', Student.UpdateStudent);
// 上传头像
router.post('/updateStuAvatar', Student.UpdateStuAvatar);

// ****************************更改管理员接口***************************


// 获取管理员列表
router.get('/adminList', Admin.AdminList);
// 删除管理员
router.post('/delAdmin', Admin.DelAdmin);
// 更改管理员
router.post('/updateAdmin', Admin.UpdateAdmin);
// 获取管理员类型
router.get('/adminRoles', Admin.AdminRoles);
// 获取当前管理员
router.get('/personalAdmin', Admin.PersonalAdmin);
// 上传头像
router.post('/updateAdminAvatar', Admin.UpdateAdminAvatar);


// 添加模块项*****************************

module.exports = router;


