var site1
var site2
var currentCount=10;
var usernames
var wsCache = new WebStorageCache();
$("#datatime1").datetimepicker();
$("#datatime2").datetimepicker();	
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
		url:'http://101.200.192.149:8080/jfstore/exchangerecord',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("服务器内部错误");
		}
	});
}
// $("#datatime1").datetimepicker();
// $("#datatime2").datetimepicker();
//退出按钮

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

function gets(results){
	 $.ajaxSettings.async = false
	 $.getJSON('http://101.200.192.149:8080/jfstore/getuserInfo?token='+site1+'&id='+results,function(data){
		  usernames=data.data.username	 	
		 })
}
function MeetingRoom(meetingroom_data){
		//DATA
		var datas
		 this.ids = meetingroom_data.userId;
		 this.products= meetingroom_data.productName;
		 this.numbers = meetingroom_data.exchangeNumber;
		 this.scores = meetingroom_data.needScore;
		 this.times=meetingroom_data.exchangeTime
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
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.li_option.innerHTML = datas;
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		console.log(datas)
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
		if(confirm("确定要删除这条记录？")){
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
				alert("删除失败");
			}
		});
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
$(".chaxun").click(function(){
	var a=$("#datatime1").val()
	var b=$("#datatime2").val()
	if((a=='')||(b=='')){
		alert("请选择日期")
	}
	else{
		$.getJSON('http://101.200.192.149:8080/jfstore/listExchangesometime?beginTime='+a+'&endTime='+b,function(data){
			if(data.code==0){
			var c=data.data.length
			if(c!==0){
				firstShowList(data);
			}
			else{
				alert("该时间段内没有兑换记录")
			}
			}
			else{
				alert("网络错误，请重试")
			}
		})
	}
})