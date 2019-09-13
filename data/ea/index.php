<?php

session_start();
set_magic_quotes_runtime(0);
define('IN_BKUP', TRUE);
$magic_quotes_gpc = get_magic_quotes_gpc();
if(!$magic_quotes_gpc)
{
	$_POST = daddslashes($_POST);
	$_GET = daddslashes($_GET);
}
@extract($_POST,EXTR_OVERWRITE);
@extract($_GET,EXTR_OVERWRITE);
$PHP_REFERER = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
if(!function_exists('file_put_contents'))
{
	function file_put_contents($file, $string, $append = '')
	{
		$mode = $append == '' ? 'wb' : 'ab';
		$fp = @fopen($file, $mode) or exit("Can not open file $file !");
		flock($fp, LOCK_EX);
		$stringlen = @fwrite($fp, $string);
		flock($fp, LOCK_UN);
		@fclose($fp);
		return $stringlen;
	}
}
include "./config.php";
$db = new db;
$db->connect($db_host, $db_user, $db_pw, $db_name, $db_pconnect);

if(!$_SESSION['admin']) $action = 'login';

switch($action)
{
	case 'export':
		if($dosubmit)
		{
			$fileid = isset($fileid) ? $fileid : 1;
			if($fileid==1 && $tables) 
			{
				if(!isset($tables) || !is_array($tables)) message('请选择要备份的数据表!');
			    $random = mt_rand(1000, 9999);
			    cache_write('bakup_tables.php', $tables);
			}
			else
			{
			    if(!$tables = cache_read('bakup_tables.php')) message('请选择要备份的数据表!');
			}
			$sqldump = '';
			$tableid = isset($tableid) ? $tableid - 1 : 0;
			$startfrom = isset($startfrom) ? intval($startfrom) : 0;
			$tablenumber = count($tables);
			for($i = $tableid; $i < $tablenumber && strlen($sqldump) < $sizelimit * 1000; $i++)
			{
				$sqldump .= sql_dumptable($tables[$i], $startfrom, strlen($sqldump));
				$startfrom = 0;
			}
			if(trim($sqldump))
			{
				$sqldump = "#Master8.NET Created\n# --------------------------------------------------------\n\n\n".$sqldump;
				$tableid = $i;
				$filename = $db_name.'_'.date('Ymd').'_'.$random.'_'.$fileid.'.sql';
				$fileid++;

				$bakfile = './data/'.$filename;
				if(!is_writable('./data/')) message('数据无法备份到服务器!请检查 ./data 目录是否可写。', $forward);
				file_put_contents($bakfile, $sqldump);
				message("备份文件 $filename 写入成功!", '?action='.$action.'&sizelimit='.$sizelimit.'&tableid='.$tableid.'&fileid='.$fileid.'&startfrom='.$startrow.'&random='.$random.'&dosubmit=1');
			}
			else
			{
			   cache_delete('bakup_tables.php');
			   message('数据库备份完毕!');
			}
			exit;
		}
		else
		{
			$size = $bktables = $bkresults = $results= array();
			$k = 0;
			$totalsize = 0;
			$query = $db->query("SHOW TABLES FROM ".$db_name);
			while($r = $db->fetch_row($query))
			{
				$tables[$k] = $r[0];
				$count = $db->get_one("SELECT count(*) as number FROM $r[0] WHERE 1");
				$results[$k] = $count['number'];
				$bktables[$k] = $r[0];
				$bkresults[$k] = $count['number'];
                $q = $db->query("SHOW TABLE STATUS FROM `".$db_name."` LIKE '".$r[0]."'");
				$s = $db->fetch_array($q);
				$size[$k] = round($s['Data_length']/1024/1024, 2);
				$totalsize += $size[$k];
				$k++;
			}
			include template('export');
		}
	break;

	case 'import':
	 if($dosubmit)
	 {
		if($filename && fileext($filename)=='sql')
		{
			$filepath = './data/'.$filename;
			if(!file_exists($filepath)) message("对不起， $filepath 不存在");
			$sql = file_get_contents($filepath);
			sql_execute($sql);
			message("$filename 中的数据已经成功导入到数据库!");
		}
		else
		{
			$fileid = $fileid ? $fileid : 1;
			$filename = $pre.$fileid.'.sql';
			$filepath = './data/'.$filename;
			if(file_exists($filepath))
			{
				$sql = file_get_contents($filepath);
				sql_execute($sql);
				$fileid++;
				message("数据文件 $filename 导入成功!","?action=".$action."&pre=".$pre."&fileid=".$fileid."&dosubmit=1");
			}
			else
			{
				message("数据库恢复成功!");
			}
		}
	 }
	 else
	 {
		 $sqlfiles = glob('./data/*.sql');
		 if(is_array($sqlfiles))
		 {
			 $prepre = '';
			 $info = $infos = array();
			 foreach($sqlfiles as $id=>$sqlfile)
			 {
				 preg_match("/([a-z0-9_]+_[0-9]{8}_[0-9a-z]{4}_)([0-9]+)\.sql/i",basename($sqlfile),$num);
				 $info['filename'] = basename($sqlfile);
				 $info['filesize'] = round(filesize($sqlfile)/(1024*1024), 2);
				 $info['maketime'] = date('Y-m-d H:i:s', filemtime($sqlfile));
				 $info['pre'] = $num[1];
				 $info['number'] = $num[2];
				 if(!$id) $prebgcolor = '#E4EDF9';
				 if($info['pre'] == $prepre)
				 {
					 $info['bgcolor'] = $prebgcolor;
				 }
				 else
				 {
					 $info['bgcolor'] = $prebgcolor == '#E4EDF9' ? '#F1F3F5' : '#E4EDF9';
				 }
				 $prebgcolor = $info['bgcolor'];
				 $prepre = $info['pre'];
				 $infos[] = $info;
			 }
		 }

		 include template('import');
	 }
	 break;

	case 'repair':
	 if($dosubmit)
	 {
		 $tables = is_array($tables) ? implode(',',$tables) : $tables;
		 if($operation == 'drop' && !$deletetable) message('删除数据表操作已禁用!', $PHP_REFERER);
		 if($tables && in_array($operation,array('repair','optimize','drop')) ) $db->query("$operation TABLE $tables");
		 message('数据表操作成功!', $PHP_REFERER);
	 }
	 else
	 {
		$tables = array();
		$query = $db->query("SHOW TABLES FROM ".$db_name);
		while($r = $db->fetch_row($query))
		{
			$tables[] = $r[0];
		}
		include template('repair');
	 }
	 break;

	case 'query':
	 if(!$runsql) message('运行语句功能已被管理员禁止',$PHP_REFERER);
	 if($dosubmit)
	 {
		if($operation == 'file')
		{
			$savepath = './data/tmp_'.$uploadfile_name;
			copy($uploadfile, $savepath);
			$sql = file_get_contents($savepath);
			@unlink($savepath);
		}
		else
		{
			$sql = stripslashes($sql);
		}
		if(trim($sql) != '') sql_execute($sql);
		message('您的SQL语句已经成功运行了!', $forward);
	 }
	 else
	 {
		  include template('query');
	 }
	 break;

	case 'uploadsql':
	$savepath = './data/'.$uploadfile_name;
	if(copy($uploadfile, $savepath))
	{
		message('文件上传成功!', $PHP_REFERER);
	}
	else
	{
		message('文件上传失败!', $PHP_REFERER);
	}
	break;

	case 'delete':
	 if(is_array($filenames))
	 {
		 foreach($filenames as $filename)
		 {
			 if(fileext($filename)=='sql')
			 {
				 @unlink('./data/'.$filename);
			 }
		 }
	 }
	 else
	 {
		 if(fileext($filenames)=='sql')
		 {
			 @unlink('./data/'.$filenames);
		 }
	 }
	 message('文件删除成功', $PHP_REFERER);
	 break;
	 
	case 'down':
		$filename or message('文件名不能为空');
		file_down('./data/'.$filename);
	break;
	case 'logout':
		session_destroy();
		message("成功退出系统", $PHP_REFERER);
	break;
	case 'phpinfo':
		phpinfo();
		exit;
	break;
	case 'login':
		if($dosubmit)
		{
			if($pws == $pw)
			{
				$_SESSION['admin'] = true; 
				message("登陆成功,欢迎回来", $PHP_REFERER);
			}
			else
			{
				message("密码错误,登陆失败", $PHP_REFERER);
			}
		}
		else
		{
			if($_SESSION['admin']) header("Location:?action=export");
			include template('login');
		}
	break;
	default:
		header("Location:?action=export");
	break;
}
function message($msg,$url_forward='./',$ms=1250)
{
	global $charset;
    include template("message");
    exit; 
}


