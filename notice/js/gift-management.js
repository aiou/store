var site1
var site2
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("token");
site2=wsCache.get("refid");
console.log(site1)
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
   window.location.href="user-login.html"
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
//分页显示公用方法
function paging_mode(start,end){
document.getElementById("contentBox").innerHTML="";
	for(var i=start;i<end;i++){
		 var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
		}
	}
function MeetingRoom(meetingroom_data){
		//DATA
		this.id = meetingroom_data.id;
		this.organId = meetingroom_data.organId;
		this.roomName = meetingroom_data.name;
		this.roomNum = meetingroom_data.meetingRoomNum;
		this.capacity = meetingroom_data.capacity;
		this.orgName = meetingroom_data.orgName;
		this.expirationDate = meetingroom_data.expirationDate.substring(0,16);
		this.hostPwd = meetingroom_data.hostPassword;
		this.guestPwd = meetingroom_data.guestPassword;
		this.allowGuestFlag = meetingroom_data.allowGuestFlag;
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-orgs";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.roomName;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.roomNum;
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.capacity;
		this.li_cap.className = "org-password";
		this.li_org = document.createElement("li");
		this.li_org.innerHTML = this.orgName;
		this.li_org.className = "org-time";
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.img1 = document.createElement("img");
		this.img1.src = "images/description2.png";
		this.img1.title = "编辑"
		this.img1.addEventListener("click",this.deleteRoom.bind(this),false);
		this.img2 = document.createElement("img");
		this.img2.src = "images/description3.png";
		this.img2.title = "删除"
		this.img2.addEventListener("click",this.deleteRoom.bind(this),false);
		this.li_option.appendChild(this.img1);
		this.li_option.appendChild(this.img2);
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
		MeetingRoom.prototype.updateRoom = function(){
		$(".bcgs").show();
		$(".editor-form").show();
		$("#updateOrgSelect").append('<option value="'+this.organId+'">'+this.orgName+'</option>');
		$("#updateOrgSelect").attr("disabled",true);
		$("#updateRoomName").val(this.roomName);
		$("#updateRoomNum").val(this.roomNum);
		$("#updateCap").val(this.capacity);
		$("#updateDate").val(this.expirationDate);
		$("#updateDate").datetimepicker();
		nowId = this.id;
		$("#updateHostPwd").val(this.hostPwd);
		$("#updateGuestPwd").val(this.guestPwd);
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
				openAlertWin("删除会议室失败");
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
		url:'https://api-test.cloudp.cc:443/cloudpServer/v1/orgs/vmrs/?token='+admin_token,
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			openAlertWin("获取所有会议室失败");
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
			openAlertWin("当前为第一页");
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
			openAlertWin("已经是最后一页");
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
	