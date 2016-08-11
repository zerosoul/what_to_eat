var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  loop: false,
  effect:'coverflow',
  followFinger:false,
  
  // Navigation arrows
  // nextButton: '.swiperBtnNext',
  direction: 'vertical'
});    

var isMobile = (function() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
})();
var event=isMobile?"touchend":"click";
var foods = ["西红柿鸡蛋", "蒜薹炒肉", "宫保鸡丁", "醋溜土豆丝", "自助餐", "疙瘩汤", "驴肉火烧", "饺子", "馒头", "喝西北风", "豆角焖面", "面条", "炒饼"];
var randEle=document.querySelector(".randFood");
// var nextEle=document.querySelector(".actionBtn");
var nextEle=document.querySelector(".swiperBtnNext");
var emojEle=document.querySelector(".randomBlock .emoji");
var randomTimer=0;
var rainTimer=0;
var emojs={
	waiting:"images/fyh.jpg",
	aha:"images/fyh_aha.jpg"
};
mySwiper.on('slideChangeEnd', function (swiper) {
    console.log('slide change start');
    console.log(swiper);
    if(!swiper.isBeginning){
    	nextEle.style.display="none";
    }else{
    	nextEle.classList.remove("animated");
    	nextEle.style.display="block";
    }
});
// nextEle.addEventListener(event,function(){
// 	mySwiper.slideNext();
// });
document.querySelector(".pressBtn").addEventListener(event,function(evt){
	var clicked=!!this.getAttribute("data-clicked");
	if(clicked){
		endRandom();
		this.innerHTML="再来一发";
		this.setAttribute("data-clicked","");
	}else{
		randEle.style.display="block";
		playRandom();
		this.innerHTML="暂停";
		this.setAttribute("data-clicked","yes");
	}
});


function playRandom(){
	emojEle.src=emojs.waiting;
	rainTimer=setInterval(draw, 64);
	randEle.classList.add("slideInDown");
	randomTimer=setInterval(function(){
		var food=getRandomFood();
		randEle.innerHTML=food;
	},80);
}
function endRandom(){
	emojEle.src=emojs.aha;
	clearInterval(randomTimer);
	clearInterval(rainTimer);
}
function getRandomFood() {
		var randIndex = Math.floor(Math.random() * (foods.length));
		return foods[randIndex];
}


/************************************* 
Code is based on the walkthough here: http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript 
**************************************/
var cnvs = document.getElementById('foodRainCanvas');
var ctx = cnvs.getContext('2d');

// var chars = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ॐ'; // om
var chars = foods.join('').split(''); // make array
var font_size = 14;


// see: http://blog.codepen.io/2013/07/29/full-screen-canvas/
function resizeCanvas() {
  cnvs.width = window.innerWidth;
  setTimeout(function() {
    cnvs.height = window.innerHeight;
  }, 0);
};
window.onresize = resizeCanvas();
resizeCanvas();


var columns = cnvs.width/font_size;
var drops = [];
for(var x=0;x<columns;x++){
  drops[x]=1;
}

function draw(){
  ctx.fillStyle = 'rgba(246,247,215,0.05)';
  ctx.fillRect(0,0,cnvs.width,cnvs.height);
  //see: http://stackoverflow.com/a/5365036/2365376
  ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  ctx.font = font_size + 'px helvetica';
  
  for(var i=0;i<drops.length;i++){
    var txt = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(txt,i*font_size, drops[i]*font_size);
    
    if(drops[i]*font_size>cnvs.height&&Math.random()>0.975){
      drops[i] = 0; // back to the top!   
    }
    drops[i]++;
  }
}