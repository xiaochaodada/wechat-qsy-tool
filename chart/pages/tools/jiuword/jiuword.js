var app = getApp(),
    t = null,
    e = null,
    o = "";
let interstitialAd = null;
var check = require("../../../../utils/cache");
Page({
    data: {
        words: "说正经事专用配图。",
        bgColor: ["#fff", "#E1E1E1", "#FF5A5A", "#5B9AED", "#25B890", "#F7A633", "#8CD6FF", "#FE76B1", "#FFDFE3"],
        bgColor2: ["https://www.lxl66.cn/tu/pt_bg_item_1.png", "https://www.lxl66.cn/tu/pt_bg_item_2.png", "https://www.lxl66.cn/tu/pt_bg_item_3.png", "https://www.lxl66.cn/tu/pt_bg_item_4.png"],
        bgColor3: ["#fff", "#000", "#5B9AED", "#25B890", "#F7A633", "#8CD6FF", "#FE76B1", "#FFDFE3"],
        bgColorSel: [-1, 0, 1],
        bgImage: ""
    },
    onLoad: function(o) {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        var chaping = app.globalData.config_base_list.advertisements.chaping;
        if (chaping) {
            if (wx.createInterstitialAd) {
                interstitialAd = wx.createInterstitialAd({
                    adUnitId: chaping
                })
                interstitialAd.onLoad(() => {
                    if (interstitialAd) {
                        interstitialAd.show().catch((err) => {
                            console.error(err)
                        })
                    }
                })
                interstitialAd.onError((err) => {})
                interstitialAd.onClose(() => {})
            }
        }


        t = wx.createCanvasContext("myCanvas"), e && clearInterval(e);
    },
    changeWord: function(t) {
        var e = t.currentTarget.dataset.words;
        e || (e = "现在请开始你的表演"), this.setData({
            words: e
        });
    },
    selBgColor: function(t) {
        var e = this,
            o = t.currentTarget.dataset,
            a = this.data.bgColorSel;
        "0" === o.item ? (a[0] = o.index, a[1] = -1) : "1" === o.item ? (a[0] = -1, a[1] = o.index) : "2" === o.item && (a[2] = o.index),
            this.setData({
                bgColorSel: a
            }), console.log(o.url), o.url && wx.downloadFile({
                url: o.url,
                success: function(t) {
                    e.setData({
                        bgImage: t.tempFilePath
                    });
                },
                fail: function(t) {
                    console.log(" --- ", t);
                }
            });
    },
    confirmInput: function(t) {
        var e = this;
        o && clearTimeout(o), o = setTimeout(function() {
            e.setData({
                wordsTemp: t.detail.value,
                words: t.detail.value
            });
        }, 700);
    },
    saveImage: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });

        var o = this.data.bgColorSel,
            a = this.data.words,
            i = 0;
      


        check.checktext(a,function () {
            e = setInterval(function() {
                if (i >= 9) return clearInterval(e), wx.hideLoading(), wx.showModal({
                    title: "已按顺序保存到相册",
                    content: "快去朋友圈分享吧！",
                    showCancel: !1,
                    confirmText: "好的"
                }), 0; -
                1 === o[1] ? t.drawColor(a.substr(8 - i, 1)) : t.drawImage(a.substr(8 - i, 1)),
                    i++;
            }, 300);
    
        },function () {
            console.log("错误")
            wx.showToast({
                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                icon: "none",
                duration: 2e3
            })
        })
    },
    drawColor: function(e) {
        var o = this.data.bgColorSel,
            a = this.data.bgColor,
            i = this.data.bgColor3;
        t.setFillStyle(a[o[0]]), t.fillRect(0, 0, 156, 156), t.setTextAlign("center"), t.setFillStyle(i[o[2]]),
            t.setFontSize(72), t.fillText(e, 78, 100), t.draw(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 156,
                    height: 156,
                    destWidth: 156,
                    destHeight: 156,
                    canvasId: "myCanvas",
                    success: function(t) {
                        console.log("= ", t.tempFilePath), wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                console.log("scc =", t);
                            },
                            fail: function(t) {
                                console.log("save 2 eer =", t);
                            }
                        });
                    },
                    fail: function(t) {
                        console.log("err", t);
                    }
                });
            }, 200);
    },
    drawImage: function(e) {
        this.data.bgColor;
        var o = this.data.bgColor3,
            a = this.data.bgColorSel;
        t.drawImage(this.data.bgImage, 0, 0, 156, 156), t.setTextAlign("center"), t.setFillStyle(o[a[2]]),
            t.setFontSize(72), t.fillText(e, 78, 100), t.draw(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 156,
                    height: 156,
                    destWidth: 156,
                    destHeight: 156,
                    canvasId: "myCanvas",
                    success: function(t) {
                        console.log("= ", t.tempFilePath), wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                console.log("scc =", t);
                            },
                            fail: function(t) {
                                console.log("save 2 eer =", t);
                            }
                        });
                    },
                    fail: function(t) {
                        console.log("err", t);
                    }
                });
            }, 200);
    },
    toIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "朋友圈文字九宫图",
            path: "/chart/pages/tools/jiuword/jiuword"
        };
    }
});