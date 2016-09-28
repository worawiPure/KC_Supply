var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Q = require('q');
var fs = require('fs');
var numeral = require('numeral');
var pdf = require('html-pdf');
var moment = require('moment');
var fse = require('fs-extra');
var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var show = require('../models/report');

router.get('/report_approve_bills/:bill_no', function (req, res, next) {
    var db = req.db;
    var json = {};
    var id = req.params.bill_no;
    var products = [];
    show.getReport_bills(db,id)
        .then(function(rows) {
            console.log(id);
            json.detail = rows[0];
            _.forEach(rows,function(v){
                var product = {};
                product.kind_name = v.kind_name;
                product.qty = v.qty;
                product.unitname = v.unitname;
                product.pay = v.pay;
                product.pab = v.pab;
                products.push(product);
            });
            json.products = products;
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');
            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);
            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_bills.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_bills.html', 'utf8')
                var options = {
                    format: 'A4',
                    header: {
                        height: "20mm",
                        contents: '<div style="text-align: center"><h2>รายการเบิกวัสดุ</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: ' + new Date() + '</small></span>'
                    }
                };
                var pdfName = './templates/pdf/KC_Supply-' + moment().format('x') + '.pdf';
                pdf.create(html, options).toFile(pdfName, function (err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');
        },function(err){
            res.send({ok: false, msg: err});
        });
    // ensure directory
});
/////////////////////////////////////////////////////////////////////////////////////////

router.get('/pdf', function(req, res, next) {
  var fs = require('fs');
  var pdf = require('html-pdf');
  var json = {
    fullname: 'นายสถิตย์  เรียนพิศ',
    items: [
      {id: 1, name: 'Apple'},
      {id: 2, name: 'Banana'},
      {id: 3, name: 'Orange'},
    ]
  };

  gulp.task('html', function (cb) {
    return gulp.src('./templates/report_summary.jade')
      .pipe(data(function () {
        return json;
      }))
      .pipe(jade())
      .pipe(gulp.dest('./templates'));
      cb();
  });

  gulp.task('pdf', ['html'], function () {
    var html = fs.readFileSync('./templates/slip.html', 'utf8')
    var options = {
      format: 'A4'
    };

    pdf.create(html, options).toFile('./public/pdf/slip.pdf', function(err, resp) {
      if (err) return console.log(err);
      res.send({ok: true, file: resp}) // { filename: '/app/businesscard.pdf' }
    });
  });

  gulp.start('pdf');

});



module.exports = router;
