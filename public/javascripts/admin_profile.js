$(function(){

    $('#btnEdit').on('click', function(e){
        //   console.log($(this).val());
        var data = {};
        data.id = $('#txtId').val();
        data.username = $('#txtUsername').val();
        data.prefixnamel = $('#slPname').val();
        data.name = $('#txtName').val();
        data.surname = $('#txtLname').val();
        data.depcode = $('#slDepartment').val();

        if(!data.username|| !data.prefixnamel|| !data.name || !data.surname || !data.depcode ) {
            $('#divAlert').fadeIn('slow');
            setTimeout(function () {
                $('#divAlert').fadeOut('slow');
            }, 2000)
        } else {
            if (confirm('คุณต้องการแก้ไขรายการนี้ ใช่หรือไม่')) {
            $.ajax({
                type: "POST",
                url: "/users/edit_user",
                contentType: 'application/json',
                data:JSON.stringify({data: data})
            })
                .success(function (data) {
                    if (data.ok) {
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                        window.location.href="/users/login";
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
        }
        }
    });

    $('#btnShowModal').on('click',function(e){
        e.preventDefault();
        $("#mdlNew").modal({
            backdrop:'static',
            keyboard:false
        })
    });
    $('#mdlNew').on('hidden.bs.modal', function (e) {
        $('#txtEdit_password').val('');
        $('#txtId').val('');// do something...
    });

    $('#btnSave').on('click',function(e){
        e.preventDefault();
        var username = $('#txtEdit_Username').val();
        var password = $('#txtEdit_password').val();
        var id = $('#txtId_user').val();

        if(username && password){

            $.ajax({
                method:'POST',
                url:'/users/edit_user_password',
                dataType:'json',
                data:{
                    username:username,
                    password:password,
                    id:id
                }
            })
                    .success(function(data){
                        if(data.ok) {
                            alert('แก้ไขเสร็จเรีนบร้อยแล้ว');
                            $('#mdlNew').modal('hide');
                            window.location.href="/users/login";
                        } else {
                            $('#divDuplicated').fadeIn();
                            setTimeout(function () {
                                $('#divDuplicated').fadeOut();
                            }, 2000)
                        }
                    })
                    .error(function(xhr, status, err){
                        console.log(err);
                        alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                    })

        } else{
            alert('กรุณาระบุ USER/PASSWORD')
        }
    });

})