var Q = require('q');
var moment = require('moment');

module.exports = {

    getUpdate_status_bill: function (db,data) {
        var q = Q.defer();
        db('bills')
            .update({
                status_pay: 'Y',
                update_time: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            .where('bill_no',data.bill_no)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    getRemove_bills: function(db,data){
        var q = Q.defer();
        db('stock_material')
            .delete()
            .where('bill_no',data.bill_no)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

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
          'AND s.status <> "Y" '+
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

    getList_unit_total: function (db) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM stock_tb_unit';
        db.raw(sql)
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_type_total: function (db) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM stock_tb_kind_category';
        db.raw(sql)
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_admin_total: function (db,date_service) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills where SUBSTRING(service_date,1,10) = ? ';
        db.raw(sql,[date_service])
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_not_approve_admin_total: function (db) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills where status_pay IS NULL  ';
        db.raw(sql)
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_approve_admin_total: function (db) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills where status_pay = "Y"  ';
        db.raw(sql)
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_unit_detail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT * FROM stock_tb_unit '+
            'ORDER BY id ASC limit 5 offset ? ';
        db.raw(sql,[startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_type_detail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT * FROM stock_tb_kind_category '+
            'ORDER BY id ASC limit 5 offset ? ';
        db.raw(sql,[startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_admin_Detail: function (db,date_service,startpage) {
        var q = Q.defer();
        var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive,        '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,m.items_id,k.kind_name,m.qty,m.pay,u.unitname,u.id,d.depname FROM  bills b '+
            'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
            'LEFT JOIN stock_tb_kind_type k ON k.id=m.items_id  '+
            'LEFT JOIN stock_tb_unit u ON u.id=k.unitid '+
            'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
            'WHERE SUBSTRING(b.service_date,1,10) = ?  '+
            'AND (b.status_pay is NULL '+
            'OR b.status_pay = "") '+
            'GROUP BY b.bill_no '+
            'ORDER BY b.service_date DESC limit 20 offset ? ';
        db.raw(sql,[date_service,startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_admin_not_approve_Detail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive,        '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,m.items_id,k.kind_name,m.qty,m.pay,u.unitname,u.id,d.depname FROM  bills b '+
            'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
            'LEFT JOIN stock_tb_kind_type k ON k.id=m.items_id  '+
            'LEFT JOIN stock_tb_unit u ON u.id=k.unitid '+
            'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
            'WHERE (b.status_pay is NULL '+
            'OR b.status_pay = "") '+
            'GROUP BY b.bill_no '+
            'ORDER BY b.service_date DESC limit 20 offset ? ';
        db.raw(sql,[startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_bills_admin_approve_Detail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,d.depname FROM  bills b '+
            'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
            'WHERE b.status_pay = "Y" '+
            'GROUP BY b.bill_no  '+
            'ORDER BY b.service_date DESC  limit 15 offset ? ';
        db.raw(sql,[startpage])
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
        var sql =   'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,d.depname FROM  bills b '+
            'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
            'WHERE b.bill_no Like ? '+
            'AND b.status_pay = "Y" '+
            'ORDER BY b.service_date DESC';
        var query = '%'+data.bills+'%';
        db.raw(sql,[query])
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
        var sql =   'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
            'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
            'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,d.depname FROM  bills b '+
            'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
            'WHERE b.service_date between ? and ?    '+
            'AND b.status_pay = "Y" '+
            'ORDER BY b.service_date DESC';
        db.raw(sql,[data.date1,data.date2])
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

    getSearch_date_bill_payable: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
        'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
        'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
        'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,(m.qty-m.pay) as pab,d.depname FROM  bills b '+
        'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
        'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
        'WHERE b.service_date between ?  and  ?  '+
        'AND b.status_pay = "Y" '+
        'AND (m.qty-m.pay) <> 0 '+
        'GROUP BY b.bill_no '+
        'ORDER BY b.service_date DESC ';
        db.raw(sql,[data.date1,data.date2])
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
        var sql =   ' SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
        'concat(DATE_FORMAT(DATE_ADD(b.service_date,INTERVAL 543 YEAR),"%Y-%m-%d"),"/",SUBSTRING(b.service_date,11,11)) as date_service, '+
        'DATE_FORMAT(DATE_ADD(b.receive_date,INTERVAL 543 YEAR),"%Y-%m-%d") as date_receive, '+
        'IF(b.status_pay is NULL,"ยังไม่อนุมัติ","อนุมัติ") as pay_status,b.user_order,t.kind_name,m.qty,u.unitname,IF(m.pay IS NULL,"0",m.pay) AS pay,' +
        '(m.qty-m.pay) AS pab,d.depname  FROM  bills b '+
        'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
        'LEFT JOIN stock_tb_kind_type t ON t.id=m.items_id   '+
        'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
        'LEFT JOIN tb_department d ON d.depcode=b.depcode '+
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
        var sql =   ' SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
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

    getShow_items_approve: function (db,bill_no) {
        var q = Q.defer();
        var sql = 'SELECT concat("KC",SUBSTRING(b.service_date,1,6),b.bill_no) as bill,b.bill_no, '+
            'b.user_order,m.items_id,k.kind_name,m.qty,m.pay,u.unitname FROM  bills b '+
            'INNER JOIN stock_material m ON m.bill_no=b.bill_no '+
            'LEFT JOIN stock_tb_kind_type k ON k.id=m.items_id  '+
            'LEFT JOIN stock_tb_unit u ON u.id=k.unitid '+
            'WHERE b.bill_no = ? ';
        db.raw(sql,[bill_no])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getCount_total_approve_today: function (db,date_today){
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills  where SUBSTRING(service_date,1,10) = ?  '+
            ' AND status_pay IS NULL ';
        db.raw(sql,[date_today])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getCount_total_not_approve: function (db){
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM bills  where status_pay IS NULL ';
        db.raw(sql)
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    remove_unit: function(db,id){
        var q = Q.defer();
        db('stock_tb_unit')
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

    update_unit: function(db,id,name){
        var q = Q.defer();
        db('stock_tb_unit')
            .update({unitname:name})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_unit: function(db,name){
        var q = Q.defer();
        db('stock_tb_unit')
            .insert({unitname:name})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_type: function(db,id){
        var q = Q.defer();
        db('stock_tb_kind_category')
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

    update_type: function(db,id,name){
        var q = Q.defer();
        db('stock_tb_kind_category')
            .update({kind_category:name})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_type: function(db,name){
        var q = Q.defer();
        db('stock_tb_kind_category')
            .insert({kind_category:name})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getShow_category_name: function (db,id) {
        var q = Q.defer();
        db('stock_tb_kind_category')
            .select()
            .where('id',id)
            .then(function (rows) {
                q.resolve(rows)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_unit: function(db){
        var q = Q.defer();
        db('stock_tb_unit')
            .select()
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getList_category: function(db){
        var q = Q.defer();
        db('stock_tb_kind_category')
            .select()
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getList_items_type_total: function (db,id) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM stock_tb_kind_type WHERE kind_category_id = ? AND kind_name <> "" ';
        db.raw(sql,[id])
            .then(function(rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getList_items_type_detail: function (db,id,startpage) {
        var q = Q.defer();
        var sql = 'SELECT t.*,IF(t.status="","Y","N") AS sta,u.unitname  FROM  stock_tb_kind_type t '+
        'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
        'WHERE t.kind_category_id = ? '+
        'AND t.kind_name <> "" '+
        'ORDER BY t.kind_name  limit 10 offset ? ';
        db.raw(sql,[id,startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    save_items_in_type: function(db,name,type,unit,status){
        var q = Q.defer();
        db('stock_tb_kind_type')
            .insert({kind_name:name,kind_category_id:type,unitid:unit,status:status })
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    update_items_in_type: function(db,id,name,type,unit,status){
        var q = Q.defer();
        db('stock_tb_kind_type')
            .update({kind_name:name,kind_category_id:type,unitid:unit, status:status})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_items_in_type: function(db,id){
        var q = Q.defer();
        db('stock_tb_kind_type')
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

    getSearch_items: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT t.*,IF(t.status="","Y","N") AS sta,u.unitname  FROM  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'WHERE t.kind_name Like ? '+
            'AND t.kind_category_id = ? '+
            'ORDER BY t.kind_name DESC';
        var query = '%'+data.items+'%';
        var query2 = ''+data.id+'';
        db.raw(sql,[query,query2])
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
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
};