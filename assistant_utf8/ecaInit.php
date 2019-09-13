<?php

//error_reporting(E_ALL ^ E_DEPRECATED);

// Pull in the NuSOAP code
if (!defined('IN_ECS'))
{
    define('IN_ECS', true);
}

$file = str_replace( "\\", "/", dirname(__FILE__) );
$path_arr = explode( '/', $file);
foreach ( $path_arr as $value ) {
	if (! empty ( $value )) {
		$assistant = $value;
	}
}

if (empty($assistant)) 
{
	$assistant = "assistant_utf8";
}	

define( "ASSISTANT_PATH", $assistant );

define('ROOT_PATH', str_replace(ASSISTANT_PATH.'/ecaInit.php', '', str_replace('\\', '/', __FILE__)));


if (!function_exists('file_put_contents'))
{
    define('FILE_APPEND', 'FILE_APPEND');

    function file_put_contents($file, $data, $flags = '')
    {
        $contents = (is_array($data)) ? implode('', $data) : $data;

        if ($flags == 'FILE_APPEND')
        {
            $mode = 'ab+';
        }
        else
        {
            $mode = 'wb';
        }

        if (($fp = @fopen($file, $mode)) === false)
        {
            return false;
        }
        else
        {
            $bytes = fwrite($fp, $contents);
            fclose($fp);

            return $bytes;
        }
    }
}

//=====================================================================================
require(ROOT_PATH . 'data/config.php');
require(ROOT_PATH . 'includes/cls_ecshop.php');
require(ROOT_PATH . 'includes/cls_mysql.php');

$php_self = isset($_SERVER['PHP_SELF']) ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
if ('/' == substr($php_self, -1))
{
    $php_self .= 'index.php';
}
define('PHP_SELF', $php_self);
$ecs = new ECS($db_name, $prefix);

if (method_exists($ecs, 'data_dir')){
	define('DATA_DIR', $ecs->data_dir());
}else{
	define('DATA_DIR', 'data');
}

if (method_exists($ecs, 'image_dir')){
	define('IMAGE_DIR', $ecs->image_dir());
}else{
	define('IMAGE_DIR', 'images');
}

if (!defined('ADMIN_DIR'))
{
	if (defined('ADMIN_PATH')){
		define('ADMIN_DIR', ADMIN_PATH);
	}else{
		if (!empty($GLOBALS['admin_dir'])){
			define('ADMIN_DIR', $GLOBALS['admin_dir']);
		}else{
			define('ADMIN_DIR', 'admin');
		}
	} 
}

$db = new cls_mysql($db_host, $db_user, $db_pass, $db_name);
$db_host = $db_user = $db_pass = $db_name = NULL;

/*

$db->set_disable_cache_tables(array($ecs->table('sessions'), $ecs->table('sessions_data'), $ecs->table('cart')));
$db_host = $db_user = $db_pass = $db_name = NULL;

$_CFG = load_config();
*/
//=====================================================================================


define( "AS_LOG_DIR", ROOT_PATH.ASSISTANT_PATH."/logs/" );
define( "AS_SYNC_DELETED", -1 );
define( "AS_SYNC_UNCHANGED", 0 );
define( "AS_SYNC_ADDED", 1 );
define( "AS_SYNC_MODIFIED", 2 );
define( "AS_DEBUG", true );

if (!defined('EC_CHARSET'))
{
    define('EC_CHARSET', 'utf-8');
}


//define( "ECS_CHARSET", 'gbk' );
define( "ECS_CHARSET", 'utf-8' );
//define( "ECS_CHARSET", EC_CHARSET );


?>
