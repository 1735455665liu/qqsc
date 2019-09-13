<?php
	/* 
	后台商品类
	Author: dantinr@gmail.com
	*/
	class Goods{
		
		protected $pdo = null;
		
		public function __construct($pdo){
			$this->pdo = $pdo;
		}
		/* 
		* 获得所有分类信息,返回二维数组
		*/
		public function getAllCats(){
			$sql = "select cat_id,cat_name from necs_category";
			$smt = $this->pdo->query($sql);
			$tmp = $smt->fetchAll(PDO::FETCH_ASSOC);
			return $tmp;
		}
		
		public function firstLetter($asc){
			$asc=ord(substr($str,0,1));
			if ($asc<160){	//非中文
				return '~';
			}else{
				$asc=$asc*1000+ord(substr($str,1,1));	//获取拼音首字母A--Z
				if ($asc>=176161 && $asc<176197){
					return 'A';
				} elseif ($asc>=176197 && $asc<178193){
					return 'B';
				} elseif ($asc>=178193 && $asc<180238){
					return 'C';
				} elseif ($asc>=180238 && $asc<182234){
					return 'D';
				} elseif ($asc>=182234 && $asc<183162){
					return 'E';
				} elseif ($asc>=183162 && $asc<184193){
					return 'F';
				} elseif ($asc>=184193 && $asc<185254){
					return 'G';
				} elseif ($asc>=185254 && $asc<187247){
					return 'H';
				} elseif ($asc>=187247 && $asc<191166){
					return 'J';
				} elseif ($asc>=191166 && $asc<192172){
					return 'K';
				} elseif ($asc>=192172 && $asc<194232){
					return 'L';
				} elseif ($asc>=194232 && $asc<196195){
					return 'M'; 
				} elseif ($asc>=196195 && $asc<197182){
					return 'N';
				} elseif ($asc>=197182 && $asc<197190){
					return 'O';
				} elseif ($asc>=197190 && $asc<198218){
					return 'P';
				} elseif ($asc>=198218 && $asc<200187){
					return 'Q';
				} elseif ($asc>=200187 && $asc<200246){
					return 'R';
				} elseif ($asc>=200246 && $asc<203250){
					return 'S';
				} elseif ($asc>=203250 && $asc<205218){
					return 'T';
				} elseif ($asc>=205218 && $asc<206244){
					return 'W';
				} elseif ($asc>=206244 && $asc<209185){
					return 'X';
				} elseif ($asc>=209185 && $asc<212209){
					return 'Y';
				} elseif ($asc>=212209){
					return 'Z';
				} else{
					return '~';
				}
			}
		}
	
		/* 查看某商品销售记录 */
		public function showOrderGoods($goods_id){
			$sql1 = "select oi.order_id,oi.confirm_time,og.goods_id,og.goods_number from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and goods_id={$goods_id} order by oi.order_id desc";
			$smt = $this->pdo->query($sql1);
			$tmp1 = $smt->fetchAll(PDO::FETCH_ASSOC);
			
			$sql2 = "select sum(og.goods_number) as total from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and goods_id={$goods_id}";
			$smt = $this->pdo->query($sql2);		//销售总数
			$tmp2 = $smt->fetch(PDO::FETCH_ASSOC);
			$total = $tmp2['total'];
			$rs['total'] = $total;
			$rs['info'] = $tmp1;
			return $rs;
			//echo '<pre>';print_r($tmp1);echo '</pre>';
		}
		
		/* 商品销售明细 */
		public function goodsSale($info){
			echo '<pre>';print_r($info);echo '</pre>';
			$goods_id = intval($info['g_id']);
			$start_ = strtotime($info['start_']);	//开始时间
			$end_ = strtotime($info['end_']);	//结束时间
			echo $goods_id,': ',$start_,'--',$end_;
			//die();
			
			//$sql1 = "select oi.order_id,oi.confirm_time,og.goods_id,og.goods_number from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and goods_id={$goods_id} order by oi.order_id desc";
			$sql1 = "select oi.order_id,oi.confirm_time,og.goods_id,og.goods_number from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and og.goods_id={$goods_id} and oi.pay_time between {$start_} and {$end_} order by oi.order_id desc";
			$smt = $this->pdo->query($sql1);
			$tmp1 = $smt->fetchAll(PDO::FETCH_ASSOC);
			
			//$sql2 = "select sum(og.goods_number) as total from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and goods_id={$goods_id}";
			$sql2 = "select sum(og.goods_number) as total from necs_order_goods og,necs_order_info oi  where oi.pay_status=2 and oi.order_id=og.order_id and og.goods_id={$goods_id} and oi.pay_time between {$start_} and {$end_} order by oi.order_id desc";
			$smt = $this->pdo->query($sql2);		//销售总数
			$tmp2 = $smt->fetch(PDO::FETCH_ASSOC);
			$total = $tmp2['total'];
			$rs['total'] = $total;
			$rs['info'] = $tmp1;
			return $rs;
			//echo '<pre>';print_r($rs);echo '</pre>';
		}
		
		public function userSale($info){
			//echo '<pre>';print_r($info);echo '</pre>';
			$user_id = intval($info['u_id']);
			$start_ = strtotime($info['start1_']);	//开始时间
			$end_ = strtotime($info['end1_']);	//结束时间
			
			$sql1 = "select distinct(goods_id),sum(goods_number) as total,goods_name from necs_order_goods where order_id in(select order_id from necs_order_info where user_id={$user_id} and order_status=5 and add_time between {$start_} and {$end_}) group by goods_id order by total desc";
			$smt = $this->pdo->query($sql1);
			$tmp = $smt->fetchAll(PDO::FETCH_ASSOC);
			//echo '<pre>';print_r($tmp);echo '</pre>';
			return $tmp;
		}
		
		//查询用户信息
		public function userInfo($uid){
			$sql = "select * from necs_users where user_id=".$uid;
			$smt = $this->pdo->query($sql);
			$tmp = $smt->fetch(PDO::FETCH_ASSOC);
			return $tmp;
		}
		/* 所有商品销售记录 */
		public function allSale($info){
			//echo '<pre>';print_r($info);echo '</pre>';
			$start_ = strtotime($info['start2_']);	//开始时间
			$end_ = strtotime($info['end2_']);	//结束时间
			$sql = "select distinct(goods_id),sum(goods_number) as total,goods_name from necs_order_goods where order_id in(select order_id from necs_order_info where order_status=5 and add_time between {$start_} and {$end_}) group by goods_id order by total desc";
			
			$smt = $this->pdo->query($sql);
			$tmp = $smt->fetchAll(PDO::FETCH_ASSOC);
			return $tmp;
		}
		
		// 添加商品销售记录  
		public function addSaleNum($goods_id,$num){
			$sql = "update necs_goods set sale_num={$num} where goods_id={$goods_id}";
			echo $sql;
			$this->pdo->exec($sql);
		}
	//end	
	}