<?php

/**
 * ECSHOP 文章
 * ============================================================================
 * 版权所有 2005-2010 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: article.php 16455 2009-07-13 09:57:19Z liubo $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$act = !empty($_GET['act']) ? $_GET['act'] : '';
if (!function_exists("htmlspecialchars_decode"))
	{
		function htmlspecialchars_decode($string, $quote_style = ENT_COMPAT)
		{
			return strtr($string, array_flip(get_html_translation_table(HTML_SPECIALCHARS, $quote_style)));
		}
	}

/* 文章详细 */
if ($act == 'detail')
{
	$a_id = !empty($_GET['a_id']) ? intval($_GET['a_id']) : '';
	if ($a_id > 0)
	{
		$article_row = $db->getRow('SELECT title, content FROM ' . $ecs->table('article') . ' WHERE article_id = ' . $a_id . ' AND cat_id > 0 AND is_open = 1');
		if (!empty($article_row))
		{
			$article_row['title'] = encode_output($article_row['title']);
			$replace_tag = array('<br />' , '<br/>' , '<br>' , '</p>');
			$article_row['content'] = htmlspecialchars_decode(encode_output($article_row['content']));
			$article_row['content'] = str_replace($replace_tag, '{br}' , $article_row['content']);
			$article_row['content'] = strip_tags($article_row['content']);
			$article_row['content'] = str_replace('{br}' , '<br />' , $article_row['content']);
			$smarty->assign('article_data', $article_row);
		}
	}
	$smarty->display('article.dwt');
}

/* 文章列表 */
else
{
	$cid=isset($_GET['cid'])?$_GET['cid']:0;
	if($cid == 0){
		$article_num = $db->getOne("SELECT count(*) FROM " . $ecs->table('article') . " WHERE cat_id > 0 AND is_open = 1");
		if ($article_num > 0){
			$page_num = '10';
			$page = !empty($_GET['page']) ? intval($_GET['page']) : 1;
			$pages = ceil($article_num / $page_num);
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
			$pagebar = get_wap_pager($article_num, $page_num, $page, 'article.php', 'page');
			$smarty->assign('pagebar', $pagebar);
			include_once(ROOT_PATH . '/includes/lib_article.php');
			$article_array = get_cat_articles(-1, $page, $page_num);
			$i = 1;
			foreach ($article_array as $key => $article_data)
			{
				$article_array[$key]['i'] = $i;
				$article_array[$key]['title'] = encode_output($article_data['title']);
				$i++;
			}
			$smarty->assign('article_array', $article_array);
		}
	}else{
		include_once(ROOT_PATH . '/includes/lib_article.php');
		$article_num = get_article_count($cid);
		$page_num = '10';
		$page = !empty($_GET['page']) ? intval($_GET['page']) : 1;
		$pages = ceil($article_num / $page_num);
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
		$pagebar = get_wap_pager($article_num, $page_num, $page, 'article.php?cid='.$cid, 'page');
		$smarty->assign('pagebar', $pagebar);
		$article_array = get_cat_articles($cid, $page, $page_num);
		$i = 1;
		foreach ($article_array as $key => $article_data)
		{
			$article_array[$key]['i'] = $i;
			$article_array[$key]['title'] = encode_output($article_data['title']);
			$i++;
		}
		$smarty->assign('article_array', $article_array);
		$cat_name = $db->getOne("SELECT cat_name FROM " . $ecs->table('article_cat') . " WHERE cat_id = '$cid'");
		$smarty->assign('cat_name', $cat_name);
	}
	$smarty->display('article_list.dwt');
}
?>