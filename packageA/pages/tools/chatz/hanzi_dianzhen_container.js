var n = require("./bigdata.js");

module.exports.getDianzhenInfo = function(e) {
    if (e < 19968 || e > 40869) return {
        gotDianzhen: !1,
        dianzhen: ""
    };
    var t = function(e) {
        var t = new Object(), r = e - 19968;
        return t.high = parseInt(n.GB2312_TABLE.substr(4 * r, 2), 16) - 160, t.low = parseInt(n.GB2312_TABLE.substr(4 * r + 2, 2), 16) - 160, 
        t;
    }(e), r = 32 * (94 * (t.high - 1) + (t.low - 1));
    return r < 0 || 2 * r + 63 >= n.ZIKU_HZK16_TABLE.length ? {
        gotDianzhen: !1,
        dianzhen: ""
    } : {
        gotDianzhen: !0,
        dianzhen: n.ZIKU_HZK16_TABLE.substr(2 * r, 64)
    };
};