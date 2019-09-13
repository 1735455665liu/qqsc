var Ex=function (o){for(var k in o)this[k]=o[k];return this}
var UI=function (id){return document.getElementById(id)}
var UIs=function (tag){return Ex.call([],this.getElementsByTagName(tag))}
var Each=function (a,fn){for(var i=0;i<a.length;i++)fn.call(a[i],i,a)}
var dhooo=function (ini){
this.bind(ini,this);
this.autoIndex=0;
};
Ex.call(dhooo.prototype,{
bind:function (ini,me){
var dir=ini.dir=='top'?'scrollTop':'scrollLeft',pan=UI(ini.contentID);
var start=function (o){
Each(ini.btns,function(){this.className=''});
o.className=ini.className;
me.autoIndex=o.index;
me.begin(o.index,pan,ini.len,dir);
};
pan.onmouseover=function (){me.stop=true};
Each(ini.btns,function (i){
this.index=i;
this.onmouseover=function (){me.stop=true;start(this)};
pan.onmouseout=this.onmouseout=function(){me.stop=false}
});
var auto=function(){
if(!me.stop){
me.autoIndex=me.autoIndex==9?0:++me.autoIndex;
start(ini.btns[me.autoIndex]);
}
};
if(ini.auto)this.autoPlay=window.setInterval(auto,7000);
}
,begin:function (i,o,len,dir){
(function (me){
clearInterval(me.only);
me.only=setInterval(function (){
var diff=(i*len-o[dir])*0.1;
o[dir]+=Math[diff>0?'ceil':'floor'](diff);
if(diff==0)clearInterval(me.only);
},10)
})(this)
}
})


new dhooo({
btns:UIs.call(UI('myTab_btns1'),'LI')
,className:'hot'
,contentID:'main1'
,len:320
,auto:true
});
