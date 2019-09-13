<?php
defined('IN_BKUP') or exit('Access Denied');
include template('header');
?>
<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th colspan="4">数 据 库 备 份</th>
  </tr>
<form method="post" name="myform" action="?action=<?=$action?>">
<tr align="center">
<td width="20%" class="tablerowhighlight">	<input name='chkall' type='checkbox' id='chkall' onclick='checkall(this.form)' value='check' checked>全选/反选 </td>
<td width="40%" class="tablerowhighlight">数据库表</td>
<td width="20%" class="tablerowhighlight">记录条数</td>
<td width="20%" class="tablerowhighlight">大小 [共<?=$totalsize?>M]</td>
</tr>
<?php 
if(is_array($bktables)){
	foreach($bktables as $k => $tablename){
?>
  <tr>
    <td class="tablerow"  align="center">
<input type="checkbox" name="tables[]" value="<?=$tablename?>" checked>
	</td>
    <td class="tablerow">
	<?=$tablename?>
	</td>
    <td class="tablerow">&nbsp;<?=$bkresults[$k]?></td>
	<td class="tablerow">&nbsp;<?=$size[$k]?> M</td>
</tr>
<?php 
	}
}
?>
  <tr>
    <td colspan="4" class="tablerowhighlight" align="center">分卷备份设置</td>
  </tr>
  <tr>
    <td colspan="4" class="tablerow" align="center">每个分卷文件大小：<input type=text name="sizelimit" value="2048" size=5> K <input type="submit" name="dosubmit" value=" 开始备份数据 "></td>
  </tr>
	</form>
</table>
<table cellpadding="0" cellspacing="0" border="0" width="100%" height="10">
  <tr>
    <td></td>
  </tr>
</table>
</body>
</html>