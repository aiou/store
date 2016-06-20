$.getJSON('http://101.200.192.149:8080/jfstore/questions',function(data){
	var a=data.data.length
	html=''
	for (i=0; i<a; i++) {
		html+='<div style="color:#fc4b45;margin-bottom:5px;">'+data.data[i].title+'</div><div>'+data.data[i].content+'</div>'
	};
	$(".question-box").append(html)
})