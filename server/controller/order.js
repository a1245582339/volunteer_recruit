// 获取订单列表
exports.Getorder = function(req, res, next) {
  req.models.order.find({ isDel: 0 }, function(err, list) {
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
    // 获取课程名称

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
    // 获取学生用户名

    Promise.all([course_name, student_name]).then(result => {
      result[0].map((item, index) => {
        list[index].course_name = item[0].course_name;
      });
      result[1].map((item, index) => {
        list[index].stu_name = item[0].stu_name;
      });
      res.json({ code: 20000, title: "订单列表", data: list.reverse() });
    });
  });
};

// 提交订单
exports.SubmitOrder = function(req, res, next) {
  var course_id = req.body.course_id;
  var stu_id = req.body.stu_id;
  req.models.course.find({ id: course_id }, function(err, list) {
    // 查询课程，获取课程当前价格
    if (err) {
      res.json({ code: -1, title: "查询课程异常" });
    }
    if (list[0].isDel == 1) {
      res.json({ code: -1, title: "已下架" }); // 如果发送请求的时候课程已下架，则无法购买
    }
    var price = list[0].course_price;
    var create_time = Date.parse(new Date())/1000;
    req.models.order.exists({ stu_id: stu_id, course_id: course_id,isDel :0 }, function(
      err,
      isExist
    ) {
      if (isExist) {
        // 如果已购买，则无法购买
        res.json({ code: 20000, title: "您之前已购买过该商品，请刷新页面",status:1});
      } else {
        req.models.student.find({ id: stu_id }, function(err, stu) {
          stu[0].balance = stu[0].balance - price;
          if (stu[0].balance >= 0) {
            // 当发送购买请求时余额充足才可继续购买
            stu[0].save(function(err) {
              if (err) {
                res.json({ code: -1, title: "扣款异常" });
              }
              req.models.order.create(
                {
                  stu_id: stu_id,
                  course_id: course_id,
                  spend: price,
                  create_time: create_time,
                  isDel: 0
                },
                function(err, result) {
                  if (err) {      // 如果订单创建发生异常，为该用户退款
                    stu[0].balance = stu[0].balance + price;
                    stu[0].save(function(err){
                      res.json({ code: -1, title: "创建订单异常且退款失败" });
                    })
                    res.json({ code: -1, title: "创建订单异常" });
                  }
                  res.json({ code: 20000, title: "购买成功" ,status:2});
                }
              );
            });
          } else {
            res.json({ code: -1, title: "余额不足" });
          }
        });
      }
    });
  });
};

// 显示订单详情  打印
exports.OrderPrint = function(req, res, next) {
  var order_no = req.body.data;
  console.log("要打印的订单编号：", order_no);

  var base = null;
  var nobaseName = [];
  req.models.product_info.find({ category_id: "0", is_deleted: "0" }, function(
    err,
    lists
  ) {
    base = lists;
    req.models.order_desp.find({ order_no: order_no }, function(err, lists) {
      res.json({ code: 20000, title: "baseList", base: base, nobase: lists });
    });
  });
};

// 删除订单
exports.DelOrder = function(req, res, next) {
  var id = req.body.data;
  req.models.order
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

// 客户端获取当前课程是否已被该用户购买
exports.CheckOrder = function(req, res, next) {
  var course_id = req.query.course_id;
  var stu_id = req.query.stu_id;
  var haveBought = false;
  req.models.order.find({ stu_id: stu_id }, function(err, _list) {
    var list=[];
    _list.map((item,index)=>{
      if(item.isDel==0){
        list.push(item)       // 如果该订单已被删除，则过滤掉该订单
      }
    })
    if (list.length == 0) {
      res.json({ code: 20000, data: { haveBought: haveBought } });
    } else {
      list.map(item => {
        if (item.course_id == course_id) {
          haveBought = true;
        }
      });
      res.json({ code: 20000, data: { haveBought: haveBought } });
    }
  });
};

exports.GetOrderByStuId = function(req,res,next){
  var stu_id = req.query.stu_id
  req.models.order.find({stu_id:stu_id},function(err,_list){
    var list=[];
    _list.map((item,index)=>{
      if(item.isDel==0){
        list.push(item)       // 如果该订单已被删除，则过滤掉该订单
      }
    })
    console.log(JSON.stringify(list))
    var findcourse = params =>new Promise((resolve, reject) =>
        req.models.course.find(params, function(err, result) {
          err ? reject(err) : resolve(result);
        })
      );
    var course_name = Promise.all(
      list.map(item => findcourse({ id: item.course_id }))
    ).then(res => {
      return res;
    });

    Promise.all([course_name]).then(result => {
      
      result[0].map((item, index) => {
        list[index].course_name = item[0].course_name;
      });

      res.json({ code: 20000, title: "订单列表", data: list.reverse() });
    });
  })
}