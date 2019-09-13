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
	$act = isset($_GET['act']) ? $_GET['act'] : false;
	
	$goods = new Goods($pdo);
	
	switch($act){
		case 1:
			$rs = $goods->goodsSale($_POST);
			$smarty->assign('info',$rs);
			$smarty->display('show_goods.html');
			break;
		case 2:
			$rs = $goods->userSale($_POST);
			$user_info = $goods->userInfo($_POST['u_id']);
			//echo '<pre>';print_r($user_info);echo '</pre>';
			$smarty->assign('info',$rs);
			$smarty->assign('date_',$_POST);
			$smarty->assign('user_info',$user_info);
			$smarty->display('show_goods2.html');
			break;
		case 3:
			$rs = $goods->allSale($_POST);
			$smarty->assign('date_',$_POST);
			$smarty->assign('info',$rs);
			$smarty->display('show_goods3.html');
			break;
		case 4:		// 添加商品销量
			$goods_id = intval($_POST['goods_id']);
			$num = intval($_POST['number']);
			$rs = $goods->addSaleNum($goods_id,$num);
			header("Location:".$_SERVER['HTTP_REFERER']);
		break;
	}
	