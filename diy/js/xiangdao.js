function checkbox_cpu(x)
{
	var tempstr = "";
	tempstr = "<table width='230' border='0' align='center' cellpadding='0' cellspacing='0'><tr>";
    tempstr = tempstr + "<td height='100'><table width='100' height='75' border='0' align='center' cellpadding='0' cellspacing='0' class='table_02'>";
    tempstr = tempstr + "<tr><td>";
	tempstr = tempstr + document.getElementById("span1_" + x).innerHTML;
	tempstr = tempstr + "</td></tr></table></td></tr><tr>";
    tempstr = tempstr + "<td height='24' align='center' class='￥'>价格：" + document.getElementById("span3_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr>";
    tempstr = tempstr + "<td>" + document.getElementById("span2_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr><td height='10'></td></tr></table>";
	document.getElementById("cpuimage").innerHTML = tempstr;
	document.getElementById("keyword").focus();
	/*
	SetCookie("wareboxcpu",tempstr);
	SetCookie("warecpuid",x);
	DelCookie("wareboxmainboard");
	DelCookie("waremainboardid");
	DelCookie("wareboxmemory");
	DelCookie("warememoryid");
	DelCookie("wareboxshowcard");
	DelCookie("wareshowcardid");
	DelCookie("wareboxmemorybd");
	DelCookie("wareboxshowcardbd");
	DelCookie("wareboxmainboardbd");
	*/
	document.getElementById("warecpuid").value = x;
	document.getElementById("showwarecpu").value = document.getElementById("span2_" + x).innerHTML + "|@ecshop@|" + document.getElementById("span3_" + x).innerHTML;
	document.getElementById("wareboxcpubd").value = tempstr;
	
	/*
	document.getElementById("mainboardimage").innerHTML = "<img src='themes/bluesky/images/DIY_XD_25.gif' width='192' height='138' />";
	document.getElementById("waremainboardid").value = "";
	
	document.getElementById("memoryimage").innerHTML = "<img src='themes/bluesky/images/DIY_XD_27.gif' width='192' height='138' />";
	document.getElementById("warememoryid").value = "";
	
	document.getElementById("showcardimage").innerHTML = "<img src='themes/bluesky/images/DIY_XD_29.gif' width='192' height='138' />";
	document.getElementById("wareshowcardid").value = "";
	
	document.getElementById("clearmemory").value = "1";
	*/
	//SetCookie("wareboxcpubd",document.getElementById("showwarecpu").value);

}
function checkbox_mainboard(x)
{
	var tempstr = "";
	tempstr = "<table width='230' border='0' align='center' cellpadding='0' cellspacing='0'><tr>";
    tempstr = tempstr + "<td height='100'><table width='100' height='75' border='0' align='center' cellpadding='0' cellspacing='0' class='table_02'>";
    tempstr = tempstr + "<tr><td>";
	tempstr = tempstr + document.getElementById("span1_" + x).innerHTML;
	tempstr = tempstr + "</td></tr></table></td></tr><tr>";
    tempstr = tempstr + "<td height='24' align='center' class='￥'>价格：" + document.getElementById("span3_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr>";
    tempstr = tempstr + "<td>" + document.getElementById("span2_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr><td height='10'></td></tr></table>";
	document.getElementById("mainboardimage").innerHTML = tempstr;
	document.getElementById("keyword").focus();
	/*
	SetCookie("wareboxmainboard",tempstr);
	SetCookie("waremainboardid",x);

	DelCookie("wareboxmemory");
	DelCookie("warememoryid");
	DelCookie("wareboxshowcard");
	DelCookie("wareshowcardid");
	DelCookie("wareboxmemorybd");
	DelCookie("wareboxshowcardbd");
	*/
	
	document.getElementById("waremainboardid").value = x;
	document.getElementById("showwaremainboard").value = document.getElementById("span2_" + x).innerHTML + "|@ecshop@|" + document.getElementById("span3_" + x).innerHTML;
	document.getElementById("wareboxmainboardbd").value = tempstr;

/*
	document.getElementById("memoryimage").innerHTML = "<img src='themes/bluesky/images/DIY_XD_27.gif' width='192' height='138' />";
	document.getElementById("warememoryid").value = "";
	
	document.getElementById("showcardimage").innerHTML = "<img src='themes/bluesky/images/DIY_XD_29.gif' width='192' height='138' />";
	document.getElementById("wareshowcardid").value = "";
	*/
	//SetCookie("wareboxmainboardbd",document.getElementById("showwaremainboard").value);
}
function checkbox_memory(x)
{
	var tempstr = "";
	tempstr = "<table width='230' border='0' align='center' cellpadding='0' cellspacing='0'><tr>";
    tempstr = tempstr + "<td height='100'><table width='100' height='75' border='0' align='center' cellpadding='0' cellspacing='0' class='table_02'>";
    tempstr = tempstr + "<tr><td>";
	tempstr = tempstr + document.getElementById("span1_" + x).innerHTML;
	tempstr = tempstr + "</td></tr></table></td></tr><tr>";
    tempstr = tempstr + "<td height='24' align='center' class='￥'>价格：" + document.getElementById("span3_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr>";
    tempstr = tempstr + "<td>" + document.getElementById("span2_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr><td height='10'></td></tr></table>";
	document.getElementById("memoryimage").innerHTML = tempstr;
	document.getElementById("keyword").focus();
	
	/*
	SetCookie("wareboxmemory",tempstr);
	SetCookie("warememoryid",x);
	
	DelCookie("wareboxshowcard");
	DelCookie("wareshowcardid");
	DelCookie("wareboxshowcardbd");
*/
	document.getElementById("warememoryid").value = x;
	document.getElementById("showwarememory").value = document.getElementById("span2_" + x).innerHTML + "|@ecshop@|" + document.getElementById("span3_" + x).innerHTML;
	document.getElementById("wareboxmemorybd").value = tempstr;
	//SetCookie("war8/eboxmemorybd",document.getElementById("showwarememory").value);
}
function checkbox_showcard(x)
{
	var tempstr = "";
	tempstr = "<table width='230' border='0' align='center' cellpadding='0' cellspacing='0'><tr>";
    tempstr = tempstr + "<td height='100'><table width='100' height='75' border='0' align='center' cellpadding='0' cellspacing='0' class='table_02'>";
    tempstr = tempstr + "<tr><td>";
	tempstr = tempstr + document.getElementById("span1_" + x).innerHTML;
	tempstr = tempstr + "</td></tr></table></td></tr><tr>";
    tempstr = tempstr + "<td height='24' align='center' class='￥'>价格：" + document.getElementById("span3_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr>";
    tempstr = tempstr + "<td>" + document.getElementById("span2_" + x).innerHTML + "</td>";
    tempstr = tempstr + "</tr><tr><td height='10'></td></tr></table>";
	document.getElementById("showcardimage").innerHTML = tempstr;
	document.getElementById("keyword").focus();
	
	//SetCookie("wareboxshowcard",tempstr);
	
	//SetCookie("wareshowcardid",x);
	document.getElementById("wareshowcardid").value = x;
	document.getElementById("showwareshowcard").value = document.getElementById("span2_" + x).innerHTML + "|@ecshop@|" + document.getElementById("span3_" + x).innerHTML;
	document.getElementById("wareboxshowcardbd").value = tempst
	
	//SetCookie("wareboxshowcardbd",document.getElementById("showwareshowcard").value);
}
function nextselect_cpu()
{
	if (document.getElementById("warecpuid").value != "" && document.getElementById("warecpuid").value != 0)
	{
		//DelCookie("wareboxcpu");
		//DelCookie("warecpuid");
		//DelCookie("wareboxcpubd");
	}
	else
	{
		alert("请选择CPU再进行下一步！")
		return false;
	}
}

function nextselect_mainboard()
{
	if (document.getElementById("waremainboardid").value != "" && document.getElementById("waremainboardid").value != 0)
	{
		//DelCookie("wareboxmainboard");
		//DelCookie("waremainboardid");
		//DelCookie("wareboxmainboardbd");
		return true;
	}
	else
	{
		alert("请选择主板再进行下一步！")
		return false;
	}
}

function nextselect_memory()
{
	if (document.getElementById("warememoryid").value != "" && document.getElementById("warememoryid").value != 0)
	{
		//DelCookie("wareboxmemory");
		//DelCookie("warememoryid");
		//DelCookie("wareboxmemorybd");
		return true;
	}
	else
	{
		alert("请选择内存再进行下一步！")
		return false;
	}
}

function nextselect_showcard()
{
	if (document.getElementById("wareshowcardid").value != "" && document.getElementById("wareshowcardid").value != 0)
	{
		//DelCookie("wareboxshowcard");
		//DelCookie("wareshowcardid");
		//DelCookie("wareboxshowcardbd");
		return true;
	}
	else
	{
		alert("请选择显卡再进行下一步！")
		return false;
	}
}

function topre(step)
{
	document.Form2.action = "diy.php?act=xiangdao&step=" + step;
	document.Form2.submit();
}

/*

function onloadbody_cpu()
{
	if (GetCookie("wareboxcpu") != null)
	{
		if (GetCookie("wareboxcpu").length > 0)
		{
			document.getElementById("cpuimage").innerHTML = GetCookie("wareboxcpu");
			document.getElementById("warecpuid").value = GetCookie("warecpuid");
			document.getElementById("showwarecpu").value = GetCookie("wareboxcpubd");
		}
	}
	if (GetCookie("wareboxmainboard") != null)
	{
		if (GetCookie("wareboxmainboard").length > 0)
		{
			document.getElementById("mainboardimage").innerHTML = GetCookie("wareboxmainboard");
		}
	}

	if (GetCookie("wareboxmemory") != null)
	{
		if (GetCookie("wareboxmemory").length > 0)
		{
			document.getElementById("memoryimage").innerHTML = GetCookie("wareboxmemory");
			document.getElementById("warememoryid").value = GetCookie("warememoryid");
		}
	}

	if (GetCookie("wareboxshowcard") != null)
	{
		if (GetCookie("wareboxshowcard").length > 0)
		{
			document.getElementById("showcardimage").innerHTML = GetCookie("wareboxshowcard");
			document.getElementById("wareshowcardid").value = GetCookie("wareshowcardid");
		}
	}
}

function onloadbody_mainboard()
{
	
	if (GetCookie("wareboxcpu") != null)
	{
		if (GetCookie("wareboxcpu").length > 0)
		{
			document.getElementById("cpuimage").innerHTML = GetCookie("wareboxcpu");
			document.getElementById("warecpuid").value = GetCookie("warecpuid");
			document.getElementById("showwarecpu").value = GetCookie("wareboxcpubd");
		}
	}
	if (GetCookie("wareboxmainboard") != null)
	{
		if (GetCookie("wareboxmainboard").length > 0)
		{
			document.getElementById("mainboardimage").innerHTML = GetCookie("wareboxmainboard");
			document.getElementById("waremainboardid").value = GetCookie("waremainboardid");
			document.getElementById("showwaremainboard").value = GetCookie("wareboxmainboardbd");
		}
	}
	if (GetCookie("wareboxmemory") != null)
	{
		if (GetCookie("wareboxmemory").length > 0)
		{
			document.getElementById("memoryimage").innerHTML = GetCookie("wareboxmemory");
			document.getElementById("warememoryid").value = GetCookie("warememoryid");
		}
	}
	
	if (GetCookie("wareboxshowcard") != null)
	{
		if (GetCookie("wareboxshowcard").length > 0)
		{
			document.getElementById("showcardimage").innerHTML = GetCookie("wareboxshowcard");
			document.getElementById("wareshowcardid").value = GetCookie("wareshowcardid");
		}
	}
}



function onloadbody_memory()
{
	
	if (GetCookie("wareboxcpu") != null)
	{
		if (GetCookie("wareboxcpu").length > 0)
		{
			document.getElementById("cpuimage").innerHTML = GetCookie("wareboxcpu");
			document.getElementById("warecpuid").value = GetCookie("warecpuid");
			document.getElementById("showwarecpu").value = GetCookie("wareboxcpubd");
		}
	}
	if (GetCookie("wareboxmainboard") != null)
	{
		if (GetCookie("wareboxmainboard").length > 0)
		{
			document.getElementById("mainboardimage").innerHTML = GetCookie("wareboxmainboard");
			document.getElementById("waremainboardid").value = GetCookie("waremainboardid");
			document.getElementById("showwaremainboard").value = GetCookie("wareboxmainboardbd");
		}
	}
	if (GetCookie("wareboxmemory") != null)
	{
		if (GetCookie("wareboxmemory").length > 0)
		{
			document.getElementById("memoryimage").innerHTML = GetCookie("wareboxmemory");
			document.getElementById("warememoryid").value = GetCookie("warememoryid");
			document.getElementById("showwarememory").value =  GetCookie("wareboxmemorybd");
		}
	}
	
	if (GetCookie("wareboxshowcard") != null)
	{
		if (GetCookie("wareboxshowcard").length > 0)
		{
			document.getElementById("showcardimage").innerHTML = GetCookie("wareboxshowcard");
			document.getElementById("wareshowcardid").value = GetCookie("wareshowcardid");
		}
	}
}

function onloadbody_showcard()
{
	//alert(GetCookie("wareboxcpu"));
	if (GetCookie("wareboxcpu") != null)
	{
		if (GetCookie("wareboxcpu").length > 0)
		{
			document.getElementById("cpuimage").innerHTML = GetCookie("wareboxcpu");
			document.getElementById("warecpuid").value = GetCookie("warecpuid");
			document.getElementById("showwarecpu").value = GetCookie("wareboxcpubd");
		}
	}
	if (GetCookie("wareboxmainboard") != null)
	{
		if (GetCookie("wareboxmainboard").length > 0)
		{
			document.getElementById("mainboardimage").innerHTML = GetCookie("wareboxmainboard");
			document.getElementById("waremainboardid").value = GetCookie("waremainboardid");
			document.getElementById("showwaremainboard").value = GetCookie("wareboxmainboardbd");
		}
	}
	if (GetCookie("wareboxmemory") != null)
	{
		if (GetCookie("wareboxmemory").length > 0)
		{
			document.getElementById("memoryimage").innerHTML = GetCookie("wareboxmemory");
			document.getElementById("warememoryid").value = GetCookie("warememoryid");
			document.getElementById("showwarememory").value =  GetCookie("wareboxmemorybd");
		}
	}
	if (GetCookie("wareboxshowcard") != null)
	{
		if (GetCookie("wareboxshowcard").length > 0)
		{
			document.getElementById("showcardimage").innerHTML = GetCookie("wareboxshowcard");
			document.getElementById("wareshowcardid").value = GetCookie("wareshowcardid");
			document.getElementById("showwareshowcard").value = GetCookie("wareboxshowcardbd");
		}
	}
}
*/