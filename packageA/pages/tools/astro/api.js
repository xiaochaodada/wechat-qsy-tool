var e = require("../../../../wordclooud/js/interopRequireDefault")(require("../../../../wordclooud/js/typeof"));

function t() {
    return function(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return r.request({
            url: t,
            data: o,
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        });
    };
}

var o = "function" == typeof Symbol && "symbol" == (0, e.default)(Symbol.iterator) ? function(t) {
        return (0, e.default)(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : (0,
            e.default)(t);
    },
    n = require("Promise"),
    r = module.exports = {};

r.default = r, r.debug = !0, Object.defineProperty(r, "app", {
    get: function() {
        return getApp();
    }
});

var u = {
    stopRecord: !0,
    pauseVoice: !0,
    stopVoice: !0,
    pauseBackgroundAudio: !0,
    stopBackgroundAudio: !0,
    createAudioContext: !0,
    createVideoContext: !0,
    showNavigationBarLoading: !0,
    hideNavigationBarLoading: !0,
    createAnimation: !0,
    createContext: !0,
    drawCanvas: !0,
    canvasToTempFilePath: !0,
    hideKeyboard: !0,
    stopPullDownRefresh: !0
};

Object.keys(wx).forEach(function(e) {
    u[e] || "on" === e.substr(0, 2) || /\w+Sync$/.test(e) ? r[e] = function() {
        if (r.debug) {
            var t = wx[e].apply(wx, arguments);
            return t || "" === t || (t = {}), t && "object" === (void 0 === t ? "undefined" : o(t)) && (t.then = function() {
                console.warn("wx." + e + " is not a async function, you should not use Promise");
            }), t;
        }
        return wx[e].apply(wx, arguments);
    } : r[e] = function(t) {
        return t = t || {}, new n(function(o, n) {
            t.success = o, t.fail = function(e) {
                n(e && e.errMsg ? new Error(e.errMsg) : e);
            }, wx[e](t);
        });
    };
}), r.GET = t("GET"), r.POST = t("POST"), r.PUT = t("PUT"), r.DELETE = t("DELETE");