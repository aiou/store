var wsCache = new WebStorageCache();
var currentCount=10
var usernames
var scores
var totals
 wsCache.deleteAllExpires();
 site1=wsCache.get("token");
site2=wsCache.get("refid");
function exit(){
   wsCache.deleteAllExpires();
  wsCache.delete('token');
  wsCache.delete('refid');
   window.location.href="user-login.html"
}
if((site1==null)||(site2==null)){
	alert("请先登录")
	window.location.href="user-login.html"
}
else{
	 $.getJSON('http://101.200.192.149:8080/jfstore/getuserInfo?token='+site1+'&id='+site2,function(data){
            levels=data.data.level
            scores=data.data.score
            groupids=data.data.groupid
            usernames=data.data.username
            console.log(usernames)
            $.getJSON('http://101.200.192.149:8080/jfstore/getExptime?username='+usernames,function(data){  
            $(".score-top").html(usernames)
            $(".level-ones").html(levels)
            $(".level-three").html(data.data)
            $(".shengyu-total").html(scores) 
            $(".duijiang-total").html(totals)
          })
        })
	 	var meetingRoomNum = "";
	    var displayName = "";
	$.ajaxSettings.async = false
	$.ajax({
		type: "get",
		url:'http://101.200.192.149:8080/jfstore/userExchange?userId='+site2,
		success: function(data){
			console.log(data)
			firstShowList(data);
		},
		error: function(erro){
			alert("服务器内部错误");
		}
	});
	$.ajax({
		type: "get",
		url:'http://101.200.192.149:8080/jfstore/listAddressById?userId='+site2,
		success: function(data){
			console.log(data)
			firstShowList1(data);
		},
		error: function(erro){
			alert("服务器内部错误");
		}
	});

}
function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
}
//分页显示公用方法
function paging_mode(start,end){
document.getElementById("contentBox").innerHTML="";
	for(var i=start;i<end;i++){
		 var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
		}
	}
function paging_mode1(start,end){
document.getElementById("contentBox1").innerHTML="";
	for(var i=start;i<end;i++){
		 var new_meetingroom1 = new MeetingRoom1(meetingRoomData1[i]);
		}
}	
function gets(results){
	 $.ajaxSettings.async = false
	 $.getJSON('http://101.200.192.149:8080/jfstore/getuserInfo?token='+site1+'&id='+results,function(data){
	 	 console.log(data.data.username)
		  usernames=data.data.username	 	
		 })
}
function MeetingRoom(meetingroom_data){
		//DATA
		 this.ids = meetingroom_data.userId;
		 this.products= meetingroom_data.productName;
		 this.numbers = meetingroom_data.exchangeNumber;
		 this.scores = meetingroom_data.needScore;
		 this.times = meetingroom_data.exchangeTime;
		 if((this.times=='')||(this.times==undefined)){
		 	datas=''
		 }
		 else{
		 	this.times = meetingroom_data.exchangeTime.toString().substring(0,10);
            datas=getLocalTime(this.times)
		 }		 
		 gets(this.ids)	
		
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-exchanges";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = usernames;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.products;
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.numbers ;
		this.li_cap.className = "org-password";
		this.li_org = document.createElement("li");
		this.li_org.innerHTML = this.scores;
		this.li_org.className = "org-time";
		// this.li_cap1.addEventListener("click",this.delete.bind(this),false);
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.li_option.innerHTML = datas;
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
function MeetingRoom1(meetingroom_data1){
		//DATA
		 this.ids = meetingroom_data1.id;
		 this.provinces = meetingroom_data1.province;
		 this.citys= meetingroom_data1.city;
		 this.areas = meetingroom_data1.area;
		 this.names = meetingroom_data1.contactName;
		 this.phones = meetingroom_data1.contactTelphone;
		 this.detail=meetingroom_data1.detailLocation
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-exchanges";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.names;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.provinces+this.citys+this.areas
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.detail ;
		this.li_cap.className = "org-password";
		this.li_org = document.createElement("li");
		this.li_org.innerHTML = this.phones;
		this.li_org.className = "org-time";
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.li_cap1 = document.createElement("span");
	    this.li_cap1.innerHTML = "修改";
	    this.li_cap1.className = "xiugai";
	    this.li_cap1.addEventListener("click",this.delete.bind(this),false);
	    this.li_cap2 = document.createElement("span");
	    this.li_cap2.innerHTML = "编辑";
	    this.li_cap2.className = "editNotice";
	    // this.li_cap2.addEventListener("click",this.editor.bind(this),false);
	    this.li_cap3 = document.createElement("span");
	    this.li_cap3.innerHTML = "设为默认";
	    this.li_cap3.className = "moren";
	    // this.li_cap3.addEventListener("click",this.moren.bind(this),false);    
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		this.li_option.appendChild(this.li_cap1);
		this.li_option.appendChild(this.li_cap2);
		this.li_option.appendChild(this.li_cap3);	
		document.getElementById("contentBox1").appendChild(this.ul_element);
	}
 MeetingRoom1.prototype.delete = function(){
 alert(1)
 }
  MeetingRoom1.prototype.xiugai = function(){

alert(1)
 }
  MeetingRoom1.prototype.moren = function(){

alert(1)
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
	function firstShowList1(data){
		meetingRoomData1 = data.data;
		totals1 = meetingRoomData1.length;
		paging_mode1(0,totals1);

	}
	//获取所有详细信息

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
$(".jfspan").click(function(){
	var a=$.trim($(".jfinput").val())
	if(a==''){
		alert("请输入积分码")
	}
	else{
		$.ajax({
			type:"get",
			url:'http://101.200.192.149:8080/jfstore/getjf?number='+a,
			dataType:"json",
			success:function(data){
				if(data.code==0){
				var codes=data.data
				var b=Number(codes)+Number(scores)
						var data={
						"username": usernames,
						 "score": b
					}
					console.log(data)
					var url1 = 'http://101.200.192.149:8080/jfstore/updateuser';
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("PUT", url1, false);           
											        // xmlhttp.setRequestHeader("token", this.token);
					xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(JSON.stringify(data));

					if(xmlhttp.status==200){
					var codes=JSON.parse(xmlhttp.responseText)
					if(codes.code==0){
					alert("充值成功")
					window.location.reload()
					}
					}
					else{
					alert("服务器内部错误")
					}

			}
			else{
				alert("充值失败，请核对后输入")
			}
			},
			error:function(data){
				alert("充值失败，请核对后输入")
			}
		})
	}
})