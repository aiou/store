var wsCache = new WebStorageCache();
var urlnewaddress=urlnew+'/jfstore/captcha/getCaptchaImage?'
  //获取验证码
  $(".codes").click(function(){
    $(this).attr("src","urlnewaddress"+Math.random())
    })
//用户登录验证
  $("html").keyup(function(e){
      if(e.keyCode==13){
        $(".logins").click();  
      }}) 
  $(".logins").click(function(){
    console.log(0)
    var user=$(".username").val()
    var password=$(".userpassword").val()
    var coder=$(".usercode").val()
    if((user=='')||(password=='')||(coder=='')){
      alert("请完善信息")
      return false
    }
    else{
    var data={
      timestamp:'',
      code:coder
    }
    console.log(coder)
    $.ajax({
      crossDomain:true,
      xhrFields:{withCredentials:true},
      type:"post",
      url:urlnew+'/jfstore/captcha/checkCaptcha',
      data:data,
      dataType:"json",
      success:function(result){
        console.log(result)
       if(result=='true'){
           $.ajax({
      type:"get",
      url:urlnew+'/jfstore/adminLogin?username='+user+'&password='+password,
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