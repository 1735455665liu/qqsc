<?php
	header("Content-type:text/html;charset=utf-8");
	define('IN_ECS', true);
	require(dirname(__FILE__) . '/includes/init.php');
						
	$ordersn = trim($_POST['oquery']);
	if($ordersn==''){
		die("订单号不能为空...");
	}
	$sql = "select * from ".$ecs->table('order_info')." where order_sn='{$ordersn}'";
	$rs = $db->query($sql);
	
	if ($row = $db->fetchRow($rs))
	{
		
		//echo '<pre>';
		//print_r($row);
		//echo '</pre>';
		
		echo '收货人:'.$row['consignee'].'<br />';
		echo '收货地址:'.$row['address'].'<br />';
		echo '下单时间:'.date("Y-m-d H:i",$row['add_time']).'<br />';
		if($row['shipping_time']==0){
			echo '发货时间: <span style="color:red">未发货</span><br />';
		}
		echo '订单金额:'.$row['goods_amount'].'<br />';
		
		if($row['order_status']==1){			//配货中
			echo '订单状态: <span style="color:red">配货中</span><br />';
		}else if(($row['order_status']==5) && ($row['pay_status']!=2)){
			echo '订单状态: <span style="color:red">已发货</span><br />';
		}else if(($row['order_status']==5) && ($row['pay_status']==2)){
			echo '订单状态: <span style="color:red">已收货</span><br />';
		}
	}else{
		die("没有查到订单信息 <a href='index.php'>返回首页</a>");
	}
	
	echo '<a href="index.php">返回首页</a>';
?>