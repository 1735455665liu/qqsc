<?php

/**
 *
 * @param sting $username
 * @param sting $password
 * @param sting $table
 * @param sting $idfield
 * @return int
 */
function getMaxID($username,$password, $table, $idfield)
{
	if (!checkLogin($username, $password))
	{
		return "-999"; //login_faild
	}
	
	$table = base64_decode($table);
	$idfield = base64_decode($idfield);
	$maxid = -1;
	$sql = "select max(".$idfield.") from ".$GLOBALS['ecs']->table($table);
	$maxid = $GLOBALS['db']->getOne( $sql );
	if ($maxid == 0 or empty($maxid))
	  $maxid = 1;
	return $maxid;
}


function goodsImgList($goods_id){
	$imgList = array();
	$imgIndex = 0;
	$sql = "select original_img, goods_img, goods_thumb from ".$GLOBALS['ecs']->table('goods')." where goods_id=".$goods_id. "  LIMIT 1";	
	$rows = $GLOBALS['db']->GetAll($sql); 
	if ( $rows )
	{
		foreach ( $rows as $row )
		{
			$imgIndex = 0;
			$imgList[$imgIndex] = $row['original_img'];
			
			$imgIndex = $imgIndex + 1;
			$imgList[$imgIndex] = $row['goods_img'];
			
			$imgIndex = $imgIndex + 1;
			$imgList[$imgIndex] = $row['goods_thumb'];
		}
	}

	$sql = "select img_original, img_url, thumb_url from ".$GLOBALS['ecs']->table('goods_gallery')." where goods_id=".$goods_id." order by img_id";	
	$rows = $GLOBALS['db']->GetAll($sql); 
	if ( $rows )
	{
		foreach ( $rows as $row )
		{
			$imgIndex = $imgIndex + 1;
			$imgList[$imgIndex] = $row['img_original'];
			
			$imgIndex = $imgIndex + 1;
			$imgList[$imgIndex] = $row['img_url'];
			
			$imgIndex = $imgIndex + 1;
			$imgList[$imgIndex] = $row['thumb_url'];
		}
	}	
	
	//logutils::log_obj($imgList);
	return $imgList;
}

