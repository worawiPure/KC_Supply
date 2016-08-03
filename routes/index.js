var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var json2xls = require('json2xls');
var router = express.Router();
var level_user = require('../models/users');
var show = require('../models/type_service');
var save = require('../models/type_service');
var edit = require('../models/type_service');
var remove = require('../models/type_service');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var lodash = require('lodash');

/* GET home page. */

router.get('/admin', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else{
        res.render('admin');}
});

router.get('/opd', function(req, res, next) {
    if (req.session.level_user_id != 2){
        res.render('./page/access_denied')
    } else {
        var db =req.db;
        var data = {};
        show.getList_Type_service(db)
            .then(function(rows){
                console.log(rows);
                data.types = rows;
                return show.getList_Type_treatment(db)
            })
            .then(function(rows){
                console.log(rows);
                data.treatments =rows;
                res.render('page/opd',{data:data});
            },function(err){
                console.log(err);
                res.render('page/opd',{
                    data:{types:[],trestments:[]}
                });
            });
    }});

router.post('/save_service', function(req,res){
    var db = req.db;
    var data = req.body.data;
    data.service_date=moment(data.service_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if(data){
        console.log(data);
        save.Save_service_time(db,data)
            .then(function() {
                res.send({ok: true});
            },
            function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_date_opd',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    show.search_date(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/edit_opd', function(req,res){
    var db = req.db;
    var data = req.body.data;
    data.service_date=moment(data.service_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        if(data){
            edit.update_opd(db,data)
                .then(function(){
                    res.send({ok:true})
                },function(err){
                    res.send({ok:false,msg:err})
                })
        } else {
            res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
        }
});

router.post('/remove_opd',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        remove.remove_opd(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/get_opd_total' ,function(req,res) {
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    console.log(data);
    show.getOPD_total(db,data)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_opd_show',function(req, res){
    var db = req.db;
    var date_search1 = parseInt(req.body.date_search1);
    var date_search2 = parseInt(req.body.date_search2);
    var startpage = parseInt(req.body.startRecord);
    show.getOPD_page(db,date_search1,date_search2,startpage)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.get('/export_report_normal/:start/:end',function(req, res){
    var db = req.db;
    var data = {};
   // var json = {};
    data.date_report_normal1 = req.params.start;
    data.date_report_normal2 = req.params.end;
    //data.number_row = req.params.number_row;
    //data.date_report_normal1=moment(data.date_report_normal1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    //data.date_report_normal2=moment(data.date_report_normal2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    show.export_normal(db,data)
        .then(function(rows){
        if (rows.length > 0 ){
        //json = _.sampleSize(rows,[data.number_row])  สุ่มค่าจากจำนวนแถวที่เราต้องการ
            //console.log(rows);
            //json = rows[;
            //var xls = json2xls(rows);
            var exportPath = './templates/xls';
            fse.ensureDirSync(exportPath);
            var exportFile = path.join(exportPath, 'OPD_Time-' + moment().format('x') + '.xls');
            //fs.writeFile(exportFile, xls, 'binary');
            var json2xls = require('json2xls');
            //var json = {
            //    foo: 'bar',
            //    qux: 'moo',
            //    poo: 123,
            //    stux: new Date()
            //};
            //
            //console.log(json);
            var xls = json2xls(rows);
            fs.writeFileSync(exportFile, xls, 'binary');
            res.download(exportFile, function () {
                //rimraf.sync(export);
                fse.removeSync(exportFile);
            });
        } else {
            res.send({ok:false,msg:'ไม่มีข้อมูลในช่วงที่เลือกครับ'})
        }
        },function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.get('/export_report_special/:start/:end',function(req, res){
    var db = req.db;
    var data = {};
    //var json = {};
    data.date_report_special1 = req.params.start;
    data.date_report_special2 = req.params.end;
    //data.number_row2 = req.params.number_row2;
    //data.date_report_special1=moment(data.date_report_special1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    //data.date_report_special2=moment(data.date_report_special2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    show.export_special(db,data)
        .then(function(rows){
            if (rows.length > 0 ) {
                //json = _.sampleSize(rows, [data.number_row2]) สุ่มค่าจากจำนวนแถวที่เราต้องการ
                //console.log(rows);
                //json = rows[;
                //var xls = json2xls(rows);
                var exportPath = './templates/xls';
                fse.ensureDirSync(exportPath);
                var exportFile = path.join(exportPath, 'OPD_Time-' + moment().format('x') + '.xls');
                //fs.writeFile(exportFile, xls, 'binary');
                var json2xls = require('json2xls');
                //var json = {
                //    foo: 'bar',
                //    qux: 'moo',
                //    poo: 123,
                //    stux: new Date()
                //};
                //
                //console.log(json);
                var xls = json2xls(rows);
                fs.writeFileSync(exportFile, xls, 'binary');
                res.download(exportFile, function () {
                    //rimraf.sync(export);
                    fse.removeSync(exportFile);
                });
            } else {
                res.send({ok:false,msg:'ไม่มีข้อมูลในช่วงที่เลือกครับ'})
            }
            },function(err){
            console.log(err);
            res.send({ok:false,msg:err})
            })
});

module.exports = router;
