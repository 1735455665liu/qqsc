<?php /* Smarty version Smarty-3.1.18, created on 2014-09-27 19:42:51
         compiled from "./templates/wx.html" */ ?>
<?php /*%%SmartyHeaderCode:5706276915426a2bb8003f9-95063300%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '45e725ea7e4610cc143901f8393809f17cef1ba6' => 
    array (
      0 => './templates/wx.html',
      1 => 1411818118,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '5706276915426a2bb8003f9-95063300',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'num' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5426a2bb85ee60_72118575',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5426a2bb85ee60_72118575')) {function content_5426a2bb85ee60_72118575($_smarty_tpl) {?><!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title>77商城移动版</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
		<?php echo $_smarty_tpl->tpl_vars['num']->value;?>

	</body>
	<script>
		$(document).ready(function(){
			$('#text1').keydown(function(ev){
				alert(ev.keyCode);
			});
		});
	</script>
</html><?php }} ?>
