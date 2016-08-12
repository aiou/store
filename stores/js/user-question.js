var wsCache = new WebStorageCache();
$.getJSON(urlnew+'/jfstore/questions',function(data){
	var a=data.data.length
	html=''
	for (i=0; i<a; i++) {
		html+='<div style="color:#fc4b45;margin-bottom:5px;">'+data.data[i].title+'</div><div>'+data.data[i].content+'</div>'
	};
	$(".question-box").append(html)
})
function exit(){
   wsCache.deleteAllExpires();
   wsCache.delete('token');
   wsCache.delete('refid');
   window.location.href="user-login.html"
}