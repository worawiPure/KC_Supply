var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var department = require('../models/department');
var depcode = require('../models/department');
var program = require('../models/risk_group');
var sub_progarm = require('../models/risk_group');
var sub_group = require('../models/risk_group');
var detail = require('../models/risk_detail');
var risk_type = require('../models/risk_type');
var risk_report = require('../models/risk_type');
var type_complaint = require('../models/risk_type');
var clinic = require('../models/risk_type');
var request = require('../models/request');
var show_risk = require('../models/risk_report');
var show_risk2 = require('../models/risk_report');
var risk_repeat = require('../models/risk_report');
var update_part1 = require('../models/risk_report');
var update_part2 = require('../models/risk_report');
var level_user = require('../models/users');

/* GET home page. */

router.get('/', function(req, res, next) {
    if (req.session.level_user_id != 1) {
        res.render('./page/access_denied')
    }else{
  res.render('index');}
});

router.get('/user_senior', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
        res.render('user_senior');}
});


router.get('/admin', function(req, res, next) {
        if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
                res.render('./page/access_denied')
            }else{
    res.render('admin');}
});

router.get('/superadmin', function(req, res, next) {
    if (req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else{
    res.render('superadmin');}
});

router.get('/request_detail_save', function(req, res, next) {
    res.render('page/request_detail_save');
});

router.get('/risk_report', function(req, res, next) {
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else{
    res.render('page/risk_report');}
});

router.get('/user_senior_risk_report', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
    res.render('page/user_senior_risk_report');}
});

router.post('/get_risk_report' ,function(req,res) {
    var db = req.db;
    var username = req.session.username;
    var startpage  = parseInt(req.body.startRecord);
    show_risk.getSubAllDetail(db,username,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_risk_report_total' ,function(req,res) {
    var db = req.db;
    var username = req.session.username;
    show_risk.getSubAllDetail_total(db,username)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var startpage = parseInt(req.body.startRecord);
    console.log(depcode)
    show_risk.getSubAllDetail_user_senior(db,req.session.depcode,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report_total' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    console.log(depcode)
    show_risk.getSubAllDetail_user_senior_total(db,req.session.depcode)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});


router.get('/show_risk/:id',function(req,res){
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        show_risk2.Chack_sesion(db, id, req.session.username)
            .then(function (total) {
                if (total > 0) {
                    show_risk2.getSubShowDetail(db, id)
                        .then(function (rows) {
                            var data = rows[0];
                            data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                            data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                            data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                            data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                            res.render('page/show_detail', {rows: data});
                        }, function (err) {
                            res.send({ok: false, msg: err})
                        }
                    )
                }
                else {
                    res.render('./page/access_denied')
                }
            })
    }
});

router.get('/user_senior_show_risk/:id/:depcode',function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var depcode = req.params.depcode;
        show_risk2.Chack_sesion_depcode(db, id, req.session.depcode)
            .then(function (total) {
                if (total > 0) {
                    show_risk2.getSubShowDetail(db,id)
                        .then(function (rows) {
                            var data = rows[0];
                            data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                            data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                            data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                            data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                            res.render('page/user_senior_show_detail', {rows: data});
                        }, function (err) {
                            res.send({ok: false, msg: err})
                        }
                    )
                }
                else {
                    res.render('./page/access_denied')
                }
            })
    }
});


router.get('/risk_repeat/:id/:depcode',function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        show_risk2.Chack_sesion_depcode(db,id,req.session.depcode)
            .then(function(total){
            if(total > 0) {
                risk_repeat.getSubShowPast5(db, id)
                    .then(function (rows) {
                        var data = rows[0];
                        res.render('page/risk_repeat', {rows: data, risk_id: id});
                    }, function (err) {
                        res.send({ok: false, msg: err})
                    }
                )
            }else{
                res.render('./page/access_denied')
            }
        })

    }
});


router.post('/update_part5', function(req,res) {
    if (req.session.level_user_id != 1 && req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = req.body.data;
        console.log(data.id);
        update_part1.Update_part1(db, data.id)
            .then(function () {
                return update_part2.Update_part5(db, data)
            })
            .then(function () {
                res.send({ok: true});
            },
            function (err) {
                res.send({ok: false, msg: err})
            })
    }
});

