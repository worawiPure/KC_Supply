$(function(){

    var setTable = function(data){
        var $tblItems = $('#tblItems_type > tbody');
        $tblItems.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.kind_name + ' </td>'+
                '<td> ' + v.unitname + ' </td>'+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<button  class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> '+
                '<i class="fa fa-cogs"> </i> </button> '+
                '<ul class="dropdown-menu"> '+
                '<li> '+
                '<a href="#" data-action="edit" data-name="'+ v.kind_name +'" data-categoryid="'+ v.kind_category_id+'" data-unitid="'+ v.unitid+'" data-status="'+ v.status+'" data-id="'+ v.id +'") > '+
                '<i class="fa.fa-edit"> </i> แก้ไข </a></li> '+
                '<li> '+
                '<a href="#" data-action="remove" data-id="'+ v.id +'">'+
                '<i class="fa fa-trash"> </i> ลบ </a></li></ul></div> ';
            $tblItems.append(html);
        })
    };

    var getItems_type = function(){
        var id = $('#txtId').val();
        $.ajax({
            method:'POST',
            url:'/admin/get_items_type_total',
            dataType:'json',
            contentType:'application/json',
            data: JSON.stringify({id:id})
        })
            .success(function(data){
                //setTable(data);
                $("#paging").paging(data.total, {
                    format: "< . (qq -) nnncnnn (- pp) . >",
                    perpage: 10,
                    lapping: 0,
                    page: 1,
                    onSelect: function (page) {
                        var startRecord = this.slice[0];
                        console.log(this.slice);
                        $.ajax({
                            method:'POST',
                            url:'/admin/get_items_type_page',
                            dataType:'json',
                            contentType:'application/json',
                            data: JSON.stringify({startRecord:startRecord,id:id})
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
        $('#show_detail').fadeIn();
        $('#show_search').fadeOut();
        $('#txtSearchItems').val('');
    });

    $('#btnShowSearch').on('click',function(e){
        $('#show_search').fadeIn();
        $('#txtSearchItems').val('');
    });

    $(document).on('click','a[data-action="remove"]', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่')){
            $.ajax({
                method:'POST',
                url:'/admin/remove_items_in_type',
                dataType:'json',
                data:{
                    id:id
                }
            })
                .success(function(data){
                    if(data.ok) {
                        alert('ลบเสร็จเรีนบร้อยแล้ว');
                        getItems_type();
                    } else {
                        console.log(data.msg);
                        alert('ไม่สามารถบันทึได้')
                    }
                })
                .error(function(xhr, status, err){
                    console.log(err);
                    alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                })
        }
    });

    $(document).on('click','a[data-action="edit"]',function(e){
        e.preventDefault();
        var name = $(this).data('name');
        var type = $(this).data('categoryid');
        var unit = $(this).data('unitid');
        var status = $(this).data('status');
        var id2 = $(this).data('id');

        $('#txtName').val(name);
        $('#slType_items').val(type);
        $('#slUnit_items').val(unit);
        if (status == 'N' ){
            $('#checkStatus').prop('checked', false);
        }
        else {
            $('#checkStatus').prop('checked', true);
        }
        $('#txtId2').val(id2);
        $("#mdlNew").modal({
            backdrop:'static',
            keyboard:false
        })
    });

    $('#btnShowModal').on('click',function(e){
        e.preventDefault();
        var id = $('#txtId').val();
        $('#slType_items').val(id);
        $("#mdlNew").modal({
            backdrop:'static',
            keyboard:false
        })
    });

    $('#mdlNew').on('hidden.bs.modal', function (e) {
        $('#txtName').val('');
        $('#slType_items').val('');
        $('#slUnit_items').val('');
        $('#checkStatus').prop('checked', false);
        $('#txtId2').val('');// do something...
    });

    $('#btnSave').on('click',function(e){
        e.preventDefault();
        var name = $('#txtName').val();
        var type = $('#slType_items').val();
        var unit = $('#slUnit_items').val();
        var status = $('#checkStatus').prop('checked') ? 'Y' : 'N';
        var id2 = $('#txtId2').val();
        if(name){
            if(id2){
                if(confirm('คุณต้องการแก้ไขรายการนี้ ใช่หรือไม่')) {
                    $.ajax({
                        method: 'POST',
                        url: '/admin/update_items_in_type',
                        dataType: 'json',
                        data: {
                            name: name,
                            type: type,
                            unit: unit,
                            status: status,
                            id2: id2
                        }
                    })
                        .success(function (data) {
                            if (data.ok) {
                                alert('แก้ไขเสร็จเรีนบร้อยแล้ว');
                                $('#mdlNew').modal('hide');
                                getItems_type();
                            } else {
                                console.log(data.msg);
                                alert('ไม่สามารถบันทึได้')
                            }
                        })
                        .error(function (xhr, status, err) {
                            console.log(err);
                            alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                        })
                }}else{
                if(confirm('คุณต้องการเพิ่มรายการนี้ ใช่หรือไม่')) {
                    $.ajax({
                        method: 'POST',
                        url: '/admin/save_items_in_type',
                        dataType: 'json',
                        data: {
                            name: name,
                            type: type,
                            unit: unit,
                            status: status
                        }
                    })
                        .success(function (data) {
                            if (data.ok) {
                                alert('บันทึกเสร็จเรีนบร้อยแล้ว');
                                $('#mdlNew').modal('hide');
                                getItems_type();
                            } else {
                                console.log(data.msg);
                                alert('ไม่สามารถบันทึได้')
                            }
                        })
                        .error(function (xhr, status, err) {
                            console.log(err);
                            alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                        })
                }}
            //save
        } else{
            alert('กรุณาระบุชื่อวัสดุ')
        }
    });

    $('#paging').fadeIn();
    $('#btnSearch_Items').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search_items = $('#txtSearchItems').val();
        data.items = search_items;

        $.ajax({
            type: "POST",
            url: "/admin/search_items",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });
    getItems_type();
});