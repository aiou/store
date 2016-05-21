var currentCount = 5;//每一页显示的条数
window.addEventListener('load', function () {
		FastClick.attach(document.body);
}, false);
var site1
var site2
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("tokenwap");
site2=wsCache.get("refidwap");
$.getJSON('http://101.200.192.149:8080/jfstore/showUser?token='+site1+'&id='+site2,function(data){
            usernames=data.username
            userscores=data.score
            $(".user-name").html(usernames)
            $(".user-score").html(userscores)
          })
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
   window.location.href="wap-login.html"
}
function paging_mode(start,end){
    document.getElementById("gift-box").innerHTML="";
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
   	this.ul_element = document.createElement("div");
   	this.ul_element.className="gifts"
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
    document.getElementById("gift-box").appendChild(this.ul_element);   
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
  //获取所有会议室详细信息
  $.ajax({
    type: "get",
    url:'http://101.200.192.149:8080/jfstore/products',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
  //首次加载会议室列表
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
//会议室列表跳到首页
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
  //会议室列表跳到尾页
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