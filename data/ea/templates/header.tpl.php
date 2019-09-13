<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>MySQL数据库分卷备份工具</title>
<meta name="author" content="Master8.NET" /> 
<style>
body {
font-family: Verdana, Arial, Helvetica, sans-serif;
font-size: 12px; 
background-color:#FFFFFF;
}
td,input,button {
font-size: 12px;
}
a{
text-decoration: none;
color: #000000;
}
a:hover{
color: #009286;
text-decoration: underline;
}
.px10{
font-size:10px;
}
.f_red{
color:red;
}
th{
font-weight: bold; 
font-size: 12px; 
background: #2B5CC5; 
color: white; 
height: 20px;
}
td.tablerow {
padding-right: 3px; 
background: #f1f3f5;
line-height: 150%;
}
td.tablerowhighlight {
font-weight: bold; 
padding: 3px;
background: #E4EDF9; 
line-height: 150%;
}
.tableborder {
margin:auto;
border: 1px solid #2B5CC5; 
width: 700px; 
background: #ffffff;
}
</style>
<script type="text/javascript">
function checkall(form) {
	for(var i = 0;i < form.elements.length; i++) {
		var e = form.elements[i];
		if (e.name != 'chkall' && e.disabled != true) {
			e.checked = form.chkall.checked;
		}
	}
}
</script>
</head>
<body>
<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th>MySQL 数 据 库 分 卷 备 份 工 具</th>
  </tr>
<tr>
<td class="tablerow" style="letter-spacing:1px;" align="center">
<a href="index.php?action=export">数据库备份</a> |
<a href="index.php?action=import">数据库恢复</a> |
<a href="index.php?action=repair">数据库管理</a> |
<a href="index.php?action=query">执行SQL语句</a> |
<a href="index.php?action=phpinfo" target="_blank">PHP INFO()</a> |
<a href="http://master8.net/" target="_blank" title="年华&#10;QQ4908220">作者主页</a> |
<a href="index.php?action=logout">退出登录</a>
</td>
</tr>
</table>
<table cellspacing="0" cellpadding="0" width="600" align="center">
<tr>
<td height="5"></td>
</tr>
</table>