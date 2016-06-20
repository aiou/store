var site1
var site2
var noticeid
var currentCount=10;
var tcontents
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
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
}
if((site1==null)||(site2==null)){
	window.location.href="login.html"
}
else{
	  $.ajax({
    type: "get",
    url:'http://101.200.192.149:8080/jfstore/questions',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
}
 function paging_mode(start,end){
    document.getElementById("noticeUl").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA
    this.ids = meetingroom_data.id;
    this.titles= meetingroom_data.title;
    // this.times= meetingroom_data.time.toString().substring(0,10);
    this.contents = meetingroom_data.content;
    //DOM
    var datas=getLocalTime(this.times)
   	this.ul_element = document.createElement("li");
    this.li_name = document.createElement("div");
    this.li_name.className="noticeName";
    this.li_namep=document.createElement("p")
    this.li_namep.className="noticeText";
    this.li_namep.innerHTML=this.titles;
    this.li_num = document.createElement("span");
    this.li_num.className="noticeTime"
    this.li_num.innerHTML=datas
    this.li_cap = document.createElement("span");
    this.li_cap.innerHTML = "编辑";
    this.li_cap.className = "editNotice";
    this.li_cap.addEventListener("click",this.editor.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_namep);
    this.ul_element.appendChild(this.li_num);
    this.ul_element.appendChild(this.li_cap);
    document.getElementById("noticeUl").appendChild(this.ul_element);
}
  MeetingRoom.prototype.editor = function(){
 	noticeid=this.ids
  tcontents=this.contents
  console.log(tcontents)
 	$(".bcgs").show()
 	$(".editor-notice").show()
 	$(".editor-title").val(this.titles)
  editor1.$txt.html(tcontents);

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
  //编辑公告提交
$(".true").click(function(){
  
	var a=$(".editor-title").val()
	var b=editor1.$txt.html();
	if((a=='')||(b=='')){
		alert("请完善信息")
		return false
	}
	else{
    var data={
          "id": noticeid,
          "title": a,
          "content": b
    }
    var url1 = 'http://101.200.192.149:8080/jfstore/updatequestion';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url1, false);           
                        // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if(xmlhttp.status==200){
    var codes=JSON.parse(xmlhttp.responseText)
    if(codes.code==0){
    alert("编辑成功")
    window.location.reload()
    }
    else{
      alert(codes)
    }
    }
    else{
    alert("服务器内部错误")
    }
	}
})
$(".cancel").click(function(){
	$(".bcgs").hide()
	$(".editor-notice").hide()
})
//新建公告
$("#addNotice").click(function(){
	$(".bcgs").show()
	$(".add-notice").show()
})
$(".trues").click(function(){
	var a=$(".add-title").val()
	var b=editor.$txt.html();
	if((a=='')||(b=='')){
		alert("请完善信息")
		return false
	}
	else{
		var data={
			title:a,
			content:b
		}
    console.log(data)
		var url1 = 'http://101.200.192.149:8080/jfstore/addquestions';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(data));

		if(xmlhttp.status==200){
		var codes=JSON.parse(xmlhttp.responseText)
		if(codes.code==0){
		alert("创建成功")
		window.location.reload()
		}
		}
		else{
		alert("服务器内部错误")
		}
	}
})
$(".cancels").click(function(){
	$(".bcgs").hide()
	$(".add-notice").hide()
})
 var editor=new wangEditor("div1")
   editor.config.uploadImgUrl = 'http://101.200.192.149:8080/jfstore/uploadimg';
  editor.config.uploadImgFileName = 'file';
    editor.config.menus = [
        '|',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'orderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'table',
        '|',
        'img',
        '|',
        'undo',
        'redo',
        'fullscreen'
     ];
  editor.create()
  editor.$txt.html('<p>请在这里输入公告内容</p>');
  // 获取编辑区域的html
    var html = editor.$txt.html();
    // 获取编辑区域的纯文本
    var text = editor.$txt.text();
    // 获取编辑区域的所有图片
    var imgs = editor.$txt.find('img');
    // 追加内容
$(".trues").click(function(){
  console.log(html)
})
  var editor1=new wangEditor("div2")
   editor1.config.uploadImgUrl = 'http://101.200.192.149:8080/jfstore/uploadimg';
    editor1.config.uploadImgFileName = 'file';
      editor1.config.menus = [
        '|',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'orderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'table',
        '|',
        'img',
        '|',
        'undo',
        'redo',
        'fullscreen'
     ];
  editor1.create()

  // 获取编辑区域的html
    var html = editor1.$txt.html();
    // 获取编辑区域的纯文本
    var text = editor1.$txt.text();
    // 获取编辑区域的所有图片
    var imgs = editor1.$txt.find('img');
    // 追加内容
