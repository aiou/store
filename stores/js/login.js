 var cpid
 var cpid2
 var password
  $(document).ready(function(){
  $('.list_lh li:even').addClass('lieven');
  console.log($('.list_lh li:even'))
  
  $("div.list_lh").myScroll({
    speed:40, //数值越大，速度越慢
    rowHeight:24 //li的高度
  });
})
//轮播图
 $.ajax({
  type:"get",
  dataType:"json",
  url:urlnew+'/jfstore/listallimg',
  async: false,
  success:function(data){
        var totals=data.data.length
  html=''
 for (var i = 0; i<totals; i++) {
  var url=urlnew+'/jfstore/img/'+data.data[i].imgpath
  html+='<div class="swiper-slide" style="cursor:pointer"><img src="'+url+'"></div>'
 }
 $(".swiper-wrapper").append(html)

  }
 })

 var wsCache = new WebStorageCache();
 var swiper1 = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        onClick: function(swiper){
         window.location.href="user-public.html"
    }
    })
var admintoken;
var refids
var levels
var expirats
var scores
var groupids
var usernames
var site1
var site2
var wsCache = new WebStorageCache();
  //获取验证码
var urlnewaddress=urlnew+'/jfstore/captcha/getCaptchaImage?'
  $(".codes").click(function(){
    $(this).attr("src",urlnewaddress+Math.random())
    })
  //用户登录验证
  $("html").keyup(function(e){
      if(e.keyCode==13){
        $(".logins").click();  
      }}) 
    function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
}
  function logins(){
    var user=$.trim($(".username").val())
    password=$.trim($(".userpassword").val())
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
      url:urlnew+'/jfstore/captcha/checkCaptcha',
      data:data,
      dataType:"json",
      success:function(result){
        console.log(result) 
        $(".logins").attr("disabled",false)
       if(result=='true'){     
           $.ajax({
                  type:"get",
                  url:urlnew+'/jfstore/userLogin?username='+user+'&password='+password,
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
                          wsCache.set('ps',password, {exp :86400});
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
  site1=wsCache.get("token");
  site2=wsCache.get("refid");
  if((site1!=='')&&(site2!=='')){
    $.getJSON(urlnew+'/jfstore/getuserInfo?token='+site1+'&id='+site2,function(data){
            var levelnew
            levels=data.data.level
            expirats=data.data.expirationtime
            scores=data.data.score
            groupids=data.data.groupid
            usernames=data.data.username
             if(levels==0){
              levelnew="普卡"
            }
            if(levels==1){
              levelnew="铜卡"
            }
            if(levels==2){
              levelnew="银卡"
            }
            if(levels==3){
              levelnew="金卡"
            }
        $.getJSON(urlnew+'/jfstore/getExptime?username='+usernames,function(data){    
            $(".user-name").html(usernames)
            $(".level-one").html(levelnew)
            $(".level-three").html(data.data)
            $(".score-two").html(scores) 
            $(".head-login").hide()
            $(".head-nologin").show()
            if(scores>=100){
              alert("您的积分已超过100了，请兑换礼品吧！")
            }
          })
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
var meetingRoomDatas
function paging_mode(start,end){
    document.getElementById("contentBox").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA
    var url=urlnew+'/jfstore/img/'
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
    this.img1.src = url+this.imgs;
    this.img1.addEventListener("click",this.xiangqing.bind(this),false);
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_img1=document.createElement("img")
    this.li_img1.className="imgjian"
    this.li_img1.src="../image/jian.png";
    this.li_img1.addEventListener("click",this.jian.bind(this),false);
    this.li_img2=document.createElement("img")
    this.li_img2.className="imgjia"
    this.li_img2.src="../image/jia.png";
    this.li_img2.addEventListener("click",this.jia.bind(this),false);
    this.li_inputs = document.createElement("input");
    this.li_inputs.className="inputcounts"
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
    this.li_data.appendChild(this.li_img1)
    this.li_data.appendChild(this.li_inputs)
    this.li_data.appendChild(this.li_img2)
    document.getElementById("contentBox").appendChild(this.ul_element);
  }
  MeetingRoom.prototype.jia = function(){
    var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{
    exchangenumbers++
    console.log(exchangenumbers)
    this.li_inputs.value=exchangenumbers
  }
  }
  MeetingRoom.prototype.jian = function(){
   var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{     
    exchangenumbers--
    console.log(exchangenumbers)
    if(exchangenumbers<=0){
      exchangenumbers=0
    }
    this.li_inputs.value=exchangenumbers
  } }
  MeetingRoom.prototype.duihuan = function(){
   var productnames=this.names
  var exchangenumbers=$.trim(this.li_inputs.value)
   var needscores=this.needscores
    if((site1==null)||(site2==null)){
     alert("请先登录")
     return false
   }
   else if(exchangenumbers==''){
    alert("请填写数量")
    return false
   }
   else{
     $(".bcgs").show()
    $(".gift-sure").show() 
      html1=''
      html=''
    $.getJSON(urlnew+'/jfstore/listAddressByUserId?userId='+site2,function(data){
      console.log(data)
      var count=data.data.length
     for (var i =0; i<count; i++) {
       if(data.data[i].isDefault==0){
         html+='<input type="radio" name="address" class="morenaddress" checked="true" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation
       }
       else{
        html1+='<input type="radio" name="address" class="qitaaddress" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation+'<br>'
       }
     };
     $(".moren-box").append(html)
     $(".qita-box").append(html1)   
    })
    
   
    $("#address-true").click(function(){
      var values=$('input[name="address"]:checked').val();
       
    
    var data={
      productName:productnames,
      exchangeNumber:exchangenumbers,
      needScore:needscores,
      userId:site2,
      addressId:values

      }
      console.log(data)
    var url1 = urlnew+'/jfstore/insertexchange';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url1, false);           
                        // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if(xmlhttp.status==200){
    var codes=JSON.parse(xmlhttp.responseText)
    if(codes.code==0){
    alert("兑换成功")
    window.location.reload()
    }
    else{
      alert(codes.mes)
    }
    }
    else{
    alert("服务器内部错误")
    }
})
   }
  }
  MeetingRoom.prototype.xiangqing = function(){
    cpid=this.ids
    window.location.href='user-xiangqing.html?gfid='+cpid

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
  //获取所有详细信息
  $.ajax({
    type: "get",
    url:urlnew+'/jfstore/rm',
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
    url:urlnew+'/jfstore/jp',
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
    var url=urlnew+'/jfstore/img/'
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
    this.img1.src = url+this.imgs;
    this.img1.addEventListener("click",this.xiangqing.bind(this),false);
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_img1=document.createElement("img")
    this.li_img1.src="../image/jian.png";
    this.li_img1.className="imgjian"
    this.li_img1.addEventListener("click",this.jian1.bind(this),false);
    this.li_img2=document.createElement("img")
    this.li_img2.className="imgjia"
    this.li_img2.src="../image/jia.png";
    this.li_img2.addEventListener("click",this.jia1.bind(this),false);
    this.li_inputs = document.createElement("input");
    this.li_inputs.className="inputcounts1"
    this.li_opation = document.createElement("dd");
    this.li_opation.innerHTML = "立刻兑换";
    this.li_opation.className = "cash";
    this.li_opation.addEventListener("click",this.duihuan1.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_num);
    this.li_name.appendChild(this.li_cap)
    this.li_name.appendChild(this.li_org)
    this.li_name.appendChild(this.li_data)
    this.li_name.appendChild(this.li_opation)
    this.li_num.appendChild(this.img1)
    this.li_data.appendChild(this.li_img1)
    this.li_data.appendChild(this.li_inputs)
    this.li_data.appendChild(this.li_img2)
    document.getElementById("contentBox1").appendChild(this.ul_element);
  }
  MeetingRooms.prototype.jia1 = function(){
    var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    console.log(exchangenumbers)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{
    exchangenumbers++
    console.log(exchangenumbers)
    this.li_inputs.value=exchangenumbers
  }
  }
  MeetingRooms.prototype.jian1 = function(){
    var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{
    exchangenumbers--
    console.log(exchangenumbers)
    if(exchangenumbers<=0){
      exchangenumbers=0
    }
    this.li_inputs.value=exchangenumbers 
  }
  }
  MeetingRooms.prototype.duihuan1 = function(){
    var productnames=this.names
  var exchangenumbers=$.trim(this.li_inputs.value)
   var needscores=this.needscores
    if((site1==null)||(site2==null)){
    alert("请先登录")
    return false
   }
   if(exchangenumbers==''){
    alert("请填写数量")
   }
   else{
     $(".bcgs").show()
    $(".gift-sure").show() 
      html1=''
      html=''
    $.getJSON(urlnew+'/jfstore/listAddressByUserId?userId='+site2,function(data){
      console.log(data)
      var count=data.data.length
     for (var i =0; i<count; i++) {
       if(data.data[i].isDefault==0){
         html+='<input type="radio" name="address" class="morenaddress" checked="true" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation
       }
       else{
        html1+='<input type="radio" name="address" class="qitaaddress" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation+'<br>'
       }
     };
     $(".moren-box").append(html)
     $(".qita-box").append(html1)   
    })
    
   
    $("#address-true").click(function(){
      var values=$('input[name="address"]:checked').val();
       
    
    var data={
      productName:productnames,
      exchangeNumber:exchangenumbers,
      needScore:needscores,
      userId:site2,
      addressId:values

      }
      console.log(data)
    var url1 = urlnew+'/jfstore/insertexchange';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url1, false);           
                        // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if(xmlhttp.status==200){
    var codes=JSON.parse(xmlhttp.responseText)
    if(codes.code==0){
    alert("兑换成功")
    window.location.reload()
    }
    else{
      alert(codes.mes)
    }
    }
    else{
    alert("服务器内部错误")
    }
})
   }
  }
   MeetingRooms.prototype.xiangqing = function(){
    cpid2=this.ids
    window.location.href='user-xiangqing.html?gfid='+cpid2

  }
  //控制活动公告展示收缩


  $.getJSON(urlnew+'/jfstore/notices',function(result){
  var c=result.data.length
 
  html=''
  for (var i = 0; i<c; i++) {
    html+='<li>'
    html+='<p><a href="user-public.html">'+result.data[i].title+'</a></p>'
    html+='</li>'
  }
  $(".list_lh ul").append(html)
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
  $("#address-cancel").click(function(){
    $(".gift-sure").hide()
    $(".bcgs").hide()
  })
