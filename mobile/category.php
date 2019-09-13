<?php

/**
 * ECSHOP 商品分类页
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: testyang $
 * $Id: category.php 15013 2008-10-23 09:31:42Z testyang $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$cid = !empty($_GET['cid']) ? intval($_GET['cid']) : 0;
if ($cid <= 0)
{
	$pcat_array = get_categories_tree();
	foreach ($pcat_array as $key => $pcat_data)
	{
		$pcat_array[$key]['name'] = encode_output($pcat_data['name']);
		if ($pcat_data['cat_id'])
		{
			foreach ($pcat_data['cat_id'] as $k => $v)
			{
				$pcat_array[$key]['cat_id'][$k]['name'] = encode_output($v['name']);
			}
		}
	}
	$smarty->assign('cat_array' , $pcat_array);
	$smarty->assign('all_cat' , 1);
}
else
{
	$cat_array = get_categories_tree($cid);
	$smarty->assign('cid', $cid);
	$cat_name = $db->getOne('SELECT cat_name FROM ' . $ecs->table('category') . ' WHERE cat_id=' . $cid);
	$smarty->assign('cat_name', encode_output($cat_name));
	if (!empty($cat_array[$cid]['cat_id']))
	{
		foreach ($cat_array[$cid]['cat_id'] as $key => $child_data)
		{
			$cat_array[$cid]['cat_id'][$key]['name'] = encode_output($child_data['name']);
		}
		$smarty->assign('cat_children', $cat_array[$cid]['cat_id']);
	}

	$get_order_price  = !empty($_GET['order_price']) ? intval($_GET['order_price']) : 0;
	$get_order_click = !empty($_GET['order_click']) ? intval($_GET['order_click']) : 0;

    if ($get_order_price == 1)
    {
       $order_rule = 'ORDER BY g.shop_price DESC, g.sort_order';
    }
    elseif($get_order_price == 2)
    {
		$order_rule = 'ORDER BY g.shop_price ASC, g.sort_order';
    }
	elseif($get_order_click == 1)
	{
	   $order_rule = 'ORDER BY g.click_count DESC, g.sort_order';
	}
	elseif($get_order_click == 2)
	{
	   $order_rule = 'ORDER BY g.click_count ASC, g.sort_order';
	}
	else{
	   $order_rule = 'ORDER BY g.shop_price ASC, g.sort_order';
	}

	$cat_goods = assign_cat_goods($cid, 0, 'wap', $order_rule);
	$num = count($cat_goods['goods']);
	if ($num > 0)
	{
		$page_num = '15';
		$page = !empty($_GET['page']) ? intval($_GET['page']) : 1;
		$pages = ceil($num / $page_num);
		if ($page <= 0)
		{
			$page = 1;
		}
		if ($pages == 0)
		{
			$pages = 1;
		}
		if ($page > $pages)
		{
			$page = $pages;
		}
		$i = 1;
		foreach ($cat_goods['goods'] as $goods_data)
		{
			if (($i > ($page_num * ($page - 1 ))) && ($i <= ($page_num * $page)))
			{
				$price = empty($goods_info['promote_price_org']) ? $goods_data['shop_price'] : $goods_data['promote_price'];
				//$wml_data .= "<a href='goods.php?id={$goods_data['id']}'>".encode_output($goods_data['name'])."</a>[".encode_output($price)."]<br/>";
				$data[] = array('i' => $i , 'price' => encode_output($price) , 'id' => $goods_data['id'] , 'name' => encode_output($goods_data['name']),'market_price' => encode_output($goods_data['market_price']),'thumb' => $goods_data['thumb'],'brief' => encode_output($goods_data['brief']));
			}
			$i++;
		}
        $smarty->assign('goods_data', $data);
		if ($get_order_price ==1 or $get_order_price == 2)
		{
		 $pagebar = get_wap_pager($num, $page_num, $page, 'category.php?cid='.$cid.'&order_price='.(empty($get_order_price)?0:$get_order_price), 'page');
		}
		elseif ($get_order_click ==1 or $get_order_click == 2)
		{
		 $pagebar = get_wap_pager($num, $page_num, $page, 'category.php?cid='.$cid.'&order_click='.(empty($get_order_click)?0:$get_order_click), 'page');
		}
		else{
        $pagebar = get_wap_pager($num, $page_num, $page, 'category.php?cid='.$cid.'&order_price='.(empty($get_order_price)?0:$get_order_price), 'page');
        }
		$smarty->assign('pagebar', $pagebar);
	}

	$pcat_array = get_parent_cats($cid);
	if (!empty($pcat_array[1]['cat_name']))
	{
		$pcat_array[1]['cat_name'] = encode_output($pcat_array[1]['cat_name']);
		$smarty->assign('pcat_array', $pcat_array[1]);
	}

	$smarty->assign('cat_array', $cat_array);
}
$smarty->assign('footer', get_footer());
$smarty->display('category.dwt');

?>