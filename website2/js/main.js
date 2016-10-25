import data.js


var R = 290 , dur = 7 ,
 totalCount = 3 , // Try to change "totalCount" to for example 7 or even 30 :D
 Ease = Linear.easeNone ; // don't forget to change ease type, for example Expo.easeOut

for( var i=totalCount-1; i--; ){
  var cloneG = document.querySelector('.g1').cloneNode();
  document.querySelector('svg').appendChild(cloneG)
};

var tl = new TimelineLite()
.staggerTo(".g1", dur ,{
bezier:{curviness:1.5,values:[{x:0,y:0},{x:R/2,y:R/2},{x:0,y:R},{x:-R/2,y:R/2},{x:0,y:0}]}
, rotation:1080 , repeat:-1 , ease:Ease , transformOrigin:'center' },dur/totalCount)
.to("svg", dur*2 ,{rotation:-360,ease:Power0.easeNone,repeat:-1},0)
.time( dur ); // you can remove .time(dur) to start normally :)