function daddslashes($string, $force = 0)
{
    global $magic_quotes_gpc;
	if(!$magic_quotes_gpc || $force)
	{
	    if(!is_array($string)) return addslashes($string);
		foreach($string as $key => $val) $string[$key] = daddslashes($val, $force);
	}
	return $string;
}

function file_down($file,$filename='')
{
	file_exists($file) or message('文件不存在');
	$filename = $filename ? $filename : basename($file);
	$filetype = fileext($filename);
	$filesize = filesize($file);
	header('Cache-control: max-age=31536000');
	header('Expires: '.gmdate('D, d M Y H:i:s', time() + 31536000).' GMT');
	header('Content-Encoding: none');
	header('Content-Length: '.$filesize);
	header('Content-Disposition: attachment; filename='.$filename);
	header('Content-Type: '.$filetype);
	readfile($file);
	exit;
}

function fileext($filename)
{
	return trim(substr(strrchr($filename, '.'), 1));
}

function cache_read($file, $mode = 'i')
{
	$cachefile = './data/'.$file;
	if(!file_exists($cachefile)) return array();
	return $mode == 'i' ? include $cachefile : file_get_contents($cachefile);
}

function cache_write($file, $string, $type = 'array')
{
	if(is_array($string))
	{
		$type = strtolower($type);
		if($type == 'array')
		{
			$string = "<?php\n return ".var_export($string,TRUE).";\n?>";
		}
		elseif($type == 'constant')
		{
			$data='';
			foreach($string as $key => $value) $data .= "define('".strtoupper($key)."','".addslashes($value)."');\n";
			$string = "<?php\n".$data."\n?>";
		}
	}
	file_put_contents('./data/'.$file, $string);
}
function cache_delete($file)
{
	return @unlink('./data/'.$file);
}
function sql_dumptable($table, $startfrom = 0, $currsize = 0)
{
	global $db, $sizelimit, $startrow;

	if(!isset($tabledump)) $tabledump = '';
	$offset = 100;
	if(!$startfrom)
	{
		$tabledump = "DROP TABLE IF EXISTS $table;\n";
		$createtable = $db->query("SHOW CREATE TABLE $table");
		$create = $db->fetch_row($createtable);
		$tabledump .= $create[1].";\n\n";
	}

	$tabledumped = 0;
	$numrows = $offset;
	while($currsize + strlen($tabledump) < $sizelimit * 1000 && $numrows == $offset)
	{
		$tabledumped = 1;
		$rows = $db->query("SELECT * FROM $table LIMIT $startfrom, $offset");
		$numfields = $db->num_fields($rows);
		$numrows = $db->num_rows($rows);
		while ($row = $db->fetch_row($rows))
		{
			$comma = "";
			$tabledump .= "INSERT INTO $table VALUES(";
			for($i = 0; $i < $numfields; $i++)
			{
				$tabledump .= $comma."'".mysql_escape_string($row[$i])."'";
				$comma = ",";
			}
			$tabledump .= ");\n";
		}
		$startfrom += $offset;
	}
	$startrow = $startfrom;
	$tabledump .= "\n";
	return $tabledump;
}

