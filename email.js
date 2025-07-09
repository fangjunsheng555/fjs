// 绑定 click 和 touchstart（兼容所有设备）
var sendEmailDiv = document.getElementById("send-email");
sendEmailDiv.addEventListener("click", sendEmail, false);
sendEmailDiv.addEventListener("touchstart", sendEmail, false);

function sendEmail(e){
    if(e) e.preventDefault(); // 防止表单默认提交

    // 取值
    var email = $("#email-address").val().trim();
    var subject = $("#email-subject").val().trim();
    var message = $("#email-message").val().trim();

    // 校验
    if(!email.match(/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)){
        alert("请输入有效邮箱地址！");
        return false;
    }
    if(!subject || !message){
        alert("请填写所有信息！");
        return false;
    }

    // EmailJS 发邮件
    emailjs.send("service_sgmxopd", "template_gvwkrda", {
        name: email,            // 你可以换成name输入框
        message: message,
        subject: subject,
        email: email            // Reply To
    }).then(function(response) {
        alert("发送成功！");
        $("#email-address").val('');
        $("#email-subject").val('');
        $("#email-message").val('');
    }, function(error) {
        alert("发送失败，请稍后重试！");
        console.log("EmailJS ERROR", error);
    });

    return false;
}
