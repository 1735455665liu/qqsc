<?php

// Pull in the NuSOAP code
if (!defined('IN_ECS'))
{
    define('IN_ECS', true);
}

//lib_common: build_uri
require('../includes/lib_common.php');
require('ecaInit.php'); 
require('lib/nusoap.php');
require('syncRecord.php');
require('syncFile.php');
//require_once('logUtils.php');
$debug = 0;

$server = new soap_server;
$server->soap_defencoding = ECS_CHARSET;
$server->decode_utf8 = false;
$server->xml_encoding = ECS_CHARSET;

$server->configureWSDL('ecaService', "urn:51ecshop");

$server->register('hello',array("name"=>"xsd:string"),array("return"=>"xsd:string"));
// Define the method as a PHP function
function hello($name) {
	$name = base64_decode($name);
	
	//return ROOT_PATH.';PHP_SELF:'.PHP_SELF. ';ECS_VERSION: 1.2.5;ECS_CHARSET: '.ECS_CHARSET.';EC_CHARSET: '.EC_CHARSET
	//		.';VERSION: '.VERSION.';RELEASE: '.RELEASE.'$GLOBALS[ecs]->prefix:'.$GLOBALS['ecs']->prefix
	//		.'$GLOBALS[_CFG][timezone]:'.$GLOBALS['_CFG']['timezone'];
    return base64_encode('Hello, ' . $name. ';====================;ASSISTANT_VERSION: 1.29 20100520;ECS_CHARSET: '.ECS_CHARSET.';====================;EC_CHARSET: '.EC_CHARSET.';VERSION: '.VERSION.';RELEASE: '.RELEASE.';PHP_VERSION: '.PHP_VERSION);
}


/*   
   
   0x00 - 0x08   0 -  8
   0x0b - 0x0c  11 - 12
   0x0e - 0x1f  14 - 31
   9 tab
   10,13
*/    
function XmlSafeStr($s)    
{    
  return trim(preg_replace("/[\\x00-\\x08\\x0b-\\x0c\\x0e-\\x1f]/",'',$s));;    
}


function checkLogin($username, $password)
{
	$username = base64_decode($username);
	$password = base64_decode($password);
	
	//$username = str_iconv(ECS_CHARSET, EC_CHARSET, $username);
	//$password = str_iconv(ECS_CHARSET, EC_CHARSET, $password);
	
	//return true;

    $sql = "SELECT user_id, user_name, password, last_login, action_list, last_login".
            " FROM " . $GLOBALS['ecs']->table('admin_user') .
            " WHERE user_name = '" . $username. "' AND password = '" . md5($password) . "'";
    
    $row = $GLOBALS['db']->getRow($sql);
    if ($row)
    { 
    	return true;
    }else{
      return false; 		
    }	
}




function getParas($username, $password, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn")
{
	if (!checkLogin($username, $password))
	{
		return "-999"; //login_faild
	}
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);

	$params = 'IMAGE_DIR'.$delimiter_cn.IMAGE_DIR;
	$params = $params.$delimiter_rn.'DATA_DIR'.$delimiter_cn.DATA_DIR;
	$params = $params.$delimiter_rn.'DBPREFIX'.$delimiter_cn.$GLOBALS['ecs']->prefix;
	$params = $params.$delimiter_rn.'VERSION'.$delimiter_cn.VERSION;
	$params = $params.$delimiter_rn.'RELEASE'.$delimiter_cn.RELEASE;
	$params = $params.$delimiter_rn.'EC_CHARSET'.$delimiter_cn.EC_CHARSET;
	$params = $params.$delimiter_rn.'ECS_CHARSET'.$delimiter_cn.ECS_CHARSET;
	$params = $params.$delimiter_rn.'PHP_SELF'.$delimiter_cn.str_replace('/'.ASSISTANT_PATH, '', dirname(PHP_SELF));	

	$params = $params.$delimiter_rn.'ECS_VERSION'.$delimiter_cn.'1.2.7';
	$params = $params.$delimiter_rn.'ASSISTANT_VERSION'.$delimiter_cn.'1.29';
	$params = $params.$delimiter_rn.'SYSTEM_TYPE'.$delimiter_cn.'ecshop';

	$params = $params.$delimiter_rn.'ADMIN_DIR'.$delimiter_cn.ADMIN_DIR;
	
	return base64_encode($params);
}


$server->register(
	'getParas',							// method name
	array("username"=>"xsd:string","password"=>"xsd:string", 'delimiter_rn' => 'xsd:string', 'delimiter_cn' => 'xsd:string'),		// input parameters
	array('return' => 'xsd:string'),	// output parameters
	'urn:51ecshop',							// namespace
	'urn:51ecshop#getParas',			// SOAPAction
	'rpc',									// style
	'encoded'								// use
);


