/*guanggaowei.js*/
var currentindex=1;var length=$(".flash_bar span").length;$("#flashBg").css("background-color",$("#flash1").attr("name"));function changeflash(i){currentindex=i;for(j=1;j<=length;j++){if(j==i){$("#flash"+j).fadeIn("normal");$("#flash"+j).css("display","block");$("#f"+j).removeClass();$("#f"+j).addClass("dq");$("#flashBg").css("background-color",$("#flash"+j).attr("name"));var urlImg="url(/Content/images/i/tg_flash_p.png.png) no-repeat 0px 0px";$("#f"+j).css({"display":"block","float":"left","height":"8px","width":"8px","margin":"5px","cursor":"pointer","background-img":urlImg})}else{$("#flash"+j).css("display","none");$("#f"+j).removeClass();$("#f"+j).addClass("no");var urlImg="background:url(/Content/images/i/tg_flash_p2.png) no-repeat 0px 0px";$("#f"+j).css({"display":"block","float":"left","height":"8px","width":"8px","margin":"5px","cursor":"pointer","background-img":urlImg})}}}function startAm(){timer_tick()}function stopAm(){}function timer_tick(){currentindex=currentindex>=length?1:currentindex+1;changeflash(currentindex)}$(document).ready(function(){$(".flash_bar div").mouseover(function(){stopAm()}).mouseout(function(){startAm()});startAm()});<!--flash end--><!--10后自动收起--begin-->setStateTime=setTimeout(function(){$("#ggw").slideToggle(2000);$('.floatMenu .allmenuDivParent').remove()},10000);<!--end-->var co=[0,0,0,0];$(function(){exports.SlidePic=Controller.create({events:{},setTimer:function(index,e){setInterval('SlidePic.fn.slidenext('+index+')',Math.floor(Math.random()*500)+3000)},slidenext:function(index){var e=$('.slidepictd').eq(index);var pics=e.find('.slidepic');var length=pics.length;var count=co[index];count=count+1;if(count>=length)count=0;co[index]=count;pics.eq(count).show().siblings().hide()},init:function(){this.slides=$('.slidepictd');this.slides.each(function(index,e){SlidePic.fn.setTimer(index,e)})}});new SlidePic({el:$('#firstGGMiddle')})});$(function(){exports.BuyHot=Controller.create({mouseHandler:[{delegateId:'.titleUL',leave:false,eventType:'mouseenter',mouseenterId:'li',handlerId:'.tjShoplist',waitTime:300,toggleClass:'buyhot',handlerClass:'none',callback:'handler'}],handler:function(eventType,handler){if(eventType==G.util.bindEvent.mouseenter&&handler){}}});new BuyHot({el:$('.tagTitle')})});
/*201411*/
$(function () {
    /*header banner*/
    setTimeout(function(){
        $('.top-banner-big').slideUp(1000,function(){
            $('.top-banner-small').fadeIn(200);
        })
    },2000);
	
    $('.close-big').click(function(){
        $('.top-banner-big').remove();
        $('.top-banner-small').fadeIn(500);
        return false;
    });
    $('.close-small').click(function(){
        $('.top-banner-small').remove();
        return false;
    });


    $.fn.extend({
        /*封装选项卡*/
        TabSwitch:function(){
            $(this).find('li').mouseenter(function(){
                var _this=$(this);
                _this.addClass('active').siblings().removeClass('active');
                _this.parent().parent().parent().next().children().eq(_this.index()).addClass("active").siblings().removeClass("active");
            }).eq(0).trigger('mouseenter');
        }
    });

    $('.choice-btn').TabSwitch();
    $('.info-common').TabSwitch();
    /*scroll-big*/
    $(".banner").slide({
        mainCell: ".banner-big ul",
        titCell: ".banner-btn ol",
        prevCell: ".banner-prev",
        nextCell: ".banner-next",
        titOnClassName:"active",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });

    /*pic scroll move show*/
    $('.bs-ct').each(function(){
        if($(this).find('ul').find('li').length<=1){
            $(this).find('.bs-bt').hide();
        }else{
            $(this).mouseenter(function(){
                $(this).find('.bs-bt').fadeIn().nextAll().fadeIn();
            });
            $(this).mouseleave(function(){
                $(this).find('.bs-lt').fadeOut().next().fadeOut();
            });
        }
    });

    /*floor-banner*/
    $(".floor-banner").slide({
        mainCell: ".floor-banner-content ul",
        titCell: ".floor-banner-button ul",
        prevCell: "",
        nextCell: "",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-2*/
    $(".ss-second").slide({
        mainCell: ".ss-second-mt ul",
        titCell: ".ss-second-bt ol",
        prevCell: ".ss-second-lt",
        nextCell: ".ss-second-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-3*/
    $(".ss-third").slide({
        mainCell: ".ss-third-mt ul",
        titCell: ".ss-third-bt ol",
        prevCell: ".ss-third-lt",
        nextCell: ".ss-third-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });    
    /*scroll-small-4*/
    $(".ss-fourth").slide({
        mainCell: ".ss-fourth-mt ul",
        titCell: ".ss-fourth-bt ol",
        prevCell: ".ss-fourth-lt",
        nextCell: ".ss-fourth-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-5*/
    $(".ss-fifth").slide({
        mainCell: ".ss-fifth-mt ul",
        titCell: ".ss-fifth-bt ol",
        prevCell: ".ss-fifth-lt",
        nextCell: ".ss-fifth-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-6*/
    $(".ss-sixth").slide({
        mainCell: ".ss-sixth-mt ul",
        titCell: ".ss-sixth-bt ol",
        prevCell: ".ss-sixth-lt",
        nextCell: ".ss-sixth-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-7*/
    $(".ss-seventh").slide({
        mainCell: ".ss-seventh-mt ul",
        titCell: ".ss-seventh-bt ol",
        prevCell: ".ss-seventh-lt",
        nextCell: ".ss-seventh-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });
    /*scroll-small-8*/
    $(".ss-eighth").slide({
        mainCell: ".ss-eighth-mt ul",
        titCell: ".ss-eighth-bt ol",
        prevCell: ".ss-eighth-lt",
        nextCell: ".ss-eighth-rt",
        titOnClassName:"cur",
        effect: "fold",
        nterTime:3000,
        delayTime:500,
        autoPlay: true,
        autoPage: true,
        vis:1
    });


    
    /*点击显示or隐藏*/
    $('.menu-tree i').click(function(){
        if($(this).hasClass('cur')){
            //$('.menu-tree a').not(':first').not(':last').show();
            $('a.mtca').show();
            $(this).removeClass('cur');
        }else{
            //$('.menu-tree a').not(':first').not(':last').hide();
            $('a.mtca').hide();
            $(this).addClass('cur');
        }
    });
    
    /*导航对应位置*/
    $('.mtca').click(function(){
        var num=$(this).index();
        $(window).scrollTop($('.index-floor').eq(num-2).offset().top);
    });
    
    //解决方案
    $('.solution li').mouseenter(function () {
        //$('.solution li').find('a').stop().animate({ 'top': '0px' }, 100).next().show();
        $(this).find('a').stop().animate({ 'top': '-98px' }, 100);
    }).mouseleave(function () {
        $(this).find('a').stop().animate({ 'top': '0px' }, 100);
    });

    /*#6661 B2C首页_新增品牌专区*/
    $('.BaList li').mouseenter(function(){
        $(this).find('dl').stop().animate({ 'bottom': '-1px'}, 100);
    }).mouseleave(function(){
        $(this).find('dl').stop().animate({ 'bottom': '-71px'}, 100);
    });
});