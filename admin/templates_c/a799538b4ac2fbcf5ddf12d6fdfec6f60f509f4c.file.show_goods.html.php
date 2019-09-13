<?php /* Smarty version Smarty-3.1.18, created on 2014-08-29 15:37:38
         compiled from "./templates/show_goods.html" */ ?>
<?php /*%%SmartyHeaderCode:1499824271540021d35d8406-38054513%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a799538b4ac2fbcf5ddf12d6fdfec6f60f509f4c' => 
    array (
      0 => './templates/show_goods.html',
      1 => 1409297836,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1499824271540021d35d8406-38054513',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_540021d3653d02_06458902',
  'variables' => 
  array (
    'info' => 0,
    'v' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_540021d3653d02_06458902')) {function content_540021d3653d02_06458902($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_date_format')) include '/www/smarty/plugins/modifier.date_format.php';
?><!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title>商品销售记录</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
	<table border="1">
		<caption><h2>共销售<?php echo $_smarty_tpl->tpl_vars['info']->value['total'];?>
</h2></caption>
		<tr>
			<td>下单时间</td><td>购买数量</td>
		</tr>
		<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['info']->value['info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
		<tr>
			<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['v']->value['confirm_time'],'%Y-%m-%d %H:%M:%S');?>
</td><td><?php echo $_smarty_tpl->tpl_vars['v']->value['goods_number'];?>
</td>
		</tr>
		<?php } ?>
	</table>
	</body>
	<script>
		$(document).ready(function(){
			$('#text1').keydown(function(ev){
				alert(ev.keyCode);
			});
		});
	</script>
</html><?php }} ?>
