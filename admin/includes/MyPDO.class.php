<?php
	/* 
	PDO 链接类
	Author : dantinr@gmail.com
	QQ: 165196778
	*/
class MyPDO{
  private static $connections = array();
  private static $servers = array();

  public static function addPdo($list){
    foreach($list as $alias => $server){
      self::$servers[$alias] = $server;
    }
  }

  public static function getPdo($alias){
    if(!array_key_exists($alias,self::$connections)){
      $pdo = new PDO(self::$servers[$alias]['dsn'],self::$servers[$alias]['user'],self::$servers[$alias]['pass']);
      self::$connections[$alias] = $pdo;
    }
    return self::$connections[$alias];
  }
}