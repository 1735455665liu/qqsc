function gotozx()
{
	document.Form2.action = "diy.php";
	document.Form2.submit();
}
//获得Cookie解码后的值
function GetCookieVal(offset)  
{ 
	var endstr = document.cookie.indexOf (";", offset); 
	if (endstr == -1) 
	endstr = document.cookie.length; 
	return unescape(document.cookie.substring(offset, endstr)); 
} 

//设定Cookie值 
function SetCookie(name, value) 
{ 
	var expdate = new Date(); 
	var argv = SetCookie.arguments; 
	var argc = SetCookie.arguments.length; 
	//alert(argc);
	var expires = (argc > 2) ? argv[2] : null; 
	var path = (argc > 3) ? argv[3] : null; 
	var domain = (argc > 4) ? argv[4] : null; 
	var secure = (argc > 5) ? argv[5] : false; 
	if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 )); 
	document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString())) 
	+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain)) 
	+((secure == true) ? "; secure" : ""); 
}

//删除Cookie 
function DelCookie(name) 
{ 
	var exp = new Date(); 
	exp.setTime (exp.getTime() - 1); 
	var cval = GetCookie (name); 
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString(); 
}

//获得Cookie的原始值 
function GetCookie(name) 
{ 
	var arg = name + "="; 
	var alen = arg.length; 
	var clen = document.cookie.length; 
	var i = 0; 
	while (i < clen) 
	{ 
		var j = i + alen; 
		if (document.cookie.substring(i, j) == arg) 
		return GetCookieVal (j); 
		i = document.cookie.indexOf(" ", i) + 1; 
		if (i == 0) break; 
	} 
	return null; 
}

function onclickimage_diy(x,goods_id,goods_name,goods_price)
{
	var stroption = "";
	for (i=1;i<=10 ;i++ )
	{
		if (i == 1)
		{
			stroption = "<option value='" + i + "' selected>" + i + "</option>";
		}
		else
		{
			stroption = stroption + "<option value='" + i + "'>" + i + "</option>";
		}
	}
	window.parent.document.getElementById("span_" + x + "1").innerHTML = goods_name;
	window.parent.document.getElementById("span_" + x + "2").innerHTML = goods_price;
	window.parent.document.getElementById("span_" + x + "3").innerHTML = "<select id='select_" + x + "' onchange=\"javascript:changenum('" + x + "');\">" + stroption + "</select>";
	window.parent.document.getElementById("Id_" + x).value = goods_id;
	window.parent.document.getElementById("Price_" + x).value = goods_price.replace("￥","");
	window.parent.document.getElementById("Price1_" + x).value = goods_price.replace("￥","");
	window.parent.document.getElementById("num_" + x).value = "1";
	//addprice2();
}

function onclickimage(x,y)
{
	var stroption = "";

	for (i=1;i<=10 ;i++ )
	{
		if (i == 1)
		{
			stroption = "<option value='" + i + "' selected>" + i + "</option>";
		}
		else
		{
			stroption = stroption + "<option value='" + i + "'>" + i + "</option>";
		}
	}

	window.parent.document.getElementById("span_" + x + "1").innerHTML = document.getElementById("span1_" + y).innerHTML;
	window.parent.document.getElementById("span_" + x + "2").innerHTML = document.getElementById("span2_" + y).innerHTML;
	window.parent.document.getElementById("span_" + x + "3").innerHTML = "<select id='select_" + x + "' onchange=\"javascript:changenum('" + x + "');\">" + stroption + "</select>";
	window.parent.document.getElementById("Id_" + x).value = y;
	window.parent.document.getElementById("Price_" + x).value = document.getElementById("span2_" + y).innerHTML.replace("￥","");
	window.parent.document.getElementById("Price1_" + x).value = document.getElementById("span2_" + y).innerHTML.replace("￥","");
	window.parent.document.getElementById("num_" + x).value = "1";
//by老杨QQ:309742261
	DelCookie("cookie_"+ x +"_id");
	SetCookie("cookie_"+ x +"_id",y);

	addprice2();
}

