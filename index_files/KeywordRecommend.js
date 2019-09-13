/*
*Des.:搜索关键字智能提醒 
*Author:张茂松 
*Date:2016/03/17
*/

var KeywordRecommend = function (params) {
    this.params = params;
    this.ajaxUrl = this.params.searchSite + "API/SearchKeyWordStatistics";
    this.searchUrl = this.params.searchSite + "Search.html";
    this.vipSearchUrl = this.params.searchSite + "VipSearch.html";
    this.elements = {
        searchInput: $('#search'), /*搜索输入框*/
        btnsearch: $('#btnsearch'), /*搜索按钮*/
        searchContainer: $('#searchResult'), /*推荐容器*/
        keyWordsContainer: $('#keyWordsContainer'), /*推荐关键字容器*/
        closeSearchResult: $('#CloseSearchResult') /*推荐容器的关闭按钮*/
    };

    if (params.elements) {
        $.extend(this.elements, params.elements);
    }

    this.KEY = {
        Left: 37,
        UP: 38,
        Right: 39,
        DOWN: 40,
        ENTER: 13
    };

    this.itemIndex = 0;
    this.itemCount = 10;
    this.words = null; //new 关键字
    this.oldWords = null; //old 关键字 
    this.isMouseOnTip = false;
    this.hasKeywords = false; //包含推荐关键字
}

//初始化
KeywordRecommend.prototype.inital = function () {
    this.elements.searchInput.unbind('keydown')
        .keydown($.proxy(this.searchInputKeyDown, this));
    //this.elements.searchInput.keyup($.proxy(this.searchInputKeyUp, this));
    this.elements.searchInput.focus($.proxy(this.show, this));
    this.elements.searchInput.blur($.proxy(this.hide, this));
    this.elements.searchInput.bind('input propertychange', $.proxy(this.show, this));

    this.elements.searchContainer.mouseleave($.proxy(function () {
        this.isMouseOnTip = false;
        this.elements.searchInput.trigger('blur');
    }, this));
    this.elements.closeSearchResult.click($.proxy(function () {
        this.isMouseOnTip = false;
        this.elements.searchInput.trigger('blur');
    }, this));
}

/*get keywords*/
KeywordRecommend.prototype.get = function () {
    if (!this.words) {
        return;
    }

    //ajax
    $.ajax({
        type: "GET",
        url: this.ajaxUrl,
        cache: true,
        data: {
            word: this.words,
            channelType: this.params.channelType,
            takeNum: this.itemCount
        },
        dataType: "jsonp",
        success: $.proxy(function (data) {
            this.oldWords = this.words;
            this.elements.keyWordsContainer.empty();
            if (data && data.length > 0) {
                this.hasKeywords = true;
                //渲染html
                this.generateHtml(data);
            } else {
                this.hasKeywords = false;
                this.hide();
            }
        }, this)
    });
}

/*生成html*/
KeywordRecommend.prototype.generateHtml = function (data) {
    $.each(data, $.proxy(function (i, row) {
        this.elements.keyWordsContainer
            .append(this.nano(this.params.keywordTemplate, row));
    }, this));

    //监听
    this.addListener();
    this.show();
}

/*监听获取的推荐关键字行事件*/
KeywordRecommend.prototype.addListener = function () {
    var _self = this;
    //console.log(this.elements.keyWordsContainer.children());
    this.elements.keyWordsContainer.children()
        .click(function () {
            //console.log(1);
            //debugger;
            _self.words = $.trim($(this).attr('data-value'));
            _self.search();
        });
    this.elements.searchContainer
        .mouseover($.proxy(function () {
            this.isMouseOnTip = true;
        }, this))
        .mouseleave($.proxy(function () {
            this.isMouseOnTip = false;
        }, this));
}

/*Nano Templates*/
KeywordRecommend.prototype.nano = function (template, data) {
    var _regex = /\{([\w\.]*)\}/g;
    return template.replace(_regex, function (str, key) {
        var keys = key.split('.'), value = data[keys.shift()];
        $.each(keys, function () { value = value[this]; });
        return (value === null || value === undefined) ? '' : value;
    });
}

/*显示关键字提醒*/
KeywordRecommend.prototype.show = function () {
    this.itemIndex = -1; //重置默认选中的关键字行
    this.elements.keyWordsContainer.children().css("backgroundColor", "");
    this.words = $.trim(this.elements.searchInput.val());
    if (this.hasKeywords) {
        //包含推荐关键字才能显示推荐的同期
        this.elements.searchContainer.show();
    }
    if (this.words === this.oldWords) {
        return;
    }
    //异步获取数据前，先隐藏提示框，有数据时才显示
    this.elements.searchContainer.hide();
    this.get();
}

/*隐藏关键字提醒*/
KeywordRecommend.prototype.hide = function () {
    if (!this.isMouseOnTip) {
        this.elements.searchContainer.delay(2000).hide();
    }
}


/*输入框输入时*/
KeywordRecommend.prototype.searchInputKeyDown = function (e) {
    //this.keyDownVal = $.trim(this.elements.searchInput.val());
    var keycode = e.which;
    //↑和↓操作时，做出来，其他操作返回
    if (keycode !== this.KEY.UP
        && keycode !== this.KEY.DOWN) {
        return;
    }

    var allItems = this.elements.keyWordsContainer.children();
    var itemslength = allItems.length;
    this.isMouseOnTip = true;
    if (keycode === this.KEY.DOWN) {
        if (this.itemIndex < itemslength - 1) {
            this.itemIndex++;
        } else {
            this.itemIndex = 0;
        }
    } else if (keycode === this.KEY.UP) {
        if (this.itemIndex > 0) {
            this.itemIndex--;
        } else {
            this.itemIndex = itemslength - 1;
        }
    }
    allItems.each($.proxy(function (i, item) {
        if (this.itemIndex === i) {
            $(item).css("backgroundColor", '#eee');
            this.elements.searchInput.val($(item).attr('data-value'));
        } else
            $(item).css("backgroundColor", "");
    }, this));


    //this.keyUpVal = $.trim(this.elements.searchInput.val());
    var keycode = e.which;
    if (keycode !== this.KEY.UP
        && keycode !== this.KEY.DOWN
        && keycode !== this.KEY.Left
        && keycode !== this.KEY.Right) {
        this.show();
    }

    if (keycode === this.KEY.ENTER) {
        this.search();
        return;
    }
}

/*输入框输入完成时*/
//KeywordRecommend.prototype.searchInputKeyUp = function (e) {
//    console.log('Up');
//    this.keyUpVal = $.trim(this.elements.searchInput.val());
//    var keycode = e.which;
//    if (keycode !== this.KEY.UP
//        && keycode !== this.KEY.DOWN
//        && keycode !== this.KEY.Left
//        && keycode !== this.KEY.Right) {
//        this.show();
//    }

//    if (keycode === this.KEY.ENTER
//        && this.keyUpVal === this.keyDownVal) {
//        this.search();
//        return;
//    }
//}



/*搜索*/
KeywordRecommend.prototype.search = function () {
    if (!this.words) {
        return;
    }
    if (this.params.channelType == "1") {
        location.href = this.searchUrl + "?q=" + escape(this.words);
    } else if (this.params.channelType == "2") {
        location.href = this.vipSearchUrl + "?q=" + escape(this.words);
    }
    return false;
}