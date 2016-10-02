var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var show = require('../models/approve');
var report_summary =require('../models/report');
var kind =require('../models/approve');
var save = require('../models/items');
var department = require('../models/department');
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
router.get('/report_items_total',function(req,res){
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    } else {
        var db = req.db;
        var data = {};
        show.getList_category(db)
            .then(function(rows) {
                data.shows = rows;
                res.render('page/report_items_total', {data:data});
            }, function (err) {
                console.log(err);
                res.render('page/report_items_total', {
                    data: {
                        shows:[]
                    }
                });
            });
    }
    });

router.get('/report_items_department',function(req,res){
    if (req.session.level_user != 1){
        res.render('./page/access_denied')
    } else {
        var db = req.db;
        var data = {};
        department.getList(db)
            .then(function(rows) {
                data.departments = rows;
                res.render('page/report_items_department', {data:data});
            }, function (err) {
                console.log(err);
                res.render('page/report_items_department', {
                    data: {
                        departments:[]
                    }
                });
            });
    }
});

router.post('/show_report_items_type_total',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.type = req.body.type;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    console.log(data);
    report_summary.getReport_show_items_type_total(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/show_report_items_department_total',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.depcode = req.body.depcode;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
    console.log(data);
    if (data.depcode == "IT00") {
        report_summary.getReport_show_items_department_total4(db,data)
            .then(function(rows){
                res.send({ok: true,rows:rows});
            },
            function(err){
                console.log(err);
                res.send({ok:false,msg:err})
            });
    } else {
        report_summary.getReport_show_items_department_total(db,data)
        .then(function(rows){
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })}
});
module.exports = router;