function onclickimage1(x,y)
{
	var stroption = "";
	for (i=1;i<=10 ;i++ )
	{
		if (i == 1)
		{
			stroption = "<option value='" + i + "' selected>" + i + "</option>";
		}
		else
		{
			stroption = stroption + "<option value='" + i + "'>" + i + "</option>";
		}
	}
	window.parent.document.getElementById("span_" + x + "1").innerHTML = document.getElementById("span1_" + y).innerHTML;
	window.parent.document.getElementById("span_" + x + "2").innerHTML = document.getElementById("span2_" + y).innerHTML;
	window.parent.document.getElementById("span_" + x + "3").innerHTML = "<select id='select_" + x + "' onchange=\"javascript:changenum('" + x + "');\">" + stroption + "</select>";
	window.parent.document.getElementById("Id_" + x).value = y;
	window.parent.document.getElementById("Price_" + x).value = document.getElementById("span2_" + y).innerHTML.replace("￥","");
	window.parent.document.getElementById("Price1_" + x).value= document.getElementById("span2_" + y).innerHTML.replace("￥","");
	window.parent.document.getElementById("num_" + x).value = "1";

	//显卡
	window.parent.document.getElementById("span_M_ShowCard1").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_ShowCard2").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_ShowCard3").innerHTML = "&nbsp;";
	window.parent.document.getElementById("Id_M_ShowCard").value = "";
	window.parent.document.getElementById("Price_M_ShowCard").value = "0";
	window.parent.document.getElementById("Price1_M_ShowCard").value = "0";
	window.parent.document.getElementById("num_M_ShowCard").value = "0";

	//内存
	window.parent.document.getElementById("span_M_Memory1").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_Memory2").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_Memory3").innerHTML = "&nbsp;";
	window.parent.document.getElementById("Id_M_Memory").value = "";
	window.parent.document.getElementById("Price_M_Memory").value = "0";
	window.parent.document.getElementById("Price1_M_Memory").value = "0";
	window.parent.document.getElementById("num_M_Memory").value = "0";

	//机箱
	window.parent.document.getElementById("span_M_Box1").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_Box2").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_Box3").innerHTML = "&nbsp;";
	window.parent.document.getElementById("Id_M_Box").value = "";
	window.parent.document.getElementById("Price_M_Box").value = "0";
	window.parent.document.getElementById("Price1_M_Box").value = "0";
	window.parent.document.getElementById("num_M_Box").value = "0";

	//硬盘
	window.parent.document.getElementById("span_M_HD1").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_HD2").innerHTML = "&nbsp;";
	window.parent.document.getElementById("span_M_HD3").innerHTML = "&nbsp;";
	window.parent.document.getElementById("Id_M_HD").value = "";
	window.parent.document.getElementById("Price_M_HD").value = "0";
	window.parent.document.getElementById("Price1_M_HD").value = "0";
	window.parent.document.getElementById("num_M_HD").value = "0";
	DelCookie("cookie_"+ x +"_id");
	SetCookie("cookie_"+ x +"_id",y);
	addprice2();
}

function deltitle(x)
{
	document.getElementById("span_" + x + "1").innerHTML = "&nbsp;";
	document.getElementById("span_" + x + "2").innerHTML = "&nbsp;";
	document.getElementById("span_" + x + "3").innerHTML = "&nbsp;";
	document.getElementById("Id_" + x).value = "";
	document.getElementById("Price_" + x).value = "0";
	document.getElementById("Price1_" + x).value = "0";
	document.getElementById("num_" + x).value = "1";
	DelCookie("cookie_"+ x +"_id");
	addprice1();
}

function deltitlemainboard(x)
{
	document.getElementById("span_" + x + "1").innerHTML = "&nbsp;";
	document.getElementById("span_" + x + "2").innerHTML = "&nbsp;";
	document.getElementById("span_" + x + "3").innerHTML = "&nbsp;";
	document.getElementById("Id_" + x).value = "";
	document.getElementById("Price_" + x).value = "0";
	document.getElementById("Price1_" + x).value = "0";
	document.getElementById("num_" + x).value = "1";

	//显卡
	document.getElementById("span_M_ShowCard1").innerHTML = "&nbsp;";
	document.getElementById("span_M_ShowCard2").innerHTML = "&nbsp;";
	document.getElementById("span_M_ShowCard3").innerHTML = "&nbsp;";
	document.getElementById("Id_M_ShowCard").value = "";
	document.getElementById("Price_M_ShowCard").value = "0";
	document.getElementById("Price1_M_ShowCard").value = "0";
	document.getElementById("num_M_ShowCard").value = "0";

	//内存
	document.getElementById("span_M_Memory1").innerHTML = "&nbsp;";
	document.getElementById("span_M_Memory2").innerHTML = "&nbsp;";
	document.getElementById("span_M_Memory3").innerHTML = "&nbsp;";
	document.getElementById("Id_M_Memory").value = "";
	document.getElementById("Price_M_Memory").value = "0";
	document.getElementById("Price1_M_Memory").value = "0";
	document.getElementById("num_M_Memory").value = "0";

	//机箱
	document.getElementById("span_M_Box1").innerHTML = "&nbsp;";
	document.getElementById("span_M_Box2").innerHTML = "&nbsp;";
	document.getElementById("span_M_Box3").innerHTML = "&nbsp;";
	document.getElementById("Id_M_Box").value = "";
	document.getElementById("Price_M_Box").value = "0";
	document.getElementById("Price1_M_Box").value = "0";
	document.getElementById("num_M_Box").value = "0";

	//硬盘
	document.getElementById("span_M_HD1").innerHTML = "&nbsp;";
	document.getElementById("span_M_HD2").innerHTML = "&nbsp;";
	document.getElementById("span_M_HD3").innerHTML = "&nbsp;";
	document.getElementById("Id_M_HD").value = "";
	document.getElementById("Price_M_HD").value = "0";
	document.getElementById("Price1_M_HD").value = "0";
	document.getElementById("num_M_HD").value = "0";
DelCookie("cookie_"+ x +"_id");    //by老杨QQ:309742261
	addprice1();

	//document.getElementById("if1").src = "diy.php?act=showdata&stepM_CPU&cpu=" + document.getElementById("Id_M_CPU").value;
}


