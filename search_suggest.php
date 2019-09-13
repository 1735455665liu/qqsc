<?php

/**
 * ECSHOP 首页文件
 * ============================================================================
 * 版权所有 2005-2008 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: testyang $
 * $Id: index.php 15095 2008-10-27 08:34:33Z testyang $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

//判断是否有ajax请求
$keywords   = !empty($_REQUEST['keywords'])   ? trim($_REQUEST['keywords'])     : '';
include_once('includes/cls_json.php');
$json = new JSON;
$result   = array('error' => 0, 'content' => '');
if($keywords!="")
{
	$sql = "SELECT distinct keyword  FROM " . $ecs->table('keywords') ." where searchengine='ecshop' and keyword LIKE'%".mysql_like_quote($keywords)."%' order by count DESC";
  $res = $db->selectLimit($sql,10);
  $arr = array();
  while ($row = $db->FetchRow($res))

  {
  		$count=$db->getOne("select count(*) from " . $ecs->table('goods') ." where goods_name LIKE '%".mysql_like_quote($row['keyword'])."%' AND is_on_sale = 1 AND is_delete = 0");
  		if($count==0)
		$result['content']=$result['content']."<li onmouseout='javascript:suggestOut(this);' onmouseover='javascript:suggestOver(this);' onclick='javascript:form_submit(this);'><span class='suggest-key'>".$row['keyword']."</span><span class='suggest-result'>N个商品</span></li>";
		else
		$result['content']=$result['content']."<li onmouseout='javascript:suggestOut(this);' onmouseover='javascript:suggestOver(this);' onclick='javascript:form_submit(this);'><span class='suggest-key'>".$row['keyword']."</span><span class='suggest-result'>".$count."个商品</span></li>";
  }


  if($result['content']!="")$result['content']="<ol>".$result['content']."</ol>";
}
die($json->encode($result));
?>