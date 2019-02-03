var path = require('path');
var fs = require('fs');
var html = fs.readFileSync(__dirname+'/index.html', 'utf8'); // 引入html模板

var pdf = require('html-pdf'); // html-pdf
var createPDFProtocolFile = function (template, options,reg, filename) {

    if (reg && Array.isArray(reg)) {
        reg.forEach(item => {
          template = template.replace(item.relus, item.match);
        });
      }


    pdf.create(template, options).toFile(filename, function(err, res) {
        if (err) {
            return console.log(err);
        }
        console.log(res);
    });
}

var options = {
    "format": 'A4',
    "header": {
    "height": "10mm",
    "contents": ''
}}; // 一些配置
var orderMes = {
    order_no : 121313,
    name : 'lly'
}
var reg = [
    {
      relus: /__order__/g,
      match: orderMes
    },
    {
      relus: /__name__/g,
      match: '栗禄尧'
    }
  ];
createPDFProtocolFile(html, options,reg ,'./order.pdf'); 

