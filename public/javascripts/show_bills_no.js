$(function(){
    $('#btnPrint').on('click', function(e){
        e.preventDefault();
        var data = {};
        data.bill_no = $('#txtId').val();
        window.open('/print_bill/'+ data.bill_no, '_blank');
    });
});