function sql_execute($sql)
{
	global $db;
    $sqls = sql_split($sql);
	if(is_array($sqls))
    {
		foreach($sqls as $sql)
		{
			if(trim($sql) != '') 
			{
				$db->query($sql);
			}
		}
	}
	else
	{
		$db->query($sqls);
	}
	return true;
}

function sql_split($sql)
{
	global $db_charset, $db;
	if($db->version() > '4.1' && $db_charset)
	{
		$sql = preg_replace("/TYPE=(InnoDB|MyISAM)( DEFAULT CHARSET=[^; ]+)?/", "TYPE=\\1 DEFAULT CHARSET=".$db_charset,$sql);
	}
	$sql = str_replace("\r", "\n", $sql);
	$ret = array();
	$num = 0;
	$queriesarray = explode(";\n", trim($sql));
	unset($sql);
	foreach($queriesarray as $query)
	{
		$ret[$num] = '';
		$queries = explode("\n", trim($query));
		$queries = array_filter($queries);
		foreach($queries as $query)
		{
			$str1 = substr($query, 0, 1);
			if($str1 != '#' && $str1 != '-') $ret[$num] .= $query;
		}
		$num++;
	}
	return($ret);
}
function template($tpl)
{
	return './templates/'.$tpl.'.tpl.php';
}


