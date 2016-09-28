var Q = require('q');
var moment = require('moment');

module.exports = {

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
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

};