$server->wsdl->addComplexType(
    'SyncItem',
    'complexType',
    'struct',
    'all',
    '',
    array(
    	'table' => array('name'=>'table','type'=>'xsd:string'), 
        'guid' => array('name'=>'guid','type'=>'xsd:string'),                
        'syncstate' => array('name'=>'syncstate','type'=>'xsd:int'),
        'succ' => array('name'=>'succ','type'=>'xsd:boolean'),
        'errmsg' => array('name'=>'errmsg','type'=>'xsd:string'),
    	'data' => array('name'=>'data','type'=>'xsd:string')
    )
);

$server->wsdl->addComplexType(
    'SyncItemArray',
    'complexType',
    'array',
    '',
    'SOAP-ENC:Array',
    array(),
    array(
        array('ref'=>'SOAP-ENC:arrayType','wsdl:arrayType'=>'tns:SyncItem[]')
    ),
    'tns:SyncItem'
);

$server->wsdl->addComplexType(
    'SyncPack',
    'complexType',
    'struct',
    'all',
    '',
    array(
    	'goods_id' => array('name'=>'goods_id','type'=>'xsd:int'),
    	'succ' => array('name'=>'succ','type'=>'xsd:boolean'),
       'items' => array('name'=>'items','type'=>'tns:SyncItemArray')
    )
);

$server->wsdl->addComplexType(
    'SyncPackArray',
    'complexType',
    'array',
    '',
    'SOAP-ENC:Array',
    array(),
    array(
        array('ref'=>'SOAP-ENC:arrayType','wsdl:arrayType'=>'tns:SyncPack[]')
    ),
    'tns:SyncPack'
);

$server->wsdl->addComplexType(
    'SyncPackList',
    'complexType',
    'struct',
    'all',
    '',
    array(
       'items' => array('name'=>'items','type'=>'tns:SyncPackArray')
    )
);



$server->register( 
	"getFileSize", 
	array("username"=>"xsd:string","password"=>"xsd:string", "filename" => "xsd:string" ), 
	array( "return" => "xsd:int" ), 
	"urn:51ecshop", 
	"urn:51ecshop#getFileSize", 
	"rpc", "
	encoded", 
	"" 
);



$server->register(
	'downloadfile',							// method name
	array("username"=>"xsd:string","password"=>"xsd:string", 'filename' => 'xsd:string'),		// input parameters
	array('return' => 'xsd:base64Binary'),	// output parameters
	'urn:51ecshop',							// namespace
	'urn:51ecshop#downloadfile',			// SOAPAction
	'rpc',									// style
	'encoded'								// use
);


$server->register(
	'downloadFile2',							// method name
	array("username"=>"xsd:string","password"=>"xsd:string", 'filename' => 'xsd:string', "seq" => "xsd:int"),		// input parameters
	array('return' => 'xsd:base64Binary'),	// output parameters
	'urn:51ecshop',							// namespace
	'urn:51ecshop#downloadFile2',			// SOAPAction
	'rpc',									// style
	'encoded'								// use
);

$server->register(
	'uploadFile',							// method name
	array("username"=>"xsd:string","password"=>"xsd:string", 'filename' => 'xsd:string', 'data' => 'xsd:base64Binary', "isFist" => "xsd:boolean"),		// input parameters
	array('return' => 'xsd:boolean'),		// output parameters
	'urn:51ecshop',							// namespace
	'urn:51ecshop#uploadFile',				// SOAPAction
	'rpc',									// style
	'encoded'								// use
);



$server->register( 
	"getMaxID", 
	array( "username"=>"xsd:string","password"=>"xsd:string", "table" => "xsd:string", "idfield" => "xsd:string" ), 
	array( "return" => "xsd:int" ), 
	"urn:51ecshop", 
	"urn:51ecshop#getMaxID", 
	"rpc", 
	"encoded", 
	"" 
);


