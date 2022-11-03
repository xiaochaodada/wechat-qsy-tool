module.exports = function(t) {
    var n = {};
    function o(e) {
        if (n[e]) return n[e].exports;
        var r = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }
    return o.m = t, o.c = n, o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        });
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, o.t = function(t, n) {
        if (1 & n && (t = o(t)), 8 & n) return t;
        if (4 & n && "object" === (0, e.default)(t) && t && t.__esModule) return t;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & n && "string" != typeof t) for (var a in t) o.d(r, a, function(e) {
            return t[e];
        }.bind(null, a));
        return r;
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return o.d(e, "a", e), e;
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, o.p = "", o(o.s = 20);
}({
    20: function(t, e, n) {
        Component({
            options: {
                multipleSlots: !0,
                addGlobalClass: !0
            },
            properties: {
                title: {
                    type: String,
                    value: ""
                },
                extClass: {
                    type: String,
                    value: ""
                },
                maskClosable: {
                    type: Boolean,
                    value: !0
                },
                mask: {
                    type: Boolean,
                    value: !0
                },
                show: {
                    type: Boolean,
                    value: !1,
                    observer: "_showChange"
                },
                buttons: {
                    type: Array,
                    value: []
                }
            },
            data: {
                innerShow: !1
            },
            ready: function() {
                var t = this.data.buttons, e = t.length;
                t.forEach(function(t, n) {
                    t.className = 1 === e ? "weui-dialog__btn_primary" : 0 === n ? "weui-dialog__btn_default" : "weui-dialog__btn_primary";
                }), this.setData({
                    buttons: t
                });
            },
            methods: {
                buttonTap: function(t) {
                    var e = t.currentTarget.dataset.index;
                    this.triggerEvent("buttontap", {
                        index: e,
                        item: this.data.buttons[e]
                    }, {});
                },
                close: function() {
                    this.data.maskClosable && (this.setData({
                        show: !1
                    }), this.triggerEvent("close", {}, {}));
                },
                stopEvent: function() {}
            }
        });
    }
});