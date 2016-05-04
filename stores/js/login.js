
  var curIndex = 0, //当前index
      imgLen = $(".imgList li").length; //图片总数
     // 定时器自动变换2.5秒每次
  var autoChange = setInterval(function(){ 
    if(curIndex < imgLen-1){ 
     curIndex ++; 
    }else{ 
      curIndex = 0;
    }
    //调用变换处理函数
    changeTo(curIndex); 
  },2500);
  //对右下角按钮index进行事件绑定处理等
  $(".indexList").find("li").each(function(item){ 
    $(this).hover(function(){ 
      clearInterval(autoChange);
      changeTo(item);
      curIndex = item;
    },function(){ 
      autoChangeAgain();
    });
  });
  //清除定时器时候的重置定时器--封装
  function autoChangeAgain(){ 
      autoChange = setInterval(function(){ 
      if(curIndex < imgLen-1){ 
        curIndex ++;
      }else{ 
        curIndex = 0;
      }
    //调用变换处理函数
      changeTo(curIndex); 
    },2500);
    }
  function changeTo(num){ 
    var goLeft = num * 650;
    $(".imgList").animate({left: "-" + goLeft + "px"},500);
    $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
    $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }
  var token;
  //获取验证码
  function codes(){
    // $.getJSON('http://101.200.192.149:80/jfstore/getCaptchaImage',function(data){
    //   console.log(data)
    // }
    // )
     $.ajax({  
        url:"http://101.200.192.149:80/jfstore/getCaptchaImage",
        dataType:'jsonp', 
        type:"get", 
        // data:'',  
        jsonp:'callback', 
        header:{
          "X-XSS-Protection": "0",
          "Content-Type":"image/jpeg"
        },
        success:function(result) {  
           console.log(result)
        },
        error:function(result){
         
          console.log(1111) 
          alert(2)
          console.log(result)
        }
    })
    //  var data=''
    //  var url1 = "http://101.200.192.149:80/jfstore/getCaptchaImage";
    // var xmlhttp = new XMLHttpRequest();
    //     xmlhttp.open("get", url1, false);           
    //     xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    //     xmlhttp.setRequestHeader("Content-Type", "image/jpeg");
    //     xmlhttp.send(null);
    //     if(xmlhttp.status==200){
    //         consolo.log(xmlhttp)
    //     }else{
    //       alert(1)
    //     }
  }
  codes()