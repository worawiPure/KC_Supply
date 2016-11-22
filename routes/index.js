var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var json2xls = require('json2xls');
var router = express.Router();
var Q = require('q');
var fs = require('fs');
var numeral = require('numeral');
var pdf = require('html-pdf');
var fse = require('fs-extra');
var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var level_user = require('../models/users');
var show = require('../models/items');
var path = require('path');
var lodash = require('lodash');

/* GET home page. */

router.get('/material_selection', function(req, res, next) {
    if (req.session.level_user != 2){
        res.render('./page/access_denied')
    } else {
        var db = req.db;
        var data = {};
        show.getList_material_category(db)
            .then(function (rows) {
                console.log(rows);
                data.categorys = rows;
                res.render('./page/material_selection', {data:data});
            }, function (err) {
                console.log(err);
                res.render('page/material_selection', {
                    data: {categorys: []}
                });
            });
    }});

router.post('/items_list',function(req,res){
    var data = {};
    data.id = req.body.id;
    var db = req.db;
    show.getList_material_items(db,data)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/save_material', function(req,res){
    var db = req.db;
    var data = {};
    var no_order = "KC";
    var year = moment().get('year');
    data.username = req.session.username;
    data.depcode = req.session.depcode;
    data.date_service =  moment().format('YYYY-MM-DD HH:mm:ss');
    data.date_receive = moment(req.body.data.date_receive, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var products_save = req.body.data.products_save;
    console.log(req.body.data.products_save);
    var items = [];
    if(data){
    show.getSave_bill(db,data)
        .then(function(bill_no){      // insert bill
            var _bill_no = bill_no[0];   // ได้ id
            _.forEach(products_save, function (v) {
                var obj = {};
                obj.bill_no = _bill_no; // id
                obj.items_id = v.id;
                obj.qty = v.qty;
                items.push(obj);
            });
            console.log(items);
        return show.getSave_material(db,items)
        })
        .then(function () {
            res.send({ok: true});
        },
        function(err){
            res.send({ok:false,msg:err});
            console.log(err);
        });
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.get('/list_bills', function(req, res, next) {
    if (req.session.level_user != 2){
        res.render('./page/access_denied')
    }else{
        res.render('./page/list_bills_user');}
});

router.post('/list_bills_total',function(req, res){
    var db = req.db;
    var username = req.session.username;
    show.getList_bills_total(db,username)
        .then(function(total){
            console.log(total);
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    var username = req.session.username;
    show.getList_bills_Detail(db,username,startpage)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/search_bills',function(req,res){
    var db = req.db;
    var data = {};
    data.bills = req.body.bills;
    data.username = req.session.username;
    console.log(data);
    show.getSearch_bill(db,data)
        .then(function(rows){
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_date_bills',function(req,res){
    var db = req.db;
    var data = {};
    data.date1=moment(req.body.date1, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    data.date2=moment(req.body.date2, 'DD/MM/YYYY').format('YYYY-MM-DD 23:59:59');
    data.username=req.session.username;
    console.log(data);
    show.getSearch_date_bill(db,data)
        .then(function(rows){
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.get('/show_bill/:bill_no',function(req,res){
    if (req.session.level_user != 2){
        res.render('./page/access_denied')
    } else {
        var products = [];
        var items = products;
        var db = req.db;
        var id = req.params.bill_no;
        console.log(id);
        show.getShow_bill(db,id)
            .then(function (rows) {
                var data = rows[0];
                //console.log(rows);
                _.forEach(rows,function(v){
                    var product = {};
                    product.kind_name = v.kind_name;
                    product.qty = v.qty;
                    product.unitname = v.unitname;
                    product.pay = v.pay;
                    product.pab = v.pab;
                    products.push(product);
                });
                res.render('page/show_bills_no',{rows: data,items: items});
                console.log(items);
                }, function (err) {
                res.send({ok: false, msg: err})
                }
        )
    }
});

router.get('/print_bill/:bill_no', function (req, res, next) {
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
        })
    // ensure directory
});

router.get('/list_bills_receive_today', function(req, res, next) {
    if (req.session.level_user != 2){
        res.render('./page/access_denied')
    }else{
        res.render('./page/bills_receive_today_user');}
});

router.post('/list_bills_receive_total',function(req, res){
    var db = req.db;
    var username = req.session.username;
    var today =  moment().format('YYYY-MM-DD');
    show.getList_bills_receive_total(db,username,today)
        .then(function(total){
            console.log(total);
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_receive_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    var username = req.session.username;
    var today =  moment().format('YYYY-MM-DD');
    show.getList_bills_receive_Detail(db,username,today,startpage)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/count_receive_today_user', function(req, res, next) {
    if (req.session.level_user != 2 ){
        res.render('./page/access_denied')
    }else{
        var db = req.db;
        var username = req.session.username;
        var date_today = moment().format('YYYY-MM-DD');
        db('bills as b')
            .count('* as total')
            .where('b.receive_date', date_today)
            .where('b.user_order', username)
            .then(function(rows){
                console.log(rows[0].total);
                var data = rows[0].total;
                res.send({ok:true,total:data})
            },function(err){
                res.send({ok:false,msg:err})
            }
        )
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;