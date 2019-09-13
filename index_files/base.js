/*base.js*/
Model.base = {};
var base = Model.base;
base.SearchKey = "请输入您要搜索的内容";
base.allNumber = /^[0-9]*$/;
base.allChar = /^[A-Za-z]*$/;
base.NumberStart = /^([0-9]).*/;
base.phoneNub = /\d{3,4}-\d{7,8}(-\d{1,4})?$/;
$(function () {
    exports.FullWidthHot = Controller.create({
        init: function () {
            $(".tagTitle .titleUL li:last").css("border-right", "0")
        }
    });
    new FullWidthHot({
        el: $('#fullWidthHot')
    })
});
$(function () {
    exports.pageBody = Controller.create({
        init: function () {
            $("#cnzz_stat_icon_1252999954").css("display", "none")
        }
    });
    new pageBody({
        el: $('body')
    })
});
$(function () {
    exports.Header = Controller.create({
        elements: {
            '#login': 'ln',
            '#LoginSuccess': 'ld',
            '#search': 'sh',
            '#J-minicart': 'cart',
            '#cartsCount': 'ct',
            '#cartlist': 'cartlist',
            '#searchDefaultTxt': 'st'
        },
        appEvents: {
            'load:cartlist': 'bindcart'
        },
        mouseHandler: [{
            delegateId: '#header',
            leave: true,
            eventType: 'mouseenter',
            mouseenterId: '#J-minicart',
            handlerId: '#cartlist',
            waitTime: 300,
            toggleClass: 'car-content-toggle',
            find: 'div.car-content',
            handlerClass: '',
            callback: 'loadcart'
        }],
        events: {
            '#search keydown': 'search',
            '#btnsearch click': 'search',
            '#collect click': 'collect',
            '#sethome click': 'sethome',
            '.imgli a click': 'share',
            '#search focus': 'validateInput',
            '#search blur': 'validateInput',
            '#categoryList mouseenter': 'showCategory',
            '#categoryList mouseleave': 'showCategory',
            '.delBtncar click': 'deletecart'
        },
        bindcart: function (data) {
            this.loadcart.call(this, G.util.bindEvent.mouseenter, this.cart, data)
        },
        loadcart: function (eventType, handler, data) {
            if (eventType == G.util.bindEvent.mouseenter && handler) {
                var that = this;
                var c = G.util.cookie.get('cart' + Model.ChannelType);
                if (data) {
                    base.loadcart = true;
                    this.loadcart.loadData.call(this, data);
                    if (data.ProductInfoList != null && data.ProductInfoList != undefined && data.ProductInfoList.length == 0) {
                        this.cartlist.hide();
                        this.cartlist.removeClass('hd-cur');
                        this.cartlist.prev().removeClass('hd-cur');
                        Model.cartlist = c
                    }
                    return false
                }
                var id = $(handler).attr('data-id');
                if (!base.loadcart || Model.cartlist != c) {
                    Model.cartlist = c;
                    base.loadcart = true;
                    G.util.ajax({
                        url: '/baseajax/getheadercart?' + Math.random() * 1000,
                        callback: function (data) {
                            that.loadcart.loadData.call(that, data)
                        },
                        error: function () {
                            that.ct.hide();
                            that.cartlist.html('<p>您还没有挑选商品 , 赶紧行动吧！</p>')
                        }
                    })
                }
            }
        }.method('loadData', function (data) {
            var that = this;

            var generateTemplate = function () {
                that.cartlist.setParam("ToPrice", G.util.toPrice);
                that.cartlist.processTemplate(data);
                Model.carts = data.cart || '';
                that.ct.show();
                if ($("#sortbtn").length > 0) {
                    G.util.refreshCartItem();
                }

                $("[data-id='cartsCount']").html($('#cartcount').html());
                setTimeout(function () {
                    var cartcounthtml = $('#cartcount').html();
                    var count = cartcounthtml ? cartcounthtml : '0';
                    that.ct.html(count);
                    $("[data-id='cartsCount']").html(count);
                }, 500);
            }

            if (!that.cartlist.hasTemplate('/themes/2016_B2C/Script/temp/cartheader.js')) {
                that.cartlist.setTemplateURL('/themes/2016_B2C/Script/temp/cartheader.js', null, {
                    filter_data: false
                }, generateTemplate)
            } else {
                generateTemplate();
            }

        }),
        showCategory: function (t, event) {
            event = event || window.event;
            if (event.type == 'mouseenter') {
                App.trigger('bind:category')
            } else if (event.type == 'mouseleave') {
                if (!$('#submenu').attr('data-type') || $('#submenu').attr('data-type') == 'hide') {
                    App.trigger('hide:category')
                }
            }
        },
        search: function (t, event) {
            var k = 0;
            if (window.event) {
                k = window.event.keyCode
            } else {
                k = event.which
            }
            if ((event.type == 'click') || (k == 13)) {
                var v = $.trim(this.sh.val());
                if (!v) {
                    return false
                }
                if (v === "请输入您要搜索的内容") {
                    return false
                }
                if (v.length > 50) {
                    G.util.alert('关键字不能大于50个字符', 0);
                    return false
                }
                //v = v.replace(new RegExp(/(\$|<|>|'|'|&|\-|%)/g), '');
                window.location.href = '/search.html?q=' + escape(v)
            }
        },
        collect: function () {
            try {
                window.external.addFavorite(window.location.href, document.title)
            } catch (e) {
                try {
                    window.sidebar.addPanel(document.title, window.location.href, "")
                } catch (e) {
                    G.util.alert("加入关注失败，请使用Ctrl+D进行添加", 0)
                }
            }
        },
        sethome: function () {
            var obj = document.getElementById('sethome'),
				vrl = window.location;
            try {
                obj.style.behavior = 'url(#default#homepage)';
                obj.setHomePage(vrl)
            } catch (e) {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                    } catch (e) {
                        G.util.alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。", 0)
                    }
                    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                    prefs.setCharPref('browser.startup.homepage', vrl)
                } else {
                    G.util.alert("您的浏览器不支持设为首页，请手动设置", 0)
                }
            }
        },
        share: function (t, event) {
            var url = $(t).attr("data-url");
            var stype = $(t).attr("data-type");
            var title = document.title;
            var content = $(t).attr('data-content') || title;
            var productUrl = window.location.href;
            var pin = '';
            var img = $(t).attr('data-img') || '';
            if (stype == 'qzone') {
                url = url + 'url=' + encodeURIComponent(productUrl) + '&title=' + encodeURIComponent(content) + '&pics=' + encodeURIComponent(img)
            }
            if (stype == 'webqzone') {
                url = url + 'url=' + productUrl + '&title=' + title + '&pic=' + img + '&desc=' + content
            }
            if (stype == 'sina') {
                url = url + '&title=' + encodeURIComponent(content) + '&pic=' + encodeURIComponent(img) + '&url=' + encodeURIComponent(productUrl) + pin;
                window.open(url, '', 'height=500, width=600')
            }
            if (stype == 'renren') {
                url = url + 'title=' + title + '&content=' + content + '&pic=' + img + '&url=' + productUrl + pin
            }
            if (stype == 'kaixing') {
                url = url + 'rtitle=' + title + '&rcontent=' + content + '&rurl=' + productUrl + pin
            }
            if (stype == 'douban') {
                url = url + 'title=' + title + '&comment=' + content + '&url=' + productUrl + pin
            }
            if (stype == 'msn') {
                url = url + 'url=' + productUrl + pin + '&title=' + title + '&description=' + content + '&screenshot=' + img
            }
            if (stype != 'sina') {
                window.open(encodeURI(url), '', 'height=500, width=600')
            }
        },
        validateInput: function (t, event) {
            var e = event || window.event;
            if (e.type == 'focusin') {
                if (!$.trim(this.sh.val()) || $.trim(this.sh.val()) === base.SearchKey) {
                    this.sh.val('')
                }
            } else {
                if (!$.trim(this.sh.val())) {
                    this.sh.val(base.SearchKey)
                }
            }
        },
        deletecart: function (t, event) {
            var id = $(t).attr('data-id');
            var pt = $(t).attr('data-paytype');
            if (pt == 2 || pt == 'point' || pt == 'Point') {
                pt = 2
            } else {
                pt = 1
            }
            if (id) {
                App.trigger('update:cart', {
                    productSysNo: id,
                    qty: 0,
                    type: 0,
                    PayType: pt
                })
                //2017版C网改版，页头购物车样式调整 chenqifeng stat
                var cartLenth = $('#cartlist').find('dd').length;
                if (cartLenth == 1) {
                    $('div.car-content').removeClass('car-content-toggle');
                }
                ////2017版C网改版，页头购物车样式调整 chenqifeng end
            }
        },
        init: function () {
            this.init.loadLogin.apply(this, arguments);
            if (this.st.val() || this.st.val() != "") {
                base.SearchKey = this.st.val();
            }
            if (!this.sh.val()) {
                this.sh.val(base.SearchKey)
            }
            this.loadcart.call(this, G.util.bindEvent.mouseenter, this.cart)
        }.method('loadLogin', function () {
            //var c = G.util.cookie.get('loginid' + Model.ChannelType);
            //var c = decodeURIComponent(G.util.cookie.get('loginid' + Model.ChannelType));
            var that = this;
            var m = Math.random() * 10000;
            //if (c && c.split(',').length == 3 && c.split(',')[2] == 1) {
            G.util.ajax({
                url: '/baseajax/loaduserinfo?' + m,
                callback: function (data) {
                    if (data) {
                        if (data.status === 1) {
                            Model.Extend(data);
                            if (Model.ChannelType == 1) {
                                $("#vipuser").hide()
                            }
                            that.ln.css({ "display": "none" });
                            that.ld.html('<span class="top-right-title"><a href="/myindex.html" target="_blank"><b>' + data.nickName + '</b><i class="icon-add"></i></a></span><div class="top-right-body"><dl><dd><a href="/myindex.html" target="_blank">账号管理</a></dd><dd><a href="/common/loginout?' + m + '" target="_blank">退出登录</a></dd></dl></div>');
                            that.ld.show();
                            //隐藏悬浮登录栏
                            $('.suspend-login').hide();
                            $('.suspendLogin').hide();
                        } else {
                        }
                    }
                }
            })
        })
    });
    new Header({
        el: $('#header')
    })
});
$(function () {
    exports.Content = Controller.create({
        elements: {
            '#submenu': 'su',
            '#userhomemenu': 'usu',
            '.product-imgbig': 'jm'
        },
        appEvents: {
            'bind:category': 'getcategory',
            'hide:category': 'hidecategory'
        },
        events: {
            '#menucata li mouseover': 'categoryOver',
            '#menucata li mouseleave': 'categoryOut',
            '#submenu mouseleave': 'hidecategory',
            '#submenu mouseenter': 'showcategory'
        },
        getcategory: function () {
            if (!base.categoryModel) {
                var that = this;
                base.categoryModel = true;
                G.util.ajax({
                    url: '/common/getcategory',
                    callback: function (data) {
                        that.su.html(data)
                    },
                    error: function () {
                        that.su.html('类别加载失败，请重试');
                        base.categoryModel = false
                    }
                })
            } else {
                this.su.show()
            }
        },
        hidecategory: function () {
            this.su.attr('data-type', 'hide');
            this.su.hide()
        },
        showcategory: function () {
            this.su.attr('data-type', 'show');
            this.su.show()
        },
        categoryOver: function (t, event) {
            var height = $(t).offset().top,
				index = $(t).index(),
				divDom = $(t).find("div").find("div").height(),
				m = $(".mc-item-sub");
            $(t).find('div').addClass('mc-item-hv').end().siblings().find('div').removeClass('mc-item-hv');
            if (index > 3) {
                if (divDom > 410 || (index + 1) * 36 < divDom) {
                    m.css("top", "10px")
                } else {
                    m.css("top", (height - divDom - 123) + "px")
                }
            } else {
                index++;
                var k = index * 36;
                if (divDom < k && index != 1) {
                    m.css("top", (height - divDom - 123) + "px")
                } else {
                    if (index == 1) {
                        m.css("top", "7px")
                    } else {
                        m.css("top", "10px")
                    }
                }
            }
            if (this.jm.css) {
                this.jm.css('float', 'none')
            }
            return false
        },
        categoryOut: function (t, event) {
            if (this.jm.css) {
                this.jm.css('float', 'left')
            }
            $(t).find('div').removeClass("mc-item-hv")
        },
        init: function () {
            if (window.location.href.split('/')[3]) {
                this.el.find('div').eq(0).prepend("<div class=\"submenu\" id=\"submenu\" style=\"position:absolute\"></div>");
                this.su = $('#submenu')
            }
            if (this.usu.html) {
                $.each(this.usu.find('a'), function () {
                    var h = $(this).attr('href').toLowerCase();
                    if (Model.Url.PathName.toLowerCase() === h) {
                        $(this).addClass('cur')
                    }
                })
            }
        }
    });
    new Content({
        el: $('#content')
    })
});
$(function () {
    exports.Common = Controller.create({
        elements: {
            '#cartlist': 'cl',
            '#cartsCount': 'ct',
            '#cartcount': 'cts',
            '#J-minicart': 'cart',
            '#userhomemenu': 'userhome'
        },
        appEvents: {
            'update:cart': 'updatecart'
        },
        events: {
            '[data-type=addcart] click': 'addCart',
            '[data-type=updatecart] click': 'addCart',
            '[data-type=MultiCart] click': 'addMultiCart',
            '[data-type=collect] click': 'productcollect',
            '[data-annual] click': 'addAnnualToCart'
        },
        updatecart: function (arg) {
            var that = this;
            G.util.ajax({
                url: '/baseajax/addcart',
                args: arg,
                callback: function (data) {
                    App.trigger('load:cartlist', data);
                    if (arg.qty > 0) {
                        if (data.status == -2) {
                            G.util.alert(data.ErrorMessage, 0);
                            $('#titlemsg').html('加入购物车失败')
                        }
                        else {
                            G.util.alert(data, data.status, function () {
                                if (location.href.indexOf('cart.html') > -1) {
                                    location.reload()
                                }
                            });
                            if ($("#sortbtn").length > 0) {
                                G.util.refreshCartshowList();
                            }
                            $('#titlemsg').html('加入购物车')
                        }
                    } else {
                        if (window.location.href.indexOf('/cart.html') >= 0) {
                            if (ajaxload) ajaxload()
                        }
                    }
                },
                error: function () {
                    G.util.alert('加入购物车失败，请重试', 0);
                    $('#titlemsg').html('加入购物车')
                }
            })
        },
        addCart: function (t, event) {
            var c = $(t).attr('data-count');
            var d = $(t).attr('data-id');
            var o = $(t).attr('data-pId');
            var a = $(t).attr('data-type');
            var pt = $(t).attr('data-paytype');
            if (pt == 2 || pt == 'point' || pt == 'Point') {
                pt = 2
            } else {
                pt = 1
            }
            var t = a == 'addcart' ? 1 : 0;
            var ISsalesMultiple = $(t).attr('data-sm');
            if (!ISsalesMultiple) ISsalesMultiple = 1;
            var count;
            if (d) {
                count = $(d).val();
                if (!(G.util.regExp.isNumber.test(count))) {
                    G.util.alert('请输入1-999的整数', 0);
                    $('#titlemsg').html('加入购物车');
                    return false
                }
            } else {
                count = c
            }
            App.trigger('update:cart', {
                productSysNo: o,
                qty: count || 1,
                type: t,
                ISsalesMultiple: ISsalesMultiple,
                paytype: pt
            })
        },
        addMultiCart: function (t, event) {
            var id = $(t).attr('data-id');
            var msg = $(t).attr('data-msg');
            var ISsalesMultiple = $(t).attr('data-sm');
            if (!ISsalesMultiple) ISsalesMultiple = 1;
            if (id) {
                G.util.ajax({
                    url: '/baseajax/addcartlist',
                    data: {
                        list: id,
                        ISsalesMultiple: ISsalesMultiple
                    },
                    success: function (data) {
                        App.trigger('load:cartlist', data);
                        G.util.alert(data, data.status);
                        $('#titlemsg').html('加入购物车')
                    },
                    error: function () {
                        G.util.alert('加入购物车失败，请重试', 2);
                        $('#titlemsg').html('加入购物车')
                    }
                })
            } else {
                if (msg) {
                    G.util.alert(msg, 0)
                }
            }
        },
        productcollect: function (t, event) {
            var id = $(t).attr("data-id");
            if (!id) {
                G.util.alert('产品编号不能为空', 0);
                return false
            }
            var params = {};
            params.productID = id;
            G.util.ajax({
                url: '/products/addfavorite',
                args: params,
                callback: function (data) {
                    if (data) {
                        switch (data.status) {
                            case 1:
                                var incart = $(t).attr("data-cart");
                                if (incart == 'InCart') {
                                    $(t).attr('data-type', '').addClass('cur').html("已关注");
                                } else if (incart == 'pointcollect') {
                                    G.util.alert(data.msg, 1);
                                } else {
                                    $(t).html("<i class='icon-collection active'></i>已关注");
                                    G.util.alert(data.msg, 1);
                                }
                                break;
                            case -1:
                                G.util.alert('您未登录，请先登录', 0, function () {
                                    var OperateType = "";
                                    if (data.OperateType != null && data.OperateType != typeof (undefined)) {
                                        OperateType = data.OperateType
                                    }
                                    var str = ""
                                    if (window.location.href.indexOf("?") != -1) {
                                        str = "&";
                                    } else {
                                        str = "?";
                                    }
                                    window.location.href = '/login.html?q=' + encodeURIComponent(window.location.href + str + 'type=' + OperateType);
                                });
                                break;
                            case -2:
                                G.util.alert(data.msg, 0);
                                break;
                            case 2:
                                G.util.alert('该商品已经关注，无需再次关注', 0);
                                break;
                            default:
                                G.util.alert('返回数据不明确', 0);
                                break
                        }
                        return false
                    }
                },
                error: function () {
                    G.util.alert('请求失败，请刷新页面后重试', 2);
                    return false
                }
            });
            return false
        },
        addAnnualToCart: function (t, event) {
            var annual = $(t).attr('data-annual');
            var cart = document.cookie.replace('deletecart', '');
            cart = cart.substring(cart.indexOf('cart' + Model.ChannelType));
            if (cart.indexOf(';') > -1) {
                cart = cart.substring(0, cart.indexOf(';'))
            }
            if (cart.indexOf(',' + annual + '_1') > -1 || cart.indexOf('=' + annual + '_1') > -1) {
                G.util.alert('商品目录只能附送一份', 0);
                return false
            }
            App.trigger('update:cart', {
                productSysNo: annual,
                qty: 1,
                type: 1,
                ISsalesMultiple: 1
            })
        },
        init: function () {
            if (this.userhome && this.userhome.find('a').size() > 0) {
                var p = window.location.pathname;
                var a = this.userhome.find('a');
                a.each(function () {
                    var l = $(this).attr('href');
                    if (l === p) {
                        $(this).addClass('on cur')
                    }
                })
            }
        }
    });
    new Common({
        el: $('body')
    })
});

