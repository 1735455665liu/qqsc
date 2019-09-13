/*category.js*/
$(function () {
    /*根据url判断首页*/
    if (window.location.pathname == '/') {
        $('.menu-class-body').show();
    } else {
        $('.menu-class').mouseenter(function () {
            $(this).find('.menu-class-body').show();
        }).mouseleave(function () {
            //$(this).find('.menu-class-body').hide();
        });
    }
    /*移入移出*/
    $('.menu-class-body li').mouseenter(function () {
        $(this).addClass('active');
    }).mouseleave(function () {
        $(this).removeClass('active');
    });
    $('.allmenuDiv2 li.cali').mouseenter(function () {
        $('.ShowCheckMenuList').hide();
        $(this).find('.cali-span').addClass('ncur').siblings('.ShowCheckMenuList2').show();
    }).mouseleave(function () {
        $(this).find('.cali-span').removeClass('ncur').siblings('.ShowCheckMenuList2').hide();
    });
})
$(function () {
    /*判断浏览器*/
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    //以下进行测试
    //    if (Sys.ie) document.write('IE: ' + Sys.ie);
    //    if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
    //    if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
    //    if (Sys.opera) document.write('Opera: ' + Sys.opera);
    //    if (Sys.safari) document.write('Safari: ' + Sys.safari);
    /*menu-tree 靠文档*/
    function MT() {
        if (window.location.pathname != '/') {
            $('.menu-tree').css('bottom', ($(window).height() - $('.menu-tree').height()) / 2 + 'px');
        }
        var MT_Left = ($(window).width() - 1200) / 2 + 1200 + 10;
        if ($(window).width() > (1200 + 10 + $('.menu-tree').width() + ($(window).width() - 1200) / 2)) {
            $('.menu-tree').css('left', MT_Left + 'px').show();
        } else {
            $('.menu-tree').css({ 'left': 'auto', 'right': 0 }).show();
        }
    }
    MT();
    $(window).resize(function () {
        MT();
    })

    /*置顶*/
    $('.menu-tree').find('a:last').click(function () {
        $(window).scrollTop(0);
    });


})

$(function () {
    $('.OfficeNewBtn li').click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');;
        $('.OfficeNewContent .OfficeNewMain').eq($(this).index()).show().siblings().hide();
    });

    //头部微信扫一扫
    $('.fgli_wx').mouseover(function () {
        $(this).find('.fgli_wxdg').show();
    }).mouseout(function () {
        $(this).find('.fgli_wxdg').hide();
    });
    //头部“我的订单” 
    $('div.top-right li:not(.notactive)').mouseover(function () {
        $(this).addClass('active');
    }).mouseout(function () {
        $(this).removeClass('active');
    });
    $('.top-right-wechat').mouseover(function () {
        $(this).find('.top-right-wechat-content').show();
    }).mouseout(function () {
        $(this).find('.top-right-wechat-content').hide();
    });
})

$(function () {
    // new RightMenu
    var j = $(".RightMenu");
    function ChangeTop() {
        j.css('top', ($(window).height() - j.height()) / 2 + 'px');
    }
    ChangeTop();
    $(window).resize(function () {
        ChangeTop();
    });
    if ($(window).width() > 1300) {
        j.css('right', ($(window).width() - 1200) / 2 - j.width() - 10 + 'px');
    } else {
        j.css('right', 10 + 'px');
    }
    setTimeout(function () {
        j.show();
    }, 500);
    $('#RightMenuTop').click(function () {
        $(window).scrollTop(0);
    });
    $('.rmcClose').click(function () {
        if ($(this).hasClass('cur')) {
            $(this).removeClass('cur');
            $('.RightMenuContent').show();
        } else {
            $(this).addClass('cur');
            $('.RightMenuContent').hide();
        }
    });
})