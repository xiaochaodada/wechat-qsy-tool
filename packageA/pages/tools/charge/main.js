var t = require("../../../../wordclooud/js/interopRequireDefault")(require("../../../../wordclooud/js/typeof")), e = "function" == typeof Symbol && "symbol" == (0, 
t.default)(Symbol.iterator) ? function(e) {
    return (0, t.default)(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : (0, 
    t.default)(e);
};

require("common/manifest.js"), require("common/vendor.js"), global.webpackJsonpMpvue([ 2 ], {
    104: function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(1), r = n.n(o), a = n(105);
        new r.a(a.a).$mount();
    },
    105: function(t, e, n) {
        var o = n(107), r = n(110), a = n(2)(o.a, r.a, function(t) {
            n(106);
        }, null, null);
        a.options.__file = "src/pages/charge/index.vue", a.esModule && Object.keys(a.esModule).some(function(t) {
            return "default" !== t && "__" !== t.substr(0, 2);
        }) && console.error("named exports are not supported in *.vue files."), a.options.functional && console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."), 
        e.a = a.exports;
    },
    106: function(t, e) {},
    107: function(t, e, n) {
        var o = n(6), r = n(108), a = n(47);
        e.a = {
            data: function() {
                return {
                    currentUser: {
                        score: 0
                    },
                    interval: "",
                    money: 1
                };
            },
            onLoad: function() {
                global.mpvue.getBatteryInfo({
                    success: function(t) {
                        t.isCharging || (Object(r.a)({
                            text: "请插上电源",
                            duration: 2e3
                        }), setTimeout(function() {
                            Object(r.a)({
                                text: "开始充钱",
                                duration: 3e3
                            });
                        }, 2e3), setTimeout(function() {
                            Object(r.a)({
                                text: "点击充值分享",
                                duration: 2e3
                            });
                        }, 5e3));
                    }
                }), wx.showToast({
                    title: "插电自动充钱",
                    icon: "loading"
                });
            },
            onShow: function() {
                this.currentUser = o.a.getUser(), this.money = Number(o.a.getMoney()), this.getCharge();
            },
            onUnload: function() {
                console.log("clear interval"), clearInterval(this.interval);
            },
            onHide: function() {
                console.log("clear interval"), clearInterval(this.interval);
            },
            methods: {
                getCharge: function() {
                    var t = this;
                    this.interval = setInterval(function() {
                        wx.getBatteryInfo({
                            success: function(e) {
                                e.isCharging && (t.money = (Number(t.money) + Number(Math.random())).toFixed(2));
                            }
                        });
                    }, 100);
                },
                toIndex: function() {
                    global.mpvue.switchTab({
                        url: "../index/main"
                    });
                },
                toWithDraw: function() {
                    global.mpvue.navigateTo({
                        url: "ad"
                    }), console.log("太少");
                },
                more: function() {
                    a.a.alert({
                        title: "提示",
                        message: "充钱纯属于娱乐...\r\n但是\r\n点击 提现 真的有福利。"
                    });
                }
            },
            onShareAppMessage: function(t) {
                return {
                    title: "手机充电就是充钱？！！",
                    path:"packageA/pages/tools/charge/main"
                };
            },
            watch: {
                money: function(t) {
                    o.a.setMoney(t);
                }
            }
        };
    },
    108: function(t, e, n) {
        e.a = function(t) {
            var e = ((t = Object.assign({}, r, function(t) {
                return Object(o.a)(t) ? t : {
                    text: t
                };
            }(t))).context || function() {
                var t = getCurrentPages();
                return t[t.length - 1];
            }()).selectComponent(t.selector);
            delete t.selector, e ? (e.set(t), e.show()) : console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
        };
        var o = n(109), r = {
            selector: "#van-notify",
            duration: 3e3
        };
    },
    109: function(t, n, o) {
        function r(t) {
            var n = void 0 === t ? "undefined" : e(t);
            return null !== t && ("object" === n || "function" === n);
        }
        o.d(n, "a", function() {
            return r;
        });
    },
    110: function(t, e, n) {
        var o = function() {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", [ n("div", {
                staticClass: "return"
            }, [ n("van-icon", {
                attrs: {
                    name: "arrow-left",
                    mpcomid: "0"
                }
            }) ], 1), t._v(" "), n("van-icon", {
                staticClass: "icon",
                attrs: {
                    name: "gold-coin",
                    mpcomid: "1"
                }
            }), t._v(" "), n("p", {
                staticStyle: {
                    "font-size": "0.8rem"
                }
            }, [ t._v("我的零钱") ]), t._v(" "), n("div", {
                staticStyle: {
                    "font-size": "2rem",
                    "font-weight": "bold"
                }
            }, [ t._v("¥ " + t._s(t.money)) ]), t._v(" "), n("p", {
                staticStyle: {
                    "font-size": "0.8rem",
                    color: "orange"
                }
            }, [ t._v("转入零钱通赚收益 七日年化 5.3%") ]), t._v(" "), n("div", {
                staticStyle: {
                    width: "50%",
                    margin: "3rem auto",
                    "text-align": "center"
                }
            }, [ n("button", {
                staticClass: "btn",
                attrs: {
                    "open-type": "share"
                }
            }, [ t._v("充值") ]), t._v(" "), n("button", {
                staticClass: "btn2",
                attrs: {
                    eventid: "0"
                },
                on: {
                    click: t.toWithDraw
                }
            }, [ t._v("提现") ]) ], 1), t._v(" "), n("div", {
                staticClass: "foot"
            }, [ n("p", {
                staticStyle: {
                    "font-size": "0.8em",
                    color: "#576B95"
                },
                attrs: {
                    eventid: "1"
                },
                on: {
                    click: t.more
                }
            }, [ t._v("常见问题") ]), t._v(" "), n("p", {
                staticStyle: {
                    "font-size": "0.7em",
                    color: "gray"
                }
            }, [ t._v("本服务由AirDrop提供") ]) ], 1), t._v(" "), n("van-notify", {
                attrs: {
                    id: "van-notify",
                    mpcomid: "2"
                }
            }), t._v(" "), n("van-dialog", {
                attrs: {
                    id: "van-dialog",
                    mpcomid: "3"
                }
            }) ], 1);
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r;
    }
}, [ 104 ]);