function ljgm(productid) {
    G.util.ajax({
        url: '/baseajax/addcart',
        data: {
            productSysNo: productid,
            qty: 1,
            type: 1,
            isCart: 1,
            ISsalesMultiple: 1
        },
        success: function (data) {
            App.trigger('load:cartlist', data);
            G.util.alert(data, data.status);
            $('#titlemsg').html('加入购物车')
        },
        error: function () {
            G.util.alert('加入购物车失败，请重试', 2);
            $('#titlemsg').html('加入购物车')
        }
    })
};

function category3Show(i) {
    var hidePict = "hiddenA";
    var showPict = "showA";
    if ($('#category3ShowImg' + i).attr('class') == hidePict) {
        $('#category3ShowImg' + i).attr('class', showPict);
        $('#categroyList' + i).show()
    } else {
        $('#category3ShowImg' + i).attr('class', hidePict);
        $('#categroyList' + i).hide()
    }
    return false
}; /*temp.js*/
if (window.jQuery && !window.jQuery.createTemplate) {
    (function (jQuery) {
        var Template = function (s, includes, settings) {
            this._tree = [];
            this._param = {};
            this._includes = null;
            this._templates = {};
            this._templates_code = {};
            this.settings = jQuery.extend({
                disallow_functions: false,
                filter_data: true,
                filter_params: false,
                runnable_functions: false,
                clone_data: true,
                clone_params: true
            }, settings);
            this.f_cloneData = (this.settings.f_cloneData !== undefined) ? (this.settings.f_cloneData) : (TemplateUtils.cloneData);
            this.f_escapeString = (this.settings.f_escapeString !== undefined) ? (this.settings.f_escapeString) : (TemplateUtils.escapeHTML);
            this.f_parseJSON = (this.settings.f_parseJSON !== undefined) ? (this.settings.f_parseJSON) : ((this.settings.disallow_functions) ? (jQuery.parseJSON) : (TemplateUtils.parseJSON));
            if (s == null) {
                return
            }
            this.splitTemplates(s, includes);
            if (s) {
                this.setTemplate(this._templates_code['MAIN'], includes, this.settings)
            }
            this._templates_code = null
        };
        Template.version = '0.8.2';
        Template.DEBUG_MODE = false;
        Template.FOREACH_LOOP_LIMIT = 10000;
        Template.guid = 0;
        Template.prototype.splitTemplates = function (s, includes) {
            var reg = /\{#template *(\w+) *(.*?) *\}/g;
            var iter, tname, se;
            var lastIndex = null;
            var _template_settings = [];
            while ((iter = reg.exec(s)) != null) {
                lastIndex = reg.lastIndex;
                tname = iter[1];
                se = s.indexOf('{#/template ' + tname + '}', lastIndex);
                if (se == -1) {
                    throw new Error('jTemplates: Template "' + tname + '" is not closed.')
                }
                this._templates_code[tname] = s.substring(lastIndex, se);
                _template_settings[tname] = TemplateUtils.optionToObject(iter[2])
            }
            if (lastIndex === null) {
                this._templates_code['MAIN'] = s;
                return
            }
            for (var i in this._templates_code) {
                if (i != 'MAIN') {
                    this._templates[i] = new Template()
                }
            }
            for (var i in this._templates_code) {
                if (i != 'MAIN') {
                    this._templates[i].setTemplate(this._templates_code[i], jQuery.extend({}, includes || {}, this._templates || {}), jQuery.extend({}, this.settings, _template_settings[i]));
                    this._templates_code[i] = null
                }
            }
        };
        Template.prototype.setTemplate = function (s, includes, settings) {
            if (s == undefined) {
                this._tree.push(new TextNode('', 1, this));
                return
            }
            s = s.replace(/[\n\r]/g, '');
            s = s.replace(/\{\*.*?\*\}/g, '');
            this._includes = jQuery.extend({}, this._templates || {}, includes || {}), this.settings = new Object(settings);
            var node = this._tree;
            var op = s.match(/\{#.*?\}/g);
            var ss = 0,
				se = 0;
            var e;
            var literalMode = 0;
            var elseif_level = 0;
            for (var i = 0, l = (op) ? (op.length) : (0) ; i < l; ++i) {
                var this_op = op[i];
                if (literalMode) {
                    se = s.indexOf('{#/literal}');
                    if (se == -1) {
                        throw new Error("jTemplates: No end of literal.")
                    }
                    if (se > ss) {
                        node.push(new TextNode(s.substring(ss, se), 1, this))
                    }
                    ss = se + 11;
                    literalMode = 0;
                    i = jQuery.inArray('{#/literal}', op);
                    continue
                }
                se = s.indexOf(this_op, ss);
                if (se > ss) {
                    node.push(new TextNode(s.substring(ss, se), literalMode, this))
                }
                var ppp = this_op.match(/\{#([\w\/]+).*?\}/);
                var op_ = RegExp.$1;
                switch (op_) {
                    case 'elseif':
                        ++elseif_level;
                        node.switchToElse();
                    case 'if':
                        e = new opIF(this_op, node, this);
                        node.push(e);
                        node = e;
                        break;
                    case 'else':
                        node.switchToElse();
                        break;
                    case '/if':
                        while (elseif_level) {
                            node = node.getParent();
                            --elseif_level
                        }
                    case '/for':
                    case '/foreach':
                        node = node.getParent();
                        break;
                    case 'foreach':
                        e = new opFOREACH(this_op, node, this);
                        node.push(e);
                        node = e;
                        break;
                    case 'for':
                        e = opFORFactory(this_op, node, this);
                        node.push(e);
                        node = e;
                        break;
                    case 'continue':
                    case 'break':
                        node.push(new JTException(op_));
                        break;
                    case 'include':
                        node.push(new Include(this_op, this._includes, this));
                        break;
                    case 'var':
                        node.push(new UserParam(this_op, this));
                        break;
                    case 'arg':
                        node.push(new UserVariable(this_op, this));
                        break;
                    case 'cycle':
                        node.push(new Cycle(this_op));
                        break;
                    case 'ldelim':
                        node.push(new TextNode('{', 1, this));
                        break;
                    case 'rdelim':
                        node.push(new TextNode('}', 1, this));
                        break;
                    case 'literal':
                        literalMode = 1;
                        break;
                    case '/literal':
                        if (Template.DEBUG_MODE) {
                            throw new Error("jTemplates: Missing begin of literal.")
                        }
                        break;
                    default:
                        if (Template.DEBUG_MODE) {
                            throw new Error('jTemplates: unknown tag: ' + op_ + '.')
                        }
                }
                ss = se + this_op.length
            }
            if (s.length > ss) {
                node.push(new TextNode(s.substr(ss), literalMode, this))
            }
        };
        Template.prototype.get = function (d, param, element, deep) {
            ++deep;
            if (deep == 1 && element != undefined) {
                jQuery.removeData(element, "jTemplatesRef")
            }
            var $T = d,
				$P;
            if (this.settings.clone_data) {
                $T = this.f_cloneData(d, {
                    escapeData: (this.settings.filter_data && deep == 1),
                    noFunc: this.settings.disallow_functions
                }, this.f_escapeString)
            }
            if (!this.settings.clone_params) {
                $P = jQuery.extend({}, this._param, param)
            } else {
                $P = jQuery.extend({}, this.f_cloneData(this._param, {
                    escapeData: (this.settings.filter_params),
                    noFunc: false
                }, this.f_escapeString), this.f_cloneData(param, {
                    escapeData: (this.settings.filter_params && deep == 1),
                    noFunc: false
                }, this.f_escapeString))
            }
            var ret = '';
            for (var i = 0, l = this._tree.length; i < l; ++i) {
                ret += this._tree[i].get($T, $P, element, deep)
            }
            this.EvalObj = null;
            --deep;
            return ret
        };
        Template.prototype.getBin = function () {
            if (this.EvalObj == null) this.EvalObj = new EvalClass(this);
            return this.EvalObj
        };
        Template.prototype.setParam = function (name, value) {
            this._param[name] = value
        };
        TemplateUtils = function () { };
        TemplateUtils.escapeHTML = function (txt) {
            return txt.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
        };
        TemplateUtils.cloneData = function (d, filter, f_escapeString) {
            if (d == null) {
                return d
            }
            switch (d.constructor) {
                case Object:
                    var o = {};
                    for (var i in d) {
                        o[i] = TemplateUtils.cloneData(d[i], filter, f_escapeString)
                    }
                    if (!filter.noFunc) {
                        if (d.hasOwnProperty("toString")) o.toString = d.toString
                    }
                    return o;
                case Array:
                    var o = [];
                    for (var i = 0, l = d.length; i < l; ++i) {
                        o[i] = TemplateUtils.cloneData(d[i], filter, f_escapeString)
                    }
                    return o;
                case String:
                    return (filter.escapeData) ? (f_escapeString(d)) : (d);
                case Function:
                    if (filter.noFunc) {
                        if (Template.DEBUG_MODE) throw new Error("jTemplates: Functions are not allowed.");
                        else return undefined
                    }
                default:
                    return d
            }
        };
        TemplateUtils.optionToObject = function (optionText) {
            if (optionText === null || optionText === undefined) {
                return {}
            }
            var o = optionText.split(/[= ]/);
            if (o[0] === '') {
                o.shift()
            }
            var obj = {};
            for (var i = 0, l = o.length; i < l; i += 2) {
                obj[o[i]] = o[i + 1]
            }
            return obj
        };
        TemplateUtils.parseJSON = function (data) {
            if (typeof data !== "string" || !data) {
                return null
            }
            try {
                return (new Function("return " + jQuery.trim(data)))()
            } catch (e) {
                if (Template.DEBUG_MODE) {
                    throw new Error("jTemplates: Invalid JSON")
                }
                return {}
            }
        };
        TemplateUtils.ReturnRefValue = function (el, guid, id) {
            while (el != null) {
                var d = jQuery.data(el, 'jTemplatesRef');
                if (d != undefined && d.guid == guid && d.d[id] != undefined) {
                    return d.d[id]
                }
                el = el.parentNode
            }
            return null
        };
        var TextNode = function (val, literalMode, template) {
            this._value = val;
            this._literalMode = literalMode;
            this._template = template
        };
        TextNode.prototype.get = function (d, param, element, deep) {
            if (this._literalMode) {
                return this._value
            }
            var s = this._value;
            var result = "";
            var i = -1;
            var nested = 0;
            var sText = -1;
            var sExpr = 0;
            while (true) {
                var lm = s.indexOf("{", i + 1);
                var rm = s.indexOf("}", i + 1);
                if (lm < 0 && rm < 0) {
                    break
                }
                if ((lm != -1 && lm < rm) || (rm == -1)) {
                    i = lm;
                    if (++nested == 1) {
                        sText = lm;
                        result += s.substring(sExpr, i);
                        sExpr = -1
                    }
                } else {
                    i = rm;
                    if (--nested === 0) {
                        if (sText >= 0) {
                            var key = s.substring(sText, rm + 1);
                            if (key.indexOf("$P.") == -1 && key.indexOf("$T.") == -1) {
                                if (key.indexOf("{$") == -1) {
                                    key = key.replace("{", "{$T.")
                                } else {
                                    key = key.replace("{$", "{$T.")
                                }
                            }
                            result += this._template.getBin().evaluateContent(d, param, element, key);
                            sText = -1;
                            sExpr = i + 1
                        }
                    } else if (nested < 0) {
                        nested = 0
                    }
                }
            }
            if (sExpr > -1) {
                result += s.substr(sExpr)
            }
            return result
        };
        EvalClass = function (t) {
            this.__templ = t
        };
        EvalClass.prototype.evaluateContent = function ($T, $P, $Q, __value) {
            try {
                var result = eval(__value);
                if (jQuery.isFunction(result)) {
                    if (this.__templ.settings.disallow_functions || !this.__templ.settings.runnable_functions) {
                        return ''
                    }
                    result = result($T, $P, $Q)
                }
                return (result === undefined) ? ("") : (String(result))
            } catch (e) {
                if (Template.DEBUG_MODE) {
                    if (e instanceof JTException) {
                        e.type = "subtemplate"
                    }
                    throw e
                }
                return ""
            }
        };
        EvalClass.prototype.evaluate = function ($T, $P, $Q, __value) {
            return eval(__value)
        };
        var opIF = function (oper, par, templ) {
            this._parent = par;
            oper.match(/\{#(?:else)*if (.*?)\}/);
            this._cond = RegExp.$1;
            this._onTrue = [];
            this._onFalse = [];
            this._currentState = this._onTrue;
            this._templ = templ
        };
        opIF.prototype.push = function (e) {
            this._currentState.push(e)
        };
        opIF.prototype.getParent = function () {
            return this._parent
        };
        opIF.prototype.switchToElse = function () {
            this._currentState = this._onFalse
        };
        opIF.prototype.get = function (d, param, element, deep) {
            var ret = '';
            try {
                var arr = (this._templ.getBin().evaluate(d, param, element, this._cond)) ? (this._onTrue) : (this._onFalse);
                for (var i = 0, l = arr.length; i < l; ++i) {
                    ret += arr[i].get(d, param, element, deep)
                }
            } catch (e) {
                if (Template.DEBUG_MODE || (e instanceof JTException)) {
                    throw e
                }
            }
            return ret
        };
        opFORFactory = function (oper, par, template) {
            if (oper.match(/\{#for (\w+?) *= *(\S+?) +to +(\S+?) *(?:step=(\S+?))*\}/)) {
                var f = new opFOREACH(null, par, template);
                f._name = RegExp.$1;
                f._option = {
                    'begin': (RegExp.$2 || 0),
                    'end': (RegExp.$3 || -1),
                    'step': (RegExp.$4 || 1),
                    'extData': '$T'
                };
                f._runFunc = (function (i) {
                    return i
                });
                return f
            } else {
                throw new Error('jTemplates: Operator failed "find": ' + oper)
            }
        };
        var opFOREACH = function (oper, par, template) {
            this._parent = par;
            this._template = template;
            if (oper != null) {
                var isNew = false;
                if (oper.indexOf(" in ") > 0) {
                    isNew = true;
                    oper.match(/\{#foreach +(.+?) +in +(\w+?)( .+)*\}/)
                } else {
                    oper.match(/\{#foreach +(.+?) +as +(\w+?)( .+)*\}/)
                }
                this._arg = isNew ? RegExp.$2 : RegExp.$1;
                if (this._arg.indexOf("$T.") == -1 && this._arg != "$T") {
                    if (this._arg.indexOf("$") == -1) {
                        this._arg = "$T." + this._arg
                    } else {
                        this._arg = this._arg.replace("$", "$T.")
                    }
                }
                this._name = isNew ? RegExp.$1 : RegExp.$2;
                this._option = RegExp.$3 || null;
                this._option = TemplateUtils.optionToObject(this._option)
            }
            this._onTrue = [];
            this._onFalse = [];
            this._currentState = this._onTrue
        };
        opFOREACH.prototype.push = function (e) {
            this._currentState.push(e)
        };
        opFOREACH.prototype.getParent = function () {
            return this._parent
        };
        opFOREACH.prototype.switchToElse = function () {
            this._currentState = this._onFalse
        };
        opFOREACH.prototype.get = function (d, param, element, deep) {
            try {
                var fcount = (this._runFunc === undefined) ? (this._template.getBin().evaluate(d, param, element, this._arg)) : (this._runFunc);
                if (fcount === $) {
                    throw new Error("jTemplate: Variable '$' cannot be used as loop-function")
                }
                var key = [];
                var mode = typeof fcount;
                if (mode == 'object') {
                    var arr = [];
                    jQuery.each(fcount, function (k, v) {
                        key.push(k);
                        arr.push(v)
                    });
                    fcount = arr
                }
                var extData = (this._option.extData !== undefined) ? (this._template.getBin().evaluate(d, param, element, this._option.extData)) : ((d != null) ? (d) : ({}));
                if (extData == null) {
                    extData = {}
                }
                var s = Number(this._template.getBin().evaluate(d, param, element, this._option.begin) || 0),
					e;
                var step = Number(this._template.getBin().evaluate(d, param, element, this._option.step) || 1);
                if (mode != 'function') {
                    e = fcount.length
                } else {
                    if (this._option.end === undefined || this._option.end === null) {
                        e = Number.MAX_VALUE
                    } else {
                        e = Number(this._template.getBin().evaluate(d, param, element, this._option.end)) + ((step > 0) ? (1) : (-1))
                    }
                }
                var ret = '';
                var i, l;
                if (this._option.count) {
                    var tmp = s + Number(this._template.getBin().evaluate(d, param, element, this._option.count));
                    e = (tmp > e) ? (e) : (tmp)
                }
                if ((e > s && step > 0) || (e < s && step < 0)) {
                    var iteration = 0;
                    var _total = (mode != 'function') ? (Math.ceil((e - s) / step)) : undefined;
                    var ckey, cval;
                    var loopCounter = 0;
                    for (;
					((step > 0) ? (s < e) : (s > e)) ; s += step, ++iteration, ++loopCounter) {
                        if (Template.DEBUG_MODE && loopCounter > Template.FOREACH_LOOP_LIMIT) {
                            throw new Error("jTemplate: Foreach loop limit was exceed")
                        }
                        ckey = key[s];
                        if (mode != 'function') {
                            cval = fcount[s]
                        } else {
                            cval = fcount(s);
                            if (cval === undefined || cval === null) {
                                break
                            }
                        }
                        if ((typeof cval == 'function') && (this._template.settings.disallow_functions || !this._template.settings.runnable_functions)) {
                            continue
                        }
                        if ((mode == 'object') && (ckey in Object) && (cval === Object[ckey])) {
                            continue
                        }
                        var prevValue = extData[this._name];
                        extData[this._name] = cval;
                        extData[this._name + '$index'] = s;
                        extData[this._name + '$iteration'] = iteration;
                        extData[this._name + '$first'] = (iteration == 0);
                        extData[this._name + '$last'] = (s + step >= e);
                        extData[this._name + '$total'] = _total;
                        extData[this._name + '$key'] = (ckey !== undefined && ckey.constructor == String) ? (this._template.f_escapeString(ckey)) : (ckey);
                        extData[this._name + '$typeof'] = typeof cval;
                        for (i = 0, l = this._onTrue.length; i < l; ++i) {
                            try {
                                ret += this._onTrue[i].get(extData, param, element, deep)
                            } catch (ex) {
                                if (ex instanceof JTException) {
                                    switch (ex.type) {
                                        case 'continue':
                                            i = l;
                                            break;
                                        case 'break':
                                            i = l;
                                            s = e;
                                            break;
                                        default:
                                            throw ex
                                    }
                                } else {
                                    throw ex
                                }
                            }
                        }
                        delete extData[this._name + '$index'];
                        delete extData[this._name + '$iteration'];
                        delete extData[this._name + '$first'];
                        delete extData[this._name + '$last'];
                        delete extData[this._name + '$total'];
                        delete extData[this._name + '$key'];
                        delete extData[this._name + '$typeof'];
                        delete extData[this._name];
                        extData[this._name] = prevValue
                    }
                } else {
                    for (i = 0, l = this._onFalse.length; i < l; ++i) {
                        ret += this._onFalse[i].get(d, param, element, deep)
                    }
                }
                return ret
            } catch (e) {
                if (Template.DEBUG_MODE || (e instanceof JTException)) {
                    throw e
                }
                return ""
            }
        };
        var JTException = function (type) {
            this.type = type
        };
        JTException.prototype = Error;
        JTException.prototype.get = function (d) {
            throw this
        };
        var Include = function (oper, includes, templ) {
            oper.match(/\{#include (.*?)(?: root=(.*?))?\}/);
            this._template = includes[RegExp.$1];
            if (this._template == undefined) {
                if (Template.DEBUG_MODE) throw new Error('jTemplates: Cannot find include: ' + RegExp.$1)
            }
            this._root = RegExp.$2;
            if (this._root != "$T" && this._root.indexOf("$T") == -1) {
                this._root = "$T." + this._root
            }
            this._mainTempl = templ
        };
        Include.prototype.get = function (d, param, element, deep) {
            try {
                return this._template.get(this._mainTempl.getBin().evaluate(d, param, element, this._root), param, element, deep)
            } catch (e) {
                if (Template.DEBUG_MODE || (e instanceof JTException)) {
                    throw e
                }
            }
            return ''
        };
        var UserParam = function (oper, templ) {
            oper.match(/\{#var (\w*?)=(.*?)\}/);
            this._name = RegExp.$1;
            this._value = RegExp.$2;
            this._templ = templ
        };
        UserParam.prototype.get = function (d, param, element, deep) {
            try {
                param[this._name] = this._templ.getBin().evaluate(d, param, element, this._value)
            } catch (e) {
                if (Template.DEBUG_MODE || (e instanceof JTException)) {
                    throw e
                }
                param[this._name] = undefined
            }
            return ''
        };
        var UserVariable = function (oper, templ) {
            oper.match(/\{#arg (.*?)\}/);
            this._id = RegExp.$1;
            this._templ = templ
        };
        UserVariable.prototype.get = function (d, param, element, deep) {
            try {
                if (element == undefined) {
                    return ""
                }
                var obj = this._templ.getBin().evaluate(d, param, element, this._id);
                var refobj = jQuery.data(element, "jTemplatesRef");
                if (refobj == undefined) {
                    refobj = {
                        guid: ++Template.guid,
                        d: []
                    }
                }
                var i = refobj.d.push(obj);
                jQuery.data(element, "jTemplatesRef", refobj);
                return "(TemplateUtils.ReturnRefValue(this," + refobj.guid + "," + (i - 1) + "))"
            } catch (e) {
                if (Template.DEBUG_MODE || (e instanceof JTException)) {
                    throw e
                }
                return ''
            }
        };
        var Cycle = function (oper) {
            oper.match(/\{#cycle values=(.*?)\}/);
            this._values = eval(RegExp.$1);
            this._length = this._values.length;
            if (this._length <= 0) {
                throw new Error('jTemplates: no elements for cycle')
            }
            this._index = 0;
            this._lastSessionID = -1
        };
        Cycle.prototype.get = function (d, param, element, deep) {
            var sid = jQuery.data(element, 'jTemplateSID');
            if (sid != this._lastSessionID) {
                this._lastSessionID = sid;
                this._index = 0
            }
            var i = this._index++ % this._length;
            return this._values[i]
        };
        jQuery.fn.setTemplate = function (s, includes, settings) {
            if (s.constructor === Template) {
                return jQuery(this).each(function () {
                    jQuery.data(this, 'jTemplate', s);
                    jQuery.data(this, 'jTemplateSID', 0)
                })
            } else {
                return jQuery(this).each(function () {
                    jQuery.data(this, 'jTemplate', new Template(s, includes, settings));
                    jQuery.data(this, 'jTemplateSID', 0)
                })
            }
        };
        jQuery.fn.setTemplateURL = function (url_, includes, settings, fun) {
            var that = this;
            jQuery.ajax({
                url: url_,
                dataType: 'text',
                async: true,
                type: 'GET',
                success: function (s) {
                    jQuery(that).setTemplate(s, includes, settings);

                    if (fun) {
                        fun.apply(arguments);
                    }
                }
            });
        };
        jQuery.fn.setTemplateElement = function (elementName, includes, settings) {
            var s = jQuery('#' + elementName).val();
            if (s == null) {
                s = jQuery('#' + elementName).html();
                s = s.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }
            s = jQuery.trim(s);
            s = s.replace(/^<\!\[CDATA\[([\s\S]*)\]\]>$/im, '$1');
            s = s.replace(/^<\!--([\s\S]*)-->$/im, '$1');
            return jQuery(this).setTemplate(s, includes, settings)
        };
        jQuery.fn.hasTemplate = function () {
            var count = 0;
            jQuery(this).each(function () {
                if (jQuery.getTemplate(this)) {
                    ++count
                }
            });
            return count
        };
        jQuery.fn.removeTemplate = function () {
            jQuery(this).processTemplateStop();
            return jQuery(this).each(function () {
                jQuery.removeData(this, 'jTemplate')
            })
        };
        jQuery.fn.setParam = function (name, value) {
            return jQuery(this).each(function () {
                var t = jQuery.getTemplate(this);
                if (t === undefined) {
                    if (Template.DEBUG_MODE) throw new Error('jTemplates: Template is not defined.');
                    else return
                }
                t.setParam(name, value)
            })
        };
        jQuery.fn.processTemplate = function (d, param, options) {
            return jQuery(this).each(function () {
                var t = jQuery.getTemplate(this);
                if (t === undefined) {
                    if (Template.DEBUG_MODE) throw new Error('jTemplates: Template is not defined.');
                    else return
                }
                if (options != undefined && options.StrToJSON) {
                    d = t.f_parseJSON(d)
                }
                jQuery.data(this, 'jTemplateSID', jQuery.data(this, 'jTemplateSID') + 1);
                jQuery(this).html(t.get(d, param, this, 0))
            })
        };
        jQuery.fn.processTemplateURL = function (url_, param, options) {
            var that = this;
            var o = jQuery.extend({
                cache: false
            }, jQuery.ajaxSettings);
            o = jQuery.extend(o, options);
            jQuery.ajax({
                url: url_,
                type: o.type,
                data: o.data,
                dataFilter: o.dataFilter,
                async: o.async,
                cache: o.cache,
                timeout: o.timeout,
                dataType: 'text',
                success: function (d) {
                    var r = jQuery(that).processTemplate(d, param, {
                        StrToJSON: true
                    });
                    if (o.on_success) {
                        o.on_success(r)
                    }
                },
                error: o.on_error,
                complete: o.on_complete
            });
            return this
        };
        var Updater = function (url, param, interval, args, objs, options) {
            this._url = url;
            this._param = param;
            this._interval = interval;
            this._args = args;
            this.objs = objs;
            this.timer = null;
            this._options = options || {};
            var that = this;
            jQuery(objs).each(function () {
                jQuery.data(this, 'jTemplateUpdater', that)
            });
            this.run()
        };
        Updater.prototype.run = function () {
            this.detectDeletedNodes();
            if (this.objs.length == 0) {
                return
            }
            var that = this;
            jQuery.ajax({
                url: this._url,
                dataType: 'text',
                data: this._args,
                cache: false,
                success: function (d) {
                    try {
                        var r = jQuery(that.objs).processTemplate(d, that._param, {
                            StrToJSON: true
                        });
                        if (that._options.on_success) {
                            that._options.on_success(r)
                        }
                    } catch (ex) { }
                }
            });
            this.timer = setTimeout(function () {
                that.run()
            }, this._interval)
        };
        Updater.prototype.detectDeletedNodes = function () {
            this.objs = jQuery.grep(this.objs, function (o) {
                if (jQuery.browser.msie) {
                    var n = o.parentNode;
                    while (n && n != document) {
                        n = n.parentNode
                    }
                    return n != null
                } else {
                    return o.parentNode != null
                }
            })
        };
        jQuery.fn.processTemplateStart = function (url, param, interval, args, options) {
            return new Updater(url, param, interval, args, this, options)
        };
        jQuery.fn.processTemplateStop = function () {
            return jQuery(this).each(function () {
                var updater = jQuery.data(this, 'jTemplateUpdater');
                if (updater == null) {
                    return
                }
                var that = this;
                updater.objs = jQuery.grep(updater.objs, function (o) {
                    return o != that
                });
                jQuery.removeData(this, 'jTemplateUpdater')
            })
        };
        jQuery.extend({
            createTemplate: function (s, includes, settings) {
                return new Template(s, includes, settings)
            },
            createTemplateURL: function (url_, includes, settings) {
                var s = jQuery.ajax({
                    url: url_,
                    dataType: 'text',
                    async: false,
                    type: 'GET'
                }).responseText;
                return new Template(s, includes, settings)
            },
            getTemplate: function (element) {
                return jQuery.data(element, 'jTemplate')
            },
            processTemplateToText: function (template, data, parameter) {
                return template.get(data, parameter, undefined, 0)
            },
            jTemplatesDebugMode: function (value) {
                Template.DEBUG_MODE = value
            }
        })
    })(jQuery)
}; /*Statitics.js*/
$(function () {
    $('[data-SpotID]').click(function () {
        var url = document.URL.replace(/http:\/\//g, '');
        var preurl = document.referrer.replace(/http:\/\//g, '');
        $.post('/Statistics', {
            SpotID: $(this).attr('data-SpotID'),
            url: url,
            preurl: preurl
        })
    })
});
$(function () {
    var url = document.URL;
    var preurl = document.referrer;
    var isOut = false;
    if (document.referrer && document.referrer.length > 0 && document.referrer.indexOf('colipu') < 0 && document.referrer.indexOf('localhost') < 0) {
        isOut = true
    }
    $.post('/Statistics/From', {
        isOut: isOut,
        url: document.URL.replace(/http:\/\//g, ''),
        preurl: document.referrer.replace(/http:\/\//g, '')
    })
});

/*#6587 添加流量统计*/
$((function (param) {
    var c = { query: [], args: param || {} };
    c.query.push(["_setAccount", "124"]);
    (window.__zpSMConfig = window.__zpSMConfig || []).push(c);
    var zp = document.createElement("script");
    zp.type = "text/javascript";
    zp.async = true;
    zp.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(zp, s);
    window.__zp_tag_params;
})
);

// #8302 C网改版之大/中/小类 Add by weihuan20160914 获取关注的商品编号
$(function () {
    //页面没有关注功能直接退出   非大中小类及详情页不走此逻辑
    if ($("[data-type='collect']").length == 0) {
        return;
    } else {
        if ($("[data-cart='InCart']").length > 0 || $("[data-cart='pointcollect']").length > 0) {
            return;
        }
    }

    //将data-id添加到数组
    var goodsID = [];
    $("[data-type='collect']").each(function () {
        var d = $(this).attr("data-id");
        goodsID.push(d);
    });

    $.get("/BaseAjax/MyfavorAll/" + goodsID.toString(), null, function (data) {
        if ($.isArray(data)) {
            $.each(data, function (idx, item) {
                $("[data-id=" + item.SysNo + "][data-type='collect']").html("<i class='icon-collection active'></i>已关注");
            });
        }
    });
})

$(function () {
    //优惠券领取
    $("[data-type='coupon']").click(function () {
        var bNo = parseInt($(this).attr('data-batchNo'));
        var couponName = $(this).attr('data-cname');
        G.util.ajax({
            url: '/BaseAjax/CouponsPickUp',
            data: { batchNo: bNo, batchName: couponName },
            success: function (data) {
                if (data.status == -1) {
                    G.util.alert(data.msg, -1, function () {
                        window.location.href = '/login.html?q=' + encodeURIComponent(window.location.href);
                    });

                } else if (data.status == -2) {
                    G.util.alert(data.msg, -1);
                } else if (data.status == -3) {
                    G.util.alert(data.msg, -1);
                } else if (data.status == 1) {
                    G.util.alert(data.msg, 1);
                    $("#confirm_btn").html("立即查看");
                    $("#confirm_btn").click(function () {
                        window.location.href = "/mycoupon.html"
                    })
                    
                } else {
                    G.util.alert(data.msg, -1);
                }

            },
            error: function () {
                G.util.alert('领取失败，请重试', -1);
            }
        })
    });

})