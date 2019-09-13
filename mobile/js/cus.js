function addToCart(goodsId)
{
   $.ajax({
		   url:"/jd2013/mobile/cart.php?step=add_to_cart",
		   type:'post',
		   data:'id=' + goodsId,
		   cache: false,
		   dataType: 'json',
		   success: addToCartResponse
		   });
}
function addToCartResponse(result)
{
	   
	if (result.error !="")
  {
    alert(result.error);
  }
  else
  {
	 openDiv_buy(result);
	
	
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
   newDiv.innerHTML = '<div class="carttip"><div class="cartinner"><div class="carttipclose"><a href="javascript:cancel_div_buy()" ><img src="images/div_close.gif" ></a></div><div class="cartmsg"><h2>已将'+buygoodsnum+'件商品添加到购物车</h2><p>购物车共 <b>'+goodscunt+'</b> 件商品 合计：<b>'+goodsprice+'</b></p></div><div class="cartbtn"><a  href="flow.php"> <img src="images/cart-5.gif" align=absmiddle></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:cancel_div_buy()">再逛逛>></a></div></div></div>';  
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