//提交配置单
function ispost()
{
	if (confirm("您确认要把当前配置提交到购物车中吗？"))
	{
	var tempstr = "";
	var tempnum = "";
	tempstr = document.getElementById("Id_M_CPU").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_MainBoard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Memory").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_ShowCard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_HD").value + ",";
	tempstr = tempstr + document.getElementById("Id_sound").value + ",";
	tempstr = tempstr + document.getElementById("Id_cddriver").value + ",";
	tempstr = tempstr + document.getElementById("Id_network").value + ",";
	tempstr = tempstr + document.getElementById("Id_display").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Box").value + ",";
	tempstr = tempstr + document.getElementById("Id_powersupply").value + ",";
	tempstr = tempstr + document.getElementById("Id_mouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_keyboard").value + ",";
	tempstr = tempstr + document.getElementById("Id_keymouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_soundbox").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_N1").value;
	document.getElementById("strwareid").value = tempstr;

	tempnum = document.getElementById("num_M_CPU").value + ",";
	tempnum = tempnum + document.getElementById("num_M_MainBoard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Memory").value + ",";
	tempnum = tempnum + document.getElementById("num_M_ShowCard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_HD").value + ",";
	tempnum = tempnum + document.getElementById("num_sound").value + ",";
	tempnum = tempnum + document.getElementById("num_cddriver").value + ",";
	tempnum = tempnum + document.getElementById("num_network").value + ",";
	tempnum = tempnum + document.getElementById("num_display").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Box").value + ",";
	tempnum = tempnum + document.getElementById("num_powersupply").value + ",";
	tempnum = tempnum + document.getElementById("num_mouse").value + ",";
	tempnum = tempnum + document.getElementById("num_keyboard").value + ",";
	tempnum = tempnum + document.getElementById("num_keymouse").value + ",";
	tempnum = tempnum + document.getElementById("num_soundbox").value + ",";
	tempnum = tempnum + document.getElementById("num_M_N1").value;
	document.getElementById("strwarenum").value = tempnum;
	//document.Form1.submit();
	}
	else
	{
		return false;
	}
}
function ispost2()
{
    var diy_name=prompt("请输入配置名称"); 
	document.getElementById("strwarename").value = diy_name;
	//alert(document.getElementById("strwarename").value);
	var tempstr = "";
	var tempnum = "";
	tempstr = document.getElementById("Id_M_CPU").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_MainBoard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Memory").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_ShowCard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_HD").value + ",";
	tempstr = tempstr + document.getElementById("Id_sound").value + ",";
	tempstr = tempstr + document.getElementById("Id_cddriver").value + ",";
	tempstr = tempstr + document.getElementById("Id_network").value + ",";
	tempstr = tempstr + document.getElementById("Id_display").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Box").value + ",";
	tempstr = tempstr + document.getElementById("Id_powersupply").value + ",";
	tempstr = tempstr + document.getElementById("Id_mouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_keyboard").value + ",";
	tempstr = tempstr + document.getElementById("Id_keymouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_soundbox").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_N1").value;
	document.getElementById("strwareid2").value = tempstr;

	tempnum = document.getElementById("num_M_CPU").value + ",";
	tempnum = tempnum + document.getElementById("num_M_MainBoard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Memory").value + ",";
	tempnum = tempnum + document.getElementById("num_M_ShowCard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_HD").value + ",";
	tempnum = tempnum + document.getElementById("num_sound").value + ",";
	tempnum = tempnum + document.getElementById("num_cddriver").value + ",";
	tempnum = tempnum + document.getElementById("num_network").value + ",";
	tempnum = tempnum + document.getElementById("num_display").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Box").value + ",";
	tempnum = tempnum + document.getElementById("num_powersupply").value + ",";
	tempnum = tempnum + document.getElementById("num_mouse").value + ",";
	tempnum = tempnum + document.getElementById("num_keyboard").value + ",";
	tempnum = tempnum + document.getElementById("num_keymouse").value + ",";
	tempnum = tempnum + document.getElementById("num_soundbox").value + ",";
	tempnum = tempnum + document.getElementById("num_M_N1").value;
	document.getElementById("strwarenum2").value = tempnum;
	//document.Form1.submit();


}
function diy_print()
{
	var tempstr = "";
	var tempnum = "";
	tempstr = document.getElementById("Id_M_CPU").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_MainBoard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Memory").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_ShowCard").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_HD").value + ",";
	tempstr = tempstr + document.getElementById("Id_sound").value + ",";
	tempstr = tempstr + document.getElementById("Id_cddriver").value + ",";
	tempstr = tempstr + document.getElementById("Id_network").value + ",";
	tempstr = tempstr + document.getElementById("Id_display").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_Box").value + ",";
	tempstr = tempstr + document.getElementById("Id_powersupply").value + ",";
	tempstr = tempstr + document.getElementById("Id_mouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_keyboard").value + ",";
	tempstr = tempstr + document.getElementById("Id_keymouse").value + ",";
	tempstr = tempstr + document.getElementById("Id_soundbox").value + ",";
	tempstr = tempstr + document.getElementById("Id_M_N1").value;
	document.getElementById("strwareid3").value = tempstr;

	tempnum = document.getElementById("num_M_CPU").value + ",";
	tempnum = tempnum + document.getElementById("num_M_MainBoard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Memory").value + ",";
	tempnum = tempnum + document.getElementById("num_M_ShowCard").value + ",";
	tempnum = tempnum + document.getElementById("num_M_HD").value + ",";
	tempnum = tempnum + document.getElementById("num_sound").value + ",";
	tempnum = tempnum + document.getElementById("num_cddriver").value + ",";
	tempnum = tempnum + document.getElementById("num_network").value + ",";
	tempnum = tempnum + document.getElementById("num_display").value + ",";
	tempnum = tempnum + document.getElementById("num_M_Box").value + ",";
	tempnum = tempnum + document.getElementById("num_powersupply").value + ",";
	tempnum = tempnum + document.getElementById("num_mouse").value + ",";
	tempnum = tempnum + document.getElementById("num_keyboard").value + ",";
	tempnum = tempnum + document.getElementById("num_keymouse").value + ",";
	tempnum = tempnum + document.getElementById("num_soundbox").value + ",";
	tempnum = tempnum + document.getElementById("num_M_N1").value;
	document.getElementById("strwarenum3").value = tempnum;
	//document.Form1.submit();


}
//改变数量
function changenum(x)
{
	var numandprice = Number(document.getElementById("Price1_" + x).value); 
	numandprice = Number(document.getElementById("select_" + x).value) * numandprice;
	document.getElementById("Price_" + x).value = numandprice;
	document.getElementById("num_" + x).value = Number(document.getElementById("select_" + x).value);
	document.getElementById("span_" + x + "2").innerHTML = "￥" + numandprice;
	addprice1();
}
//计算总价格
function addprice1()
{
	var allprice = 0;
	allprice = allprice + Number(document.getElementById("Price_M_CPU").value);
	allprice = allprice + Number(document.getElementById("Price_M_MainBoard").value);
	allprice = allprice + Number(document.getElementById("Price_M_Memory").value);
	allprice = allprice + Number(document.getElementById("Price_M_ShowCard").value);
	allprice = allprice + Number(document.getElementById("Price_M_HD").value);
	allprice = allprice + Number(document.getElementById("Price_sound").value);
	allprice = allprice + Number(document.getElementById("Price_cddriver").value);
	allprice = allprice + Number(document.getElementById("Price_network").value);
	allprice = allprice + Number(document.getElementById("Price_display").value);
	allprice = allprice + Number(document.getElementById("Price_M_Box").value);
	allprice = allprice + Number(document.getElementById("Price_powersupply").value);
	allprice = allprice + Number(document.getElementById("Price_mouse").value);
	allprice = allprice + Number(document.getElementById("Price_keyboard").value);
	allprice = allprice + Number(document.getElementById("Price_keymouse").value);
	allprice = allprice + Number(document.getElementById("Price_soundbox").value);
	allprice = allprice + Number(document.getElementById("Price_M_N1").value);

	document.getElementById("spanallprice").innerHTML = allprice;
}
//计算总价格
function addprice2()
{
	var allprice = 0;
	//alert(Number(window.parent.document.getElementById("Price_M_CPU").value.replace('￥','')));
	//alert(Number(window.parent.document.getElementById("Price_M_MainBoard").value.replace('￥','')));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_CPU").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_MainBoard").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_Memory").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_ShowCard").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_HD").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_sound").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_cddriver").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_network").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_display").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_Box").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_powersupply").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_mouse").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_keyboard").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_keymouse").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_soundbox").value.replace('￥',''));
	allprice = allprice + Number(window.parent.document.getElementById("Price_M_N1").value.replace('￥',''));

	window.parent.document.getElementById("spanallprice").innerHTML = allprice;
}
function pleaselogin()
{
	if (confirm("保存配置清单请先登陆！"))
	{
		window.location='user.php?act=login';
	}else{
	return false;
	}
}
function ifurl(x)
{
	document.getElementById("if1").src = "diy.php?act=showdata&step=" + x;
}

