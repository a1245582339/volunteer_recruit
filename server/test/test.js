// app.use(orm.express("mysql://root:123@localhost/paydata", {
// 	define: function (db, models, next) {
//     // 模块列表
// 		models.product_info = db.define("product_info", { 
//       id             : Number,
//       name           : String,
//       price          : Number, // FLOAT
//       desp           : String,
//       category_id    : String,
//       coefficient    : Number,
//       is_deleted     : Number
//      });
//     //  订单列表
//      models.order = db.define("order", { 
//       order_no       : Number,
//       user_id        : Number,
//       real_name      : String, 
//       total          : Number,
//       quantity       : Number,
//       is_deleted     : Number
//      });
//     //  订单里的每个模块
//     models.order_desp = db.define("order_desp", { 
//       order_no       : Number, //必填
//       created_at     : Number,
//       is_deleted     : Number, 
//       order_id       : Number,
//       price          : Number,
//       product_id     : String
//      });
// 		next();
// 	}
// }));