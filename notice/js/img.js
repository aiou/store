var site1
var site2
var noticeid
var currentCount=8;
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("tokencom");
site2=wsCache.get("refidcom");
function exit(){
   wsCache.deleteAllExpires();
  wsCache.delete('tokencom');
  wsCache.delete('refidcom');
   window.location.href="login.html"
}
if((site1==null)||(site2==null)){
	window.location.href="login.html"
}
else{
	  $.ajax({
    type: "get",
    url:urlnew+'/jfstore/listallimg',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
}
 function paging_mode(start,end){
    document.getElementById("contentBox").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA
    this.ids = meetingroom_data.id;
    this.imgpaths= meetingroom_data.imgpath;
    var a=urlnew+'/jfstore/img/'+this.imgpaths
    //DOM
   	this.ul_element = document.createElement("li");
    this.li_name = document.createElement("img");
    this.li_name.src=a;
    this.div1=document.createElement("div")
    this.div1.className="boxes"
    this.imgs=document.createElement("img")
    this.imgs.src="images/delete.png"
    this.ul_element.addEventListener("click",this.delete.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.ul_element.appendChild(this.div1);
    this.div1.appendChild(this.imgs);
    document.getElementById("contentBox").appendChild(this.ul_element);
}
  MeetingRoom.prototype.delete = function(){
 	noticeid=this.ids
  if(confirm("确定要删除该图片？")){
    $.ajax({
      type:"DELETE",
      url:urlnew+'/jfstore/delimg?id='+noticeid,
      dataType:"json",
      success:function(data){
        if(data.code==0){
        alert("删除成功")
        window.location.reload()
        }
        else{
        alert("删除失败")
        }
      },
      error:function(data){
        alert("服务器内部错误")
      }     
    })
  }
 } 
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
 $("#addNotice").click(function(){
  $(".bcgs").show()
  $(".add-notice").show()
 }) 
 $(".cancels").click(function(){
  $(".bcgs").hide()
  $(".add-notice").hide()
})
 
$(".trues").click(function(){
  console.log(html)
})
$('form').ajaxForm({
   type: 'post', // 提交方式 get/post
   url:urlnew+'/jfstore/uploadadimg',
  complete: function(xhr) {
    alert("上传完成")
    window.location.reload()
  }
}); 

      
function tianjia(){
  var a=$.trim($(".jf1").val())
  var b=$.trim($(".jf2").val())
  if((a=='')||(b=='')){
    alert("请将积分码和分值填写完整")
  }
  else{
      var data={
        number:a,
        score:b
      }
      console.log(data)
    var url1 = urlnew+'/jfstore/addjfcard';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url1, false);           
                        // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if(xmlhttp.status==200){
    var codes=JSON.parse(xmlhttp.responseText)
    if(codes.code==0){
    alert("添加成功")
    window.location.reload()
    }
  }
}
}
function testcount(){
  $.getJSON(urlnew+'/jfstore/listopt',function(data){
    var a=data.data.length
    if(a!=0){
      $("#message").show()
    }
  })
}
setInterval('testcount()',600000)