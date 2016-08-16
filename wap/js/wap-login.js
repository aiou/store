var jfscore
var scores
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
  html+='<div class="swiper-slide"><img src="'+url+'"></div>'
  console.log(html)
 }
 $(".swiper-wrapper").append(html)
  }
 })
  function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  var Request = new Object();
  Request = GetRequest();
  jfscore=Request.c;
  if((jfscore=='')||(jfscore==undefined)){
        $(".bcgs").show()
         $(".alerts").show()
         $(".alert-content").html("扫描失败请重复扫描")
                  $("body,html").addClass("hiddens");
        setTimeout('hideAlertWin()',2000); 
      }
      else{ 
        $.getJSON(urlnew+'/jfstore/getscoreBycode?code='+jfscore,function(data){
          console.log(data)
          scores=data.data
          if(data.code==0){
            $(".count").html(scores) 
          }
          else{
            $(".bcgs").show()
         $(".alerts").show()
         $(".alert-content").html(data.mes)
                  $("body,html").addClass("hiddens");
        setTimeout('hideAlertWin()',2000); 
          }
                  
  })
        
      }
 
      
var wsCache = new WebStorageCache();
 var swiper = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
 window.addEventListener('load', function () {
		FastClick.attach(document.body);
	}, false);
 var wsCache = new WebStorageCache();
 $.getJSON(urlnew+'/jfstore/notices',function(result){
  html=''
  for (var i = 0; i<3; i++) {
    html+='<div class="content">'+result.data[i].content+'</div>'
  }
  $(".notice-box").append(html)
})
$(".submit").click(function(){
  var user=$.trim($(".username").val())
  var password=$.trim($(".userpassword").val())
    if((user=='')||(password=='')){
     $(".bcgs").show()
     $(".alerts").show()
     $(".alert-content").html("请完善信息")
              $("body,html").addClass("hiddens");
        setTimeout('hideAlertWin()',2000); 
      return false
    }
    else{   
        var data={
                username: user,
                password: password
        }
        console.log(data)
      var url1 =urlnew+'/jfstore/ewmaddscore?code='+jfscore;
      var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url1, false);           
        // xmlhttp.setRequestHeader("token", this.token);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));
        console.log(JSON.parse(xmlhttp.responseText));
        if(xmlhttp.status==200){
          codes=JSON.parse(xmlhttp.responseText)
           $(".submits").attr("disabled",false)
                          if(codes.code==0){
                           admintoken=codes.data.token;
                           refids=codes.data.refid
                           wsCache.delete('tokenwap');
                           wsCache.delete('refidwap');
                           wsCache.set('tokenwap',admintoken , {exp : 86400});
                           wsCache.set('refidwap',refids , {exp :86400});
                           window.location.href="wap-gift.html"   
                          }
                          else if(codes.code==6){
                            $(".bcgs").show()
                            $(".alerts").show()
                            $(".alert-content").html("账号或密码错误")
                            $("body,html").addClass("hiddens");
                              setTimeout('hideAlertWin()',2000); 
                          }
                          else if(codes.code==999){
                            $(".bcgs").show()
                           $(".alerts").show()
                           $(".alert-content").html("服务器内部错误")
                           $("body,html").addClass("hiddens");
                            setTimeout('hideAlertWin()',2000); 
                          }

     }
     else{
        $(".bcgs").show()
           $(".alerts").show()
           $(".alert-content").html("错误")
           $("body,html").addClass("hiddens");
        setTimeout('hideAlertWin()',2000); 
     }
   }
})
$(".img-right").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
      $("body,html").removeClass("hiddens");
})
$(".alert-sure").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
      $("body,html").removeClass("hiddens");
})
function hideAlertWin(){
    $(".bcgs").hide()
    $(".alerts").hide()
    $("body,html").removeClass("hiddens");
}