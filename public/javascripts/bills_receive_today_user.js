$(function(){
    var setTable = function(data){
        var $tblBill = $('#tbl_list_bills > tbody');
        $tblBill.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.bill + '</td>'+
                '<td> ' + v.date_service + ' </td>'+
                '<td> ' + v.date_receive + ' </td>'+
                '<td> ' + v.pay_status + ' </td>'+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/show_bill/'+ v.bill_no +'" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด">' +
                ' <i class="fa fa-search"></i></a> '+
                '</div></td> ';
                //'<td> '+
                //'<div class="btn-group btn-group-sm" role="group"> '+
                //'<a class="btn btn-info" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นรายละเอียด"> <i class="fa fa-print"></i></a>';
                //'</div></td> ';
            $tblBill.append(html);
        })
    }

    var getList_bill = function(){
        $.ajax({
            method:'POST',
            url:'/list_bills_receive_total',
            dataType:'json'
        })
            .success(function(data){
                //setTable(data);
                $("#paging").paging(data.total, {
                    format: "< . (qq -) nnncnnn (- pp) . >",
                    perpage: 15,
                    lapping: 0,
                    page: 1,
                    onSelect: function (page) {
                        var startRecord = this.slice[0];
                        console.log(this.slice);
                        $.ajax({
                            method:'POST',
                            url:'/list_bills_receive_page',
                            dataType:'json',
                            contentType:'application/json',
                            data: JSON.stringify({startRecord:startRecord})
                        })
                            .success(function(data){
                                setTable(data);
                            })
                        // Index.getService(start, end, startRecord, function (err, rows) {
                        //     if (err) console.log(err);
                        //     else Index.setServiceList(rows);
                        // });
                    },
                    onFormat: function (type) {
                        switch (type) {
                            case 'block':

                                if (!this.active)
                                    return '<li class="disabled"><a href="">' + this.value + '</a></li>';
                                else if (this.value != this.page)
                                    return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
                                return '<li class="active"><a href="#">' + this.value + '</a></li>';

                            case 'right':
                            case 'left':

                                if (!this.active) {
                                    return "";
                                }
                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

                            case 'next':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&raquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&raquo;</a></li>';

                            case 'prev':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&laquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&laquo;</a></li>';

                            case 'first':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&lt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&lt;</a></li>';

                            case 'last':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&gt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&gt;</a></li>';

                            case 'fill':
                                if (this.active) {
                                    return '<li class="disabled"><a href="#">...</a></li>';
                                }
                        }
                        return ""; // return nothing for missing branches
                    }
                });
            })
    };
    getList_bill();
});