var e = require("Promise"), r = {
    formatNumber: function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    },
    formatTime: function(e) {
        var t = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate(), n = e.getHours(), c = e.getMinutes(), s = e.getSeconds();
        return [ t, a, o ].map(r.formatNumber).join("-") + " " + [ n, c, s ].map(r.formatNumber).join(":");
    },
    formatDate: function(e, r) {
        var t = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        for (var a in /(y+)/.test(r) && (r = r.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), 
        t) new RegExp("(" + a + ")").test(r) && (r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? t[a] : ("00" + t[a]).substr(("" + t[a]).length)));
        return r;
    },
    sleep: function(r) {
        return new e(function(e) {
            return setTimeout(e, r);
        });
    },
    getSlideDirection: function(e, r, t, a, o, n) {
        var c = "";
        n = n || 125;
        var s = t - e, h = a - r;
        return Math.abs(s) >= n && Math.abs(h) <= 125 ? c = s < 0 ? "left" : "right" : Math.abs(h) >= n && Math.abs(s) <= 125 && (c = h < 0 ? "up" : "down"), 
        c;
    },
    base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64DecodeChars: new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
    base64encode: function(e) {
        return r.utf16to8(r.base64encodeAction(e));
    },
    base64encodeAction: function(e) {
        var t, a, o, n, c, s;
        for (o = e.length, a = 0, t = ""; a < o; ) {
            if (n = 255 & e.charCodeAt(a++), a == o) {
                t += r.base64EncodeChars.charAt(n >> 2), t += r.base64EncodeChars.charAt((3 & n) << 4), 
                t += "==";
                break;
            }
            if (c = e.charCodeAt(a++), a == o) {
                t += r.base64EncodeChars.charAt(n >> 2), t += r.base64EncodeChars.charAt((3 & n) << 4 | (240 & c) >> 4), 
                t += r.base64EncodeChars.charAt((15 & c) << 2), t += "=";
                break;
            }
            s = e.charCodeAt(a++), t += r.base64EncodeChars.charAt(n >> 2), t += r.base64EncodeChars.charAt((3 & n) << 4 | (240 & c) >> 4), 
            t += r.base64EncodeChars.charAt((15 & c) << 2 | (192 & s) >> 6), t += r.base64EncodeChars.charAt(63 & s);
        }
        return t;
    },
    base64decode: function(e) {
        return r.utf8to16(r.base64decodeAction(e));
    },
    base64decodeAction: function(e) {
        var t, a, o, n, c, s, h;
        for (s = e.length, c = 0, h = ""; c < s; ) {
            do {
                t = r.base64DecodeChars[255 & e.charCodeAt(c++)];
            } while (c < s && -1 == t);
            if (-1 == t) break;
            do {
                a = r.base64DecodeChars[255 & e.charCodeAt(c++)];
            } while (c < s && -1 == a);
            if (-1 == a) break;
            h += String.fromCharCode(t << 2 | (48 & a) >> 4);
            do {
                if (61 == (o = 255 & e.charCodeAt(c++))) return h;
                o = r.base64DecodeChars[o];
            } while (c < s && -1 == o);
            if (-1 == o) break;
            h += String.fromCharCode((15 & a) << 4 | (60 & o) >> 2);
            do {
                if (61 == (n = 255 & e.charCodeAt(c++))) return h;
                n = r.base64DecodeChars[n];
            } while (c < s && -1 == n);
            if (-1 == n) break;
            h += String.fromCharCode((3 & o) << 6 | n);
        }
        return h;
    },
    utf16to8: function(e) {
        var r, t, a, o;
        for (r = "", a = e.length, t = 0; t < a; t++) (o = e.charCodeAt(t)) >= 1 && o <= 127 ? r += e.charAt(t) : o > 2047 ? (r += String.fromCharCode(224 | o >> 12 & 15), 
        r += String.fromCharCode(128 | o >> 6 & 63), r += String.fromCharCode(128 | o >> 0 & 63)) : (r += String.fromCharCode(192 | o >> 6 & 31), 
        r += String.fromCharCode(128 | o >> 0 & 63));
        return r;
    },
    utf8to16: function(e) {
        var r, t, a, o, n, c;
        for (r = "", a = e.length, t = 0; t < a; ) switch ((o = e.charCodeAt(t++)) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            r += e.charAt(t - 1);
            break;

          case 12:
          case 13:
            n = e.charCodeAt(t++), r += String.fromCharCode((31 & o) << 6 | 63 & n);
            break;

          case 14:
            n = e.charCodeAt(t++), c = e.charCodeAt(t++), r += String.fromCharCode((15 & o) << 12 | (63 & n) << 6 | (63 & c) << 0);
        }
        return r;
    }
};

module.exports = r;