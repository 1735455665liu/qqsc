/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */

/* *
 * 添加商品到购物车 
 */
function addToCart(goodsId, cp, parentId)
{
  var goods        = new Object();
  var spec_arr     = new Array();
  var fittings_arr = new Array();
  var number       = 1;
  var formBuy      = document.forms['ECS_FORMBUY'];
  var quick		   = 0;

  // 检查是否有商品规格 
  if (formBuy)
  {
    spec_arr = getSelectedAttributes(formBuy);

    if (formBuy.elements['number'])
    {
      number = formBuy.elements['number'].value;
    }

	quick = 1;
  }

  goods.quick    = quick;
  goods.spec     = spec_arr;
  goods.goods_id = goodsId;
  goods.number   = number;
  goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

  Ajax.call('buy.php?act=add_to_cart', 'cp='+ cp +'&goods=' + goods.toJSONString(), addToCartResponse, 'POST', 'JSON');
}

/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy)
{
  var spec_arr = new Array();
  var j = 0;

  for (i = 0; i < formBuy.elements.length; i ++ )
  {
    var prefix = formBuy.elements[i].name.substr(0, 5);

    if (prefix == 'spec_' && (
      ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
      formBuy.elements[i].tagName == 'SELECT'))
    {
      spec_arr[j] = formBuy.elements[i].value;
      j++ ;
    }
  }

  return spec_arr;
}

/* *
 * 处理添加商品到购物车的反馈信息
 */
function addToCartResponse(result)
{
  if (result.error > 0)
  {
    // 如果需要缺货登记，跳转
    if (result.error == 2)
    {
      if (confirm(result.message))
      {
        //location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
		location.href = 'kefu.php';
      }
    }
    // 没选规格，弹出属性选择框
    //else if (result.error == 6)
    //{
    //  openSpeDiv(result.message, result.goods_id, result.parent);
    //}
    else
    {
      alert(result.message);
    }
  }
  else
  {
    var cart_url = 'cart.php';

    if (result.ctype == '1')
    {
      	openDiv_buy(result);
    }else{
		location.href = cart_url;
	}
   
  }
}

/* *
 * 添加商品到收藏夹
 */
function collect(goodsId)
{
  Ajax.call('user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
}

/* *
 * 处理收藏商品的反馈信息
 */
function collectResponse(result)
{
  alert(result.message);
}

/* *
 *  返回属性列表
 */
function getAttr(cat_id)
{
  var tbodies = document.getElementsByTagName('tbody');
  for (i = 0; i < tbodies.length; i ++ )
  {
    if (tbodies[i].id.substr(0, 10) == 'goods_type')tbodies[i].style.display = 'none';
  }

  var type_body = 'goods_type_' + cat_id;
  try
  {
    document.getElementById(type_body).style.display = '';
  }
  catch (e)
  {
  }
}

function openDiv_buy(cartinfo) 
{	
  var goodscunt = cartinfo.cartcount;
  var goodsprice = cartinfo.goods_price;
   var buygoodsnum = cartinfo.buygoodsnum;
  var _id = "speDiv";
  var m = "mask";
 
  if (docEle(_id)) document.removeChild(docEle(_id));
  if (docEle(m)) document.removeChild(docEle(m));
  //计算上卷元素值
   var scrollPos; 
  if (typeof window.pageYOffset != 'undefined') 
  { 
    scrollPos = window.pageYOffset; 
  } 
  else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') 
  { 
    scrollPos = document.documentElement.scrollTop; 
  } 
  else if (typeof document.body != 'undefined') 
  { 
    scrollPos = document.body.scrollTop; 
  }
 var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while(sel_obj[i])
	{
		 sel_obj[i].style.visibility = "hidden";
		i++;
	}
 
  
  var newDiv = document.createElement("div");
  newDiv.id = _id;
  newDiv.className='cartnewtip';
  
  newDiv.style.width = "345px";
  newDiv.style.height = "162px";
  
    
  newDiv.style.left = ((parseInt(document.body.offsetWidth) / 2)-(parseInt(newDiv.style.width) / 2)) + "px"; // 屏幕居中
   newDiv.innerHTML = '<div class="carttip"><div class="cartinner"><div class="carttipclose"><a href="javascript:cancel_div_buy()" ><img src="images/div_close.gif" ></a></div><div class="cartmsg"><h2>已将商品添加到购物车</h2><p></p></div><div class="cartbtn"><a href="cart.php"> <img src="images/cart-5.gif" align=absmiddle></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:cancel_div_buy()">再逛逛>></a></div></div></div>';  
   document.body.appendChild(newDiv);
   var newMask = document.createElement("div");
  newMask.id = m;
  newMask.style.position = "absolute";
  newMask.style.zIndex = "9999";
  newMask.style.width = document.body.scrollWidth + "px";
  newMask.style.height = document.body.scrollHeight + "px";
  newMask.style.top = "0px";
  newMask.style.left = "0px";
  newMask.style.background = "#000000";
  newMask.style.filter = "alpha(opacity=30)";
  newMask.style.opacity = "0.40";
  newMask.style.cursor = "wait";
  document.body.appendChild(newMask);
  
}
function cancel_div_buy()
{
	
	var i = 0;
	var sel_obj = document.getElementsByTagName('select');
	while(sel_obj[i])
	{
		sel_obj[i].style.visibility = "visible";
		i++;
	}
	var _id = "speDiv";
	 var m = "mask";
    if (docEle(_id)) document.body.removeChild(docEle(_id));
    if (docEle(m)) document.body.removeChild(docEle(m));
}
function docEle() 
{
  return document.getElementById(arguments[0]) || false;
}