function ifrurlcpu()
{

	if (document.getElementById("Id_M_MainBoard").value != "")
	{
		document.getElementById("if1").src = "diy.php?act=showdata&step=M_CPU&mainboard=" + document.getElementById("Id_M_MainBoard").value;
	}
	else
	{
		document.getElementById("if1").src = "diy.php?act=showdata&step=M_CPU";
	}

}

function ifrurlmainboard()
{

	if (document.getElementById("Id_M_CPU").value != "")
	{
		document.getElementById("if1").src = "diy.php?act=showdata&step=M_MainBoard&cpu=" + document.getElementById("Id_M_CPU").value;
	}
	else
	{
		document.getElementById("if1").src = "diy.php?act=showdata&step=M_MainBoard"
	}

}

function ifrurlzx(x)
{

		document.getElementById("if1").src = "diy.php?act=showdata&step=" + x + "&mainboard=" + document.getElementById("Id_M_MainBoard").value;

}

function iscls()
{
	if(confirm("你确认要使用向导从CPU开始进行选择吗？"))
	{
		clear_cookie();
		window.location='diy.php?act=xiangdao&step=cpu';
	}
}

function clear_cookie() {
DelCookie('cookie_M_CPU_id');
DelCookie('cookie_M_MainBoard_id');
DelCookie('cookie_M_Memory_id');
DelCookie('cookie_M_ShowCard_id');
DelCookie('cookie_M_HD_id');
DelCookie('cookie_sound_id');
DelCookie('cookie_cddriver_id');
DelCookie('cookie_network_id');
DelCookie('cookie_display_id');
DelCookie('cookie_M_Box_id');
DelCookie('cookie_powersupply_id');
DelCookie('cookie_mouse_id');
DelCookie('cookie_keyboard_id');
DelCookie('cookie_keymouse_id');
DelCookie('cookie_soundbox_id');
DelCookie('cookie_M_N1_id');

}

