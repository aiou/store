//轮播图
var admintoken;
var refids
var levels
var expirats
var scores
var groupids
var usernames
var wsCache = new WebStorageCache();
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
    $(this).attr("src","http://101.200.192.149:8080/jfstore/captcha/getCaptchaImage?"+Math.random())
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
    $.ajax({
      crossDomain:true,
      xhrFields:{withCredentials:true},
      type:"post",
      url:"http://101.200.192.149:8080/jfstore/captcha/checkCaptcha",
      data:data,
      dataType:"json",
      success:function(result){
        console.log(result) 
        $(".logins").attr("disabled",false)
       if(result=='true'){       
           $.ajax({
                  type:"get",
                  url:'http://101.200.192.149:8080/jfstore/userLogin?username='+user+'&password='+password,
                  dataType:"json",
                   success:function(data){
                           $(".submits").attr("disabled",false)
                          if(data.code==0){       
                           admintoken=data.data.token;
                           refids=data.data.refid
                           wsCache.delete('token');
                           wsCache.delete('refid');
                           wsCache.set('token',admintoken , {exp : 86400});
                          wsCache.set('refid',refids , {exp :86400});
            addcontent()
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
  }
//判断是否登录
function addcontent(){
  wsCache.deleteAllExpires();
  var site1=wsCache.get("token");
  var site2=wsCache.get("refid");
  if((site1!=='')&&(site2!=='')){
    $.getJSON('http://101.200.192.149:8080/jfstore/showUser?token='+site1+'&id='+site2,function(data){
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
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
  wsCache.delete('token');
  wsCache.delete('refid');
   window.location.href="user-login.html"
}
//首页产品列表
var meetingRoomData;
var meetingRoomDatas//所有会议室
function paging_mode(start,end){
    document.getElementById("contentBox").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA
    this.ids = meetingroom_data.id;
    this.names= meetingroom_data.name;
    this.imgs= meetingroom_data.img;
    this.needscores = meetingroom_data.needscore;
    this.totalss = meetingroom_data.totals;
    this.lbs = meetingroom_data.lb;
    //DOM
    this.ul_element = document.createElement("li");
    this.li_name = document.createElement("dl");
    this.li_num = document.createElement("dt");
    this.img1 = document.createElement("img");
    this.img1.src = this.imgs;
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_inputs = document.createElement("input");
    this.li_opation = document.createElement("dd");
    this.li_opation.innerHTML = "立刻兑换";
    this.li_opation.className = "cash";
    this.li_opation.addEventListener("click",this.duihuan.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_num);
    this.li_name.appendChild(this.li_cap)
    this.li_name.appendChild(this.li_org)
    this.li_name.appendChild(this.li_data)
    this.li_name.appendChild(this.li_opation)
    this.li_num.appendChild(this.img1)
    this.li_data.appendChild(this.li_inputs)
    document.getElementById("contentBox").appendChild(this.ul_element);
  }
  
  MeetingRoom.prototype.duihuan = function(){
   alert(this.ids)
    if((site1==null)||(site2==null)){
    alert("请先登录")
    return flase;
   }
   else{

   }
  }
  function firstShowList(data){
    meetingRoomData = data.data;
    totals = meetingRoomData.length;
    if(totals<=5){
      paging_mode(0,totals);
    }else{
      paging_mode(0,5);
    }
  }
  //获取所有会议室详细信息
  $.ajax({
    type: "get",
    url:'http://101.200.192.149:8080/jfstore/rm',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
  //精品列表
   $.ajax({
    type: "get",
    url:'http://101.200.192.149:8080/jfstore/jp',
    success: function(data){
      firstShowLists(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
  function firstShowLists(data){
    meetingRoomDatas = data.data;
    totals = meetingRoomDatas.length;
    if(totals<=5){
      paging_modes(0,totals);
    }else{
      paging_modes(0,5);
    }
  }
  function paging_modes(start,end){
    document.getElementById("contentBox1").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingrooms = new MeetingRooms(meetingRoomDatas[i]);
    }
  }
  function MeetingRooms(meetingroom_data){
    //DATA
    this.ids = meetingroom_data.id;
    this.names= meetingroom_data.name;
    this.imgs= meetingroom_data.img;
    this.needscores = meetingroom_data.needscore;
    this.totalss = meetingroom_data.totals;
    this.lbs = meetingroom_data.lb;
    //DOM
    this.ul_element = document.createElement("li");
    this.li_name = document.createElement("dl");
    this.li_num = document.createElement("dt");
    this.img1 = document.createElement("img");
    this.img1.src = this.imgs;
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_inputs = document.createElement("input");
    this.li_opation = document.createElement("dd");
    this.li_opation.innerHTML = "立刻兑换";
    this.li_opation.className = "cash";
    this.li_opation.addEventListener("click",this.duihuan.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_num);
    this.li_name.appendChild(this.li_cap)
    this.li_name.appendChild(this.li_org)
    this.li_name.appendChild(this.li_data)
    this.li_name.appendChild(this.li_opation)
    this.li_num.appendChild(this.img1)
    this.li_data.appendChild(this.li_inputs)
    document.getElementById("contentBox1").appendChild(this.ul_element);
  }
  
  MeetingRooms.prototype.duihuan = function(){
   alert(this.ids)
    if((site1==null)||(site2==null)){
    alert("请先登录")
    return flase;
   }
   else{

   }
  }
  //控制活动公告展示收缩
$.getJSON("http://101.200.192.149:8080/jfstore/notices",function(result){
 
  html=''
  for (var i = 0; i<3; i++) {
    html+='<a href="user-public.html">'
    html+='<div>'+result.data[i].title+'</div>'
    html+='</a>'
  }
  $(".activity-content").append(html)
})
$(".core-rule").click(function(){
    $(".rule-top").show()
    $(".rule-bottom").hide()
    $(".core-rule").css({"border-top":"2px solid #ff4848","border-bottom":"none"})
    $(".hot-alert").css({"border-bottom":"1px solid #e5e5e5","border-top":"none"})
  })
  $(".hot-alert").click(function(){
    $(".rule-bottom").show()
    $(".rule-top").hide()
    $(".hot-alert").css({"border-top":"2px solid #ff4848","border-bottom":"none"})
    $(".core-rule").css({"border-bottom":"1px solid #e5e5e5","border-top":"none"})
  })
  $(".core-rule").click();
