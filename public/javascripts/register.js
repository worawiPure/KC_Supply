$(function(){
    $('#btnSaveregister').on('click', function(e){
         console.log($(this).val());
        var data = {};
        data.username = $('#txtUsername').val();
        data.password = $('#txtPassword').val();
        data.pname = $('#slPname').val();
        data.fname = $('#txtName').val();
        data.lname = $('#txtLname').val();
        data.department = $('#slDepartment').val();
        data.level_user = $('#slLayer').val();

        if(!data.username|| !data.password || !data.pname || !data.fname || !data.lname || !data.department || !data.level_user ) {
            $('#divAlert').fadeIn('slow');
            setTimeout(function () {
                $('#divAlert').fadeOut('slow');
            }, 2000)
        } else {
        if (confirm('คุณต้องการบันทึกรายการนี้ ใช่หรือไม่')) {
            $.ajax({
                type: "POST",
                url: "/users/check_register",
                contentType: 'application/json',
                data:JSON.stringify({data: data})
            })
                .success(function (data) {
                    if (data.ok) {
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                        window.location.href="/users/user";
                    } else {
                        $('#divDuplicated').fadeIn();
                        setTimeout(function () {
                            $('#divDuplicated').fadeOut();
                        }, 2000)
                        //alert(data.msg);
                    }
                })
                .error(function (xhr, status, err) {
                    alert("ไม่สามารถเชื่อมต่อกับแม่ข่ายได้")
                })
        }}
    });
});