/**
* Mysql 数据库类
*/
class db
{
	/**
	* MySQL 连接标识
	* @var resource
	*/
	var $connid;

	/**
	* 整型变量用来计算被执行的sql语句数量
	* @var int
	*/
	var $querynum = 0;

	/**
	* 数据库连接，返回数据库连接标识符
	* @param string 数据库服务器主机
	* @param string 数据库服务器帐号
	* @param string 数据库服务器密码
	* @param string 数据库名
	* @param bool 是否保持持续连接，1为持续连接，0为非持续连接
	* @return link_identifier
	*/
	function connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect = 0) 
	{
		global $db_charset;
		$func = $pconnect == 1 ? 'mysql_pconnect' : 'mysql_connect';
		if(!$this->connid = @$func($dbhost, $dbuser, $dbpw))
		{
			$this->halt('Can not connect to MySQL server');
		}
		// 当mysql版本为4.1以上时，启用数据库字符集设置
		if($this->version() > '4.1' && $db_charset)
        {
			mysql_query("SET NAMES '".$db_charset."'" , $this->connid);
		}
		// 当mysql版本为5.0以上时，设置sql mode
		if($this->version() > '5.0') 
		{
			mysql_query("SET sql_mode=''" , $this->connid);
		}
		if($dbname) 
		{
			if(!@mysql_select_db($dbname , $this->connid))
			{
				$this->halt('Cannot use database '.$dbname);
			}
		}
		return $this->connid;
	}

	/**
	* 选择数据库
	* @param string 数据库名
	*/
	function select_db($dbname) 
	{
		return mysql_select_db($dbname , $this->connid);
	}

	/**
	* 执行sql语句
	* @param string sql语句
	* @return resource
	*/
	function query($sql , $type = '') 
	{
		$func = $type == 'UNBUFFERED' ? 'mysql_unbuffered_query' : 'mysql_query';
		if(!($query = $func($sql , $this->connid)) && $type != 'SILENT')
		{
			$this->halt('MySQL Query Error', $sql);
		}
		$this->querynum++;
		return $query;
	}

	/**
	* 执行sql语句，只得到一条记录
	* @param string sql语句
	* @param string 默认为空，可选值为 CACHE UNBUFFERED
	* @param int Cache以秒为单位的生命周期
	* @return array
	*/
	function get_one($sql, $type = '', $expires = 3600, $dbname = '')
	{
		$query = $this->query($sql, $type, $expires, $dbname);
		$rs = $this->fetch_array($query);
		$this->free_result($query);
		return $rs ;
	}

	/**
	* 从结果集中取得一行作为关联数组
	* @param resource 数据库查询结果资源
	* @param string 定义返回类型
	* @return array
	*/
	function fetch_array($query, $result_type = MYSQL_ASSOC) 
	{
		return mysql_fetch_array($query, $result_type);
	}

	/**
	* 取得前一次 MySQL 操作所影响的记录行数
	* @return int
	*/
	function affected_rows() 
	{
		return mysql_affected_rows($this->connid);
	}

	/**
	* 取得结果集中行的数目
	* @return int
	*/
	function num_rows($query) 
	{
		return mysql_num_rows($query);
	}

	/**
	* 返回结果集中字段的数目
	* @return int
	*/
	function num_fields($query) 
	{
		return mysql_num_fields($query);
	}

    /**
	* @return array
	*/
	function result($query, $row) 
	{
		return @mysql_result($query, $row);
	}

	function free_result($query) 
	{
		return mysql_free_result($query);
	}

	/**
	* 取得上一步 INSERT 操作产生的 ID 
	* @return int
	*/
	function insert_id() 
	{
		return mysql_insert_id($this->connid);
	}

    /**
	* @return array
	*/
	function fetch_row($query) 
	{
		return mysql_fetch_row($query);
	}

    /**
	* @return string
	*/
	function version() 
	{
		return mysql_get_server_info($this->connid);
	}

	function close() 
	{
		return mysql_close($this->connid);
	}

    /**
	* @return string
	*/
	function error()
	{
		return @mysql_error($this->connid);
	}

    /**
	* @return int
	*/
	function errno()
	{
		return intval(@mysql_errno($this->connid)) ;
	}

    /**
	* 显示mysql错误信息
	*/
	function halt($message = '', $sql = '')
	{
		exit("MySQL Query:$sql <br> MySQL Error:".$this->error()." <br> MySQL Errno:".$this->errno()." <br> Message:$message");
	}
}
?>