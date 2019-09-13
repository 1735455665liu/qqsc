<?php

/**
 * ECSHOP 程序说明
 * ===========================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ==========================================================
 * $Author: liubo $
 * $Id: affiliate.php 17217 2011-01-19 06:29:08Z liubo $
 */

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
admin_priv('affiliate');

/*------------------------------------------------------ */
//-- 分成管理页
/*------------------------------------------------------ */
if ($_REQUEST['act'] == 'cat')
{
    assign_query_info();
    if (empty($_REQUEST['is_ajax']))
    {
        $smarty->assign('full_page', 1);
    }
	
	$diy_cat=get_diy_cat();
	
    $smarty->assign('ur_here', '装机大师设置中心');
	$smarty->assign('diy_cat', $diy_cat);
    $smarty->display('diy_cat.htm');
}
elseif ($_REQUEST['act'] == 'update')
{
$diy_cat = array();
$diy_cat=$_POST['diy_cat'];
$idx=1;
foreach ($diy_cat as $val)
{
	$sql = "UPDATE " .$ecs->table('diy_cat'). " SET diy_cat = '$val' WHERE diy_id = '$idx'";
    $db->query($sql);
	$idx++;
}
$links[] = array('text' => '返回装机大师设置中心', 'href' => 'diy.php?act=cat');
sys_msg('设置成功', 0, $link);
}

function get_diy_cat()
{
    $sql = "SELECT * FROM " . $GLOBALS['ecs']->table('diy_cat').
           " ORDER BY diy_id";

    $arr = $GLOBALS['db']->getAll($sql);

    $list = array();

    foreach ($arr  AS $key => $val)
    {
      $arr[$key]['cat_list']=cat_list(0,$val['diy_cat']);
    }

    return $arr;
}

?>