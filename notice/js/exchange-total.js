var site1
var site2
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("token");
site2=wsCache.get("refid");
console.log(site1)
if((site1==null)||(site2==null)){
	//window.location.href="www.baidu.com"
}
$("#datatime1").datetimepicker();
$("#datatime2").datetimepicker();
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
   window.location.href="user-login.html"
}	