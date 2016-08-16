var wsCache = new WebStorageCache();
var datas
var data1
var currentCount = 10;//每一页显示的条数
function exit(){
   wsCache.deleteAllExpires();
   wsCache.delete('token');
   wsCache.delete('refid');
   window.location.href="user-login.html"
}
Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  
function paging_mode(start,end){
    document.getElementById("contentBox").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA

    this.titles = meetingroom_data.title;
    this.times= meetingroom_data.time;
    this.contents= meetingroom_data.content;
    datas=new Date(this.times)
            data1=datas.format("yyyy-MM-dd hh:mm"); 
    //DOM
   	this.div1 = document.createElement("div");
   	this.div1.className="public-content"
   	this.div1.addEventListener("click",this.zhankai.bind(this),false);
    this.div2 = document.createElement("div");
    this.div2.className="content-open"
    this.div1first = document.createElement("img");
    this.div1first.src = '../image/public-right.png';
    this.div1second = document.createElement("div");
    this.div1second.className="public-left"
    this.div1second.innerHTML=this.titles;
    this.div1third=document.createElement("div")
    this.div1third.className="public-right";
    this.div1third.innerHTML=data1
    this.div2a = document.createElement("div");
    this.div2a.className="open1"
    this.div2b = document.createElement("div");
    this.div2b.className="open2"
    this.div2b.innerHTML=this.titles
    this.div2c = document.createElement("div");
    this.div2c.className="open3"
    this.div2c.innerHTML=data1
    this.div2d = document.createElement("div");
    this.div2d.className="open4"
    this.div2d.innerHTML="尊敬的用户"
    this.div2e = document.createElement("div");
    this.div2e.className="open5"
    this.div2e.innerHTML=this.contents
    this.div2f = document.createElement("div");
    this.div2f.className="open6"
    this.div2f.innerHTML="硒博士积分商城"
    this.div2first = document.createElement("img");
    this.div2first.src = '../image/public-bottom.png';
    this.div2second = document.createElement("div");
    this.div2second.className="open1-left"
    this.div2second.addEventListener("click",this.close.bind(this),false);
    this.div1second = document.createElement("div");
    this.div1second.className="public-left"
    this.div1second.innerHTML=this.titles;
    this.div1.appendChild(this.div1first);
    this.div1.appendChild(this.div1second);
    this.div1.appendChild(this.div1third)
    this.div2.appendChild(this.div2a)
    this.div2.appendChild(this.div2b)
    this.div2.appendChild(this.div2c)
    this.div2.appendChild(this.div2d)
    this.div2.appendChild(this.div2e)
    this.div2.appendChild(this.div2f)
    this.div2a.appendChild(this.div2first)
    this.div2a.appendChild(this.div2second)
    document.getElementById("contentBox").appendChild(this.div1);
    document.getElementById("contentBox").appendChild(this.div2);
    }
    MeetingRoom.prototype.zhankai = function(){
    	this.div1.style.display="none"
        this.div2.style.display="block"
    }
    MeetingRoom.prototype.close = function(){
    	this.div2.style.display="none"
	    this.div1.style.display="block"
    }
  //获取所有详细信息
  $.ajax({
    type: "get",
    url:urlnew+'/jfstore/notices',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
  //首次加载列表
	function firstShowList(data){
		meetingRoomData = data.data;
		totals = meetingRoomData.length;
		totalPage = Math.ceil(totals/currentCount);
		$(".current-page").html(1);
		$(".page-count").html(totalPage);
		$(".content-totals").html(totals);
		if(totals<=currentCount){
			paging_mode(0,totals);
		}else{
			paging_mode(0,currentCount);
		}
	}
//列表跳到首页
  $("#firstPage").click(function(){
    var currentPage = $(".current-page").html();//当前页码
    var pageCount = $(".page-count").html();//总页数
    var countTotal = $(".content-totals").html();//总条数
    if(currentPage==1 || currentPage==null){
      return;
    }
    paging_mode(0,currentCount);
    $(".current-page").html(1);
  });
  //前一页
  $("#prev").click(function(){
    var currentPage = $(".current-page").html();//当前页码
    var pageCount = $(".page-count").html();//总页数
    var countTotal = $(".content-totals").html();//总条数
    if(currentPage==1){
      alert("当前为第一页");
      return;
    }
    paging_mode((currentPage-2)*currentCount,(currentPage-1)*currentCount);
    $(".current-page").html(parseInt(currentPage)-1);//当前页码 
  });
  //下一页
  $("#next").click(function(){
    var currentPage = $(".current-page").html();//当前页码
    var pageCount = $(".page-count").html();//总页数
    var countTotal = $(".content-totals").html();//总条数
    if(currentPage == totalPage){
      alert("已经是最后一页");
      return ; 
    }
    if(pageCount-currentPage==1){
      paging_mode(currentPage*currentCount,totals);
    }else{
      paging_mode(currentPage*currentCount,(parseInt(currentPage)+1)*currentCount);
    }
    $(".current-page").html(parseInt(currentPage)+1);//当前页码
  });
  //列表跳到尾页
  $("#lastPage").click(function(){
    var currentPage = $(".current-page").html();//当前页码
    var pageCount = $(".page-count").html();//总页数
    var countTotal = $(".content-totals").html();//总条数
    if(currentPage == pageCount){
      console.log("已经是尾页");
      return;
    }
    paging_mode((pageCount-1)*currentCount,totals);
    $(".current-page").html(pageCount);//当前页码
  });
  //按输入框值跳转页码
  $("#page-jump").click(function(){
    var currentPage = $(".current-page").html();//当前页码
    var pageCount = $(".page-count").html();//总页数
    var countTotal = $(".content-totals").html();//总条数
    var str = $(".page-num").val();    
        if(str.length!=0){    
          var reg=/^[0-9]*$/;     
          if(reg.test(str)){
            if( str>0 && str<=pageCount){
              if(str == pageCount){
                paging_mode((str-1)*currentCount,countTotal); 
              }else{
                paging_mode((str-1)*currentCount,str*currentCount);   
              }
              $(".current-page").html(str);
              
            }
          }
      $(".page-num").val("");
      }
  });
  $(".public-content").click(function(){
	$(this).hide()
	$(this).next().show()
	})
$(".open1-left").click(function(){
	$(this).parent().parent().hide();
	$(this).parent().parent().prev().show()
})
