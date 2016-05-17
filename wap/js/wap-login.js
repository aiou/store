
 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
 window.addEventListener('load', function () {
		FastClick.attach(document.body);
	}, false);
 var wsCache = new WebStorageCache();
 $.getJSON("http://101.200.192.149:8080/jfstore/notices",function(result){
 
  html=''
  for (var i = 0; i<3; i++) {
    html+='<div class="content">'+result.data[i].content+'</div>'
  }
  $(".notice-box").append(html)
})