function isclsall()
{
	if(confirm("你确认要把当前配置单内所有配置清空吗？"))
	{
		clear_cookie();
		window.location='diy.php';
		
	}
}
function changelist(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16)
{
//by老杨QQ:309742261
clear_cookie();

if(x1)SetCookie('cookie_M_CPU_id',x1);
if(x2)SetCookie('cookie_M_MainBoard_id',x2);
if(x3)SetCookie('cookie_M_Memory_id',x3);
if(x4)SetCookie('cookie_M_ShowCard_id',x4);
if(x5)SetCookie('cookie_M_HD_id',x5);
if(x6)SetCookie('cookie_sound_id',x6);
if(x7)SetCookie('cookie_cddriver_id',x7);
if(x8)SetCookie('cookie_network_id',x8);
if(x9)SetCookie('cookie_display_id',x9);
if(x10)SetCookie('cookie_M_Box_id',x10);
if(x11)SetCookie('cookie_powersupply_id',x11);
if(x12)SetCookie('cookie_mouse_id',x12);
if(x13)SetCookie('cookie_keyboard_id',x13);
if(x14)SetCookie('cookie_keymouse_id',x14);
if(x15)SetCookie('cookie_soundbox_id',x15);
if(x16)SetCookie('cookie_M_N1_id',x16);
window.location='diy.php';
}
function btn_change(x){
for(var i=1;i<=16;i++)
{
	document.getElementById('btn_'+x).className="curr";
	if(i!=x){
	document.getElementById('btn_'+i).className="";
	}

}
}
