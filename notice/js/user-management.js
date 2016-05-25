var site1
var site2
var type
var group
var nowId
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
	window.location.href="login.html"
}
else{
		//获取所有会议室详细信息
	var meetingRoomNum = "";
	var displayName = "";
	$.ajax({
		type: "get",
		url:'http://101.200.192.149:8080/jfstore/listalluser',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("获取所有会议室失败");
		}
	});
	$.ajax({
		type: 'get',
		url: 'http://101.200.192.149:8080/jfstore/listgroup',
		success: function(data){
		for(var i=0;i<data.data.length;i++){
		 	var room_alias = new RoomAlias(data.data[i]);
		}
	},
		error: function(erro){
				alert("获取分组失败");
			}
		});
}
var organizationData;//所有机构
var meetingRoomData;//所有会议室
var currentCount = 10;//每一页显示的条数
var admin_token; //全局token
var nowId = 0;//全局会议室ID
var alias_roomNum = 0;
var group
//分页显示公用方法
function gets(results){
	 $.ajaxSettings.async = false
	 $.getJSON('http://101.200.192.149:8080/jfstore/getuserInfo?token='+site1+'&id='+results,function(data){
		  usernames=data.data.username	 	
		 })
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
		 this.usernames= meetingroom_data.username;
		 this.levels= meetingroom_data.level;
		 this.groupnames = meetingroom_data.groupName;
		 this.scores = meetingroom_data.score;
		 this.groupids= meetingroom_data.id;
		//DOM
		if(this.levels==undefined){
			this.levels=''
		}
		if(this.groupids==undefined){
			this.groupids=''
		}
		if(this.scores==undefined){
			this.scores=''
		}
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-orgs";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.usernames;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.levels;
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.groupids;
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
		nowId = this.ids;
		group=this.groupids
		$(".user-name").html(this.usernames)
		$(".user-level").html(this.levels)
		$(".user-score").html(this.scores)
		$("#user-select").html('')
		$.getJSON('http://101.200.192.149:8080/jfstore/listgroup',function(data){
          	 						var departmentcount=data.data.length
       		                        html='';
       		                        for (var i = 0; i <departmentcount; i++) {

       			                    html+='<option value="'+data.data[i].id+'">'+data.data[i].groupName+'</option>'
       		                            };   
       		                        $('#user-select').append(html) 
       		                       	for(var i=0;i<$("#user-select option").length;i++) {  
				            			if($("#user-select option").eq(i).val() ==group) {   	
				                		$("#user-select option").eq(i).attr('selected',true);  
				                		break;  
				            }  
				        } 
          	 				})
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
	// var a=
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

function RoomAlias(room_alias){
		this.ids = room_alias.id;
		this.groupNames = room_alias.groupName;
		this.div1 = document.createElement("div");
		this.div1.className = "groups";
		this.div2 = document.createElement("span");
		this.div2.className="groups-left"
		this.div2.innerHTML = this.groupNames;
		this.div3 = document.createElement("span");
		this.div3.className="groups-right"		
		this.div3.addEventListener("click",this.delete.bind(this),false);
		this.div1.appendChild(this.div2);
		this.div1.appendChild(this.div3);
		$("#group-content").append(this.div1);
	}
RoomAlias.prototype.delete = function(){
		var deletid=this.ids
		$.ajax({
			type:"DELETE",
			url:'http://101.200.192.149:8080/jfstore/delgroup?id='+deletid,
			dataType:"json",
			success:function(data){
				if(data.code==0){
				alert("删除分组成功")
				window.location.reload()
				}
				else{
				alert("删除分组失败")
				}
			},
			error:function(data){
				alert("服务器内部错误")
			}			
	})
	}

//新建分组
$(".add-button").click(function(){
	var a=$.trim($(".add-group").val())
	if(a==''){
		alert("请输入名称")
		return false
	}
	else{
	var data={
			groupName:a
		}
		var url1 = 'http://101.200.192.149:8080/jfstore/addgroup';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(data));

		if(xmlhttp.status==200){
		var codes=JSON.parse(xmlhttp.responseText)
		if(codes.code==0){
		alert("添加分组成功")
		window.location.reload()
		}
		else{
		alert("添加分组失败")
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