router.get('/request', function(req,res){
    var db = req.db;
    var data = {};
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    } else {
        depcode.getList_Department(db,req.session.depcode)
            .then(function(rows){
                data.depcodes = rows;
                return  department.getList(db);
            })
            .then(function (rows) {
                data.departments = rows;
                return program.getList(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.programs = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                return risk_report.getType_report(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_reports = rows;
                return type_complaint.getType_complaint(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.type_complaints = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.clinics = rows;
                res.render('page/request', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/request', {
                    data: {
                        programs: [], depratments: [], risk_types: [], risk_reports: []
                        , type_complaints: [], clinics: [],depcodes: []
                    }
                });
            });
    }
});router.get('/user_senior_request', function(req,res){
    var db = req.db;
    var data = {};
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    } else {
        depcode.getList_Department(db,req.session.depcode)
            .then(function(rows){
                data.depcodes = rows;
                return  department.getList(db);
            })
            .then(function (rows) {
                data.departments = rows;
                return program.getList(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.programs = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                return risk_report.getType_report(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_reports = rows;
                return type_complaint.getType_complaint(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.type_complaints = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.clinics = rows;
                res.render('page/user_senior_request', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/user_senior_request', {
                    data: {
                        programs: [], depratments: [], risk_types: [], risk_reports: []
                        , type_complaints: [], clinics: [],depcodes: []
                    }
                });
            });
    }
});

router.get('/edit_risk/:id', function(req,res){
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
        show_risk2.Chack_sesion(db,id,req.session.username)
            .then(function(total){
                if(total > 0){
                    show_risk2.getSubShowDetail(db, id)
                        .then(function (rows) {
                            console.log(rows);
                            data.detail = rows[0];
                            data.detail.date_risk = moment(data.detail.date_risk).format('YYYY-MM-DD');
                            data.detail.date_report_risk = moment(data.detail.date_report_risk).format('YYYY-MM-DD');
                            return department.getList(db)
                        })
                        .then(function (rows) {
                            data.departments = rows;
                            return depcode.getList_Department(db,req.session.depcode)
                        })
                        .then(function (rows) {
                            data.depcodes = rows;
                            return program.getList(db);
                        })
                        .then(function (rows) {
                            data.programs = rows;
                            return sub_progarm.getSubList2(db, data.detail.risk_program);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.sub_programs = rows;
                            return sub_group.getSubList3(db, data.detail.risk_group);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.sub_groups = rows;
                            return risk_type.getRisk_type(db);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.risk_types = rows;
                            return risk_report.getType_report(db)
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.risk_reports = rows;
                            return type_complaint.getType_complaint(db);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.type_complaints = rows;
                            return clinic.getClinicLevel(db, data.detail.type_risk);
                        })
                        .then(function (rows) {
                            console.log(data);
                            data.clinics = rows;
                            res.render('page/edit_risk', {data: data});
                        }, function (err) {
                            console.log(err);
                            res.render('page/edit_risk', {
                                data: {
                                    programs: [],
                                    sub_programs: [],
                                    sub_groups: [],
                                    depratments: [],
                                    depcodes: [],
                                    risk_types: [],
                                    risk_reports: [],
                                    type_complaints: [],
                                    clinics: [],
                                    show_risk2: []
                                }
                            });
                        });
                }else{
                    res.render('./page/access_denied')
                }
            })

    }
});

router.get('/user_senior_edit_risk/:id/:depcode', function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
        show_risk2.Chack_sesion_depcode(db,id,req.session.depcode)
            .then(function(total){
                if(total > 0){
                    console.log(total);
                    show_risk2.getSubShowDetail(db,id)
                        .then(function (rows) {
                            console.log(rows);
                            data.detail = rows[0];
                            data.detail.date_risk = moment(data.detail.date_risk).format('YYYY-MM-DD');
                            data.detail.date_report_risk = moment(data.detail.date_report_risk).format('YYYY-MM-DD');
                            return department.getList(db)
                        })
                        .then(function (rows) {
                            data.departments = rows;
                            return depcode.getList_Department(db,req.session.depcode)
                        })
                        .then(function (rows) {
                            data.depcodes = rows;
                            return program.getList(db);
                        })
                        .then(function (rows) {
                            data.programs = rows;
                            return sub_progarm.getSubList2(db, data.detail.risk_program);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.sub_programs = rows;
                            return sub_group.getSubList3(db, data.detail.risk_group);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.sub_groups = rows;
                            return risk_type.getRisk_type(db);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.risk_types = rows;
                            return risk_report.getType_report(db)
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.risk_reports = rows;
                            return type_complaint.getType_complaint(db);
                        })
                        .then(function (rows) {
                            console.log(rows);
                            data.type_complaints = rows;
                            return clinic.getClinicLevel(db, data.detail.type_risk);
                        })
                        .then(function (rows) {
                            console.log(data);
                            data.clinics = rows;
                            res.render('page/user_senior_edit_risk', {data: data});
                        }, function (err) {
                            console.log(err);
                            res.render('page/user_senior_edit_risk', {
                                data: {
                                    programs: [],
                                    sub_programs: [],
                                    sub_groups: [],
                                    depratments: [], depcodes: [],
                                    risk_types: [],
                                    risk_reports: [],
                                    type_complaints: [],
                                    clinics: [],
                                    show_risk2: []
                                }
                            });
                        });
                }else{
                    res.render('./page/access_denied')
                }
            })

    }
});

