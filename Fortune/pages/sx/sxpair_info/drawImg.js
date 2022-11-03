function e(e) {
    a(n, e);
}

function a(e, a) {
    for (var t in a) e[t] = a[t];
    return e;
}

function t(e, a, t, i, o, g, s, r, m, l) {
    t || (t = 16), s || (s = 0), l || (l = 1), e.setFontSize(t);
    var c = n.size, u = 1, w = a.length, d = e.measureText(a).width, h = e.measureText("粥").width;
    r || (r = c.w), e.setFillStyle(i), e.setTextAlign(m || "left"), d > r && (u = Math.ceil(d / r), 
    w = Math.floor(r / h));
    for (var f = 0; f < Math.min(l, u); f++) {
        var b = a.substring(f * w, (f + 1) * w);
        e.fillText(b, o, g + (t + s) * f, r);
    }
    return e.stroke(), u;
}

function i(e) {
    wx.showToast({
        title: "正在保存图片",
        icon: "loading",
        duration: 2e3
    }), wx.saveImageToPhotosAlbum({
        filePath: n.imagePath,
        success: function(e) {
            wx.showToast({
                title: "图片已经保存",
                icon: "success",
                duration: 2e3
            });
        },
        fail: function(a) {
            wx.showToast({
                title: "图片保存失败",
                icon: "none",
                duration: 2e3
            }), "saveImageToPhotosAlbum:fail auth deny" === a.errMsg && (console.log("打开设置窗口"), 
            e.setData({
                openSettingBtnHidden: !1
            }));
        }
    });
}

var n = {
    img_bg: "../image/bg.png",
    img_bg_t: "../image/bg_t.png",
    share_bg: "../image/sharebg.jpg",
    sx_title: "../image/sx_title.png",
    erweima: "../../../res/images/xcx.jpg",
    zhiwen: "../image/zhiwen.png",
    line: "../image/line.png",
    icobg: "../image/icobg.png",
    icobg2: "../image/icobg2.png",
    title: "",
    desc: "",
    peibi: "",
    img_attach: "",
    img_user: "",
    img_code: "",
    userInfo: "",
    imagePath: "",
    size: "",
    maleurl: "",
    femaleurl: "",
    malename: "金牛座",
    femalename: "金牛座"
};

module.exports = {
    setData: e,
    draw: function(a) {
        var o = wx.createCanvasContext("myCanvas"), g = (n.img_bg, n.img_user, n.userInfo, 
        n.maleurl), s = n.size, r = s.w, m = s.h, l = s.s;
        console.log(n);
        o.drawImage(n.share_bg, 0, 0, r, m), o.drawImage(n.img_bg_t, 0, 0, r, 180 * l), 
        o.drawImage(n.img_bg, 40 * l, 385 * l, r - 80 * l, m - 445 * l), o.beginPath(), 
        o.closePath(), o.save(), o.drawImage(n.sx_title, r / 2 - 201 * l, 60 * l, 402 * l, 142 * l), 
        o.drawImage(n.icobg, 120 * l, 400 * l, 100 * l, 30 * l), o.drawImage(n.icobg2, r - 220 * l, 400 * l, 100 * l, 30 * l), 
        o.drawImage(g, 70 * l, 220 * l, 200 * l, 200 * l), o.drawImage(n.femaleurl, r - 270 * l, 220 * l, 200 * l, 200 * l), 
        o.drawImage(n.line, 285 * l, 300 * l, 180 * l, 70 * l), t(o, n.malename + "男", 32 * l, "#5186ff", 180 * l, 480 * l, 0, 0, "center"), 
        t(o, n.femalename + "女", 32 * l, "#ff5176", r - 170 * l, 480 * l, 0, 0, "center"), 
        t(o, n.desc.trim(), 30 * l, "#555", 80 * l, 550 * l, 32 * l, r - 160 * l, null, 8), 
        o.drawImage(n.erweima, r / 2 - 100 * l, m - 340 * l, 200 * l, 200 * l), t(o, "查看你的生肖配对", 28 * l, "#e5a268", r / 2, m - 100 * l, 0, 0, "center"), 
        o.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: r,
                height: m,
                destWidth: 8 * r,
                destHeight: 8 * m,
                canvasId: "myCanvas",
                success: function(t) {
                    e({
                        imagePath: t.tempFilePath
                    }), i(a);
                },
                fail: function(e) {
                    console.log("错误", e);
                }
            });
        }, 200);
    },
    downImg: function(e, a) {
        if (e) {
            var t = wx.getStorageSync(a);
            return t ? console.log("预加载已缓存", a, e) : wx.downloadFile({
                url: e,
                success: function(t) {
                    console.log("预加载完成", a, e), wx.setStorage({
                        key: a,
                        data: t.tempFilePath
                    });
                }
            }), t;
        }
    },
    save_file: i
}, function() {
    var e = {};
    try {
        var a = .7 * wx.getSystemInfoSync().windowWidth, t = a / 750, i = a, o = a * (1400 / 750);
        e.w = i, e.h = o, e.s = t;
    } catch (e) {
        console.log("获取设备信息失败" + e);
    }
    n.size = e;
}();