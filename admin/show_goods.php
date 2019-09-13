<?php
	define('IN_ECS', true);
	require(dirname(__FILE__) . '/includes/init.php');
	require_once(ROOT_PATH . '/' . ADMIN_PATH . '/includes/lib_goods.php');
	require_once('includes/goods.class.php');
	require_once('includes/MyPDO.class.php');
	require_once('../smarty/Smarty.class.php');
	
	$my_servers = include('includes/conf_mysql.php');
	MyPDO::addPDO($my_servers);
	$pdo = MyPDO::getPdo('server1');
	$smarty = new Smarty();
	$smarty->setTemplateDir('./templates/');
	$smarty->setCompileDir('./templates_c/');
	
	$goods_id = isset($_GET['id']) ? $_GET['id'] : false;
	if(!$goods_id){die ('商品id不正确');}
	$goods = new Goods($pdo);
	$info = $goods->showOrderGoods($goods_id);
	//echo '<pre>';print_r($info);echo '</pre>';
	
	$smarty->assign('info',$info);
	$smarty->display('show_goods.html');