router.post('/sub_program',function(req,res){
  var id = req.body.id;
  var db = req.db;
  program.getSubList(db,id)
   .then(function(rows){
    res.send({ok:true,rows:rows});
  },
   function(err){
     res.send({ok:false,msg:err})
  })
});

router.post('/sub_group',function(req,res){
    var id = req.body.id;
    var db = req.db;
    detail.getSubDetail(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/sub_group2',function(req,res){
    var id = req.body.id;
    var db = req.db;
    detail.getSubDetail2(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/clinic',function(req,res){
    var id = req.body.id;
    var db = req.db;
    clinic.getClinicLevel(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/save_request', function(req,res){
    var db = req.db;
    var data = req.body.data;
    data.username = req.session.username;
    if(data){
        request.Save_part1(db,data)
            .then(function(id){
                data.id = id;
                return request.Save_part2(db,data)
            })
            .then(function(){
                return request.Save_part3(db,data)
            })
            .then(function(){
                return request.Save_part4(db,data)
            })
            .then(function(){
                return request.Save_part5(db,data)
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

router.post('/edit_request', function(req,res){
    var db = req.db;
    var data = req.body.data;
    //data.username = req.session.username;
    if(data){
        request.update_part1(db,data)
            .then(function(){
                console.log(data);
                console.log(data.program);
                console.log(data.subprogram);
                console.log(data.subgroup);
                return request.update_part2(db,data)
            })
            .then(function(){
                return request.update_part3(db,data)
            })
            .then(function(){
                return request.update_part4(db,data)
            })
            .then(function () {
                res.send({ok: true});
            },
            function(err){
                console.log(err);
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});


router.get('/risk_group_sub',function(req,res){
    var db = req.db;
    var data = {};
    program.getList(db)
        .then(function(rows){
            data.programs = rows;
            return group.getList(db);
        })
        .then(function(rows){
            console.log(rows);
            data.programs = rows;
            res.render('page/risk_group_sub',{data:data});
        },function(err){
            console.log(err);
            res.render('page/risk_group_sub',{data:{programs:[],group:[]}});
        });
});

router.post('/search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date = req.body.date;
    data.username = req.session.username;

    console.log(data);
    request.search_date(db,data)
        .then(function(rows){
            console.log(rows);
                    res.send({ok: true,rows:rows});
                },
                function(err){
                    console.log(err);
                    res.send({ok:false,msg:err})
                })

});

router.post('/user_senior_search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date = req.body.date;
    data.depcode = req.session.depcode;

    console.log(data);
    request.user_senior_search_date(db,data)
        .then(function(rows){
            console.log(rows);
                    res.send({ok: true,rows:rows});
                },
                function(err){
                    console.log(err);
                    res.send({ok:false,msg:err})
                })

});


router.post('/search_topic_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    data.username = req.session.username;

    console.log(data);
    request.search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/user_senior_search_topic_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    data.depcode = req.session.depcode;

    console.log(data);
    request.user_senior_search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});



router.get('/hello/:fname/:lname/:age', function (req,res) {
  var data = req.params;
  res.render('page/main',{
    fname:data.fname,
    lname:data.lname,
    age:data.age
  });
});

router.get('/about', function(reg, res){
  var  fruits = [1,2,3,4];
  var animal = [{id:1 , name: 'cat'},
    {id:2,name:'bat'},
    {id:3,name:'rat'}];
  var person = [{id:1 ,name:'worawit'},
    {id:2,name:'somsri'},
    {id:3,name:'somchai'}];
  res.render('page/about',{msg:'เกี่ยวกับผู้จัดทำ',fruits:fruits,animal:animal,person:person});
});

router.get('/contact',function(req,res){
  var tel = [{id:1,moo:'1',tumb:'โคกพระ',post:'44150'},
    {id:2,moo:'9',tumb:'คันธาร์',post:'44151'},
    {id:3,moo:'4',tumb:'โคกพระ',post:'44152'}];
  res.render('page/contact',{tel:tel});
});
module.exports = router;