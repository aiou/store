var site1
var site2
var wsCache = new WebStorageCache();
wsCache.deleteAllExpires();
site1=wsCache.get("tokencom");
site2=wsCache.get("refidcom");
console.log(site1)
if((site1==null)||(site2==null)){
	window.location.href="login.html"
}
$("#datatime1").datetimepicker();
$("#datatime2").datetimepicker();
//退出按钮
function exit(){
   wsCache.deleteAllExpires();
   window.location.href="login.html"
}	