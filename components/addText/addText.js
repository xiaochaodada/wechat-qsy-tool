var app = getApp(),a = new Array();
Component({
    properties: {
        img_id: {
            type: String
        }
    },
    data: {
        show: 0,
        isShow: !1,
        text: "",
        allColor: [ "#000000", "#ffffff", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200", "#22b14c", "#00a2e8", "#ffaec9", "#a349a4", "#c3c3c3", "#FAFAD2", "#F5FFFA", "#87CEFA", "tan", "#EECBAD", "#B0E0E6", "#CC99CC", " #98F5FF" ],
        textConfig: {
            fontSize: 30,
            fontColor: "#000000",
            lineHeight: 30,
            fontStyle: "normal",
            bgColor: "#ffffff",
            padding: 10
        },
        width: 400,
        height: 700,
        testwidth: 400,
        testheight: 700,
        isHiddenTestCanvas: !0
    },
    methods: {
        hideDialog: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        showDialog: function(t) {
            console.log("获取"), console.log(t), console.log(this.data.img_id);
            var e = wx.getStorageSync("text"), o = "一键去水印解析工具";
            e && (o = e, console.log("文本---------------" + e)), this.setData({
                isShow: !this.data.isShow,
                text: o
            });
        },
        fontColorChange: function(t) {
            var e = this;
            e.index = t.target.dataset.selected, console.log(e.index);
            var o = e.data.textConfig;
            o.fontColor = e.data.allColor[e.index], console.log("颜色：" + o.fontColor), e.setData({
                show: e.index,
                textConfig: o
            });
        },
        setTextStyle: function(t) {
            console.log(t.detail.value), this.setData({
                "textConfig.fontStyle": t.detail.value
            });
        },
        inputSave: function(t) {
            var e = t.detail.value;
            console.log(e), this.setData({
                text: e
            });
        },
        createImage: function(t) {
          wx.hideLoading()
            var e = this, o = e.data.text, a = e.data.textConfig;
            console.log("文本========" + o), null != o && "" != o || (o = "请输入文字"), console.log("a==" + o), 
               console.log(a), wx.showLoading({
                title: "努力生成中...",
                mask: !0
            }), e.setData({
                isHiddenCanvas: !1
            }), e.drawCanvas("canvas", o, a.fontSize, a.fontColor, a.bgColor, a.lineHeight, a.padding, a.fontStyle), 
            setTimeout(function(t) {
                wx.canvasToTempFilePath({
                    canvasId: "canvas",
                    success: function(t) {
                        wx.hideLoading(), console.log(t.tempFilePath);
                        var o = [];
                        e.emit(t.tempFilePath), o.push(t.tempFilePath), e.setData({
                            imageUrl: t.tempFilePath,
                            imageList: o
                        }), wx.getImageInfo({
                            src: t.tempFilePath,
                            success: function(t) {
                                console.log(t.width);
                            }
                        });
                    }
                }, e);
            }, 500);
        },
      checktext: function (e) {//文本检测
        //e.checktext(o)
        wx.showLoading({
          title: "添加文本中...",
        })
        console.log(e);
        var o = this;
        wx.request({
          url: app.globalData.tonyon +"/api/jiance/api.php",
          method: "POST",
          data: {
            content: o.data.text
          },
          header: {
            "content-type": "content:application/json;chartset=uft-8"
          },
          success: function (t) {
            console.log(t.data.errcode)
            if (wx.hideLoading(), 200 == t.statusCode) 0 == (a = JSON.parse(JSON.stringify(t.data)).errcode) ? (o.createImage(e)) : "87014" == a.errcode ? wx.showToast({
              title: "此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本",
              icon: "none"
            }) : wx.showToast({
              title: a.errmsg,
              icon: "none"
            });
            else {
              var a = {};
              a.errcode = 11, a.errmsg = "检测方法出错，请重新输入文本检测" + t.statusCode, wx.showToast({
                title: a.errmsg,
                icon: "none"
              });
            }
          },
          fail: function (e) {
            wx.hideLoading(), wx.showToast({
              title: "检测文本方法出错，请重试",
              icon: "none"
            });
          }
        });
      },
        drawCanvas: function(t, e) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "#000000", n = (arguments.length > 4 && void 0 !== arguments[4] && arguments[4], 
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 30), l = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 30, i = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "normal", s = this, g = s.data.width, h = s.returnTestCanvasHeight("testCanvas", e, o, n, l, i);
            console.log("文本e==" + e), console.log("字体大小a==" + o), console.log("行间距i==" + n), 
            console.log("内边距s==" + l), console.log("字体风格==" + i), s.setData({
                height: h
            }), console.log("获得高度" + h);
            var d = wx.createCanvasContext(t, s);
            console.log("开始"), d.setTextBaseline("top"), d.font = i + " " + o + "px sans-serif", 
            d.setFillStyle(a);
            for (var f = e.split(/\n/), c = (s.data.height, 0), r = l; c < f.length; c++) {
                var v = f[c].split(""), x = "", C = "", u = l;
                c > 0 && (r += n);
                for (var w = 0; w < v.length; w++) C = x + v[w], d.measureText(C).width > g - 2 * l && w > 0 ? (d.fillText(x, u, r), 
                x = v[w], r += n) : x = C;
                d.fillText(x, u, r);
            }
            d.draw();
        },
        returnTestCanvasHeight: function(t, e) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 30, n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 30, l = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "normal", i = this;
            console.log("文本a==" + o), console.log("字体大小a==" + o), console.log("行间距i==" + l), 
            console.log("内边距s==" + i), console.log("字体风格==" + s), i.setData({
                isHiddenTestCanvas: !1
            });
            var s = i.data.testwidth, g = (i.data.testheight, wx.createCanvasContext(t, i));
            console.log("l===" + s), g.setTextBaseline("top"), g.font = l + " " + o + "px sans-serif";
            for (var h = e.split(/\n/), d = i.data.testheight, f = 0, c = n; f < h.length; f++) {
                var r = h[f].split(""), v = "", x = "", C = n;
                f > 0 && (c += a);
                for (var u = 0; u < r.length; u++) x = v + r[u], g.measureText(x).width > s - 2 * n && u > 0 ? (g.fillText(v, C, c), 
                v = r[u], c += a) : v = x;
                if (g.fillText(v, C, c), f == h.length - 1) return d = c + a + n, console.log("成功返回高度pp" + d), 
                i.setData({
                    isHiddenTestCanvas: !0
                }), d;
            }
        },
        emit: function(t) {
            var e = this;
            console.log("图片==================" + t);
            var o = {
                val: t
            };
            wx.setStorageSync("text", e.data.text), e.hideDialog(), this.triggerEvent("myevent", o);
        }
    }
});