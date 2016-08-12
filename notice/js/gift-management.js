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
		//获取所有详细信息
	var meetingRoomNum = "";
	var displayName = "";
	$.ajax({
		type: "get",
		url:urlnew+'/jfstore/products',
		success: function(data){
			firstShowList(data);
		},
		error: function(erro){
			alert("获取信息失败");
		}
	});
}
var organizationData;
var meetingRoomData;
var currentCount = 10;//每一页显示的条数
var admin_token; //全局token
var nowId = 0;
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
		 this.details=meetingroom_data.detail
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-org1";
		this.li_name = document.createElement("li");
		this.li_name.innerHTML = this.names;
		this.li_name.title = this.names;
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
		// this.li_option.appendChild(this.img3);
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_option);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
		MeetingRoom.prototype.updateRoom = function(){
			$(".bcgs").show()
			$(".editor-notice").show()
		nowId = this.ids;
		types  =this.lbs
		$(".add-name1").val(this.names)
		$(".add-score1").val(this.needscores)
		$(".add-count1").val(this.totalss)
		 for(var i=0;i<$("input[name='radiochooseCreat']").length;i++) {  
			if($("input[name='radiochooseCreat']").eq(i).val() ==types) {   	
			$("input[name='radiochooseCreat']").eq(i).attr("checked",'checked');  
			break;  
				            }  
				        }
		$("#div2").html(this.details)
		//表单提交添加商品	
    $('#forms1').on('submit', function() {
        var a=$(".add-name1").val()
		var b=$(".add-score1").val()
		var c=$(".add-count1").val()
		var d=$("input[name='radiochooseCreat']:checked").val();
		var e=encodeURI(editor.$txt.html());
		if((a=='')||(b=='')||(c=='')||(d=='')||(e=='')){
		alert("请完善信息")
		return false

	}
	else{
        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url:urlnew+'/jfstore/updatepro?productid='+nowId+'&name='+a+'&detail='+e+'&needscore='+b+'&totals='+c+'&lb='+d,
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                console.log(data)
                alert('编辑成功！');
                window.location.reload()
            }

            // $(this).resetForm(); // 提交后重置表单
        })
        return false; // 阻止表单自动提交事件
    }
    });

	}
	MeetingRoom.prototype.deleteRoom = function(){
		var deleteID = this.ids;
		if(confirm("确定要删除该物品？")){
			$.ajax({
			type: 'delete',
			url: urlnew+'/jfstore/delpro?id='+deleteID,
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

$(".cancel").click(function(){
	$(".bcgs").hide()
	$(".editor-notice").hide()
})
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
 var editor1=new wangEditor("div1")
  editor1.config.uploadImgUrl = urlnew+'/jfstore/uploadimg';
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
  editor1.$txt.html('<p>请在这里输入产品详情</p>');
  // 获取编辑区域的html
    var html = editor1.$txt.html();
    // 获取编辑区域的纯文本
    var text = editor1.$txt.text();
    // 获取编辑区域的所有图片
    var imgs = editor1.$txt.find('img');
    // 追加内容
  var editor=new wangEditor("div2")
  editor.config.uploadImgUrl = urlnew+'/jfstore/uploadimg';
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
  editor.$txt.html('<p>请在这里输入产品详情</p>');
  // 获取编辑区域的html
    var html = editor.$txt.html();
    // 获取编辑区域的纯文本
    var text = editor.$txt.text();
    // 获取编辑区域的所有图片
    var imgs = editor.$txt.find('img');
    // 追加内容
$("#addNotice").click(function(){
	$(".bcgs").show()
	$(".add-notice").show()
})
$(".cancels").click(function(){
	$(".bcgs").hide()
	$(".add-notice").hide()
})
//表单提交添加商品	
    $('#forms').on('submit', function() {
        var a=$(".add-name").val()
		var b=$(".add-score").val()
		var c=$(".add-count").val()
		var d=$("input[name='lb']:checked").val();
		var e=encodeURI(editor1.$txt.html());
		if((a=='')||(b=='')||(c=='')||(d=='')||(e=='')){
		alert("请完善信息")
		return false

	}
	else{
        $(this).ajaxSubmit({
            type: 'post', // 提交方式 get/post
            url:urlnew+'/jfstore/addpro?name='+a+'&detail='+e+'&needscore='+b+'&totals='+c+'&lb='+d,
            success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
                // 此处可对 data 作相关处理
                console.log(data)
                alert('提交成功！');
                window.location.reload()
            }

            // $(this).resetForm(); // 提交后重置表单
        })
        return false; // 阻止表单自动提交事件
    }
    });