$server->register( 
	"uploadRecordBase64", 
	array( "username"=>"xsd:string","password"=>"xsd:string", "data" => "xsd:string", "table" => "xsd:string", "idfields" => "xsd:string", "syncfield" => "xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ), 
	array( "return" => "tns:SyncPack" ), 
	"urn:51ecshop", 
	"urn:51ecshop#uploadRecordBase64", 
	"rpc", 
	"encoded", 
	"" 
);
		


$server->register( 
	"uploadGoodsBase64", 
	array( "username"=>"xsd:string","password"=>"xsd:string", 
		  "goods_id" => "xsd:int",
		  "data_goods" => "xsd:string", 
		  "data_goods_article" => "xsd:string", 
		  "data_goods_attr" => "xsd:string", 
		  "data_goods_cat" => "xsd:string", 
		  "data_goods_gallery" => "xsd:string", 
		  "data_group_goods" => "xsd:string",
		  "data_link_goods" => "xsd:string",
		  "data_member_price" => "xsd:string",
		  "syncfield" => "xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ), 
	array( "return" => "xsd:string" ), 
	"urn:51ecshop", 
	"urn:51ecshop#uploadGoodsBase64", 
	"rpc", 
	"encoded", 
	"" 
);


$server->register( 
	"uploadGoodsBase64_2", 
	array( "username"=>"xsd:string","password"=>"xsd:string", 
		  "goods_id" => "xsd:int",
		  "data_goods" => "xsd:string", 
		  "data_goods_article" => "xsd:string", 
		  "data_goods_attr" => "xsd:string", 
		  "data_goods_cat" => "xsd:string", 
		  "data_goods_gallery" => "xsd:string", 
		  "data_group_goods" => "xsd:string",
		  "data_link_goods" => "xsd:string",
		  "data_member_price" => "xsd:string",
		  "data_volume_price" => "xsd:string",
		  "syncfield" => "xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ), 
	array( "return" => "xsd:string" ), 
	"urn:51ecshop", 
	"urn:51ecshop#uploadGoodsBase64_2", 
	"rpc", 
	"encoded", 
	"" 
);		

$server->register( 
	"uploadGoodsBase64_3", 
	array( "username"=>"xsd:string","password"=>"xsd:string", 
		  "goods_id" => "xsd:int",
		  "data_goods" => "xsd:string", 
		  "data_goods_article" => "xsd:string", 
		  "data_goods_attr" => "xsd:string", 
		  "data_goods_cat" => "xsd:string", 
		  "data_goods_gallery" => "xsd:string", 
		  "data_group_goods" => "xsd:string",
		  "data_link_goods" => "xsd:string",
		  "data_member_price" => "xsd:string",
		  "data_volume_price" => "xsd:string",
		  "data_products" => "xsd:string",
		  "syncfield" => "xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ), 
	array( "return" => "xsd:string" ), 
	"urn:51ecshop", 
	"urn:51ecshop#uploadGoodsBase64_3", 
	"rpc", 
	"encoded", 
	"" 
);	

$server->register( 
	"uploadMultiGoodsBase64", 
	array( "username"=>"xsd:string","password"=>"xsd:string", "goods_List" => "xsd:string", "syncfield" => "xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ), 
	array( "return" => "tns:SyncPack" ), 
	"urn:51ecshop", 
	"urn:51ecshop#uploadMultiGoodsBase64", 
	"rpc", 
	"encoded", 
	"" 
);

   
$server->register(
	'downloadRecordBase64',
	array("username"=>"xsd:string","password"=>"xsd:string", "sql"=>"xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ),
	array("return"=>"xsd:string"),
	"urn:51ecshop", 
	"urn:51ecshop#downloadRecordBase64", 
	"rpc", 
	"encoded", 
	"" 	
);

     
$server->register(
	'downloadGoodsBase64',
	array("username"=>"xsd:string","password"=>"xsd:string", "goods_id" => "xsd:int", "goodsFields"=>"xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ),
	array("return"=>"tns:SyncPack"),
	"urn:51ecshop", 
	"urn:51ecshop#downloadGoodsBase64", 
	"rpc", 
	"encoded", 
	"" 	
);

   
$server->register(
	'downloadMultiGoodsBase64',
	array("username"=>"xsd:string","password"=>"xsd:string", "goods_ids" => "xsd:string", "goodsFields"=>"xsd:string", "delimiter_rn" => "xsd:string", "delimiter_cn" => "xsd:string" ),
	array("return"=>"tns:SyncPackList"),
	"urn:51ecshop", 
	"urn:51ecshop#downloadMultiGoodsBase64", 
	"rpc", 
	"encoded", 
	"" 	
);

$server->register( 
	"drop_goods", 
	array( "username"=>"xsd:string","password"=>"xsd:string", "goods_ids" => "xsd:string" ), 
	array( "return" => "tns:SyncPack" ), 
	"urn:51ecshop", 
	"urn:51ecshop#drop_goods", 
	"rpc", 
	"encoded", 
	"" 
);

$server->register( 
	"exec_sql", 
	array( "username"=>"xsd:string","password"=>"xsd:string", "sql_list" => "xsd:string", "clear_cache" => "xsd:boolean", "delimiter_rn" => "xsd:string"), 
	array( "return" => "tns:SyncPack" ), 
	"urn:51ecshop", 
	"urn:51ecshop#exec_sql", 
	"rpc", 
	"encoded", 
	"" 
);

$HTTP_RAW_POST_DATA = isset( $HTTP_RAW_POST_DATA ) ? $HTTP_RAW_POST_DATA : "";
if ( empty( $HTTP_RAW_POST_DATA ) )
{
	$fp = fopen( "php://input", 'rb');
	while ( !feof( $fp ) )
	{
		$HTTP_RAW_POST_DATA .= fread( $fp, 4096 );
	}
	fclose( $fp );
}
$server->service( $HTTP_RAW_POST_DATA );
?>
