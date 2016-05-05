//轮播图
var admintoken;
var refids
var levels
var expirats
var scores
var groupids
var usernames
  var curIndex = 0, //当前index
      imgLen = $(".imgList li").length; //图片总数
     // 定时器自动变换2.5秒每次
  var autoChange = setInterval(function(){ 
    if(curIndex < imgLen-1){ 
     curIndex ++; 
    }else{ 
      curIndex = 0;
    }
    //调用变换处理函数
    changeTo(curIndex); 
  },2500);
  //对右下角按钮index进行事件绑定处理等
  $(".indexList").find("li").each(function(item){ 
    $(this).hover(function(){ 
      clearInterval(autoChange);
      changeTo(item);
      curIndex = item;
    },function(){ 
      autoChangeAgain();
    });
  });
  //清除定时器时候的重置定时器--封装
  function autoChangeAgain(){ 
      autoChange = setInterval(function(){ 
      if(curIndex < imgLen-1){ 
        curIndex ++;
      }else{ 
        curIndex = 0;
      }
    //调用变换处理函数
      changeTo(curIndex); 
    },2500);
    }
  function changeTo(num){ 
    var goLeft = num * 650;
    $(".imgList").animate({left: "-" + goLeft + "px"},500);
    $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
    $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }
  //获取验证码
  $(".codes").click(function(){
    $(this).attr("src","http://101.200.192.149:80/jfstore/getCaptchaImage?"+Math.random())
    })
  //用户登录验证
  $("html").keyup(function(e){
      if(e.keyCode==13){
        $(".logins").click();  
      }}) 
  function logins(){
    var user=$.trim($(".username").val())
    var password=$.trim($(".userpassword").val())
    var coder=$.trim($(".usercode").val())
    if((user=='')||(password=='')||(coder=='')){
      alert("请完善信息")
      return false
    }
    else{
    $(".logins").attr("disabled",true)
    var data={
      timestamp:'',
      code:coder
    }
    // $.ajax({
    //   type:"post",
    //   url:"http://101.200.192.149:80/jfstore/checkCaptcha",
    //   data:data,
    //   dataType:"json",
    //   success:function(result){
    //     alert(1)
    //     alert(result)
    //      $(".logins").attr("disabled",false)
    //   }
    // })
    $.ajax({
      type:"get",
      url:'https://api-test.cloudp.cc:443/cloudpServer/v1/orgs/drpeng-login?adminName='+user+'&adminPass='+password,
      dataType:"json",
      success:function(data){
        $(".submits").attr("disabled",false)
        if(data.code==0){       
          admintoken=data.data.token;
          refids=data.data.refId
          localStorage.removeItem("token")
          localStorage.removeItem("refid")
          localStorage.setItem("token", admintoken)
          localStorage.setItem("refid", refids)
        }
        else if(data.code==6){
          $(".alert").html("账号或密码错误！")
        }
        else if(data.code==999){
          $(".alert").html("服务器内部错误！")
        }
      },
      error:function(data){
        alert("错误")
      }

    })
  }
}
//判断是否登录
function addcontent(){
  var site1=localStorage.getItem("token");
  var site2=localStorage.getItem("refid");
  if((site1!=='')&&(site2!=='')){
    $.getJSON('http://101.200.192.149:80/jfstore/showUser?token='+site1+'&id='+site2,function(data){
            levels=data.level
            expirats=data.expirationtime
            scores=data.score
            groupids=data.groupid
            usernames=data.username
            $(".user-name").html(usernames)
            $(".level-one").html(levels)
            $(".level-three").html(expirats)
            $(".score-two").html(scores) 
            $(".head-login").hide()
            $(".head-nologin").show()
          })
}
}
addcontent()