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
                '<td> ' + v.depname + ' </td>'+
                '<td> ' + v.pay_status + ' </td>'+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/admin/show_bill/'+ v.bill_no +'" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด">' +
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
            url:'/admin/list_bills_approve_admin_total',
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
                            url:'/admin/list_bills_approve_admin_page',
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

    $('#show_search').fadeOut();
    $('#close_search').on('click',function(e){
        $('#show_list_bills').fadeIn();
        $('#show_search').fadeOut();
        $('#Date_Searchrisk1').val('');
        $('#Date_Searchrisk2').val('');
        $('#txtSearchBills_no').val('');
    });

    $('#btnShowSearch').on('click',function(e){
        $('#show_search').fadeIn();
        $('#show_list_bills').fadeOut();
        $('#Date_Searchrisk1').val('');
        $('#Date_Searchrisk2').val('');
        $('#txtSearchBills_no').val('');
    });

    $('#btnSearch_date').on('click',function(e){
        $('#show_list_bills').fadeIn();
    });

    $('#btnSearch_bills').on('click',function(e){
        $('#show_list_bills').fadeIn();
    });


    $('#paging').fadeIn();
    $('#btnSearch_bills').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search_bills = $('#txtSearchBills_no').val();
        data.bills = search_bills;

        $.ajax({
                type: "POST",
                url: "/admin/search_bills",
                contentType:'application/json',
                dataType:'json',
                data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });

    $('#paging').fadeIn();
    $('#btnSearch_date').on('click', function(e) {
        e.preventDefault();
        var data = {};
        var date_search1 = $('#Date_Search1').val();
        var date_search2 = $('#Date_Search2').val();
        data.date1 = date_search1;
        data.date2 = date_search2;

        $.ajax({
            type: "POST",
            url: "/admin/search_date_bills",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });
    getList_bill();
});