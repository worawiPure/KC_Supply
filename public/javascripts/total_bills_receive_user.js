var getCountReceive = function() {
    $.ajax({
        method: 'POST',
        url: '/count_receive_today_user',
        dataType: 'json'
    })
        .success(function (data) {
            if (data.ok) {
                $('#dataTotal').text(data.total);
            } else {
                console.log(data.msg);
                alert('ไม่สามารถบันทึได้')
            }
        })
        .error(function (xhr, status, err) {
            console.log(err);
            alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
        })
};
getCountReceive();