function uploadRecordBase64($username, $password, $data, $table, $idfields, $syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn" )
{
	if (!checkLogin($username, $password))
	{
		return NULL;//"-999"; //login_faild
	}	
	//logutils::clear_log();
	
	//logutils::log_str( "data: =======================.$table===============================");
	//logutils::log_str( $data);
	//logutils::log_str( "base64_decode: ===================.$table===================================");
	$data = base64_decode($data);
	$table = base64_decode($table);
	$idfields = base64_decode($idfields);
	$syncfield = base64_decode($syncfield);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	//logutils::log_str( $data);
	//logutils::log_str( "str_iconv: =======================.$table===============================");
	//$data = str_iconv(ECS_CHARSET, EC_CHARSET, $data);
	//logutils::log_str( $data);
	
    clear_cache_files();
    
	$pack = uploadRecord2($data, $table, $idfields, $syncfield, $delimiter_rn, $delimiter_cn);
	
	
	foreach ( $pack['items'] as $sync_item )
	{
		if ($sync_item['succ'] == false)
		{
			$sync_item['errmsg'] = base64_encode($sync_item['errmsg']);
		}
	}
	//logutils::log_obj( $pack );base64_encode
	//logutils::log_str( "1errmsg:".$errmsg );
	return $pack;	
}


function uploadGoodsBase64($username,$password, 
		$goods_id, 
		$data_goods, 		
		$data_goods_article, 
		$data_goods_attr, 
		$data_goods_cat,
		$data_goods_gallery,
		$data_group_goods,  
		$data_link_goods,
		$data_member_price, 
		$syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
{
	//$username,$password, 
	if (!checkLogin($username, $password))
	{
		return NULL; //login_faild
	}
	//$goods_id = base64_decode($goods_id);
	
	$data_goods = base64_decode($data_goods);
	$data_goods_article = base64_decode($data_goods_article);
	$data_goods_attr = base64_decode($data_goods_attr);
	$data_goods_cat = base64_decode($data_goods_cat);
	$data_goods_gallery = base64_decode($data_goods_gallery);
	$data_group_goods = base64_decode($data_group_goods);
	$data_link_goods = base64_decode($data_link_goods);
	$data_member_price = base64_decode($data_member_price);
	
	
	$syncfield = base64_decode($syncfield);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	$tmp = uploadGoods($goods_id, 		
					   $data_goods, 		
						$data_goods_article,
						$data_goods_attr,
						$data_goods_cat,
						$data_goods_gallery,
						$data_group_goods, 
						$data_link_goods,
						$data_member_price,
						"-1",
						"-1",
						$syncfield, $delimiter_rn, $delimiter_cn);
						
	clear_cache_files();
							
	return base64_encode($tmp);					
							
}

function uploadGoodsBase64_2($username,$password, 
		$goods_id, 
		$data_goods, 		
		$data_goods_article, 
		$data_goods_attr, 
		$data_goods_cat,
		$data_goods_gallery,
		$data_group_goods,  
		$data_link_goods,
		$data_member_price, 
		$data_volume_price,
		$syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
{
	//$username,$password, 
	if (!checkLogin($username, $password))
	{
		return NULL; //login_faild
	}
	//$goods_id = base64_decode($goods_id);
	
	$data_goods = base64_decode($data_goods);
	$data_goods_article = base64_decode($data_goods_article);
	$data_goods_attr = base64_decode($data_goods_attr);
	$data_goods_cat = base64_decode($data_goods_cat);
	$data_goods_gallery = base64_decode($data_goods_gallery);
	$data_group_goods = base64_decode($data_group_goods);
	$data_link_goods = base64_decode($data_link_goods);
	$data_member_price = base64_decode($data_member_price);
	$data_volume_price = base64_decode($data_volume_price);
	
	$syncfield = base64_decode($syncfield);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	$tmp = uploadGoods($goods_id, 		
					   $data_goods, 		
						$data_goods_article,
						$data_goods_attr,
						$data_goods_cat,
						$data_goods_gallery,
						$data_group_goods, 
						$data_link_goods,
						$data_member_price,
						$data_volume_price,
						"-1",
						$syncfield, $delimiter_rn, $delimiter_cn);
						
	clear_cache_files();
						
	return base64_encode($tmp);					
							
}

function uploadGoodsBase64_3($username,$password, 
		$goods_id, 
		$data_goods, 		
		$data_goods_article, 
		$data_goods_attr, 
		$data_goods_cat,
		$data_goods_gallery,
		$data_group_goods,  
		$data_link_goods,
		$data_member_price, 
		$data_volume_price,
		$data_products,
		$syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
{
	//$username,$password, 
	if (!checkLogin($username, $password))
	{
		return NULL; //login_faild
	}
	//$goods_id = base64_decode($goods_id);
	
	$data_goods = base64_decode($data_goods);
	$data_goods_article = base64_decode($data_goods_article);
	$data_goods_attr = base64_decode($data_goods_attr);
	$data_goods_cat = base64_decode($data_goods_cat);
	$data_goods_gallery = base64_decode($data_goods_gallery);
	$data_group_goods = base64_decode($data_group_goods);
	$data_link_goods = base64_decode($data_link_goods);
	$data_member_price = base64_decode($data_member_price);
	$data_volume_price = base64_decode($data_volume_price);
	$data_products = base64_decode($data_products);
	
	$syncfield = base64_decode($syncfield);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	$tmp = uploadGoods($goods_id, 		
					   $data_goods, 		
						$data_goods_article,
						$data_goods_attr,
						$data_goods_cat,
						$data_goods_gallery,
						$data_group_goods, 
						$data_link_goods,
						$data_member_price,
						$data_volume_price,
						$data_products,
						$syncfield, $delimiter_rn, $delimiter_cn);
						
	clear_cache_files();
						
	return base64_encode($tmp);					
							
}

function uploadMultiGoodsBase64($username,$password, $goods_List, $syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn")
{
	//$username,$password, 
	if (!checkLogin($username, $password))
	{
		return NULL; //login_faild
	}
	//logutils::clear_log();
	$goods_List = base64_decode($goods_List);
	$syncfield = base64_decode($syncfield);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	//logutils::log_str( "uploadMultiGoods:". $goods_List);
	$goods_arr = explode( "51eca_goods", $goods_List );
	
	//logutils::log_str( "uploadMultiGoods:-----------------------------------------");
	//logutils::log_obj($goods_arr);
	//logutils::log_str( "uploadMultiGoods:------------------------------------------");
	foreach($goods_arr as $data){
		$goods_record = explode( "51eca_table", $data ); 
		
	//logutils::log_str( "51eca_table:-----------------------------------------");
	//logutils::log_obj($goods_record);
	//logutils::log_str( "51eca_table:------------------------------------------");
			
		$goods_id = $goods_record[0];		
		$data_goods = $goods_record[1];			
		$data_goods_article = $goods_record[2]; 
		$data_goods_attr = $goods_record[3];	
		$data_goods_cat = $goods_record[4];		
		$data_goods_gallery = $goods_record[5]; 
		$data_group_goods = $goods_record[6];	
		$data_link_goods = $goods_record[7];	
		$data_member_price = $goods_record[8]; 
		$data_volume_price = $goods_record[9];
		$data_products = $goods_record[10];
		$tmp = uploadGoods( $goods_id, 	
							$data_goods, 
							$data_goods_article,
							$data_goods_attr,
							$data_goods_cat,
							$data_goods_gallery,
							$data_group_goods,
							$data_link_goods,
							$data_member_price,
							$data_volume_price,
							$data_products,
							$syncfield, $delimiter_rn, $delimiter_cn);
		
		$sync_item = array( );
		$sync_item['table'] = "ecs_goods";
		$sync_item['guid'] = $goods_id; 
		if ($tmp == "true")
			$sync_item['succ'] = true;
		else	
			$sync_item['errmsg'] = base64_encode($tmp);
		
		//logutils::log_obj($sync_item);
			
		$syncitems[] = $sync_item;
			
	}
	
	clear_cache_files();
	
	$pack = array(
		"succ" => true,
		"items" => $syncitems
		);
		
	//logutils::log_obj($pack);	
	return $pack;
}

function uploadGoods(
		$goods_id, 
		$data_goods,
		$data_goods_article,
		$data_goods_attr,
		$data_goods_cat,
		$data_goods_gallery,
		$data_group_goods,
		$data_link_goods,
		$data_member_price,
		$data_volume_price,
		$data_products,
		$syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
{
		
	//$data_goods = str_iconv(ECS_CHARSET, EC_CHARSET, $data_goods);
	//$data_goods_article = str_iconv(ECS_CHARSET, EC_CHARSET, $data_goods_article);
	//$data_goods_attr = str_iconv(ECS_CHARSET, EC_CHARSET, $data_goods_attr);
	//$data_goods_cat = str_iconv(ECS_CHARSET, EC_CHARSET, $data_goods_cat);
	//$data_goods_gallery = str_iconv(ECS_CHARSET, EC_CHARSET, $data_goods_gallery);
	//$data_group_goods = str_iconv(ECS_CHARSET, EC_CHARSET, $data_group_goods);
	//$data_link_goods = str_iconv(ECS_CHARSET, EC_CHARSET, $data_link_goods);
	//$data_member_price = str_iconv(ECS_CHARSET, EC_CHARSET, $data_member_price);
	
	//logutils::clear_log();
	//logutils::log_str( "uploadGoods Begin goods_id:".$goods_id );
	//logutils::log_str( $data_goods );	

	$oldImgList = goodsImgList($goods_id); //add by chenfq 20090829
	
	$pack = uploadRecord2($data_goods, 'goods', 'goods_id', $syncfield, $delimiter_rn, $delimiter_cn);

	//logutils::log_str( "uploadGoods_goods" );
	$errmsg = '';
	if ($pack['succ'] == false)
	{	
		foreach ( $pack['items'] as $sync_item )
		{
			if ($sync_item['succ'] == false)
			{
				$errmsg = $errmsg.",".$sync_item['errmsg'];
			}
		}
		//logutils::log_obj( $pack );
		//logutils::log_str( "1errmsg:".$errmsg );
		return $errmsg;	
	}	
	

	if (!Empty($data_goods_attr))
	{
		//logutils::log_str( "uploadGoods_goods_attr1" );
		$sql = "delete from ".$GLOBALS['ecs']->table('goods_attr')." where goods_id = $goods_id";
		//logutils::log_str( $sql );
		$GLOBALS['db']->query( $sql ); //idfields = 'goods_id'
			
		unset($pack);
		//logutils::clear_log();
		$pack = uploadRecord2($data_goods_attr, 'goods_attr', 'goods_attr_id', $syncfield, $delimiter_rn, $delimiter_cn);
		
		//logutils::log_str( "uploadGoods_goods_attr2" );
		if ($pack['succ'] == false)
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "2errmsg:".$errmsg );
			return $errmsg;	
		}			
	}
	
	$sql = "delete from ".$GLOBALS['ecs']->table('goods_article')." where goods_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql );//idfields = 'goods_id,article_id'
	if (!Empty($data_goods_article))
	{	
		unset($pack);
		$pack = uploadRecord2($data_goods_article, 'goods_article', '', $syncfield, $delimiter_rn, $delimiter_cn);
		
		//logutils::log_str( "uploadGoods_goods_article" );
		
		if ($pack['succ'] == false) 
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "3errmsg:".$errmsg );
			return $errmsg;	
		}
	
	}
	$sql = "delete from ".$GLOBALS['ecs']->table('goods_cat')." where goods_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql ); //idfields = 'goods_id,cat_id'
	if (!Empty($data_goods_cat))
	{	
		unset($pack);	
		$pack = uploadRecord2($data_goods_cat, 'goods_cat', '', $syncfield, $delimiter_rn, $delimiter_cn);
		//logutils::log_str( "uploadGoods_goods_cat" );
		
		if ($pack['succ'] == false) 
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "4errmsg:".$errmsg );
			return $errmsg;	
		}
	}		
	$sql = "delete from ".$GLOBALS['ecs']->table('goods_gallery')." where goods_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql );//idfields = 'img_id'
	if (!Empty($data_goods_gallery))
	{	
		unset($pack);	
		$pack = uploadRecord2($data_goods_gallery, 'goods_gallery', '', $syncfield, $delimiter_rn, $delimiter_cn);
		//logutils::log_str( "uploadGoods_goods" );
		
		if ($pack['succ'] == false)
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "5errmsg:".$errmsg );
			return $errmsg;	
		}
	}	
	$sql = "delete from ".$GLOBALS['ecs']->table('group_goods')." where parent_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql );//idfields = 'parent_id,goods_id'
	if (!Empty($data_group_goods))
	{	
		unset($pack);	
		$pack = uploadRecord2($data_group_goods, 'group_goods', '',  $syncfield, $delimiter_rn, $delimiter_cn);
		//logutils::log_str( "uploadGoods_group_goods" );
		
		if ($pack['succ'] == false) 
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "6errmsg:".$errmsg );
			return $errmsg;	
		}
	}	
	$sql = "delete from ".$GLOBALS['ecs']->table('link_goods')." where goods_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql );//idfields = 'goods_id,link_goods_id'
	if (!Empty($data_link_goods))
	{	
		unset($pack);	
		$pack = uploadRecord2($data_link_goods, 'link_goods', '', $syncfield, $delimiter_rn, $delimiter_cn);
		//logutils::log_str( "uploadGoods_link_goods" );
		
		if ($pack['succ'] == false)
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "7errmsg:".$errmsg );
			return $errmsg;	
		}
	}	
	$sql = "delete from ".$GLOBALS['ecs']->table('member_price')." where goods_id = $goods_id";
	//logutils::log_str( $sql );
	$GLOBALS['db']->query( $sql );//idfields = 'price_id'
	if (!Empty($data_member_price))
	{	
		unset($pack);	
		$pack = uploadRecord2($data_member_price, 'member_price', '', $syncfield, $delimiter_rn, $delimiter_cn);
		//logutils::log_str( "uploadGoods_member_price" );
		
		if ($pack['succ'] == false)
		{	
			foreach ( $pack['items'] as $sync_item )
			{
				if ($sync_item['succ'] == false)
				{
					$errmsg = $errmsg.",".$sync_item['errmsg'];
				}
			}
			//logutils::log_obj( $pack );
			//logutils::log_str( "8errmsg:".$errmsg );
			return $errmsg;	
		}
	}
	
	if ((!preg_match('/^(v2.5.0|v2.5.1|v2.6.0|v2.6.1)$/i',VERSION)) && ($data_volume_price <> '-1')){
		$sql = "delete from ".$GLOBALS['ecs']->table('volume_price')." where goods_id = $goods_id";
		//logutils::log_str( $sql );
		$GLOBALS['db']->query( $sql );//idfields = 'price_id'
		if (!Empty($data_volume_price))
		{	
			unset($pack);	
			$pack = uploadRecord2($data_volume_price, 'volume_price', '', $syncfield, $delimiter_rn, $delimiter_cn);
			//logutils::log_str( "uploadGoods_member_price" );
			
			if ($pack['succ'] == false)
			{	
				foreach ( $pack['items'] as $sync_item )
				{
					if ($sync_item['succ'] == false)
					{
						$errmsg = $errmsg.",".$sync_item['errmsg'];
					}
				}
				//logutils::log_obj( $pack );
				//logutils::log_str( "8errmsg:".$errmsg );
				return $errmsg;	
			}
		}		
	}
	
	if ((!preg_match('/^(v2.5.0|v2.5.1|v2.6.0|v2.6.1|v2.6.2|v2.7.0|v2.7.1)$/i',VERSION)) && ($data_products <> '-1')){
		$sql = "delete from ".$GLOBALS['ecs']->table('products')." where goods_id = $goods_id";
		$GLOBALS['db']->query( $sql );
		if (!Empty($data_products))
		{			
			unset($pack);
			//logutils::clear_log();
			$pack = uploadRecord2($data_products, 'products', 'product_id', $syncfield, $delimiter_rn, $delimiter_cn);
			
			//logutils::log_str( "uploadGoods_goods_attr2" );
			if ($pack['succ'] == false)
			{	
				foreach ( $pack['items'] as $sync_item )
				{
					if ($sync_item['succ'] == false)
					{
						$errmsg = $errmsg.",".$sync_item['errmsg'];
					}
				}
				//logutils::log_obj( $pack );
				//logutils::log_str( "2errmsg:".$errmsg );
				return $errmsg;	
			}
		}		
	}	
	
	//logutils::log_str( "uploadGoods End goods_id:".$goods_id );
	
	$newImgList = goodsImgList($goods_id); //add by chenfq 20090829
	$total = count($oldImgList);
	
	//logutils::log_obj( $oldImgList );
	//logutils::log_obj( $newImgList );
	
	for($i=0;$i<$total;$i++){
		if (!in_array($oldImgList[$i], $newImgList)){
			//$file = ROOT_PATH . $oldImgList[$i];
			//$file = str_replace( "\\", "/", $file );
			$file = '../' . $oldImgList[$i];
			if (file_exists ( $file )) {
				//logutils::log_str( "delete:".$file );
				@unlink($file);
			}						
		}
	}
	
	
    //clear_cache_files();
    
	return "true";
			
}

