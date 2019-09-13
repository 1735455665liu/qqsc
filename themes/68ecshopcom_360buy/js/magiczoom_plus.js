function get_gallery_attr(goods_id, goods_attr_id)
	{		
		Ajax.call('goods.php?act=get_gallery_attr', 'id=' + goods_id + '&goods_attr_id=' + goods_attr_id , get_gallery_attr_Response, 'GET', 'JSON');
	}

	function get_gallery_attr_Response(result)	
	{		
		var zoom = document.getElementById('zoom'); 
		zoom.href = result.bigimg; 
		zoom.rel = 'zoom-position: right; zoom-height:400px;zoom-width:400px;'; 
		zoom.firstChild.src = result.middimg; 		
		MagicZoom.refresh();
		
		/* 
		*   注意此处的 demo1 名字要与 library/goods_gallery.lbi里的 <div id="demo1" style="float:left"> 里的ID一致 
		*/		
		document.getElementById("demo1").style.marginLeft="0px";
		document.getElementById("demo2").style.marginLeft="0px";
		document.getElementById("demo1").innerHTML = result.thumblist;  
		document.getElementById("demo2").innerHTML = ''; 
		
	  var boxwidth=76;//跟图片的实际尺寸相符      
      var box=document.getElementById("demo");
      var obox=document.getElementById("demo1");
      var dulbox=document.getElementById("demo2");
      obox.style.width=obox.getElementsByTagName("li").length*boxwidth+'px';
      dulbox.style.width=obox.getElementsByTagName("li").length*boxwidth+'px';
      box.style.width=obox.getElementsByTagName("li").length*boxwidth*3+'px';
       canroll = false;
      if (obox.getElementsByTagName("li").length >= 4) {
        canroll = true;
        dulbox.innerHTML=obox.innerHTML;
      }
       step=5;temp=1;speed=50;
       awidth=obox.offsetWidth;
       mData=0;
       isStop = 1;
       dir = 1;
		
		
	}

	
function changeAtt(t,goods_id) {
t.lastChild.checked='checked';
for (var i = 0; i<t.parentNode.childNodes.length;i++) {
	if (t.parentNode.childNodes[i].className == 'cattsel') {
		t.parentNode.childNodes[i].className = '';
	}
}

t.className = "cattsel";
var formBuy = document.forms['ECS_FORMBUY'];
spec_arr = getSelectedAttributes(formBuy);
Ajax.call('goods.php?act=get_products_info', 'id=' + spec_arr+ '&goods_id=' + goods_id, shows_number, 'GET', 'JSON');
}

function shows_number(result)
{
if(result.product_number !=undefined)
{
	document.getElementById('shows_number').innerHTML = result.product_number;
}
else
{
	document.getElementById('shows_number').innerHTML = '无货'
}
}


function showMiddImage(t){		
		var demo=document.getElementById('demo');
		var demoa=demo.getElementsByTagName("a");
		for(var i=0;i<demoa.length;i++){
		 demoa[i].className='';
		}
		t.className="gallery_img_cur";
}


function show_attr_status(theid, goods_id, attr_id_2)
{
	var selected_first=new Array();
	selected_first[0] = theid.id.replace('xuan_a_','');
	var spec_attr_type = document.getElementsByName('spec_attr_type');

	var mylist = theid.parentNode.getElementsByTagName("a");
	for(zzz=0; zzz<mylist.length; zzz++)
	{
		if(mylist[zzz].className!='wuxiao')
		{
				mylist[zzz].onclick=function(){
					show_attr_status(this, goods_id, attr_id_2);
				}
		}
		var my_input_id = mylist[zzz].id.replace('xuan_a_', 'spec_value_');
		document.getElementById(my_input_id).checked=false;
	}
	var the_input_id = theid.id.replace('xuan_a_', 'spec_value_');
	theid.onclick=function(){}
	document.getElementById(the_input_id).checked="checked";

	var pid_catt= theid.parentNode.id.replace('catt_', '');
	 for (iii=0;iii<spec_attr_type.length;iii++ )
	 {
	     selid_2=0;
	     if (spec_attr_type[iii].value != pid_catt)
	     {
		var s1=document.getElementById('xuan_'+spec_attr_type[iii].value);
		var s1_list = s1.getElementsByTagName("a");
		for(jjj=0;jjj<s1_list.length;jjj++)
		{	
			s1_a_id = s1_list[jjj].id.replace('xuan_a_','');
			if (is_exist_prod(selected_first, s1_a_id, myString) )
			{					
				if (selid_2)
				{
					if (s1_list[jjj].className == 'cattsel')
					{
						selid_2 = s1_a_id;
					}
				}
				else
				{
					selid_2 =  s1_a_id;
				}
				s1_list[jjj].className = '';
				s1_list[jjj].onclick=function(){
					show_attr_status(this, goods_id, attr_id_2);
				}
			}
			else
			{
				s1_list[jjj].className = 'wuxiao';
				s1_list[jjj].onclick=function(){}				
			}
			document.getElementById('spec_value_' + s1_a_id).checked = false;
		}
		document.getElementById('spec_value_' + selid_2).checked = "checked";
		selected_first.push(selid_2);
		document.getElementById('xuan_a_'+selid_2).className='cattsel';
		document.getElementById('xuan_a_'+selid_2).onclick=function(){}		
	     }
	}	
	changeAtt(theid, goods_id);
	if (theid.parentNode.id.replace('catt_','')==attr_id_2)
	{
		get_gallery_attr(goods_id, selected_first[0]);
	}
	changePrice();
 }
 function is_exist_prod(selected_first, id, prod_exist_arr)
 {
	if (prod_exist_arr.length == 0)
	{
		return 0;
	}
	var w_selected = selected_first.slice(0);
	w_selected.push(id);	
	var all_valid =0;
	for (var i in prod_exist_arr)
	{
		var first_exist=1;
		for (var j in w_selected)
		{
			if ( prod_exist_arr[i].indexOf("|" + w_selected[j] + "|") =='-1')
			{
				first_exist=0;
				break;
			}
		}
		if(first_exist==1)
		{
			all_valid=1;
			break;
		}
	
	}
	return all_valid;
 }