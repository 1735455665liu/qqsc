<?php
defined('IN_BKUP') or exit('Access Denied');
include template('header');
?>
<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th>执行SQL</th>
  </tr>
  <form name="myform" method="post" action="?action=query&operation=sql">
     <tr> 
      <td height="25" align="center" class="tablerow" >请把要执行的SQL语句粘贴到下面的文本框</td>
    </tr>
   <tr> 
      <td height="40" align="center" class="tablerow" ><textarea name="sql" cols="90" rows="16"></textarea></td>
    </tr>
   <tr> 
      <td height="40" align="center" class="tablerow" > <input type="submit" name="dosubmit" value=" 执行SQL "></td>
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
    <th>上传SQL文件并立即执行</th>
  </tr>
	<form name="upload" method="post" action="?action=query&operation=file" enctype="multipart/form-data">
  <tr>
    <td height="30" class="tablerow" align="center">
	        上传SQL文件：
             <input name="uploadfile" type="file" size="25">
             <input type="hidden" name="MAX_FILE_SIZE" value="4096000">
             <input type="submit" name="dosubmit" value=" 上传并执行 ">
	</td>
  </tr>
  </form>
</table>
</body>
</html>