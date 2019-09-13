<?php /* Smarty version Smarty-3.1.18, created on 2014-09-04 14:37:39
         compiled from "./templates/show_goods3.html" */ ?>
<?php /*%%SmartyHeaderCode:10672624305408078b298f62-48188727%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ce2686c8249a306f6fb2762a763da9356575b194' => 
    array (
      0 => './templates/show_goods3.html',
      1 => 1409812651,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10672624305408078b298f62-48188727',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5408078b2ee938_12888147',
  'variables' => 
  array (
    'date_' => 0,
    'info' => 0,
    'v' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5408078b2ee938_12888147')) {function content_5408078b2ee938_12888147($_smarty_tpl) {?><!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title>商品销售记录</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
	<table border="1">
		<caption><h2>查询时间：<?php echo $_smarty_tpl->tpl_vars['date_']->value['start2_'];?>
---<?php echo $_smarty_tpl->tpl_vars['date_']->value['end2_'];?>
</h2></caption>
		<tr>
			<td>商品编号</td><td>销售数量</td><td>商品名</td>
		</tr>
		<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['info']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
		<tr>
			<td><a href="../goods.php?id=<?php echo $_smarty_tpl->tpl_vars['v']->value['goods_id'];?>
"><?php echo $_smarty_tpl->tpl_vars['v']->value['goods_id'];?>
</a></td><td><?php echo $_smarty_tpl->tpl_vars['v']->value['total'];?>
</td><td><?php echo $_smarty_tpl->tpl_vars['v']->value['goods_name'];?>
</td>
		</tr>
		<?php } ?>
	</table>
	</body>
</html><?php }} ?>