function add_nav($cat_id, $cat_name)
{
  //logutils::log_str( "add_nav: begin " );	
  $vieworder = $GLOBALS['db']->getOne("SELECT max(vieworder) FROM ". $GLOBALS['ecs']->table('nav') . " WHERE type = 'middle'");
  $vieworder += 2;
  $sql = "INSERT INTO " . $GLOBALS['ecs']->table('nav') .
     " (name,ctype,cid,ifshow,vieworder,opennew,url,type)".
      " VALUES('" . $cat_name . "', 'c', '".$cat_id."','1','$vieworder','0', '" . build_uri('category', array('cid'=> $cat_id)) . "','middle')";
  //logutils::log_str( $sql );
  $GLOBALS['db']->query($sql);

}

/**
 *
 * @access  public
 * @param   array   $recommend_type
 * @param   integer $cat_id 
 *
 * @return void
 */
function insert_cat_recommend2($recommend_type, $cat_id)
{
    if (!empty($recommend_type))
    {
        $recommend_res = $GLOBALS['db']->getAll("SELECT recommend_type FROM " . $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=" . $cat_id);
        if (empty($recommend_res))
        {
            foreach($recommend_type as $data)
            {
                $data = intval($data);
                $GLOBALS['db']->query("INSERT INTO " . $GLOBALS['ecs']->table("cat_recommend") . "(cat_id, recommend_type) VALUES ('$cat_id', '$data')");
            }
        }
        else
        {
            $old_data = array();
            foreach($recommend_res as $data)
            {
                $old_data[] = $data['recommend_type'];
            }
            $delete_array = array_diff($old_data, $recommend_type);
            if (!empty($delete_array))
            {
                $GLOBALS['db']->query("DELETE FROM " . $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=$cat_id AND recommend_type " . db_create_in($delete_array));
            }
            $insert_array = array_diff($recommend_type, $old_data);
            if (!empty($insert_array))
            {
                foreach($insert_array as $data)
                {
                    $data = intval($data);
                    $GLOBALS['db']->query("INSERT INTO " . $GLOBALS['ecs']->table("cat_recommend") . "(cat_id, recommend_type) VALUES ('$cat_id', '$data')");
                }
            }
        }
    }
    else
    {
        $GLOBALS['db']->query("DELETE FROM ". $GLOBALS['ecs']->table("cat_recommend") . " WHERE cat_id=" . $cat_id);
    }
}


function uploadRecord2($data, $table, $idfields, $syncfield, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn" )
{
	//logutils::clear_log();
	//logutils::log_str( "UploadRecord Begin ".$table );
	
	$table = strtolower($table);
	
	$data = XmlSafeStr($data);

	if (Empty($data))
	{	//logutils::log_str("data is Empty.");
		return NULL;
	}
	
	//logutils::log_str("data:".$data );
	//logutils::log_str( $delimiter_rn );
	//logutils::log_str( $delimiter_cn );
	
	
	$list = array();
    $recordarr = explode( $delimiter_rn, $data ); 
    
    //logutils::log_obj( $recordarr[0] );
    $fields = explode( $delimiter_cn, $recordarr[0] ); 
    
    //logutils::log_obj( $fields );
    $fieldcount = count($fields);
	for ($i = 1; $i < count($recordarr); $i++) 
	{
		$tmp = explode( $delimiter_cn, $recordarr[$i] ); 
		$v = array();
	    for ($j = 0; $j < $fieldcount; $j++)
        {
           $v[$fields[$j]] = $tmp[$j];
        }
        $list[] = $v;
	}    
	
	//logutils::log_obj( $list );
	
	//return NULL;
	
	$idcolarr = explode( ",", $idfields );
	
	//logutils::log_obj( "idfields:".$idfields );
	//logutils::log_obj( "idcolarr:".$idcolarr );
	//logutils::log_str( "idcolarr[0]:".$idcolarr[0] );
	
	foreach ( $list as $row )
	{
		//logutils::log_obj( $row );
		
		
		$sync_item = array( );
		$sync_item['table'] = $table;
		$sync_item['guid'] = ""; 
		$sync_item['succ'] = false;
		$sync_item['errmsg'] = "";
		$sync_item['syncstate'] = AS_SYNC_ADDED; 
		
		if ( array_key_exists( $syncfield, $row ) )
		{
			$sync_item['syncstate'] = $row[$syncfield];
		}
		
		//logutils::log_str( "syncstate-------------------------:" );
		//logutils::log_str("table:".$table );
		//logutils::log_str( "idfields:".$idfields );
		//logutils::log_str( "syncfield:".$syncfield );
		//logutils::log_str( "syncfield_value:".$row[$syncfield] );
		//logutils::log_str( $sync_item['syncstate'] );
		//logutils::log_str( "syncstate-------------------------:");

		if (($idfields == '') || empty( $idfields )){
			$idcndstr = '1=0';
		}else{
			$idcndstr = "";		
			$linefirst = true;	
			foreach ( $idcolarr as $idcol )
			{
				if ( array_key_exists( $idcol, $row ) )
				{
					if ($linefirst)
					  $sync_item['guid'] = $row[$idcol];
					else 
					  $sync_item['guid'] = $sync_item['guid'].",".$row[$idcol];
	   			 
					$linefirst = false;  
					
					if ( !empty( $idcndstr ) )
					{
						$idcndstr .= " and ";
					}
					$idcndstr .= $idcol."=".$row[$idcol];				
				}			
			}
		} 
		
		if ($fieldcount <> count($row))
		{
			$sync_item['succ'] = false;
			$sync_item['errmsg'] = "fieldcount error";	
			$syncitems[] = $sync_item;		
		}		
		else if (empty( $idcndstr ))
		{
			$sync_item['succ'] = false;
			$sync_item['errmsg'] = "idcndstr is empty";	
			$syncitems[] = $sync_item;				
		}
		else{
		//logutils::log_str( "UploadRecord End sync_item " );
		//logutils::log_obj( $sync_item );			
			//==============================switch begin==========================================
			switch ( $sync_item['syncstate'] )
				{
					
				case NULL :
					$sync_item['succ'] = false;
					$sync_item['errmsg'] = "invalid syncstate";
					break;					
				case AS_SYNC_DELETED :
					
					if($table == 'category')
					{
				        $sql = 'DELETE FROM ' .$GLOBALS['ecs']->table('goods_cat'). " WHERE cat_id = ".$row['cat_id'];
				        $GLOBALS['db']->query( $sql );					        
				        //if (!eregi('^(v2.5.0|v2.5.1|v2.6.0)$',VERSION))
				        if(!preg_match('/^(v2.5.0|v2.5.1|v2.6.0)$/i',VERSION))
				        {
				        	$sql = 'DELETE FROM ' .$GLOBALS['ecs']->table('cat_recommend'). " WHERE cat_id = ".$row['cat_id'];
				        	$GLOBALS['db']->query( $sql );
				        }
				        
				        $sql = "DELETE FROM " . $GLOBALS['ecs']->table('nav') . "WHERE ctype = 'c' AND cid = '" . $row['cat_id'] . "' AND type = 'middle'";
				        $GLOBALS['db']->query( $sql );						
					}
					
					$sql = "delete from ".$GLOBALS['ecs']->table($table)." where {$idcndstr}";
					//logutils::log_str( $sql );
					if ( !$GLOBALS['db']->query( $sql ) )
					{
						break;
					}
					$sync_item['succ'] = true;
					break;
				case AS_SYNC_UNCHANGED :
					$sync_item['succ'] = true;
					break;
				case AS_SYNC_MODIFIED :
					if ($table == 'goods')
					{
						//logutils::clear_log();
						$sql = "select count(*) from ".$GLOBALS['ecs']->table($table)." where goods_id <> ".$row['goods_id']." and goods_sn = '".$row['goods_sn']."'";
						//logutils::log_str( $sql );
						$count = $GLOBALS['db']->getOne( $sql );
						if ( 0 < $count ) 
						{   
							$sync_item['errmsg'] = "modified goods error, goods_sn repeat";
							$sync_item['succ'] = false;
							//logutils::log_str( 'uploadGoods1:' );
							//logutils::log_str( $sync_item['errmsg'] );
							break;
						}						
					}
										
					$sql = "select count(*) from ".$GLOBALS['ecs']->table($table)." where {$idcndstr}";
					//logutils::log_str( $sql );
					$count = $GLOBALS['db']->getOne( $sql );
					if ( 0 < $count )
					{
						//logutils::log_obj( $row );
						$fvs = '';
						$linefirst = true;	
						foreach ( $row as $field=>$v )
						{
							//$v = str_replace( "'", "\'", $v );
							if (($field <> $syncfield) and ($field <> 'category_cat_recommend'))
							{
								if ($linefirst)
								  $fvs = $field."="."'".addslashes($v)."'";
								else
								  $fvs = $fvs.",".$field."="."'".addslashes($v)."'";
								$linefirst = false;
							}  
						}
						$sql = "UPDATE ".$GLOBALS['ecs']->table($table)."SET ".$fvs." WHERE {$idcndstr}";
						
						//logutils::log_str( $sql );
						
						if ( !$GLOBALS['db']->query( $sql ) )
						{
							break;
						}
						
						if ($table == 'category') 
						{
							$sql = "select count(*) from ".$GLOBALS['ecs']->table('nav')." where ctype = 'c'  AND type = 'middle' and cid =".$row['cat_id'];
							//logutils::log_str( $sql );
							$count = $GLOBALS['db']->getOne( $sql );
							if ( 0 == $count and $row['show_in_nav'] == 1)
							{
								add_nav($row['cat_id'], $row['cat_name']);
							}else{
					            $sql = "UPDATE " . $GLOBALS['ecs']->table('nav') . " SET ifshow = ".$row['show_in_nav'].", name = '" . $row['cat_name'] . "' WHERE ctype = 'c' AND cid = '" . $row['cat_id'] . "' AND type = 'middle'";
					            //logutils::log_str( $sql );
					            $GLOBALS['db']->query($sql);								
							}
							//if (!eregi('^(v2.5.0|v2.5.1|v2.6.0)$',VERSION))
							if(!preg_match('/^(v2.5.0|v2.5.1|v2.6.0)$/i',VERSION))
							{
								$recommend_type = explode(',', $row['category_cat_recommend'] ); 
								//logutils::log_str( 'recommend_type:' );
								//logutils::log_obj( $recommend_type );
								insert_cat_recommend2($recommend_type, $row['cat_id']);
							}							
						}						
						
						$sync_item['succ'] = true;
						
						break;
					}else{
						$sync_item['errmsg'] = " data is deleted, cannot update";
						$sync_item['succ'] = false;
						//logutils::log_str( 'uploadGoods2:' );
						//logutils::log_str( $sync_item['errmsg'] );
						break;
					}
					
				case AS_SYNC_ADDED :
					$sql = "select count(*) from ".$GLOBALS['ecs']->table($table)." where {$idcndstr}";
					//logutils::log_str( $sql );
					$count = $GLOBALS['db']->getOne( $sql );
						
					if ( 0 < $count ) 
					{   
						$sync_item['errmsg'] = " append error, data already exist";
						$sync_item['succ'] = false;
						//logutils::log_str( $sync_item['errmsg'] );
						break;
					}
						
					//logutils::log_obj( $row );
					
					if ($table == 'goods')
					{
						//logutils::clear_log();
						$sql = "select count(*) from ".$GLOBALS['ecs']->table($table)." where goods_sn = '".$row['goods_sn']."'";
						//logutils::log_str( $sql );
						$count = $GLOBALS['db']->getOne( $sql );
						if ( 0 < $count ) 
						{   
							$sync_item['errmsg'] = "append goods error, goods_sn repeat";
							$sync_item['succ'] = false;
							//logutils::log_str( $sync_item['errmsg'] );
							break;
						}						
					}
					
					$fs = '';
					$fv = '';
					$linefirst = true;	
					foreach ( $row as $field=>$v )
					{
						//$v = str_replace( "'", "\'", $v );
						if (($field <> $syncfield) and ($field <> 'category_cat_recommend'))
						{
							if ($linefirst)
							  $fs = $field;
							else
							  $fs = $fs.",".$field;
							  
							if ($linefirst)
							  $fv = "'".addslashes($v)."'";
							else
							  $fv = $fv.",'".addslashes($v)."'";
							  
							$linefirst = false;
						}  
					}
					$sql = "INSERT INTO ".$GLOBALS['ecs']->table($table)."(".$fs.") VALUES(".$fv.")";
					//logutils::log_str( $sql );
					
					if ( !$GLOBALS['db']->query( $sql ) )
					{
						break;
					}
					
					if ($table == 'category') 
					{
						if ($row['show_in_nav'] == 1)
						{
							add_nav($row['cat_id'], $row['cat_name']);
						}
						//if (!eregi('^(v2.5.0|v2.5.1|v2.6.0)$',VERSION))
						if(!preg_match('/^(v2.5.0|v2.5.1|v2.6.0)$/i',VERSION))
						{
							$recommend_type = explode(',', $row['category_cat_recommend'] );
							//logutils::log_str( 'recommend_type:' );
							//logutils::log_obj( $recommend_type );
							insert_cat_recommend2($recommend_type, $row['cat_id']);
						}
					}
										
					$sync_item['succ'] = true;
				}//switch ( $sync_item['syncstate'] )
			//====================================switch end=============================================
			//logutils::log_obj( $sync_item );
			$syncitems[] = $sync_item;
		}//if ( !empty( $idcndstr ))			
	}//foreach ( $list as $row )	
		
	$succ = true;
	foreach ( $syncitems as $sync_item )
	{
		if ($sync_item['succ'] == false)
		{
			$succ = false;
			break;
		}
	}
			
	$pack = array(
		"succ" => $succ,
		"items" => $syncitems
	);
	//logutils::log_str( "UploadRecord Return" );
	return $pack;
}

function downloadRecord2($sql, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn" ) {
		
	//$sql = "SELECT * FROM " .$GLOBALS['ecs']->table('brand');
	//logutils::log_str( "downloadRecord2: ".$sql );
	$rows = $GLOBALS['db']->GetAll($sql); 
	$data = '';
	if ( $rows )
	{
		//ob_start( );
		$first = true;
		foreach ( $rows as $row )
		{
			if ( $first )
			{
				$data = implode( $delimiter_cn, array_keys( $row ) );
				$data = $data. $delimiter_rn;
				$first = false;
			}
			$linefirst = true;
			foreach ( $row as $k => $v )
			{
				if ( $linefirst )
				{
					$linefirst = false;
				}
				else
				{
					$data = $data. $delimiter_cn;
				}
				//echo $enclosure;
				//echo str_replace( "\"", "\"\"", $v );
				//echo $enclosure;
	
				$data = $data. XmlSafeStr($v);
				
			}
			$data = $data. $delimiter_rn;
		}
		//$data = ob_get_contents( );
		//ob_end_clean( );
		//logutils::log_str( "downloadRecord2_utf8===============================================================" );
		//logutils::log_str( $data );
		//$data = str_iconv(EC_CHARSET, ECS_CHARSET, $data);
		//logutils::log_str( "downloadRecord2_2===============================================================" );
		//logutils::log_str( "downloadRecord2: ".$data );
		//logutils::log_str( "downloadRecord2_utf8===============================================================" );
		//logutils::log_str( "base64_encode===============================================================" );
		//logutils::log_str( base64_encode($data) );
		//logutils::log_str( "base64_encode===============================================================" );
		//logutils::log_str( "base64_decode===============================================================" );
		//logutils::log_str( base64_decode(base64_encode($data)) );
		//logutils::log_str( "base64_decode===============================================================" );		
		
		return base64_encode($data);
	}
	return -1;	
}

	/**
 *
 * @param unknown_type $username
 * @param unknown_type $password
 * @param unknown_type $goods_id
 * @param unknown_type $delimiter_rn
 * @param unknown_type $delimiter_cn
 */
function downloadGoods2(
		$goods_id, 			
		$goodsFields,
		$delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
	{
		
		//logutils::log_str( "downloadGoods2: goods" );
		$sync_item = array( );
		//logutils::log_str( "sql:11" );
		$sync_item['table'] = 'goods';
		//logutils::log_obj( $sync_item );
	    $sql = "select ".$goodsFields." from ".$GLOBALS['ecs']->table('goods')." where goods_id=".$goods_id;
	    //logutils::log_str( "sql:".$sql );	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);
		$syncitems[] = $sync_item;
		
		//logutils::log_str( "downloadGoods: goods_article" );
		$sync_item = array( );
		$sync_item['table'] = 'goods_article';		
	    $sql = "select goods_id, article_id, admin_id from ".$GLOBALS['ecs']->table('goods_article')." where goods_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;

		//logutils::log_str( "downloadGoods: goods_attr" );
		$sync_item = array( );
		$sync_item['table'] = 'goods_attr';		
	    $sql = "select goods_attr_id, goods_id, attr_id, attr_value, attr_price from ".$GLOBALS['ecs']->table('goods_attr')." where goods_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;

		//logutils::log_str( "downloadGoods: goods_cat" );
		$sync_item = array( );
		$sync_item['table'] = 'goods_cat';		
	    $sql = "select goods_id, cat_id from ".$GLOBALS['ecs']->table('goods_cat')." where goods_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;

		//logutils::log_str( "downloadGoods: goods_gallery" );
		$sync_item = array( );
		$sync_item['table'] = 'goods_gallery';		
	    $sql = "select goods_id, img_url,img_desc,thumb_url,img_original from ".$GLOBALS['ecs']->table('goods_gallery')." where goods_id=".$goods_id." order by img_id";	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;

		//logutils::log_str( "downloadGoods: group_goods" );
		$sync_item = array( );
		$sync_item['table'] = 'group_goods';		
	    $sql = "select parent_id, goods_id, goods_price, admin_id from ".$GLOBALS['ecs']->table('group_goods')." where parent_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;

		//logutils::log_str( "downloadGoods: link_goods" );
		$sync_item = array( );
		$sync_item['table'] = 'link_goods';		
	    $sql = "select goods_id, link_goods_id, is_double, admin_id from ".$GLOBALS['ecs']->table('link_goods')." where goods_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;	

		//logutils::log_str( "downloadGoods: member_price" );
		$sync_item = array( );
		$sync_item['table'] = 'member_price';		
	    $sql = "select goods_id, user_rank, user_price from ".$GLOBALS['ecs']->table('member_price')." where goods_id=".$goods_id;	
		$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
		$syncitems[] = $sync_item;	
		
		if (!preg_match('/^(v2.5.0|v2.5.1|v2.6.0|v2.6.1)$/i',VERSION)){
			$sync_item = array( );
			$sync_item['table'] = 'volume_price';		
			$sql = "select price_type, goods_id, volume_number, volume_price from ".$GLOBALS['ecs']->table('volume_price')." where goods_id=".$goods_id;	
			$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
			$syncitems[] = $sync_item;
		}	

		if (!preg_match('/^(v2.5.0|v2.5.1|v2.6.0|v2.6.1|v2.6.2|v2.7.0|v2.7.1)$/i',VERSION)){
			$sync_item = array( );
			$sync_item['table'] = 'products';		
			$sql = "select product_id, goods_id, goods_attr, product_sn, product_number from ".$GLOBALS['ecs']->table('products')." where goods_id=".$goods_id;	
			$sync_item['data'] = downloadRecord2($sql, $delimiter_rn, $delimiter_cn);	
			$syncitems[] = $sync_item;
		}		
		//logutils::log_str( "syncitems" );
		//logutils::log_obj( $syncitems );
		
		$pack = array(
			"goods_id" =>$goods_id,
			"succ" => true,
			"items" => $syncitems
		);
		
		return $pack;//str_iconv(EC_CHARSET, ECS_CHARSET, $pack);
	}	
	
		
function downloadRecordBase64($username, $password, $sql, $delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn" ){
	//$username, $password, 
	if (!checkLogin($username, $password))
	{
		return NULL; //login_faild
	}	
	$sql = base64_decode($sql);
	$delimiter_rn = base64_decode($delimiter_rn);
	$delimiter_cn = base64_decode($delimiter_cn);
	
	//$sql = str_iconv(ECS_CHARSET, EC_CHARSET, $sql);
	$tmp = downloadRecord2($sql, $delimiter_rn, $delimiter_cn );
	return $tmp;
}

/**
 *
 * @param unknown_type $username
 * @param unknown_type $password
 * @param unknown_type $goods_id
 * @param unknown_type $delimiter_rn
 * @param unknown_type $delimiter_cn
 */
function downloadGoodsBase64($username,$password, 
		$goods_id, 			 
		$goodsFields,
		$delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
	{
		if (!checkLogin($username, $password))
		{
			return NULL; //login_faild
		}
		
		$goodsFields = base64_decode($goodsFields);
		$delimiter_rn = base64_decode($delimiter_rn);
		$delimiter_cn = base64_decode($delimiter_cn);
			
		$pack = downloadGoods2($goods_id, $goodsFields, $delimiter_rn, $delimiter_cn);
		
		return $pack;
	}
		
/**
 *
 * @param unknown_type $username
 * @param unknown_type $password
 * @param unknown_type $goods_id
 * @param unknown_type $delimiter_rn
 * @param unknown_type $delimiter_cn
 */
function downloadMultiGoodsBase64($username,$password, 
		$goods_ids, 			
		$goodsFields,
		$delimiter_rn = "51eca_rn", $delimiter_cn = "51eca_cn"
		)
{
		if (!checkLogin($username, $password))
		{
			return NULL; //login_faild
		}
		
		$goods_ids = base64_decode($goods_ids);
		$goodsFields = base64_decode($goodsFields);
		$delimiter_rn = base64_decode($delimiter_rn);
		$delimiter_cn = base64_decode($delimiter_cn);		
	//logutils::log_str( "downloadMultiGoods: goods_ids:".$goods_ids );
		
	$goods_id_arr = explode (',', $goods_ids );	
	
	//logutils::log_obj( $goods_id_arr );
	
	foreach ( $goods_id_arr as $goods_id ) {
		$pack = downloadGoods2($goods_id, $goodsFields, $delimiter_rn, $delimiter_cn);	
		$SyncPack[] = $pack; 
		//logutils::log_str( "pack: goods_id:".$goods_id );
	}

	//logutils::clear_log();
	
	$SyncPackList = array(
			"items" => $SyncPack
	);
		
	//logutils::log_str( "downloadMultiGoods: end" );
	//logutils::log_obj( $SyncPackList );
	
	return $SyncPackList;
}	


function checkTableExist($tableName){
   //check table exist
   //$sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '". $GLOBALS['ecs']->db_name ."'  AND TABLE_NAME = '".$GLOBALS['ecs']->prefix.$tableName."' LIMIT 1 ";
   $sql = "show tables like '".$GLOBALS['ecs']->prefix.$tableName."'";
   $table = $GLOBALS['db']->getRow($sql);
   return  (empty($table)) ? false : true;	
}

function drop_goods($username,$password,$goods_ids){

	if (!checkLogin($username, $password))
	{
		return false; //login_faild
	}
			
   $goods_ids = base64_decode($goods_ids);
   $goods_id_arr = explode (',', $goods_ids );
   
   //check table exist
   $tableExist = array();
   
   $tableExist['collect_goods'] = checkTableExist('collect_goods');
   $tableExist['goods_article'] = checkTableExist('goods_article');
   $tableExist['goods_activity'] = checkTableExist('goods_activity');
   $tableExist['goods_attr'] = checkTableExist('goods_attr');
   $tableExist['goods_cat'] = checkTableExist('goods_cat');
   $tableExist['member_price'] = checkTableExist('member_price');
   $tableExist['group_goods'] = checkTableExist('group_goods');
   $tableExist['link_goods'] = checkTableExist('link_goods');
   $tableExist['tag'] = checkTableExist('tag');
   $tableExist['comment'] = checkTableExist('comment');
   $tableExist['booking_goods'] = checkTableExist('booking_goods');
   $tableExist['volume_price'] = checkTableExist('volume_price');
   $tableExist['virtual_card'] = checkTableExist('virtual_card');
   $tableExist['products'] = checkTableExist('products');
   
   foreach ( $goods_id_arr as $goods_id ) {

   	 $sql = "SELECT goods_id, goods_name, is_delete, is_real, goods_thumb, " .
                "goods_img, original_img " .
            "FROM " .$GLOBALS['ecs']->table('goods') .
            " WHERE goods_id = '$goods_id'";
     $goods = $GLOBALS['db']->getRow($sql);

     if (!empty($goods['goods_id'])){
     	 
	    if (!empty($goods['goods_thumb']))
	    {
	        @unlink('../' . $goods['goods_thumb']);
	    }
	    if (!empty($goods['goods_img']))
	    {
	        @unlink('../' . $goods['goods_img']);
	    }
	    if (!empty($goods['original_img']))
	    {
	        @unlink('../' . $goods['original_img']);
	    }
	    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods') . " WHERE goods_id = '$goods_id'";
	    $GLOBALS['db']->query($sql);
	
	    $sql = "SELECT img_url, thumb_url, img_original " .
	            "FROM " . $GLOBALS['ecs']->table('goods_gallery') .
	            " WHERE goods_id = '$goods_id' order by img_id";
	    $res = $GLOBALS['db']->query($sql);
	    while ($row = $GLOBALS['db']->fetchRow($res))
	    {
	        if (!empty($row['img_url']))
	        {
	            @unlink('../' . $row['img_url']);
	        }
	        if (!empty($row['thumb_url']))
	        {
	            @unlink('../' . $row['thumb_url']);
	        }
	        if (!empty($row['img_original']))
	        {
	            @unlink('../' . $row['img_original']);
	        }
	    }
	    
	    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_gallery') . " WHERE goods_id = '$goods_id'";
	    $GLOBALS['db']->query($sql);
	    
	    if ($tableExist['collect_goods']){	  
	    	$sql = "DELETE FROM " . $GLOBALS['ecs']->table('collect_goods') . " WHERE goods_id = '$goods_id'";
	    	$GLOBALS['db']->query($sql);
	    }
	    
	    if ($tableExist['goods_article']){	    	
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_article') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}

	    if ($tableExist['goods_activity']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_activity') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
				
	    if ($tableExist['goods_attr']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_attr') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		    	    
	    if ($tableExist['goods_cat']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('goods_cat') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		
	    if ($tableExist['member_price']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('member_price') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		
	    if ($tableExist['group_goods']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('group_goods') . " WHERE parent_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('group_goods') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);		    
		}
		
	    if ($tableExist['link_goods']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('link_goods') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('link_goods') . " WHERE link_goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);		    
		}
		
	    if ($tableExist['tag']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('tag') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		
	    if ($tableExist['comment']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('comment') . " WHERE comment_type = 0 AND id_value = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		
	    if ($tableExist['booking_goods']){		    
		    $sql = "DELETE FROM " . $GLOBALS['ecs']->table('booking_goods') . " WHERE goods_id = '$goods_id'";
		    $GLOBALS['db']->query($sql);
		}
		
	    if ($tableExist['volume_price']){		
    		$sql = "DELETE FROM " . $GLOBALS['ecs']->table('volume_price') ." WHERE price_type = '1' AND goods_id = '$goods_id'";
    		$GLOBALS['db']->query($sql);		
	    }
	    	
	    if (($goods['is_real'] != 1) && ($tableExist['virtual_card'])){
	        $sql = "DELETE FROM " . $GLOBALS['ecs']->table('virtual_card') . " WHERE goods_id = '$goods_id'";
	        $GLOBALS['db']->query($sql);
	    }
	    
     	if ($tableExist['products']){		
    		$sql = "DELETE FROM " . $GLOBALS['ecs']->table('products') ." WHERE goods_id = '$goods_id'";
    		$GLOBALS['db']->query($sql);		
	    }	    
	    
     }
	 
     
	 $sync_item = array( );
	 $sync_item['table'] = "ecs_goods";
	 $sync_item['guid'] = $goods_id; 
	 $sync_item['succ'] = true;
	 //$sync_item['errmsg'] = base64_encode($tmp);
			
	 $syncitems[] = $sync_item;	 
   }
   
   
   clear_cache_files();
   
   $pack = array(
		"succ" => true,
		"items" => $syncitems
		);
		
	return $pack;   
   
    
}

function exec_sql($username,$password,$sql_list,$clear_cache,$delimiter_rn){
   
	if (!checkLogin($username, $password))
	{
		return false; //login_faild
	}

   $delimiter_rn = base64_decode($delimiter_rn);	
   $sql_list = base64_decode($sql_list);
   $sql_list = explode ($delimiter_rn, $sql_list);
   
   //logutils::log_obj( $sql_list );
   
   foreach ( $sql_list as $sql ) {
   	 //logutils::log_str( $sql );
	 $sync_item = array();
	 $sync_item['succ'] = $GLOBALS['db']->query($sql, 'SILENT');
	 if ($sync_item['succ'] == false){
	 	$sync_item['data'] = base64_encode($sql); 
	 	$sync_item['errmsg'] = base64_encode($GLOBALS['db']->error());
	 	$syncitems[] = $sync_item;
	 	break;
	 }	
	 $syncitems[] = $sync_item;	   		
   }
   if ($clear_cache == true){
     clear_cache_files();
   }
   
   
   $pack = array(
		"succ" => true,
		"items" => $syncitems
		);
		
	return $pack;    
}

?>