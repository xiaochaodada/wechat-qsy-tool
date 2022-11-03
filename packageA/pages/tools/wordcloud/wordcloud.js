
var t = require("../../../../wordclooud/js/interopRequireDefault")(require("../../../../wordclooud/js/typeof")), e = "function" == typeof Symbol && "symbol" == (0, 
t.default)(Symbol.iterator) ? function(e) {
    return (0, t.default)(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : (0, 
    t.default)(e);
};
var check = require("../../../../utils/cache");
(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/tools/wordcloud/wordcloud" ], {
    "0e85": function(t, e, a) {
        a.r(e);
        var n = a("2c8f"), o = a.n(n);
        for (var i in n) "default" !== i && function(t) {
            a.d(e, t, function() {
                return n[t];
            });
        }(i);
        e.default = o.a;
    },
    "2c8f": function(t, a, n) {
        (function(t) {
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.default = void 0;
            var o, i = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(n("b5ef")), r = null;
            String.prototype.replaceAll = function(t, e) {
                return this.replace(new RegExp(t, "gm"), e);
            };
            var s = {
                data: function() {
                    return {
                        sourceData: "一键去水印解析工具,mini,数据处理,迷你,FusionApp,流行,科技创新,xx工作室,美丽未来,厉害了,科技创新,科技",
                        jsonData: [],
                        data: {
                            series: []
                        },
                        cWidth: "",
                        cHeight: "",
                        pixelRatio: 1,
                        Created: !1
                    };
                },
                methods: {
                    isJSON: function(t) {
                        if ("string" == typeof t) try {
                            var a = JSON.parse(t);
                            return !("object" != (void 0 === a ? "undefined" : e(a)) || !a);
                        } catch (t) {
                            return !1;
                        }
                    },
                    randomSize: function() {
                        return parseInt(16 * Math.random() + 10, 10);
                    },
                    generateChart: function() {//更新
                        var e = this;

                        check.checktext(e.sourceData,function () {
                         
                        e.data.series = [], e.jsonData = '["' + e.sourceData + '"]', e.jsonData = e.jsonData.replaceAll(",", '","'), 
                        e.isJSON(e.jsonData) ? (e.jsonData = JSON.parse(e.jsonData), e.jsonData.forEach(function(t) {
                            var a = {
                                name: "",
                                textSize: 0
                            };
                            a.name = t, a.textSize = e.randomSize(), e.data.series.push(a);
                        }), e.Created ? r.updateData({
                            series: e.data.series
                        }) : (e.showWord("wordCloud", e.data), e.Created = !0)) : t.showToast({
                            title: "数据输入格式错误...",
                            icon: "none"
                        });  
                        },function () {
                            console.log("错误")
                            wx.showToast({
                                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                                icon: "none",
                                duration: 2e3
                            })
                        })
      
                        

                    },
                    showWord: function(t, e) {
                        r = new i.default({
                            $this: o,
                            canvasId: t,
                            type: "word",
                            background: "transparent",
                            pixelRatio: o.pixelRatio,
                            series: e.series,
                            width: o.cWidth * o.pixelRatio,
                            height: o.cHeight * o.pixelRatio,
                            extra: {
                                word: {
                                    type: "normal"
                                }
                            }
                        });
                    },
                    saveChart: function() {
                        t.canvasToTempFilePath({
                            canvasId: r.opts.canvasId,
                            success: function(e) {
                                t.saveImageToPhotosAlbum({
                                    filePath: e.tempFilePath,
                                    success: function() {
                                        t.showToast({
                                            title: "词云图保存成功",
                                            duration: 2e3
                                        });
                                    }
                                });
                            }
                        });
                    }
                },
                onLoad: function() {
                    o = this, t.showShareMenu(), this.cWidth = t.upx2px(750), this.cHeight = t.upx2px(500), 
                    this.generateChart();
                },
                onShareAppMessage: function() {
                    return {
                        title: "【词云图生成】一键生成超级炫酷的词云图片。",
                        path: "/packageA/pages/tools/wordcloud/wordcloud"
                    };
                }
            };
            a.default = s;
        }).call(this, n("543d").default);
    },
    "565e": function(t, e, a) {},
    8849: function(t, e, a) {
        var n = a("565e");
        a.n(n).a;
    },
    a2a6: function(t, e, a) {
        var n = function() {
            this.$createElement, this._self._c;
        }, o = [];
        a.d(e, "a", function() {
            return n;
        }), a.d(e, "b", function() {
            return o;
        });
    },
    febb: function(t, e, a) {
        a.r(e);
        var n = a("a2a6"), o = a("0e85");
        for (var i in o) "default" !== i && function(t) {
            a.d(e, t, function() {
                return o[t];
            });
        }(i);
        a("8849");
        var r = a("2877"), s = Object(r.a)(o.default, n.a, n.b, !1, null, null, null);
        e.default = s.exports;
    }
}, [ [ "6342", "common/runtime", "common/vendor" ] ] ]);