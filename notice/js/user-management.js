var site1
var site2
var type
var types
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("tokencom");
site2=wsCache.get("refidcom");
console.log(site1)
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
    wsCache.delete('tokencom');
    wsCache.delete('refidcom');
   window.location.href="login.html"
}
if((site1==null)||(site2==null)){
	//window.location.href="www.baidu.com"
}
var organizationData;//所有机构
var meetingRoomData;//所有会议室
var currentCount = 10;//每一页显示的条数
var admin_token; //全局token
var nowId = 0;//全局会议室ID
var alias_roomNum = 0;
var group
//分页显示公用方法
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
		 this.levels= meetingroom_data.img;
		 this.groups = meetingroom_data.needscore;
		 this.scores = meetingroom_data.totals;
		 this.lbs = meetingroom_data.lb;
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-orgs";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.names;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.levels;
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.groups;
		this.li_cap.className = "org-password";
		this.li_org = document.createElement("li");
		this.li_org.innerHTML = this.scores;
		this.li_org.className = "org-time";
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.img1 = document.createElement("img");
		this.img1.src = "images/description2.png";
		this.img1.title = "编辑"
		this.img1.addEventListener("click",this.updateRoom.bind(this),false);
		this.li_option.appendChild(this.img1);
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
		MeetingRoom.prototype.updateRoom = function(){
		$(".bcgs").show();
		$(".editor-user").show();
		nowId = this.id;
		types  =this.lbs
		group=this.groups
		$(".user-name").html(this.names)
		$(".user-level").html(this.levels)
		$(".user-score").html(this.scores)
		$.getJSON('https://api.cloudp.cc:443/cloudpServer/v1/orgs/vmrs/getAllIvr_theme?token='+admin_token,function(data){
          	 						var departmentcount=data.data.length
       		                        html='';
       		                        for (var i = 0; i <departmentcount; i++) {

       			                    html+='<option id="'+data.data[i].id+'"value="'+data.data[i].uuid+'">'+data.data[i].name+'</option>'
       		                            };   
       		                        $('#user-select').append(html) 
       		                       	for(var i=0;i<$("#user-select option").length;i++) {  
				            			if($("#user-select option").eq(i).val() == th2) {   	
				                		$("user-select option").eq(i).attr('selected',true);  
				                		break;  
				            }  
				        } 
          	 				})
	}
	MeetingRoom.prototype.deleteRoom = function(){
		var deleteID = this.id;
		if(confirm("确定要删除该会议室？")){
			$.ajax({
			type: 'delete',
			url: 'https://api-test.cloudp.cc:443/cloudpServer/v1/orgs/vmrs/'+this.id+'?token='+admin_token,
			success: function(data){
				for(var i=0;i<meetingRoomData.length;i++){
					if(deleteID == meetingRoomData[i].id){
						meetingRoomData.splice($.inArray(meetingRoomData[i],meetingRoomData),1);
						var a = parseInt($(".current-page").html());
						var b = $(".page-count").html();
						var c = $(".content-totals").html();
						var d =  Math.ceil(meetingRoomData.length/currentCount);
						if(a<d){
							paging_mode((a-1)*currentCount,a*currentCount);
						}else{
							paging_mode((a-1)*currentCount,meetingRoomData.length);
							$(".page-count").html(d);
						}
						totals = meetingRoomData.length;
						$(".content-totals").html(meetingRoomData.length);
					}
				}
			},
			error: function(erro){
				alert("删除会议室失败");
			}
		});
		}
		
	}
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
	//获取所有会议室详细信息
	var meetingRoomNum = "";
	var displayName = "";
	$.ajax({
		type: "get",
		url:'http://101.200.192.149:8080/jfstore/products',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("获取所有会议室失败");
		}
	});
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
//编辑礼品
$(".true").click(function(){
	var c=$("#user-a4").val()
	var d=$("#user-select option:selected").val()
	if((c=='')||(d=='')){
		alert("请完善信息")
		return false
	}
	else{
			var data={
			title:a,
			content:b
		}
		var url1 = 'http://101.200.192.149:8080/jfstore/addnotices';
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
		}
		else{
		alert("服务器内部错误")
		}
	}
})
$(".cancel").click(function(){
	$(".bcgs").hide()
	$(".editor-user").hide()
})
$(".submits").click(function(){
	var a=
	var b=$(".add-name").val()
	var c=$(".add-score").val()
	var d=$(".add-count").val()
	var e=$("input[name='radiochooseCreat']:checked").val()
	if((a=='')||(b=='')||(c=='')||(d=='')||(e=='')){
		alert("请完善信息")
		return false
	}
	else{
			var data={
			title:a,
			content:b
		}
		var url1 = 'http://101.200.192.149:8080/jfstore/addnotices';
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
//显示分组
$.getJSON("http://101.200.192.149:8080/jfstore/notices",function(result){
  html=''
  for (var i = 0; i<3; i++) {
     htm+='div class="groups">'
	 htm+='<span class="groups-left">'+研发一组+'</span>'
	 htm+='<span class="groups-right">'+25人+'</span>'
	 htm+='</div>'
  }
  $(".group-content").append(html)
})
//新建分组
$(".add-button").click(function(){
	var a=$.trim($(".add-group").val())
	if(a==''){
		alert("请输入名称")
		return false
	}
	else{
			var data={
			title:a,
			content:b
		}
		var url1 = 'http://101.200.192.149:8080/jfstore/addnotices';
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
//查询
$(".chaxun").click(function(){
		var organId = $("user-chaxun").val();
		if((organId==null)||(organId=='')){
			location.reload()
			return false
		}
		else{
		var url ='https://api.cloudp.cc:443/cloudpServer/v1/orgs/name/'+organId+'?token='+admin_token;
		$.ajax({
			type:"get",
			url:url,
			success: function(data){
					if(data.code==0){
					if(data.data.length==0){
						alert("没有符合条件的会议室")
							location.reload()
						return;
					}
				}else{
					alert(data.mes);
				}
				firstShowList(data);
			
			},
			error: function(erro){
				alert(erro);
			}
		})
		}
})