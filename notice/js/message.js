var site1
var site2
var currentCount=10;
var usernames
var addressnew
var wsCache = new WebStorageCache();	
function exit(){
   wsCache.deleteAllExpires();
    wsCache.delete('tokencom');
    wsCache.delete('refidcom');
   window.location.href="login.html"
}
wsCache.deleteAllExpires();
site1=wsCache.get("tokencom");
site2=wsCache.get("refidcom");
console.log(site1)
if((site1==null)||(site2==null)){
	window.location.href="login.html"
}
else{
		//获取所有详细信息
	var meetingRoomNum = "";
	var displayName = "";
	$.ajax({
		type: "get",
		url:urlnew+'/jfstore/listopt',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("服务器内部错误");
		}
	});
}
function paging_mode(start,end){
document.getElementById("contentbox").innerHTML="";
	for(var i=start;i<end;i++){
		 var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
		}
	}
// $("#datatime1").datetimepicker();
// $("#datatime2").datetimepicker();
//退出按钮
function MeetingRoom(meetingroom_data){
		//DATA
		var datas
		 this.ids = meetingroom_data.id;
		 this.message=meetingroom_data.detailOperation
		//DOM
		this.ul_element = document.createElement("div");
		this.ul_element.className = "li-head-exchanges";
		this.ul_element.innerHTML = this.message;
		document.getElementById("contentbox").appendChild(this.ul_element);

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
			alert("已经是尾页");
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
	var url1 = urlnew+'/jfstore/setread';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("PUT", url1, false);           
											        // xmlhttp.setRequestHeader("token", this.token);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send();