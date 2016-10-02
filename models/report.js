var Q = require('q');
var moment = require('moment');

module.exports = {

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

    getShow_department_name: function (db,depcode) {
        var q = Q.defer();
        db('tb_department')
            .select()
            .where('depcode',depcode)
            .then(function (rows) {
                q.resolve(rows)
            })
            .catch(function (err) {
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

    getReport_show_items_type_total: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m   '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 1 and m.items_id=t.id) as M1,  '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m   '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no  '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 2 and m.items_id=t.id) as M2, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 3 and m.items_id=t.id) as M3, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 4 and m.items_id=t.id) as M4, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 5 and m.items_id=t.id) as M5, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 6 and m.items_id=t.id) as M6, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 7 and m.items_id=t.id) as M7, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 8 and m.items_id=t.id) as M8, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 9 and m.items_id=t.id) as M9, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 10 and m.items_id=t.id) as M10, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 11 and m.items_id=t.id) as M11, '+
        '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
        'INNER JOIN bills b ON b.bill_no=m.bill_no '+
        'WHERE b.receive_date BETWEEN ? and ? '+
        'and month(b.receive_date) = 12 and m.items_id=t.id) as M12 '+
        'from  stock_tb_kind_type t '+
        'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
        'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
        'WHERE g.id = ? '+
        'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
        'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
        'ORDER BY t.kind_name ';
        db.raw(sql,[data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.type])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getReport_show_items_type_total2: function(db,date1,date2,id){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m   '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 1 and m.items_id=t.id) as M1,  '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m   '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no  '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 2 and m.items_id=t.id) as M2, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 3 and m.items_id=t.id) as M3, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 4 and m.items_id=t.id) as M4, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 5 and m.items_id=t.id) as M5, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 6 and m.items_id=t.id) as M6, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 7 and m.items_id=t.id) as M7, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 8 and m.items_id=t.id) as M8, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 9 and m.items_id=t.id) as M9, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 10 and m.items_id=t.id) as M10, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 11 and m.items_id=t.id) as M11, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? '+
            'and month(b.receive_date) = 12 and m.items_id=t.id) as M12 '+
            'from  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'WHERE g.id = ? '+
            'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
            'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
            'ORDER BY t.kind_name ';
        db.raw(sql,[date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,
            date1,date2,date1,date2,date1,date2,date1,date2,id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getReport_show_items_department_total: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? and month(b.receive_date) = 1 and b.depcode = ? and m.items_id=t.id) as M1, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 2 and b.depcode = ? and m.items_id=t.id) as M2, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 3 and b.depcode = ? and m.items_id=t.id) as M3, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 4 and b.depcode = ? and m.items_id=t.id) as M4, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 5 and b.depcode = ? and m.items_id=t.id) as M5, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 6 and b.depcode = ? and m.items_id=t.id) as M6, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 7 and b.depcode = ? and m.items_id=t.id) as M7, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 8 and b.depcode = ? and m.items_id=t.id) as M8, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 9 and b.depcode = ? and m.items_id=t.id) as M9,' +
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 10 and b.depcode = ? and m.items_id=t.id) as M10, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 11 and b.depcode = ? and m.items_id=t.id) as M11, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 12 and b.depcode = ? and m.items_id=t.id) as M12 '+
            'from  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
            'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
            'ORDER BY t.kind_name ';
        db.raw(sql,[data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,
            data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,
            data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode,data.date1,data.date2,data.depcode])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getReport_show_items_department_total2: function(db,date1,date2,depcode){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? and month(b.receive_date) = 1 and b.depcode = ? and m.items_id=t.id) as M1, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 2 and b.depcode = ? and m.items_id=t.id) as M2, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 3 and b.depcode = ? and m.items_id=t.id) as M3, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 4 and b.depcode = ? and m.items_id=t.id) as M4, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 5 and b.depcode = ? and m.items_id=t.id) as M5, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 6 and b.depcode = ? and m.items_id=t.id) as M6, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 7 and b.depcode = ? and m.items_id=t.id) as M7, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 8 and b.depcode = ? and m.items_id=t.id) as M8, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 9 and b.depcode = ? and m.items_id=t.id) as M9,' +
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 10 and b.depcode = ? and m.items_id=t.id) as M10, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 11 and b.depcode = ? and m.items_id=t.id) as M11, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 12 and b.depcode = ? and m.items_id=t.id) as M12 '+
            'from  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
            'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
            'ORDER BY t.kind_name ';
        db.raw(sql,[date1,date2,depcode,date1,date2,depcode,date1,date2,depcode,date1,date2,depcode,
            date1,date2,depcode,date1,date2,depcode,date1,date2,depcode,date1,date2,depcode,
            date1,date2,depcode,date1,date2,depcode,date1,date2,depcode,date1,date2,depcode])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getReport_show_items_department_total3: function(db,date1,date2){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? and month(b.receive_date) = 1  and m.items_id=t.id) as M1, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 2  and m.items_id=t.id) as M2, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 3 and m.items_id=t.id) as M3, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 4  and m.items_id=t.id) as M4, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 5  and m.items_id=t.id) as M5, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 6  and m.items_id=t.id) as M6, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 7  and m.items_id=t.id) as M7, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 8  and m.items_id=t.id) as M8, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 9 and m.items_id=t.id) as M9,' +
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 10  and m.items_id=t.id) as M10, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 11  and m.items_id=t.id) as M11, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 12  and m.items_id=t.id) as M12 '+
            'from  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
            'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
            'ORDER BY t.kind_name ';
        db.raw(sql,[date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,date1,date2,
            date1,date2,date1,date2,date1,date2,date1,date2])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getReport_show_items_department_total4: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT concat(t.kind_name,"  ","(",u.unitname,")") as Name_Kind, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ? and month(b.receive_date) = 1  and m.items_id=t.id) as M1, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 2  and m.items_id=t.id) as M2, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 3  and m.items_id=t.id) as M3, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 4  and m.items_id=t.id) as M4, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 5  and m.items_id=t.id) as M5, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 6  and m.items_id=t.id) as M6, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 7  and m.items_id=t.id) as M7, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 8  and m.items_id=t.id) as M8, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 9  and m.items_id=t.id) as M9,' +
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 10  and m.items_id=t.id) as M10, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 11  and m.items_id=t.id) as M11, '+
            '(select IFNULL(SUM(m.pay),0) FROM stock_material m '+
            'INNER JOIN bills b ON b.bill_no=m.bill_no '+
            'WHERE b.receive_date BETWEEN ? and ?  '+
            'and month(b.receive_date) = 12  and m.items_id=t.id) as M12 '+
            'from  stock_tb_kind_type t '+
            'LEFT JOIN stock_tb_kind_category g ON g.id=t.kind_category_id '+
            'LEFT JOIN stock_tb_unit u ON u.id=t.unitid '+
            'HAVING M1 > 0 OR M2 > 0 OR M3 > 0 OR M4 > 0 OR M5 > 0 OR M6 > 0 '+
            'OR M7 > 0 OR M8 > 0 OR M9 > 0 OR M10 > 0 OR M11 > 0 OR M12 > 0 '+
            'ORDER BY t.kind_name ';
        db.raw(sql,[data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
};