var getCountReceive = function() {
    $.ajax({
        method: 'POST',
        url: '/admin/count_approve_today',
        dataType: 'json'
    })
        .success(function (data) {
            if (data.ok) {
                $('#dataTotal').text(data.total);
            } else {
                console.log(data.msg);
                alert('ไม่สามารถติดต่อฐานข้อมูลได้')
            }
        })
        .error(function (xhr, status, err) {
            console.log(err);
            alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
        })
};
getCountReceive();