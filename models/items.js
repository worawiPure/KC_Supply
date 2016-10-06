var Q = require('q');
var moment = require('moment');

module.exports = {

      getList_material_category: function(db){
            var q = Q.defer();
            db('stock_tb_kind_category')
                .select()
                .orderBy('id','ASC')
                .then(function (rows){
                    q.resolve(rows);
                })
                .catch(function(err){
                    q.reject(err);
                });
                return q.promise;
      },

      getList_material_items: function(db,data){
          var q = Q.defer();
          var sql = 'SELECT s.id,s.kind_name,u.unitname FROM  stock_tb_kind_type s '+
          'LEFT JOIN stock_tb_unit u ON u.id=s.unitid '+
          'WHERE s.kind_category_id = ? '+
          'AND s.status = "Y" '+
          'ORDER BY s.kind_name';
          db.raw(sql,[data.id])
              //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
              .then(function(rows){
                  console.log(rows[0]);
                  q.resolve(rows[0])
              })
              .catch(function(err){
                  console.log(err);
                  q.reject(err)
              });
          return q.promise;
      },

     getSave_bill: function (db,data) {
            var q = Q.defer();
            db('bills')
                .returning('bill_no')
                .insert({
                    service_date: data.date_service,
                    receive_date: data.date_receive,
                    user_order: data.username,
                    update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    depcode: data.depcode
                })
                .then(function (rows) {
                    q.resolve(rows);
                })
                .catch(function (err) {
                    q.reject(err);
                });
            return q.promise;
    },

    getSave_material: function(db,data){
        var q = Q.defer();
        db('stock_material')
            .insert(data)
            .then(function () {
                q.resolve();
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    getList_bills_total: function (db,username) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills where user_order = ?  ';
        db.raw(sql,[username])
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_Detail: function (db,username,startpage) {
        var q = Q.defer();
        var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
                    'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
                    'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
                    'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order FROM  bills b '+
                    'WHERE b.user_order = ? '+
                    'GROUP BY b.bill_no  '+
                    'ORDER BY b.service_date DESC  limit 15 offset ? ';
        db.raw(sql,[username,startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSearch_bill: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order FROM  bills b '+
            'WHERE b.bill_no Like ? '+
            'AND b.user_order = ? '+
            'ORDER BY b.service_date DESC';
        var query = '%'+data.bills+'%';
        db.raw(sql,[query,data.username])
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

    getSearch_date_bill: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order FROM  bills b '+
            'WHERE b.service_date between ? and ?    '+
            'AND b.user_order = ? '+
            'ORDER BY b.service_date DESC';
        db.raw(sql,[data.date1,data.date2,data.username])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getShow_bill: function(db,id){
        var q = Q.defer();
        var sql =   ' SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
        'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
        'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
        'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,t.kind_name,m.qty,u.unitname,IF(m.pay IS NULL,"0",m.pay) AS pay,' +
        '(m.qty-m.pay) AS pab  FROM  bills b '+
        'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
        'LEFT JOIN stock_tb_kind_type t ON t.id=m.items_id   '+
        'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
        'WHERE b.bill_no = ? ';
        db.raw(sql,[id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getReport_bills: function(db,id){
        var q = Q.defer();
        var sql =   ' SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,t.kind_name,m.qty,u.unitname,IF(m.pay IS NULL,"0",m.pay) AS pay,' +
            '(m.qty-m.pay) AS pab,p.depname  FROM  bills b '+
            'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
            'LEFT JOIN stock_tb_kind_type t ON t.id=m.items_id   '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'LEFT JOIN tb_department p ON p.depcode=b.depcode '+
            'WHERE b.bill_no = ? ';
        db.raw(sql,[id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_receive_total: function (db,username,today) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills ' +
            'where user_order = ? ' +
            'and receive_date = ?  ';
        db.raw(sql,[username,today])
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_receive_Detail: function (db,username,today,startpage) {
    var q = Q.defer();
    var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,5),b.bill_no) as bill,b.bill_no, '+
        'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
        'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
        'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order FROM  bills b '+
        'WHERE b.user_order = ? '+
        'and b.receive_date = ? '+
        'GROUP BY b.bill_no  '+
        'ORDER BY b.service_date DESC  limit 15 offset ? ';
    db.raw(sql,[username,today,startpage])
        .then(function (rows) {
            q.resolve(rows[0])
        })
        .catch(function (err) {
            console.log(err)
            q.reject(err)
        });
    return q.promise;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

};