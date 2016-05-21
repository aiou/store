window.addEventListener('load', function () {
		FastClick.attach(document.body);
	}, false);
var InterValObj; //timer变量，控制时间  
var count = 60; //间隔函数，1秒执行  
var curCount;//当前剩余秒数  
var code = ""; //验证码  
var codeLength = 6;//验证码长度  
var sendflag = false;
var code
var message
function sendMessage(){ 

    curCount = count;  
    var tel=$("#userPhone").val();//手机号码  
    if(tel != ""){  
    	if(!tel.match(/^(1+\d{10})$/)){
    		$(".bcgs").show()
            $(".alerts").show()
    		$(".alert-content").html( '手机号码格式不正确');
            setTimeout('hideAlertWin()',2000); 
    		return false;
    	}
        $.ajax({
            type:"POST",
            dataType:"json",
            url:'http://101.200.192.149:8080/jfstore/jfstore/sms?mobile='+tel,
            success:function(data){
                    if(data.code==0){
                    $("#userPhone").attr("disabled",true)
                     $("#btnSendCode").attr("disabled",true) 
                    InterValObj = window.setInterval(SetRemainTime, 2000); 
                    $(".bcgs").show()
                    $(".alerts").show()
                    $(".alert-content").html('手机验证码已发送');
                    code=data.smsCode
                    setTimeout('hideAlertWin()',2000);                         
                    }
                    else{
                    	$(".bcgs").show()
                       $(".alerts").show()
                       $(".alert-content").html(data.message);  
                    }
            },
            error:function(data){
            	    $(".bcgs").show()
                    $(".alerts").show()
                    $(".alert-content").html("服务器内部错误");
                    setTimeout('hideAlertWin()',2000); 
            }
        })
}
else{
                 $(".bcgs").show()
                $(".alerts").show()
                $(".alert-content").html("请填写手机号码");
                    setTimeout('hideAlertWin()',2000); 
}
}
function SetRemainTime(){  
    if(curCount == 0){                  
        window.clearInterval(InterValObj);//停止计时器  
        $("#btnSendCode").removeAttr("disabled");//启用按钮  
        $("#btnSendCode").val("重新发送验证码"); 
        $('#msg').html("请输入手机验证码");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效  
    }  
    else{  
        curCount--;  
        $("#btnSendCode").val( "("+curCount + "s)重新获取");  
    }  
} 
function hideAlertWin(){
    $(".bcgs").hide()
    $(".alerts").hide()
}
$(".img-right").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
})
$(".alert-sure").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
})
$(".submit").click(function(){
	var a=$.trim($("#userPhone").val())
    var b=$.trim($("#codeStr").val())
    var c=$.trim($(".password1").val())
    var d=$.trim($(".password2").val())
    var test=/[a-z0-9]{6,16}/ ;
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
    if((a=='')||(b=='')||(c=='')||(d=='')){
    	$(".bcgs").show()
        $(".alerts").show()
        $(".alert-content").html("请完善信息")
         setTimeout('hideAlertWin()',2000); 
         return false
    }
    else if(b!==code){
        $(".bcgs").show()
        $(".alerts").show()
        $(".alert-content").html("验证码错误")
        setTimeout('hideAlertWin()',2000); 
         return false
    }
    else if(!c.match(test)){
        $(".bcgs").show()
        $(".alerts").show()
        $(".alert-content").html("密码格式不对")
         setTimeout('hideAlertWin()',2000); 
         return false
    }
    else if(!d.match(test)){
        $(".bcgs").show()
        $(".alerts").show()
        $(".alert-content").html("密码格式不对") 
        setTimeout('hideAlertWin()',2000); 
         return false
    }
    else if(c!==d){
         $(".bcgs").show()
        $(".alerts").show()
        $(".alert-content").html("两次输入密码不一致")
        setTimeout('hideAlertWin()',2000); 
         return false
    }    

    else{
        var data={
             "username":a,
             "password":c
        }
        var url1 = 'http://101.200.192.149:8080/jfstore/updatepass';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", url1, false);           
                                        // xmlhttp.setRequestHeader("token", this.token);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));

        if(xmlhttp.status==200){
        var codes=JSON.parse(xmlhttp.responseText)
        console.log(codes.mes)
        if(codes.code==0){
            $(".bcgs").show()
	        $(".alerts").show()
	        $(".alert-content").html("恭喜你修改成功")
	        $(".alert-sure").click(function(){
	        	window.location.href="wap-login.html"
	        })
        }
        else{
            $(".bcgs").show()
	        $(".alerts").show()
	        $(".alert-content").html(codes.mes)
        }
        }
        else{
           $(".bcgs").show()
	       $(".alerts").show()
	       $(".alert-content").html("服务器内部错误")
        }
    }
})