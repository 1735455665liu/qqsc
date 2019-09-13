<?php
defined('IN_BKUP') or exit('Access Denied');
include template('header');
?>
<table cellpadding="2" cellspacing="1" class="tableborder">
  <tr>
    <th>请 先 登 陆</th>
  </tr>
<form method="post" action="index.php">
  <tr>
    <td class="tablerow" align="center">
	<input type="hidden" name="dosubmit" value="1"/>
	<input type="hidden" name="action" value="login"/>
	密 码: <input name="pw" type="password" size="15"/>
	<input name="submit" type="submit" value=" 登 陆 "/>
	</td>
  </tr>
</form>
</table>
</body>
</html>