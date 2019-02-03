// 获取banner列表
exports.GetBanner = function(req, res, next) {
    req.models.course.find({ isBanner: 1 }, function(err, list) {
      if (err) {
        throw err;
      } else {
        res.json({ title: "bannerList", code: 20000, data: list });
      }
    });
  };

// 修改banner
exports.UpdataBanner = function(req, res, next) {
    req.models.course.find({ isBanner: 1 }, function(err, list) {
      if (err) {
        throw err;
      } else {
        res.json({ title: "bannerList", code: 20000, data: list });
      }
    });
  };