	var currentCount = 20;//每一页显示的条数
  var cpid
	//兑奖产品hover效果
	$(".li1").hover(function(){
		$(this).addClass("gift-listhover")
	},function(){
		$(this).removeClass("gift-listhover")
	}
	)
	$(".li2").hover(function(){
		$(this).addClass("hot-listhover")
	},function(){
		$(this).removeClass("hot-listhover")
	}
	)
	//退出按钮
var wsCache = new WebStorageCache();
function exit(){
   wsCache.deleteAllExpires();
    wsCache.delete('token');
  wsCache.delete('refid');
   window.location.href="user-login.html"
}
 wsCache.deleteAllExpires();
 var site1=wsCache.get("token");
 var site2=wsCache.get("refid");
 var meetingRoomData;
function paging_mode(start,end){
    document.getElementById("contentBox").innerHTML="";
    for(var i=start;i<end;i++){
      var new_meetingroom = new MeetingRoom(meetingRoomData[i]);
    }
  }
  function MeetingRoom(meetingroom_data){
    //DATA
    var url="http://101.200.192.149:8080/jfstore/img/"
    this.ids = meetingroom_data.id;
    this.names= meetingroom_data.name;
    this.imgs= meetingroom_data.img;
    this.needscores = meetingroom_data.needscore;
    this.totalss = meetingroom_data.totals;
    this.lbs = meetingroom_data.lb;
    //DOM
    if(this.lbs==1){
   	this.ul_element = document.createElement("li");
   	this.ul_element.className="li1"
    this.li_name = document.createElement("dl");
    this.li_num = document.createElement("dt");
    this.img1 = document.createElement("img");
    this.img1.src = url+this.imgs;
    this.img1.addEventListener("click",this.xiangqing.bind(this),false);
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_img1=document.createElement("img")
    this.li_img1.className="imgjian"
    this.li_img1.src="../image/jian.png";
    this.li_img1.addEventListener("click",this.jian.bind(this),false);
    this.li_img2=document.createElement("img")
    this.li_img2.className="imgjia"
    this.li_img2.src="../image/jia.png";
    this.li_img2.addEventListener("click",this.jia.bind(this),false);
    this.li_inputs = document.createElement("input");
    this.li_opation = document.createElement("dd");
    this.li_opation.innerHTML = "立刻兑换";
    this.li_opation.className = "cash";
    this.li_opation.addEventListener("click",this.duihuan.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_num);
    this.li_name.appendChild(this.li_cap)
    this.li_name.appendChild(this.li_org)
    this.li_name.appendChild(this.li_data)
    this.li_name.appendChild(this.li_opation)
    this.li_num.appendChild(this.img1)
    this.li_data.appendChild(this.li_img1)
    this.li_data.appendChild(this.li_inputs)
    this.li_data.appendChild(this.li_img2)
    document.getElementById("contentBox").appendChild(this.ul_element);
  }
  else{
  	this.ul_element = document.createElement("li");
  	this.ul_element.className="li2"
    this.li_name = document.createElement("dl");
    this.li_num = document.createElement("dt");
    this.img1 = document.createElement("img");
    this.img1.src = url+this.imgs;
    this.img1.addEventListener("click",this.xiangqing.bind(this),false);
    this.li_cap = document.createElement("dd");
    this.li_cap.innerHTML = this.names;
    this.li_cap.className = "shop";
    this.li_org = document.createElement("dd");
    this.li_org.innerHTML = this.needscores+"积分";
    this.li_org.className = "jifen";
    this.li_data = document.createElement("dd");
    this.li_data.innerHTML = "数量";
    this.li_data.className = "counts";
    this.li_img1=document.createElement("img")
    this.li_img1.className="imgjian"
    this.li_img1.src="../image/jian.png";
    this.li_img1.addEventListener("click",this.jian.bind(this),false);
    this.li_img2=document.createElement("img")
    this.li_img2.className="imgjia"
    this.li_img2.src="../image/jia.png";
    this.li_img2.addEventListener("click",this.jia.bind(this),false);
    this.li_inputs = document.createElement("input");
    this.li_opation = document.createElement("dd");
    this.li_opation.innerHTML = "立刻兑换";
    this.li_opation.className = "cash";
    this.li_opation.addEventListener("click",this.duihuan.bind(this),false);
    this.ul_element.appendChild(this.li_name);
    this.li_name.appendChild(this.li_num);
    this.li_name.appendChild(this.li_cap)
    this.li_name.appendChild(this.li_org)
    this.li_name.appendChild(this.li_data)
    this.li_name.appendChild(this.li_opation)
    this.li_num.appendChild(this.img1)
    this.li_data.appendChild(this.li_img1)
    this.li_data.appendChild(this.li_inputs)
    this.li_data.appendChild(this.li_img2)
    document.getElementById("contentBox").appendChild(this.ul_element);
  }
    }
   MeetingRoom.prototype.jia = function(){
    var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{
    exchangenumbers++
    console.log(exchangenumbers)
    this.li_inputs.value=exchangenumbers
  }
  }
  MeetingRoom.prototype.jian = function(){
   var a='^[0-9]*$'
    var exchangenumbers=$.trim(this.li_inputs.value)
    if(exchangenumbers==''){
      alert("请输入数量")
      return false
    }
    else if(!exchangenumbers.match(a)){
      alert("只能输入数字")
      return false
    }
    else{     
    exchangenumbers--
    console.log(exchangenumbers)
    if(exchangenumbers<=0){
      exchangenumbers=0
    }
    this.li_inputs.value=exchangenumbers
  } }
  
  MeetingRoom.prototype.duihuan = function(){
   var productnames=this.names
    var exchangenumbers=$.trim(this.li_inputs.value)
   var needscores=this.needscores
    if((site1==null)||(site2==null)){
    alert("请先登录")
    return false
   }
   if(exchangenumbers==''){
    alert("请填写数量")
   }
   else{
    $(".bcgs").show()
    $(".gift-sure").show() 
      html1=''
      html=''
    $.getJSON('http://101.200.192.149:8080/jfstore/listAddressById?userId='+site2,function(data){
      console.log(data)
      var count=data.data.length
     for (var i =0; i<count; i++) {
       if(data.data[i].isDefault==0){
         html+='<input type="radio" name="address" class="morenaddress" checked="true" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation
       }
       else{
        html1+='<input type="radio" name="address" class="qitaaddress" value="'+data.data[i].id+'">'+data.data[i].contactName+'&nbsp'+data.data[i].contactTelphone+
         data.data[i].province+data.data[i].city+data.data[i].detailLocation+'<br>'
       }
     };
     $(".moren-box").append(html)
     $(".qita-box").append(html1)   
    })
    
   
    $("#address-true").click(function(){
      var values=$('input[name="address"]:checked').val();
       
    
    var data={
      productName:productnames,
      exchangeNumber:exchangenumbers,
      needScore:needscores,
      userId:site2,
      addressId:values

      }
      console.log(data)
    var url1 = 'http://101.200.192.149:8080/jfstore/insertexchange';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url1, false);           
                        // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if(xmlhttp.status==200){
    var codes=JSON.parse(xmlhttp.responseText)
    if(codes.code==0){
    alert("兑换成功")
    window.location.reload()
    }
    else{
      alert(codes.mes)
    }
    }
    else{
    alert("服务器内部错误")
    }
})

   }
  }
  MeetingRoom.prototype.xiangqing = function(){
    cpid=this.ids
    window.location.href='user-xiangqing.html?gfid='+cpid

  }
  //获取所有详细信息
  $.ajax({
    type: "get",
    url:'http://101.200.192.149:8080/jfstore/products',
    success: function(data){
      firstShowList(data);
    },
    error: function(erro){
      alert("服务器内部错误")
    }
  });
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