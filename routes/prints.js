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
var item = require('../models/approve');

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
                var html = fs.readFileSync(destPath + '/report_bills.html', 'utf8');
                var options = {
                    format: 'A4',
                    header: {
                        height: "10mm",
                        contents: '<div style="text-align: center"><h2>รายการเบิกวัสดุ</h2></div>'
                    },
                    footer: {
                        height: "10mm",
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

router.get('/report_items_type/:date1/:date2/:type', function (req, res, next) {
    var db = req.db;
    var type = {};
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var id = req.params.type;
    console.log(date1);
    console.log(date2);
    console.log(id);
    show.getShow_category_name(db,id)
        .then(function (rows) {
            console.log(rows);
            type.detail = rows[0];
            return show.getReport_show_items_type_total2(db,date1,date2,id)
        })
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');
            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);
            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_items_type.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_items_type.html', 'utf8');
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงานสรุปยอดวัสดุแยกตามประเภท ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +' ประเภท '+ type.detail.kind_category +' </h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };
                var pdfName = './templates/pdf/KC_Supply-' + moment().format('x') + '.pdf';
                pdf.create(html, options).toFile(pdfName, function(err, resp) {
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

router.get('/report_items_department/:date1/:date2/:depcode', function (req, res, next) {
    var db = req.db;
    var department = {};
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var depcode = req.params.depcode;
    console.log(date1);
    console.log(date2);
    console.log(depcode);
        show.getShow_department_name(db,depcode)
            .then(function (rows) {
                department.detail = rows[0];
                if (depcode == "IT00") {
                    return show.getReport_show_items_department_total3(db, date1, date2)
                } else {
                    return show.getReport_show_items_department_total2(db, date1, date2, depcode)
                }
            })
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');
            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);
            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_items_department.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_items_department.html', 'utf8');
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงานสรุปยอดวัสดุแยกตามแผนก ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +' แผนก '+ department.detail.depname +' </h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };
                var pdfName = './templates/pdf/KC_Supply-' + moment().format('x') + '.pdf';
                pdf.create(html, options).toFile(pdfName, function(err, resp) {
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
