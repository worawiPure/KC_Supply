var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var show = require('../models/approve');
var roundel =require('../models/approve');
var kind =require('../models/approve');
var save = require('../models/items');
var level_user = require('../models/users');
var Q = require('q');
var fs = require('fs');
var numeral = require('numeral');
var pdf = require('html-pdf');
var fse = require('fs-extra');
var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var path = require('path');
var lodash = require('lodash');

/* GET home page. */

router.get('/bills_approve', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    } else {
        res.render('./page/menu_admin');
    }
    });

router.get('/list_bills_today_admin', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/list_bills_admin');}
});

router.get('/list_bills_not_approve', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/list_bills_napprove_admin');}
});

router.get('/list_bills_approve', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/list_bills_approve_admin');}
});

router.get('/list_bills_payable', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/list_bills_payable_admin');}
});

router.get('/set_unit', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/set_unit_admin');}
});

router.get('/set_type', function(req, res, next) {
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    }else{
        res.render('./page/set_type_admin');}
});

router.post('/get_unit_total',function(req,res){
    var db = req.db;
    show.getList_unit_total(db)
        .then(function (total){
            console.log(total)
            res.send({ok:true,total:total})
        },function(err) {
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_type_total',function(req,res){
    var db = req.db;
    show.getList_type_total(db)
        .then(function (total){
            console.log(total)
            res.send({ok:true,total:total})
        },function(err) {
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_admin_total',function(req, res){
    var db = req.db;
    var date_service =  moment().format('YYYY-MM-DD');
    show.getList_bills_admin_total(db,date_service)
        .then(function(total){
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_not_approve_admin_total',function(req, res){
    var db = req.db;
    show.getList_bills_not_approve_admin_total(db)
        .then(function(total){
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_approve_admin_total',function(req, res){
    var db = req.db;
    show.getList_bills_approve_admin_total(db)
        .then(function(total){
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_unit_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    show.getList_unit_detail(db,startpage)
        .then(function(rows){
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_type_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    show.getList_type_detail(db,startpage)
        .then(function(rows){
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_admin_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    var date_service =  moment().format('YYYY-MM-DD');
    show.getList_bills_admin_Detail(db,date_service,startpage)
        .then(function(rows){
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_not_approve_admin_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    show.getList_bills_admin_not_approve_Detail(db,startpage)
        .then(function(rows){
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/list_bills_approve_admin_page',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    show.getList_bills_admin_approve_Detail(db,startpage)
        .then(function(rows){
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/show_items_approve',function(req, res){
    var db = req.db;
    var bill_no = parseInt(req.body.bill_no);
    show.getShow_items_approve(db,bill_no)
        .then(function(rows){
            console.log(rows);
            var products = [];
            var items = products;
            _.forEach(rows,function(v){
                var product = {};
                products.bill = v.bill;
                product.bill_no = v.bill_no;
                product.items_id = v.items_id;
                product.kind_name = v.kind_name;
                product.qty = v.qty;
                product.pay = v.pay;
                product.unitname = v.unitname;
                products.push(product);
            });
            res.send({ok:true,items:items})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/save_approve_material', function(req,res){
    var db = req.db;
    var data = {};
    console.log(req.body);
    data.bill_no = req.body.bill_no;
    var products = req.body.products;
    console.log(req.body.products);
    var items = [];
    console.log(data);
    if(data){
        show.getUpdate_status_bill(db,data) //update status_bills
            .then(function(){
                return show.getRemove_bills(db,data); // clear old data
            })
            .then(function () {
                _.forEach(products, function (v) {
                    var obj = {};
                    obj.bill_no = data.bill_no;
                    obj.items_id = v.items_id;
                    obj.pay = v.pay;
                    obj.qty = v.qty;
                    items.push(obj);
                });
                console.log(items);
                return save.getSave_material(db,items)
            })
            .then(function () {
                res.send({ok: true});
            },
            function(err){
                res.send({ok:false,msg:err})
                console.log(err);
            });
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/count_approve_today', function(req, res, next) {
    if (req.session.level_user != 1 ){
        res.render('./page/access_denied')
    }else{
        var db = req.db;
        var date_today = moment().format('YYYY-MM-DD');
        console.log(date_today);
        show.getCount_total_approve_today(db,date_today)
            .then(function(total){
                console.log(total);
                var data = total;
                res.send({ok:true,total:data})
            },function(err){
                res.send({ok:false,msg:err})
                console.log(err)
            }
        )
    }
});

router.post('/count_not_approve', function(req, res, next) {
    if (req.session.level_user != 1 ){
        res.render('./page/access_denied')
    }else{
        var db = req.db;
        show.getCount_total_not_approve(db)
            .then(function(total){
                console.log(total);
                var data = total;
                res.send({ok:true,total:data})
            },function(err){
                res.send({ok:false,msg:err})
                console.log(err)
            }
        )
    }
});

router.post('/search_bills',function(req,res){
    var db = req.db;
    var data = {};
    data.bills = req.body.bills;
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

router.post('/search_date_bills_payable',function(req,res){
    var db = req.db;
    var data = {};
    data.date1=moment(req.body.date1, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    data.date2=moment(req.body.date2, 'DD/MM/YYYY').format('YYYY-MM-DD 23:59:59');
    console.log(data);
    show.getSearch_date_bill_payable(db,data)
        .then(function(rows){
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.get('/show_bill/:bill_no',function(req,res){
    if (req.session.level_user != 1){
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
                res.render('page/show_bills_no_admin',{rows: data,items: items});
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
        })
    // ensure directory
});

router.post('/remove_unit',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        show.remove_unit(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_unit',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var id = req.body.id;
    if(name && id){
        show.update_unit(db,id,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/save_unit',function(req,res){
    var db = req.db;
    var name = req.body.name;
    if(name){
        show.save_unit(db,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/remove_type',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        show.remove_type(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_type',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var id = req.body.id;
    if(name && id){
        show.update_type(db,id,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/save_type',function(req,res){
    var db = req.db;
    var name = req.body.name;
    if(name){
        show.save_type(db,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.get('/add_items_type/:id',function(req,res){
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    } else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
        show.getShow_category_name(db,id)
            .then(function(rows) {
                 data.shows = rows;
                 data.id = id;
                return kind.getList_category(db);
            })
            .then(function(rows){
                data.kinds = rows;
                return roundel.getList_unit(db);
            })
            .then(function(rows){
                data.roundels = rows;
                res.render('page/add_items_type_admin', {data:data});
            }, function (err) {
                console.log(err);
                res.render('page/add_items_type_admin', {
                    data: {
                        shows: [], roundels: []
                    }
                });
                });
            }
    router.post('/get_items_type_total',function(req,res){
        var db = req.db;
        var id = req.body.id;
        show.getList_items_type_total(db,id)
            .then(function (total){
                console.log(total);
                res.send({ok:true,total:total})
            },function(err) {
                res.send({ok:false,msg:err})
            }
        )
    });

    router.post('/get_items_type_page',function(req, res){
        var db = req.db;
        var id =req.body.id;
        var startpage = parseInt(req.body.startRecord);
        show.getList_items_type_detail(db,id,startpage)
            .then(function(rows){
                console.log(rows)
                res.send({ok:true,rows:rows})
            },function(err){
                res.send({ok:false,msg:err})
            }
        )
    });
});

router.post('/save_items_in_type',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var type = req.body.type;
    var unit = req.body.unit;
    var status = req.body.status;
    if(name){
        show.save_items_in_type(db,name,type,unit,status)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_items_in_type',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var type = req.body.type;
    var unit = req.body.unit;
    var status = req.body.status;
    var id = req.body.id2;
    if(name && id){
        console.log(id,name,type,unit,status);
        show.update_items_in_type(db,id,name,type,unit,status)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/remove_items_in_type',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        show.remove_items_in_type(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_items',function(req,res){
    var db = req.db;
    var data = {};
    data.items = req.body.items;
    console.log(data);
    show.getSearch_items(db,data)
        .then(function(rows){
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

module.exports = router;