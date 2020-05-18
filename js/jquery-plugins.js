/* backgroundPosition */
(function ($) {
    if (!document.defaultView || !document.defaultView.getComputedStyle) {
        var oldCurCSS = $.curCSS;
        $.curCSS = function (elem, name, force) {
            if (name === 'background-position') {
                name = 'backgroundPosition';
            }
            if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
                return oldCurCSS.apply(this, arguments);
            }
            var style = elem.style;
            if (!force && style && style[name]) {
                return style[name];
            }
            return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
        };
    }
    var oldAnim = $.fn.animate;
    $.fn.animate = function (prop) {
        if ('background-position' in prop) {
            prop.backgroundPosition = prop['background-position'];
            delete prop['background-position'];
        }
        if ('backgroundPosition' in prop) {
            prop.backgroundPosition = '(' + prop.backgroundPosition;
        }
        return oldAnim.apply(this, arguments);
    };

    function toArray(strg) {
        strg = strg.replace(/left|top/g, '0px');
        strg = strg.replace(/right|bottom/g, '100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
    }

    $.fx.step.backgroundPosition = function (fx) {
        if (!fx.bgPosReady) {
            var start = $.curCSS(fx.elem, 'backgroundPosition');
            if (!start) {
                start = '0px 0px';
            }
            start = toArray(start);
            fx.start = [start[0], start[2]];
            var end = toArray(fx.end);
            fx.end = [end[0], end[2]];
            fx.unit = [end[1], end[3]];
            fx.bgPosReady = true;
        }
        var nowPosX = [];
        nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
        nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
        fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];
    };
})(jQuery);

/*!
 * jQuery onlynum 1.0.0
 * Copyright (C) 2012, Fatih Koca (fattih@fattih.com), AUTHOR.txt
 * Licensed under GPL Version 2 (GPL_LICENSE.txt) licenses.
*/
(function (a) {
    a.fn.onlynum = function (b) {
        function c(a, b) {
            if (b != null) {
                for (var c = 0; c < b.length; c++) {
                    if (allowedchars[c] == String.fromCharCode(a)) return true
                }
            }
            return false
        }

        return this.each(function () {
            a(this).bind("blur keypress", function (a, b) {
                var d = a.charCode == undefined ? a.keyCode : a.charCode;
                var e = b == "keypress" ? false : null;
                if (/^[0-9]+$/.test(String.fromCharCode(d)) || d == 0 || d == 13 || c(d, e)) {
                    return true
                } else {
                    return false
                }
            })
        })
    }
})(jQuery);

$.fn.randomize = function (a) {
    (a ? this.find(a) : this).parent().each(function () {
        $(this).children(a).sort(function () {
            return Math.random() - 0.5
        }).detach().appendTo(this)
    });
    return this
};