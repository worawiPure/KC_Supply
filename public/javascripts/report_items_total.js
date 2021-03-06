$(function() {
    var setTable = function(data){
        var $tblItems_total = $('#tblReport_items_total > tbody');
        $tblItems_total.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.Name_Kind + ' </td>'+
                '<td>' + v.M1  + ' </td>'+
                '<td>' + v.M2  + ' </td>'+
                '<td>' + v.M3  + ' </td>'+
                '<td>' + v.M4  + ' </td>'+
                '<td>' + v.M5  + ' </td>'+
                '<td>' + v.M6  + ' </td>'+
                '<td>' + v.M7  + ' </td>'+
                '<td>' + v.M8  + ' </td>'+
                '<td>' + v.M9  + ' </td>'+
                '<td>' + v.M10  + ' </td>'+
                '<td>' + v.M11  + ' </td>'+
                '<td>' + v.M12  + ' </td>';

            html += '</div></td> ';
            $tblItems_total.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
    };

    $('#btnPrint').fadeOut('slow');
    $('#btnSearch').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search1 = $('#Date_Search1').val();
        var search2 = $('#Date_Search2').val();
        var type = $('#slCategory').val();
        data.date1 =  search1;
        data.date2 = search2;
        data.type = type;
        if(!data.date1 || !data.date2 || !data.type ) {
            $('#divAlert').fadeIn('slow');
        } else {
            $('#divAlert').fadeOut('slow');
            $('#btnPrint').fadeIn('slow');
            NProgress.start();
            console.log(data);
            $.ajax({
                type: "POST",
                url: "/reports/show_report_items_type_total",
                contentType: 'application/json',
                data: JSON.stringify(data)
            })
                .success(function(data) {
                    setTable(data);
                    NProgress.done();
                })
                .error(function (xhr, status, err) {
                    alert(err);
                })
        }
    });

    $('#btnPrint').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search1 = $('#Date_Search1').val();
        var search2 = $('#Date_Search2').val();
        var type = $('#slCategory').val();
        data.date1=moment(search1, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
        data.date2=moment(search2, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
        data.type = type;
        window.open('/prints/report_items_type/' + data.date1 + '/' +data.date2+ '/' +data.type)
    });

});