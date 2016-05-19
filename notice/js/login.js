var wsCache = new WebStorageCache();
//用户登录验证
  $("html").keyup(function(e){
      if(e.keyCode==13){
        $(".logins").click();  
      }}) 
  $(".logins").click(function(){
    var user=$.trim($(".username").val())
    var password=$.trim($(".userpassword").val())
    var coder=$.trim($(".usercode").val())
    if((user=='')||(password=='')||(coder=='')){
      alert("请完善信息")
      return false
    }
    else{
    var data={
      timestamp:'',
      code:coder
    }
    $.ajax({
      crossDomain:true,
      xhrFields:{withCredentials:true},
      type:"post",
      url:"http://101.200.192.149:8080/jfstore/captcha/checkCaptcha",
      data:data,
      dataType:"json",
      success:function(result){
        console.log(result)
       if(result=='true'){
           $.ajax({
      type:"get",
      url:'http://101.200.192.149:8080/jfstore/userLogin?username='+user+'&password='+password,
      dataType:"json",
      success:function(data){
        if(data.code==0){      
          admintoken=data.data.token;
          refids=data.data.refid
          wsCache.delete('tokencom');
          wsCache.delete('refidcom');
          wsCache.set('tokencom',admintoken , {exp : 86400});
          wsCache.set('refidcom',refids , {exp :86400});
          window.location.href="gift-management.html"
        }
        else if(data.code==6){
          alert("账号或密码错误！")
        }
        else if(data.code==999){
          alert("服务器内部错误！")
        }
      },
      error:function(data){
        alert("错误")
      }

    })
      }
      else{
      	alert("验证码错误！")
      }
      }
    })
  
  }
})