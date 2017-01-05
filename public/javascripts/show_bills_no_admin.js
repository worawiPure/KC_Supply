$(function(){
    $('#btnPrint').on('click', function(e){
        e.preventDefault();
        var data = {};
        data.bill_no = $('#txtId').val();
        data.category_id = $('#txtcategory').val();
        window.open('/admin/print_bill/'+ data.bill_no +'/'+ data.category_id, '_blank');
    });

    $('#btnPrint2').on('click', function(e){
        e.preventDefault();
        var data = {};
        data.bill_no = $('#txtId').val();
        data.category_id = $('#txtcategory2').val();
        window.open('/admin/print_bill/'+ data.bill_no +'/'+ data.category_id, '_blank');
    });
});