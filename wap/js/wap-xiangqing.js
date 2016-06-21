
var gfids
function exit(){
   window.location.href="wap-gift.html"
}
  function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  var Request = new Object();
  Request = GetRequest();
  gfids=Request.gfid;
$.getJSON('http://101.200.192.149:8080/jfstore/getProductById?id='+gfids,function(data){
	$(".public-box").append(data.data.detail)
})  
