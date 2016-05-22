 $.ajax({
  type:"get",
  dataType:"json",
  url:"http://101.200.192.149:8080/jfstore/listallimg",
  async: false,
  success:function(data){
        var totals=data.data.length
  html=''
 for (var i = 0; i<totals; i++) {
  var url='http://101.200.192.149:8080/jfstore/img/'+data.data[i].imgpath
  html+='<div class="swiper-slide"><img src="'+url+'"></div>'
  console.log(html)
 }
 $(".swiper-wrapper").append(html)
  }
 })
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
 $.getJSON("http://101.200.192.149:8080/jfstore/notices",function(result){
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
      return false
    }
    else{   
           $.ajax({
                  type:"get",
                  url:'http://101.200.192.149:8080/jfstore/userLogin?username='+user+'&password='+password,
                  dataType:"json",
                   success:function(data){
                           $(".submits").attr("disabled",false)
                          if(data.code==0){       
                           admintoken=data.data.token;
                           refids=data.data.refid
                           wsCache.delete('tokenwap');
                           wsCache.delete('refidwap');
                           wsCache.set('tokenwap',admintoken , {exp : 86400});
                           wsCache.set('refidwap',refids , {exp :86400});
                           window.location.href="wap-gift.html"
          }
          else if(data.code==6){
            $(".bcgs").show()
            $(".alerts").show()
            $(".alert-content").html("账号或密码错误")
          }
          else if(data.code==999){
            $(".bcgs").show()
           $(".alerts").show()
           $(".alert-content").html("服务器内部错误")
          }
        },
        error:function(data){
            $(".bcgs").show()
           $(".alerts").show()
           $(".alert-content").html("错误")
        }

      })
     }
})
$(".img-right").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
})
$(".alert-sure").click(function(){
  $(".bcgs").hide()
  $(".alerts").hide()
})