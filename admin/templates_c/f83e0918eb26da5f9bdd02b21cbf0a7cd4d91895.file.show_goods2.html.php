<?php /* Smarty version Smarty-3.1.18, created on 2014-09-01 22:24:59
         compiled from "./templates/show_goods2.html" */ ?>
<?php /*%%SmartyHeaderCode:175052406540479e35efac5-95514692%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f83e0918eb26da5f9bdd02b21cbf0a7cd4d91895' => 
    array (
      0 => './templates/show_goods2.html',
      1 => 1409581458,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '175052406540479e35efac5-95514692',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_540479e36650d4_11207497',
  'variables' => 
  array (
    'user_info' => 0,
    'date_' => 0,
    'info' => 0,
    'v' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_540479e36650d4_11207497')) {function content_540479e36650d4_11207497($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_date_format')) include '/www/smarty/plugins/modifier.date_format.php';
?><!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title>商品销售记录</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
	会员信息：
		会员ID: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['user_id'];?>
<br />
		会员名: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['user_name'];?>
<br />
		QQ: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['qq'];?>
<br />
		手机: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['mobile_phone'];?>
<br />
		座机: <?php echo $_smarty_tpl->tpl_vars['user_info']->value['home_phone'];?>
<br />
		注册时间: <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['user_info']->value['reg_time'],'%Y-%m-%d %H:%M:%S');?>
<br />
		最后登录时间: <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['user_info']->value['last_login'],'%Y-%m-%d %H:%M:%S');?>
<hr />
	<table border="1">
		<caption><h2>查询时间：<?php echo $_smarty_tpl->tpl_vars['date_']->value['start1_'];?>
---<?php echo $_smarty_tpl->tpl_vars['date_']->value['end1_'];?>
</h2></caption>
		<tr>
			<td>商品编号</td><td>购买数量</td><td>商品名</td>
		</tr>
		<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['info']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
		<tr>
			<td><?php echo $_smarty_tpl->tpl_vars['v']->value['goods_id'];?>
</td><td><?php echo $_smarty_tpl->tpl_vars['v']->value['total'];?>
</td><td><?php echo $_smarty_tpl->tpl_vars['v']->value['goods_name'];?>
</td>
		</tr>
		<?php } ?>
	</table>
	</body>
</html><?php }} ?>
