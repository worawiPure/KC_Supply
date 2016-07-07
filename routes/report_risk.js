var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var abstract = require('../models/abstract');
var risk_type = require('../models/risk_type');
var report_summary =require('../models/report_summary');
var level =require('../models/risk_type');
var department = require('../models/department');

/* GET home page. */
// /a/

router.get('/', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        risk_type.getRisk_type(db)
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                res.render('./page/report_summary', {data: data});
            }, function (err) {
                res.render('./page/report_summary', {data: {risk_types: []}});
            }
        )
    }
});

router.get('/terminal', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        risk_type.getRisk_type(db)
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                res.render('./page/terminal', {data: data});
            }, function (err) {
                res.render('./page/terminal', {data: {risk_types: []}});
            }
        )
    }
});

router.get('/level', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        risk_type.getRisk_type(db)
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                res.render('./page/level', {data: data});
            }, function (err) {
                res.render('./page/level', {data: {risk_types: []}});
            }
        )
    }
});

router.get('/summary_date', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        department.getList(db)
            .then(function (rows) {
                console.log(rows);
                data.departments = rows;
                res.render('./page/report_summary_date', {data: data});
            }, function (err) {
                res.render('./page/report_summary_date', {data: {departments: []}});
            }
        )
    }
});

router.get('/summary_department', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        department.getList(db)
            .then(function (rows) {
                console.log(rows);
                data.departments = rows;
                res.render('./page/report_summary_department', {data: data});
            }, function (err) {
                res.render('./page/report_summary_department', {data: {departments: []}});
            }
        )
    }
});

router.post('/sl_level',function(req,res){
    var id = req.body.id;
    var db = req.db;
    console.log(id);
    level.getClinicLevel(db,id)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});


router.get('/user_senior_report', function(req, res, next) {
    if (req.session.level_user_id != 4 ){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        risk_type.getRisk_type(db)
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                res.render('./page/user_senior_report', {data: data});
            }, function (err) {
                res.render('./page/user_senior_report', {data: {risk_types: []}});
            }
        )
    }
});

router.get('/user_report', function(req, res, next) {
    if (req.session.level_user_id != 1 ){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        risk_type.getRisk_type(db)
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                res.render('./page/user_report', {data: data});
            }, function (err) {
                res.render('./page/user_report', {data: {risk_types: []}});
            }
        )
    }
});

router.post('/report_summary',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.risk_type = req.body.risk_type;
    console.log(data);
    report_summary.getReport_summary(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/report_terminal',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    console.log(data);
    report_summary.getReport_terminal(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/report_summary_date',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    console.log(data);
    report_summary.getReport_summary_date(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
    //var dateRisk = moment(rows[0].date_risk).format('DD/MM/YYYY')
});

router.post('/report_summary_department',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.depcode = req.body.depcode;
    console.log(data);
    report_summary.getReport_summary_department(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/report_level',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.risk_type = req.body.risk_type;
    data.risk_level = req.body.risk_level;

    console.log(data);
    report_summary.getReport_level(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/report_senior',function(req,res){
    var db = req.db;
    var depcode2 = req.session.depcode;
    var data = {};
    data.depcode = depcode2;
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;

    console.log(data);
    report_summary.getReport_user_senior(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/report_user',function(req,res){
    var db = req.db;
    var username = req.session.username;
    var data = {};
    data.username = username;
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;

    console.log(data);
    report_summary.getReport_user(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

module.exports = router;