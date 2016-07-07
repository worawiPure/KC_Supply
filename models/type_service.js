var Q = require('q');

module.exports = {

      getList_Type_service: function(db){
          var q = Q.defer();
          db('service_type')
              .select('id','name')
              .orderBy('id','ASC')
              .then(function (rows){
                  q.resolve(rows);
              })
              .catch(function(err){
                  q.reject(err);
              }) ;
              return q.promise;
      },

    getList_Type_treatment: function(db){
        var q = Q.defer();
        db('service_treament')
            .select('id','name')
            .orderBy('id','ASC')
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

    Save_service_time: function (db,data){
        var q = Q.defer();
        db('service_time')
            .insert({
                vstdate: data.service_date,
                hn: data.hn,
                service_type: data.service_type,
                service_other: data.service_other,
                treatment_type: data.treatment_type,
                vsttime_card:data.vsttime_card,
                finish_card:data.finish_card,
                vsttime_screen:data.vsttime_screen,
                finish_screen:data.finish_screen,
                vsttime_doctor:data.vsttime_doctor,
                finish_doctor:data.finish_doctor,
                vsttime_lab:data.vsttime_lab,
                finish_lab:data.finish_lab,
                vsttime_xray:data.vsttime_xray,
                finish_xray:data.finish_xray,
                vsttime_ekg:data.vsttime_ekg,
                finish_ekg:data.finish_ekg,
                vsttime_other:data.vsttime_other,
                finish_other:data.finish_other,
                vsttime_appointment:data.vsttime_appointment,
                finish_appointment:data.finish_appointment,
                vsttime_drugs:data.vsttime_drugs,
                finish_drugs:data.finish_drugs
            })
            .then(function(rows) {
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    search_date: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT DATE_FORMAT(s.vstdate,"%d/%m/%Y") as service_date,s.*,t.name as Type,r.name as Treatment FROM service_time as s '+
        'LEFT JOIN service_type as t ON t.id=s.service_type                      '+
        'LEFT JOIN service_treament as r ON r.id=s.treatment_type                '+
        'WHERE vstdate BETWEEN ? AND ? ' +
        'ORDER by vstdate ASC ';
        db.raw(sql,[data.date1,data.date2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    update_opd: function (db,data) {
        var q = Q.defer();
        db('service_time')
            .update({
                vstdate: data.service_date,
                hn: data.hn,
                service_type: data.service_type,
                service_other: data.service_other,
                treatment_type: data.treatment_type,
                vsttime_card:data.vsttime_card,
                finish_card:data.finish_card,
                vsttime_screen:data.vsttime_screen,
                finish_screen:data.finish_screen,
                vsttime_doctor:data.vsttime_doctor,
                finish_doctor:data.finish_doctor,
                vsttime_lab:data.vsttime_lab,
                finish_lab:data.finish_lab,
                vsttime_xray:data.vsttime_xray,
                finish_xray:data.finish_xray,
                vsttime_ekg:data.vsttime_ekg,
                finish_ekg:data.finish_ekg,
                vsttime_other:data.vsttime_other,
                finish_other:data.finish_other,
                vsttime_appointment:data.vsttime_appointment,
                finish_appointment:data.finish_appointment,
                vsttime_drugs:data.vsttime_drugs,
                finish_drugs:data.finish_drugs
            })
            .where('id',data.id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    remove_opd: function(db,id){
        var q = Q.defer();
        db('service_time')
            .delete()
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getOPD_total: function (db,data) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM service_time as s                  '+
            'LEFT JOIN service_type as t ON t.id=s.service_type                      '+
            'LEFT JOIN service_treament as r ON r.id=s.treatment_type                '+
            'WHERE vstdate BETWEEN ? AND ?                                          ';
        db.raw(sql,[data.date1,data.date2])
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getOPD_page: function (db,date_search1,date_search2,startpage) {
        var q = Q.defer();
        var sql = 'SELECT s.*,t.name as Type,r.name as Treament FROM service_time as s '+
            'LEFT JOIN service_type as t ON t.id=s.service_type                      '+
            'LEFT JOIN service_treament as r ON r.id=s.treatment_type                '+
            'WHERE vstdate BETWEEN ? AND ?  limit 10 offset ? ';
        db.raw(sql,[date_search1,date_search2,startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    export_special: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT DATE_FORMAT(vstdate,"%m-%d-%Y") as "วันที่",hn,round(time_to_sec((TIMEDIFF(finish_card,vsttime_card)))/60) as "ห้องบัตร" ,    '+
            'round(time_to_sec((TIMEDIFF(vsttime_screen,finish_card)))/60) as "รอซักประวัติ" ,              '+
            'round(time_to_sec((TIMEDIFF(finish_screen,vsttime_screen)))/60) as "ซักประวัติ" ,              '+
            'round(time_to_sec((TIMEDIFF(vsttime_doctor,finish_screen)))/60) as "รอตรวจ",               '+
            'round(time_to_sec((TIMEDIFF(finish_doctor,vsttime_doctor)))/60) as "ตรวจเฉพาะ OPD",            '+
            'round(time_to_sec((TIMEDIFF(finish_lab,vsttime_lab)))/60) as "ห้อง lab",               '+
            'round(time_to_sec((TIMEDIFF(finish_xray,vsttime_xray)))/60) as "ห้อง Xray",        '+
            'round(time_to_sec((TIMEDIFF(finish_ekg,vsttime_ekg)))/60) as "ห้อง ekg",           '+
            'round(time_to_sec((TIMEDIFF(finish_other,vsttime_other)))/60) as "อื่นๆ",          '+
            'round(time_to_sec((TIMEDIFF(vsttime_appointment,vsttime_doctor)))/60) as "ระยะเวลาตรวจพิเศษ", '+
            'round(time_to_sec((TIMEDIFF(finish_appointment,vsttime_appointment)))/60) as "ให้คำแนะนำ",     '+
            'round(time_to_sec((TIMEDIFF(finish_drugs,vsttime_appointment)))/60) as "รับยา",                '+
            'round(time_to_sec((TIMEDIFF(finish_appointment,finish_card)))/60) as "รอคอยซักประวัติ ถึง ให้คำแนะนำหลังตรวจ", '+
            'round(time_to_sec((TIMEDIFF(finish_drugs,vsttime_card)))/60) as "ทำบัตร - รับยากลับบ้าน"           '+
            'FROM service_time                                                                                  '+
            'WHERE vstdate BETWEEN ? AND ?                                                   '+
            'AND treatment_type = "2"  ';

        db.raw(sql,[data.date_report_special1,data.date_report_special2])
            .then(function (rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                q.reject(err)
            });
        return q.promise;
    },

    export_normal: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT DATE_FORMAT(vstdate,"%m-%d-%Y") as "วันที่",hn,round(time_to_sec((TIMEDIFF(finish_card,vsttime_card)))/60) as "ห้องบัตร" ,    '+
            'round(time_to_sec((TIMEDIFF(vsttime_screen,finish_card)))/60) as "รอซักประวัติ" ,              '+
            'round(time_to_sec((TIMEDIFF(finish_screen,vsttime_screen)))/60) as "ซักประวัติ" ,              '+
            'round(time_to_sec((TIMEDIFF(vsttime_doctor,finish_screen)))/60) as "รอตรวจ",               '+
            'round(time_to_sec((TIMEDIFF(finish_doctor,vsttime_doctor)))/60) as "ตรวจเฉพาะ OPD",            '+
            'round(time_to_sec((TIMEDIFF(finish_appointment,vsttime_appointment)))/60) as "ให้คำแนะนำ",     '+
            'round(time_to_sec((TIMEDIFF(finish_drugs,vsttime_appointment)))/60) as "รับยา",                '+
            'round(time_to_sec((TIMEDIFF(finish_appointment,finish_card)))/60) as "รอคอยซักประวัติ ถึง ให้คำแนะนำหลังตรวจ", '+
            'round(time_to_sec((TIMEDIFF(finish_drugs,vsttime_card)))/60) as "ทำบัตร - รับยากลับบ้าน"           '+
            'FROM service_time                                                                                  '+
            'WHERE vstdate BETWEEN ? AND ?                                                   '+
            'AND treatment_type = "1"  ';

        db.raw(sql,[data.date_report_normal1,data.date_report_normal2])
            .then(function (rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                q.reject(err)
            });
        return q.promise;
    }
};