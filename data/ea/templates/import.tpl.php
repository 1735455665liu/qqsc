<?php
defined('IN_BKUP') or exit('Access Denied');
include template('header');
?>

<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th colspan="7">已备份的SQL文件</th>
  </tr>
<form method="post" name="myform" >
<tr align="center">
<td width="8%" class="tablerowhighlight">选中</td>
<td width="8%" class="tablerowhighlight">ID</td>
<td width="30%" class="tablerowhighlight">文件名</td>
<td width="10%" class="tablerowhighlight">文件大小</td>
<td width="20%" class="tablerowhighlight">备份时间</td>
<td width="8%" class="tablerowhighlight">卷号</td>
<td width="20%" class="tablerowhighlight">操作</td>
</tr>
<?php 
if(is_array($infos)){
	foreach($infos as $id => $info){
$id++;
?>
  <tr bgcolor="<?=$info['bgcolor']?>"  align="center">
    <td><input type="checkbox" name="filenames[]" value="<?=$info['filename']?>"></td>
    <td><?=$id?></td>
    <td class="px10" align="left">&nbsp;<a href="./data/<?=$info['filename']?>"><?=$info['filename']?></a></td>
    <td class="px10"><?=$info['filesize']?> M</td>
	<td class="px10"><?=$info['maketime']?></td>
    <td class="px10"><?=$info['number']?></td>
    <td>
	<a href="?action=<?=$action?>&pre=<?=$info['pre']?>&dosubmit=1">导入</a> | 
	<a href="?action=delete&filenames=<?=$info['filename']?>">删除</a> | 
	<a href="?action=down&filename=<?=$info['filename']?>">下载</a>
	</td>
</tr>
<?php 
	}
}
?>
  <tr>
	<td colspan=7 valign="top" class="tablerow">&nbsp;<span style="color:red">Tips:</span>背景色相同的文件为同一次备份的文件,导入时只需要点导入任意一个文件,程序会自动导入剩余文件</td>
  </tr>

  <tr>
    <td class="tablerow" align="center"><input name='chkall' type='checkbox' id='chkall' onclick='checkall(this.form)' value='check'></td>
	<td colspan=6 valign="top" class="tablerow">全选/反选 <input type="submit" name="submit2" value=" 删除选中的备份 " onclick="document.myform.action='?action=delete'"></td>
  </tr>
	</form>
</table>

<table cellpadding="0" cellspacing="0" border="0" width="100%" height="10">
  <tr>
    <td></td>
  </tr>
</table>
<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th>上传数据库备份文件</th>
  </tr>
	<form name="upload" method="post" action="?action=uploadsql" enctype="multipart/form-data">
  <tr>
    <td height="30" class="tablerow" align="center">
	        上传SQL文件：
             <input name="uploadfile" type="file" size="25">
             <input type="hidden" name="max_file_size" value="4096000">
             <input type="submit" name="dosubmit" value=" 上传 ">
	</td>
  </tr>
  </form>
</table>
</body>
</html>