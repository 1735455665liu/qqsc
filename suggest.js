var $$=function(node){
return document.getElementById(node);
}
var $N=function(obj,node){
return obj.getElementsByTagName(node);
}


var j=-1;
var temp_str;
function ajax_keyword(V)
{
	Ajax.call('search_suggest.php', 'keywords='+V, search_response, "POST", "TEXT");
}

function search_response(result)
{
	var res =  parseObjectToJSON(result);
	//var res = result.parseJSON();

	var ele = document.getElementById("search_suggest");
	if(res.content!="")
	{
		ele.innerHTML = res.content;
		$$("search_suggest").style.display="block";
	}
	else
	{
			closediv();return;
	}
}

function keyupdeal(e,V)
{
	initdiv();
	if(temp_str==V)return;
	if(V==""){temp_str="";closediv();return;}
	var keyc;
	if(window.event){keyc=e.keyCode;}else if(e.which){keyc=e.which;}
	if(keyc==1)return;
	if(keyc!=40 && keyc!=38){ajax_keyword(V);temp_str=V;}
}

function form_submit(obj)
{
	$$("keyword").value=obj.childNodes[0].firstChild.nodeValue;
	$$("searchForm").submit();
}

function keydowndeal(e)
{
var keyc;
var obj=$$("search_suggest");
if(window.event){keyc=e.keyCode;}else if(e.which){keyc=e.which;}
if(keyc==40||keyc==38)
	{
		if(keyc==40)
		{
		if(j<$N(obj,"li").length){j++;if(j>=$N(obj,"li").length){j=-1;}}
		if(j>=$N(obj,"li").length){j=-1;}
		}
		if(keyc==38)
		{
		if(j>=0){j--;if(j<=-1){j=$N(obj,"li").length;}}else{j=$N(obj,"li").length-1;}
		}	
		set_style(obj,j);
		if(j>=0&&j<$N(obj,"li").length){$$("keyword").value=$N(obj,"li")[j].childNodes[0].firstChild.nodeValue;}
		else{$$("keyword").value=temp_str;}
	}
}

function set_style(obj,num)
{
	for(var i=0;i<$N(obj,"li").length;i++){var li_node=$N(obj,"li")[i];li_node.className="";}
	if(j>=0 && j<$N(obj,"li").length){var i_node=$N(obj,"li")[j];$N(obj,"li")[j].className="selected";}
}
function closediv()
{
    document.getElementById("search_suggest").innerHTML="";
    document.getElementById("search_suggest").style.display="none";
}

function initdiv(){
	var x=0,y=13; 
	p=$$("keyword");
	//alert("suggest_top"+$$("search_suggest").style.top.toString());
	//alert("suggest_left"+$$("search_suggest").style.left.toString());
	while (p)
	{  
  	x += p.offsetLeft  || 0;
  	y += p.offsetTop || 0;
  	p = p.offsetParent;
	} 
	$$("search_suggest").style.top=(y+20).toString()+"px";
	$$("search_suggest").style.left=x.toString()+"px";
}

function suggestOver(obj)
{
	_over();
	obj.className='selected';
}

function suggestOut(obj)
{
	_out();
  obj.className='';
}

function AddEvent(a, b, c){
        !document.all ? a.addEventListener(b, c, false) : a.attachEvent("on" + b, c);

}
function DelEvent(a, b, c){
        !document.all ? a.removeEventListener(b, c, false) : a.detachEvent("on" + b, c);
        a.onblur="";
}

function _over()
{
	DelEvent($$('keyword'), 'blur', closediv);
}

function _out()
{
	AddEvent($$('keyword'), 'blur', closediv);
}
window.onresize = function(){
    initdiv();   
}
