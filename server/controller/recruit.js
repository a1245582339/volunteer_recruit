var formidable = require("formidable");
var fs = require("fs");

// 获取招募列表
exports.RecruitList = function(req, res, next) {
  var searchWord = req.query.searchWord
  req.models.recruit.find({}, function(err, list) {
    if (err) {
      console.log(err)
      res.json({ code: -1 });
    } else {
      if(searchWord) {
        list = list.filter(item => {
          return item.recruit_title.indexOf(searchWord) > -1
        })
      }
      if(req.query.id){
        var id = req.query.id
        list = list.filter(item=>{
          return item.id == id
        })
      } else {
        list = list.filter(item=>{
          return item.isDel == 0
        })
      }
      
      var hostelIdArr = list.map( item => {
        return item.hostel_id
      })
      var findPro = params => 
        new Promise((resolve, reject) => 
        req.models.hostel.find(params, function(err, result) {
          err ? reject(err) : resolve(result)
        })
      )
      Promise.all(hostelIdArr.map((item) => findPro({id: item}))).then(
        result => {
          console.log(result)
          result.map((item, index) => {
            
            list[index].hostel_name = item[0].name
            list[index].province = item[0].province
          })
          res.json({title: '招募信息', code: 20000, data: list.reverse()})
        }
      )

    }
  });
};

//boss获取招募信息
exports.bossRecruitList = function(req, res, next) {
  var boss_id = req.query.boss_id
  req.models.hostel.find({boss_id: boss_id, isDel: 0}, function(err,list){
    if(err) {
      throw err
    }
    var hostelId = list.map(item => item.id)
    // console.log(hostelId)
    var findPro = params =>
      new Promise((resolve, reject) => 
        req.models.recruit.find(params, function(err, result) {
          err ? reject(err) : resolve(result)
        })
    )
    Promise.all(hostelId.map((item) => findPro({hostel_id: item}))).then(
      result => {
        var data = []
        for(let i = 0; i < result.length; i++) {
          data.push(...result[i])
        }
        // result = result.filter(i => {
        //   if(i) {
        //     return i
        //   }
        // })
        res.json({title: '招募信息', code: 20000, data: data.reverse()})
      }
    )
  })
}

// 审核招募信息
exports.CheckRecruit = function(req, res, next) {
  var id = req.query[0];

  req.models.recruit
    .find({ id: id })
    .each(function(list) {
      list.ischecked = 1;
    })
    .save(function(err) {
      if (err) {
        res.json({ code: -1 });
      }
      res.json({ title: "审核成功", code: 20000 });
    });
};

// 删除招募信息
exports.DelRecruit = function(req, res, next) {
  var id = req.body.data;

  req.models.recruit
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

exports.CheckOrderExist = function(req, res, next) {
  console.log(req.query)
  req.models.order.exists({...req.query, isDel: 0},function(err,exist){
    if(exist){
      res.json({code:20000,title:"已存在",data:{exist: true}})
    } else {
      res.json({code:20000,title:"未存在",data:{exist: false}})
    }
  })
}

exports.CreateOrder = function(req, res, next) {
  
  req.models.order.exists({...req.body, isDel: 0},function(err,exist){
    if(exist){
      res.json({code:20000,title:"已报名成功，请勿重复提交"})
    } else {
      req.models.volun.find({id: req.body.stu_id},function(err, result){
        // console.log('sssssss>>>' + JSON.stringify(result))
        if (result[0].ischecked) {
          var time = Date.parse(new Date()) / 1000
          req.models.order.create({
            ...req.body,
            create_time: time,
            isDel: 0
          }, function(err){
            if(err) {
              throw err
            }
            res.json({ code: 20000, title:"报名成功"})
          })
        } else {
          res.json({ code: 20000, title:"未审核"})
        }
      })
      
    }
  })
}

// 用户获取自己的应召列表
exports.getOrder = function(req, res, next) {
  req.models.order.find({...req.query, isDel: 0},function(err,list){
    if(err){
      throw err
    } else {
      var stu_id = req.query.stu_id
      var data = list.filter(item=>{
        return stu_id ? stu_id == item.stu_id : item
      })
      var recruitIdArr = data.map(item=>{
        return item.recruit_id
      })
      var findPro = params => 
        new Promise((resolve, reject) => 
        req.models.recruit.find(params, function(err, result) {
          err ? reject(err) : resolve(result)
        })
      )

      Promise.all(recruitIdArr.map((item) => findPro({id: item}))).then(
        result => {
          console.log(result)
          result.map((item, index) => {
            data[index].recruit_title = item[0].recruit_title
          })
          res.json({title: '招募信息', code: 20000, data: data.reverse()})
        }
      )


    }
  })
}

// 新建/修改招募信息
exports.upDataRecruit = function(req, res, next) {
  var data = req.body.data
  
  if(data.id){
    req.models.recruit.find({id: data.id}).each(item => {
      item.recruit_title = data.name
      item.salary = data.price
      item.desp = data.desp
      item.hostel_id = data.type
    })
    .save(err => {
      if(err)  {
        res.json({ code: -1 })
      }
      res.json({ code: 20000, title: '修改成功' })
    })
  } else {
    // console.log(data)
    req.models.recruit.create({
      recruit_title: data.name,
      salary: data.price,
      desp: data.desp,
      hostel_id: data.type,
      isDel: 0,
      ischecked: 0,
      create_time: Date.parse(new Date()) / 1000
    },err => {
      if (err) {
        throw err
        res.json({ title: "请求异常", code: -1});
      }
      res.json({ code: 20000, title: "添加成功" });
    })
  }
}

exports.getRecruitList = function(req, res, next) {
  var recruit_id = req.query.recruit_id
  req.models.order.find({recruit_id: recruit_id, isDel: 0},function(err, list){
    var stuIdArr = list.map(item => {
      return item.stu_id
    })
    
    var findPro = params => 
      new Promise((resolve, reject) => 
        req.models.volun.find(params, function(err, result) {
          err ? reject(err) : resolve(result)
        })
      )
    Promise.all(stuIdArr.map(item => findPro({id: item, isDel: 0}))).then(
      result => {
        console.log(JSON.stringify(result))
        var resData = result.map(item => {
          return {
            stu_name: item[0].volun_name,
            tel: item[0].tel,
            sex: item[0].sex
          }
        })

        res.json({code: 20000, title: '应召列表', data: resData})
      }
    )

  })
}