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
};