<?php /* Smarty version Smarty-3.1.18, created on 2014-08-29 14:38:39
         compiled from "./templates/test.html" */ ?>
<?php /*%%SmartyHeaderCode:48547388253fee27feb7d23-17399309%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '63f6ef2429ad3a49174343bc12328e8537b956aa' => 
    array (
      0 => './templates/test.html',
      1 => 1409235555,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '48547388253fee27feb7d23-17399309',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_53fee27fef7fc3_07118820',
  'variables' => 
  array (
    'test' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53fee27fef7fc3_07118820')) {function content_53fee27fef7fc3_07118820($_smarty_tpl) {?><!DOCTYPE>
<html lang="zh_CN">
	<head>
		<meta charset="utf-8"/>
		<title><?php echo $_smarty_tpl->tpl_vars['test']->value;?>
</title>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	</head>
	<body>
		<?php echo $_smarty_tpl->tpl_vars['test']->value;?>
<hr />
		<form action="goods_actions.php?act=1" method="post" enctype="multipart/form-data">
			<input type="text" id="text1" value="">
			
		</form>
	</body>
	<script>
		$(document).ready(function(){
			$('#text1').keydown(function(ev){
				alert(ev.keyCode);
			});
		});
	</script>
</html><?php }} ?>
