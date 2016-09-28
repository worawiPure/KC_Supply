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
                '<a class="btn btn-success" data-action="approve" data-id="'+ v.bill_no +'" data-number="'+ v.bill +'" data-depname="'+ v.depname +'"  ' +
                ' type="button"  data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด">' +
                ' <i class="fa fa-search"></i></a> '+
                '</div></td> ';
            $tblBill.append(html);
        })
    };

    $('#show_list_bills').fadeOut();
    $('#btnSearch_date').on('click', function(e) {
        e.preventDefault();
        var data = {};
        var date_search1 = $('#Date_Search1').val();
        var date_search2 = $('#Date_Search2').val();
        data.date1 = date_search1;
        data.date2 = date_search2;
        $.ajax({
            type: "POST",
            url: "/admin/search_date_bills_payable",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#show_list_bills').fadeIn();
            })
    });
    $(document).on('click','a[data-action="approve"]',function(e){
        e.preventDefault();
        var bill_no = $(this).data('id');
        var bill = $(this).data('number');
        var depname = $(this).data('depname');
        $.ajax({
            type: "POST",
            url: "/admin/show_items_approve",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify({bill_no:bill_no})
        })
            .success(function(data){
                console.log(data);
                var setTable_items = function(data){
                    var $tbl_items = $('#tbl_items_approve > tbody');
                    $tbl_items.empty();
                    var i = 0;
                    $('#txtBill').val(bill);
                    $('#txtDepartment').val(depname);
                    $('#txtId').val(bill_no);
                    _.forEach(data.items, function (v) {
                        i++;
                        var html = '<tr> ' +
                            '<td> ' + i + ' </td>' +
                            '<td> ' + v.kind_name + ' </td>' +
                            '<td><center>' +
                            '<input  data-name="txt_number"  name="qty" style="width:60px" value="'+ v.qty +'" readonly>' +
                            '</center></td>' +
                            '<td><center>' +
                            '<input  data-name="txt_number" type="number" name="pay" style="width:60px" value="'+ v.pay +'">' +
                            '</center></td>' +
                            '<input type="hidden" name="id" style="width:60px" value="'+ v.bill_no +'">' +
                            '<input type="hidden" name="items_id" style="width:60px" value="'+ v.items_id +'">' +
                            '<td>' + v.unitname + '</td>';
                        html += '</tr> ';
                        $tbl_items.append(html);
                    });
                    $('[data-toggle="tooltip"]').tooltip();
                };
                setTable_items(data);
                $("#mdlNew").modal({
                    backdrop:'static',
                    keyboard:false
                })
            })
    });

    $('#mdlNew').on('hidden.bs.modal', function (e) {
        // do something...
    });

    $('#btnAdd_approve').on('click',function(e) {
        e.preventDefault();
        var data = {};
        data.bill_no = $('#txtId').val();
        var products = [];
        data.products = products;

        var $tr_items = $('#tbl_items_approve > tbody > tr');
        var checkQty = true;
        $tr_items.each(function(tr){
            var $this = $(this);
            var pay = $this.find('input[name="pay"]').val();
            var qty = $this.find('input[name="qty"]').val();
            var items_id = $this.find('input[name="items_id"]').val();
            if (pay < 0 || pay > qty ) {
                checkQty = false;
            }
            if (pay && pay >= 0) {
                var product = {};
                product.items_id = items_id;
                product.qty = qty;
                product.pay = pay;
                products.push(product);
            }
        });

        if(!checkQty) {
            alert("มีจำนวนรายการจ่ายที่น้อยกว่า 0 หรือ มีจำนวนจ่ายวัสดุเกินการเบิก");
        }
        else
        {
            if (confirm('คุณต้องการบันทึกรายการนี้ ใช่หรือไม่')) {
                $.ajax({
                    type: "POST",
                    url: "/admin/save_approve_material",
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                })
                    .success(function () {
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                        $('#mdlNew').modal('hide')
                        setTable(data);
                        window.open('/prints/report_approve_bills/'+ data.bill_no);
                    })
                    .error(function (xhr, status, err) {
                        alert(err);
                    })
            }
        }
    });
    setTable();
});
