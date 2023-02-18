
// Preloader
const tll = gsap.timeline({
   paused: "true"
});
tll.to("#percent, #bar",{
   duration:.2,
   opacity: 0,
   zIndex: -1
});
tll.to("#preloader",{
   duration: .8,
   width: "0%"
});
var width = 1;
var bar = document.getElementById("barconfrm");
var id;
function move(){
   id = setInterval(frame,10);

}
function frame(){
   if(width>=100){
       clearInterval(id);
       tll.play();
   }
   else{
       width++;
       bar.style.width = width + "%";
       document.getElementById("percent").innerHTML = width + "%";
   }
}




