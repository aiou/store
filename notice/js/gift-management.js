var site1
var site2
var type
var types
var nowIdadd
var nowId 
var url
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
		url:'http://101.200.192.149:8080/jfstore/products',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("获取所有会议室失败");
		}
	});
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
		 this.ids = meetingroom_data.id;
		 this.names= meetingroom_data.name;
		 this.imgs= meetingroom_data.img;
		 this.needscores = meetingroom_data.needscore;
		 this.totalss = meetingroom_data.totals;
		 this.lbs = meetingroom_data.lb;
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-org1";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.names;
		this.li_name.className = "org-name";
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.needscores;
		this.li_num.className = "org-id";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.totalss;
		this.li_cap.className = "org-password";
		this.li_org = document.createElement("li");
		if(this.lbs==1){
			type="热门"
		}
		else{
			type="推荐"
		}
		this.li_org.innerHTML = type;
		this.li_org.className = "org-time";
		this.li_option = document.createElement("li");
		this.li_option.className = "description";
		this.img1 = document.createElement("img");
		this.img1.src = "images/description2.png";
		this.img1.title = "编辑"
		this.img1.addEventListener("click",this.updateRoom.bind(this),false);
		this.img2 = document.createElement("img");
		this.img2.src = "images/description3.png";
		this.img2.title = "删除"
		this.img2.addEventListener("click",this.deleteRoom.bind(this),false);
		this.img3 = document.createElement("img");
		this.img3.src = "images/description6.png";
		this.img3.title = "添加"
		this.img3.addEventListener("click",this.add.bind(this),false);
		this.li_option.appendChild(this.img1);
		this.li_option.appendChild(this.img2);
		this.li_option.appendChild(this.img3);
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
		MeetingRoom.prototype.updateRoom = function(){
			$(".bcgs").show()
			$(".editor-user").show()
		nowId = this.ids;
		types  =this.lbs
		$(".com-name").val(this.names)
		$(".com-score").val(this.needscores)
		$(".com-count").val(this.totalss)
		 for(var i=0;i<$("#com-select option").length;i++) {  
			if($("#com-select option").eq(i).val() ==types) {   	
			$("#com-select option").eq(i).attr('selected',true);  
			break;  
				            }  
				        }
	}
	MeetingRoom.prototype.deleteRoom = function(){
		var deleteID = this.ids;
		if(confirm("确定要删除该物品？")){
			$.ajax({
			type: 'delete',
			url: 'http://101.200.192.149:8080/jfstore/delpro?id='+deleteID,
			success: function(data){
				if(data.code==0){
					alert("删除礼品成功")
					window.location.reload()
				}
				else{
					alert(data.code)
				}
			},
			error: function(erro){
				alert("删除礼品失败");
			}
		});
		}
		
	}
	MeetingRoom.prototype.add = function(){
		nowIdadd = this.ids;
		$(".bcgs").show()
		$(".add-img").show()
		url='http://101.200.192.149:8080/jfstore/uploadimg?id='+nowIdadd
		console.log(url)
		$(".buttons").click(function(){
			$(".bcgs").hide()
			 $(".add-img").hide() 
			 document.getElementById("forms").action = url;
			 var a=$(".files").val()
			  if(a==''){
			    alert("请选择图片")
			  }
			 else{
			 	alert("上传商品图片成功")
  			    document.getElementById("forms").submit();
  			      return false;
  			  
  			}
		})

	}
$(".cancel").click(function(){
	$(".bcgs").hide()
	$(".add-img").hide()
})
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
	var a=$(".com-name").val()
	var b=$(".com-score").val()
	var c=$(".com-count").val()
	var d=$("#com-select option:selected").val()
	if((a=='')||(b=='')||(c=='')||(d=='')){
		alert("请完善信息")
		return false
	}
	else{
		var data={
			  id: nowId ,
			  name: a,
			  needscore: b,
			  totals: c,
			  lb: d
		}
		console.log(data)
		var url1 = 'http://101.200.192.149:8080/jfstore/updatepro';
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("PUT", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(data));

		if(xmlhttp.status==200){
		var codes=JSON.parse(xmlhttp.responseText)
		if(codes.code==0){
		alert("编辑礼品成功")
		window.location.reload()
		}
		else{
			alert(codes.code)
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
	if((b=='')||(c=='')||(d=='')||(e=='')){
		alert("请完善信息")
		return false
	}
	else{
			var data={
			 		  "name": b,
					  "needscore": c,
					  "totals": d,
					  "lb": e
		}
		var url1 = 'http://101.200.192.149:8080/jfstore/addpro';
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
		else{
		alert("服务器内部错误")
		}
	}

})
 var editor=new wangEditor("div1")
  editor.config.uploadImgUrl = 'http://101.200.192.149:8080/jfstore/uploadadimg';
  editor.create()
  editor.$txt.html('<p>请在这里解答疑问</p>');
  // 获取编辑区域的html
    var html = editor.$txt.html();
    // 获取编辑区域的纯文本
    var text = editor.$txt.text();
    // 获取编辑区域的所有图片
    var imgs = editor.$txt.find('img');
    // 追加内容