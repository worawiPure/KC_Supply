var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var abstract = require('../models/abstract');


/* GET home page. */
// /a/
router.get('/', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        abstract.getListDepartment(db)
            .then(function (rows) {
                console.log(rows);
                data.abstracts = rows;
                res.render('./page/abstract_risk', {data: data});
            }, function (err) {
                res.render('./page/abstract_risk', {data: {abstracts: []}});
            }
        )
    }
    });

// /a/
router.post('/',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    abstract.getSubAllDetail(db,startpage)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )

});

router.post('/abstract_risk_total',function(req, res){
    var db = req.db;
    abstract.getSubAllDetail_total(db)
        .then(function(total){
            console.log(total);
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )

});

router.get('/detail/:id',function(req, res){
    var db = req.db;
    var id = req.params.id;
    abstract.getDetail(db,id)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.get('/show_risk/:id',function(req,res){
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        abstract.getSubShowDetail(db, id)
            .then(function (rows) {
                var data = rows[0];
                data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                res.render('page/admin_show_detail', {rows: data});
            }, function (err) {
                res.send({ok: false, msg: err})
            }
        )
    }
});

router.post('/save_abstract',function(req,res){
    var db = req.db;
    var id_detail = req.body.data.id_detail;
    var detail = req.body.data.detail;
    var id = req.body.data.id;
    console.log(req.body.data.detail);
    if(detail){
        if(id_detail){
            abstract.update_abstract(db,detail,id)
                .then(function(){
                    res.send({ok:true})
                },function(err){
                    res.send({ok:false,msg:err})
                })
        }else{
            console.log(detail);
            abstract.save_abstract(db,detail,id)
                .then(function(){
                    console.log(id);
                    return abstract.Update_part1(db,id)
                })
                .then(function(){
                    res.send({ok:true})
                },function(err){
                    res.send({ok:false,msg:err})
                })
        }

    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    console.log(data);
    abstract.search_date(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_topic',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    console.log(data);
    abstract.search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_department',function(req,res){
    var db = req.db;
    var data = {};
    data.department = req.body.department;
    console.log(data);
    abstract.search_department(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/remove_risk', function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        abstract.remove_first(db,id)
            .then(function(){
                return abstract.remove_second(db,id)
            })
            .then(function(){
                return abstract.remove_third(db,id)
            })
            .then(function(){
                return abstract.remove_fourth(db,id)
            })
            .then(function(){
                return abstract.remove_fifth(db,id)
            })
            .then(function () {
                res.send({ok: true});
            },
            function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

module.exports = router;