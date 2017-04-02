$(function(){
    var products = [];
    var products_save = [];
    var setTable_show_items = function(){
        var $tbl_show = $('#tbl_basket > tbody');
        $tbl_show.empty();
        var i = 0;
        _.forEach(products, function(v,x){
            i++;
            var html = '<tr> ' +
                '<input type="hidden" name="id" style="width:60px" value="'+ v.id +'">' +
                '<td> ' + i + ' </td>' +
                '<td> ' + v.name + ' </td>' +
                '<td> '+
                '<input data-name="txt_number" type="number" name="qty" style="width:60px" value="'+  v.qty  +'"> '+
                '<td> ' + v.unit + ' </td>' +
                '<td> '+
                '<a class="btn btn-danger btn-sm" href="#" data-action="remove_items" data-id="'+ x +'" data-toggle="tooltip" data-placement="top" title="ลบรายการนี้" > '+
                '<i class="glyphicon glyphicon-trash"> </i></a> ';
                html += '</div></td> ';
            $tbl_show.append(html);
        });
            $('[data-toggle="tooltip"]').tooltip();
        }

    var setTable_items = function(data){
        var $tbl_items = $('#tbl_items > tbody');
        $tbl_items.empty();
        var i = 0;
        _.forEach(data.rows, function (v) {
            i++;
            var html = '<tr> ' +
                '<td> ' + v.id + ' </td>' +
                '<td> ' + v.kind_name + ' </td>' +
                '<td><center>' +
                '<input  data-name="txt_number" type="number" name="amount" style="width:60px" value="">' +
                '<input type="hidden" name="id" style="width:60px" value="'+ v.id +'">' +
                '<input type="hidden" name="name" style="width:60px" value="'+ v.kind_name +'">' +
                '<input type="hidden" name="unit" style="width:60px" value="'+ v.unitname +'">' +
                '</center></td>' +
            '<td>' + v.unitname + ' </td>';
            html += '</div></td> ';
            $tbl_items.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
    };

    $(document).on('change','input[data-name="txt_number"]',function(e){
        if(isNaN($(this).val() )) return false;
    });

    $('#btnProviso').fadeOut();
    $('#Block_Select_items').fadeOut();
    $('#checkProviso').on('change',function(e){
        if(this.checked){
            $('#btnProviso').fadeIn();
            $('#tbl_basket').fadeOut();
            $('#btnSave_items').fadeOut();
        } else {
            $('#btnProviso').fadeOut();
        }
    });

    $('#btnProviso').on('click',function(e){
        $('#Block_Select_items').fadeIn();
        $('#BlockProviso').fadeOut();
        });

    $('#Close_Select_items').on('click',function(e){
        $('#Block_Select_items').fadeOut();
        $('#BlockProviso').fadeIn();
        $('#checkProviso').prop('checked',false);
        $('#btnProviso').fadeOut();
        $('#txtDate_receive').val('');
        products = [];
        setTable_show_items();
    });

    $('#btnClear_items').on('click',function(e){
        if(confirm('คุณต้องการยกเลิกการทำรายการทั้งหมด !! ')) {
            $('#txtDate_receive').val('');
            products = [];
            setTable_show_items();
            $('#btnSave_items').fadeOut();
        }
    });

    $('#Close_Add_items').on('click',function(e){
        $('#slCategory_items').val('');
        $('#tbl_items').fadeOut();
    });

    $('#btnAdd_items').on('click',function(e){
        e.preventDefault();
        $('#tbl_items').fadeOut();
        $("#mdlSelect_items").modal({
            backdrop:'static',
            keyboard:false
        })
    });

    $('#slCategory_items').on('change', function (e) {
        //   console.log($(this).val());
        var id = $(this).val();
        if (id) {
            $.ajax({
                url: '/items_list',
                method: 'POST',
                data: {id: id}
            })
                .success(function(data){
                    $('#tbl_items').fadeIn();
                    setTable_items(data);
                });
                }
        else {
                alert('กรุณาเลือกประเภทวัสดุ');
            }
    });

    $('button[data-name="btn_save"]').on('click', function(e){
        e.preventDefault();
        var $tr_items = $('#tbl_items > tbody > tr');
        var checkQty = true;
        $tr_items.each(function(tr){
            var $this = $(this);
            var qty = $this.find('input[name="amount"]').val();
            var id = $this.find('input[name="id"]').val();
            var name = $this.find('input[name="name"]').val();
            var unit = $this.find('input[name="unit"]').val();
            if (qty < 0) {
                checkQty = false;
            }
            if (qty && qty >= 0) {
                var product = {};
                product.id = id;
                product.qty = qty;
                product.name = name;
                product.unit = unit;
                products.push(product);
            }
        });
          console.log(products);
          if(!checkQty) {
              alert("มีจำนวนรายการที่น้อยกว่า 0");
          }

        $('#mdlSelect_items').modal('hide')
        setTable_show_items();
        $('#btnSave_items').fadeIn();
        $('#tbl_basket').fadeIn();
    });

    $('#mdlSelect_items').on('hidden.bs.modal', function (e) {
        var $tr_items = $('#tbl_items > tbody > tr');
        $tr_items.each(function(tr){
            var $this = $(this);
            $this.find('input[name="amount"]').val('');
        });
    });

    $(document).on('click','a[data-action="remove_items"]', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่')){
                products.splice(id, 1);
                setTable_show_items();
            }
    });

    $('button[data-name="btnSave_items"]').on('click', function(e){
        e.preventDefault();
        products_save = [];
        var $tr_save = $('#tbl_basket > tbody > tr');
        var checkQty = true;
        $tr_save.each(function(tr){
            var $this = $(this);
            var id = $this.find('input[name="id"]').val();
            var name = $this.find('input[name="name"]').val();
            var qty = $this.find('input[name="qty"]').val();
            var unit = $this.find('input[name="unit"]').val();

            if (qty < 0) {
                checkQty = false;
            }
            if (qty && qty >= 0) {
                var product_save = {};
                product_save.id = id;
                product_save.qty = qty;
                product_save.name = name;
                product_save.unit = unit;
                products_save.push(product_save);
            }
        });

        console.log(products_save);

        var data = {};
        data.date_receive = $('#txtDate_receive').val();
        data.products_save = products_save;
        console.log(data.products_save);
        if (!data.date_receive) {
            alert('กรอกวันที่ต้องการับวัสดุด้วยครับ !!');
        } else if (moment(data.date_receive,'DD/MM/YYYY').format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') ) {
            alert('วันที่ต้องการรับวัสดุเป็นหลังวันทำรายการ กรุณาเช็ควันที่รับวัสดุ !!');
        } else if (!checkQty) {
            alert("มีจำนวนรายการที่น้อยกว่า 0");
        } else {
            if (confirm('คุณต้องการบันทึกรายการนี้ ใช่หรือไม่')) {
                $.ajax({
                    type: "POST",
                    url: "/save_material",
                    contentType: 'application/json',
                    data: JSON.stringify({data: data})
                })
                    .success(function () {
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                        window.location.href = "/material_selection";
                    })
                    .error(function (xhr, status, err) {
                        alert(err);
                    })
            }
        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});