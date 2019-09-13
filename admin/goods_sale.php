<!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title>商品销售明细</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
		<form action="goods_actions.php?act=1" method="post">
			<h2>单个商品销售统计</h2>
			商品id：<input type="text" name="g_id"><br />
			开始时间:<input type="date" name="start_" value=""><br />
			结束时间:<input type="date" name="end_" value=""><br />
			<input type="submit" value="查询">
		</form><hr />
		<form action="goods_actions.php?act=2" method="post">
			<h2>用户订单商品统计</h2>
			用户id：<input type="text" name="u_id"><br />
			开始时间:<input type="date" name="start1_" value=""><br />
			结束时间:<input type="date" name="end1_" value=""><br />
			<input type="submit" value="查询">
		</form>
		<form action="goods_actions.php?act=3" method="post">
			<h2>所有商品销售统计</h2>
			开始时间:<input type="date" name="start2_" value=""><br />
			结束时间:<input type="date" name="end2_" value=""><br />
			<input type="submit" value="查询">
		</form><hr />
		
		<form action="goods_actions.php?act=4" method="post">
			<h2>商品销量修改</h2>
			商品编号:<input type="text" name="goods_id" value=""><br />
			数量:<input type="text" name="number" value="80"><br />
			<input type="submit" value="添加">
		</form><hr />
	</body>

</html>