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
    url:'http://101.200.192.149:8080/jfstore/listallimg',
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
    var a="http://101.200.192.149:8080/jfstore/img/"+this.imgpaths
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
      url:'http://101.200.192.149:8080/jfstore/delimg?id='+noticeid,
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

// $(function () {
//             $(".buttons").click(function () {
//                 ajaxFileUpload();
//             })
// })
//         function ajaxFileUpload() {
//             $.ajaxFileUpload
//             (
//                 {   
//                     url: 'http://101.200.192.149:8080/jfstore/uploadadimg', //用于文件上传的服务器端请求地址
//                     type: 'post',
//                     secureuri: false, //是否需要安全协议，一般设置为false
//                     fileElementId: 'file1', //文件上传域的ID
//                     dataType: 'text', //返回值类型 一般设置为json
//                     success: function (data, status)  //服务器成功响应处理函数
//                     {
//                       console.log(data)
//                         $("#img1").show();
                      
//                     },
//                     error: function (data, status, e)//服务器响应失败处理函数
//                     {
//                         alert(e);
//                     }
//                 }
//             )
//             return false;
//         }

    // $(".dropz").dropzone({
    //     url: "http://101.200.192.149:8080/jfstore/uploadadimg",
    //     addRemoveLinks: true,
    //     dictRemoveLinks: "1",
    //     dictCancelUpload: "222",
    //     maxFiles: 10,
    //     maxFilesize: 5,
    //     acceptedFiles: "image/*",
    //     init: function() {
    //         this.on("success", function(file) {
    //           alert(1)
    //             console.log("File " + file.name + "uploaded");
    //         });
    //         this.on("removedfile", function(file) {
    //             console.log("File " + file.name + "removed");
    //         });
    //     }
    // });
var image = '';
 function selectImage(file){
 if(!file.files || !file.files[0]){
return;
}
 var reader = new FileReader();
 reader.onload = function(evt){
 document.getElementById('image').src = evt.target.result;
 image = evt.target.result;
}
reader.readAsDataURL(file.files[0]);
}
 function uploadImage(){

$.ajax({

type:'POST',

 url: 'http://101.200.192.149:8080/jfstore/uploadadimg', 

 data: {image: image},

 async: false,

 dataType: 'json',

 success: function(data){

if(data.success){

alert('上传成功');

}else{

alert('上传失败');

}

},

 error: function(err){
console.log(err)
alert('网络故障');

}

});

}