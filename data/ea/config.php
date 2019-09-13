<?php
error_reporting(0);
set_time_limit(0);
include_once("../config.php");
//$db_host = $db_host;		//数据库服务器
//$db_user = $_CFG['dbuser'];			//数据库用户名
$db_pw = $db_pass;		//数据库密码
//$db_name = $_CFG['dbname'];		//数据库名
$db_pconnect = 1;			//是否启用持久连接
$db_charset = 'UTF8';		//数据库字符集(可能值为GBK或UTF8等...MySQL版本4.1及其以上需设置)
$pws = 'admin';				//管理员登陆密码
$deletetable = 1;			//是否允许程序删除表，较危险，默认禁止
$runsql = 1;				//是否允许执行SQL语句，较危险，建议在需要时开启，默认禁止
$uploadsql = 1;				//是否允许上传SQL文件，较危险，建议在需要时开启，默认禁止
?>