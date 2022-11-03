var app = getApp(),
    cache = require('../../../utils/cache.js'),
    hash_data = ['0'];

Page({
    data: {
        save: !1,
        cut: !1,
        video: "",
        cutW: 0,
        cutH: 0,
        cutL: 0,
        cutT: 0,
        windowHeight: wx.getSystemInfoSync().windowHeight,
        windowWidth: wx.getSystemInfoSync().windowWidth,
        videoW: 0,
        videoH: 0,
        videoLeft: 0,
        videoTop: 0,
        originalHeight: 0,
        originalWidth: 0
    },
    onLoad: function(e) {
        hash_data = ['0']
    },
    cut: function() {
        this.setData({
            cutH: 100,
            cutW: 100,
            cutT: 100,
            cutL: 100,
            cut: !0
        });
    },
    dragPointStart: function(t) {
        var e = this;
        e.dragStartX = t.touches[0].clientX, e.dragStartY = t.touches[0].clientY, e.initDragCutW = e.data.cutW,
            e.initDragCutH = e.data.cutH;
    },
    dragPointMove: function(t) {
        var e = this,
            o = t.touches[0].clientX,
            i = t.touches[0].clientY,
            a = o - e.dragStartX,
            n = i - e.dragStartY;
        e.setData({
            cutW: e.initDragCutW + a,
            cutH: e.initDragCutH + n
        });
    },
    croperStart: function(t) {
        this.croperX = t.touches[0].clientX, this.croperY = t.touches[0].clientY;
    },
    croperMove: function(t) {
        var e = this;
        e.deviceRatio = e.data.windowWidth / 750, e.imgViewHeight = e.data.windowHeight - 160 * e.deviceRatio;
        var o = t.touches[0].clientX - e.croperX,
            i = t.touches[0].clientY - e.croperY,
            a = Math.min(750 * e.deviceRatio - e.data.cutW, e.data.windowWidth - e.data.cutW),
            n = e.data.windowHeight,
            s = e.data.cutL + o,
            d = e.data.cutT + i;
        s < 0 && (s = 0), s > a && (s = a), d < 0 && (d = 0), d > n && (d = n), this.setData({
            cutL: s,
            cutT: d
        }), e.croperX = t.touches[0].clientX, e.croperY = t.touches[0].clientY;
    },
    chooseVideo: function() {
        var t = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: !1,
            success: function(e) {
                cache.set('upload_data', e, 0)
                t.setData({
                    video: e.tempFilePath,
                    originalHeight: e.height,
                    originalWidth: e.width,
                    save: !1,
                    cutH: 100,
                    cutW: 100,
                    cutT: 100,
                    cutL: 100,
                    cut: !0
                });
            }
        });
    },
    getScale1: function(t, e) {
        var o = 0,
            i = 0,
            a = 0,
            n = 0,
            s = t,
            d = e,
            r = d / s,
            c = (wx.createSelectorQuery(),
                this);
        r < (i = .88 * wx.getSystemInfoSync().windowHeight) / (o = wx.getSystemInfoSync().windowWidth) ? (a = o,
                n = o * d / s) : (n = i, a = i * s / d), c.startY = i / 2 - n / 2, c.startX = o / 2 - a / 2,
            c.setData({
                videoW: a,
                videoH: n,
                videoLeft: c.startX,
                videoTop: c.startY
            });
    }, //获取code置入类型
    login: function(type, Height, Width) {
        var that = this,
            Height = Height,
            Width = Width,
            typr = type,
            video_hash = hash_data[0];
        wx.login({
            success(res) {
                console.log(type)

                if (type != 'submit') {
                    // if (tyoe_video = 'video_1') {
                    //   wx.showLoading({
                    //     title: "视频上传中"
                    //   });
                    that.upload(res.code);
                } else if (type == 'submit') {
                    wx.showLoading({
                        title: "提交中"
                    });
                    that.completeCut(res.code, Height, Width)
                } else {
                    console.log('提交参数缺少，联系客服咨询！1')
                    cache.showModal('信息获取失败，请联系客服咨询')
                    return;
                }
            },
            fail(a) {
                console.log('提交参数缺少，联系客服咨询！2')
                cache.showModal('信息获取失败，请联系客服咨询')
                return;
            }
        })
    },
    upload: function(code) {
        var that = this;
        wx.showLoading({
            title: "视频上传中"
        });
        var upload_video = that.data.video,
            Width = that.data.originalWidth,
            Height = that.data.originalHeight;
        that.getScale1(Width, Height);
        wx.uploadFile({
            url: app.globalData.video_api + '/files',
            filePath: upload_video,
            name: "file",
            method: "POST",
            formData: {
                'code': code,
                'appid': app.globalData.appid
            },
            success: function(res) {
                console.log(res)
                console.log('成功上传视频')
                if (res.statusCode == 200 || res.statusCode == 201) {
                    var hash_json = JSON.parse(res.data),
                        hash = hash_json.result.hash;
                    hash_data[0] = hash
                    that.login('submit', Height, Width)
                } else {
                    if (res.statusCode == 401) {
                        cache.showModal('错误信息，代码(code),有问题请联系客服！')
                    } else if (res.statusCode == 502) {
                        cache.showModal('错误信息，代码(502),有问题请联系客服！')
                    } else if (res.statusCode == 404) {
                        cache.showModal('错误信息，代码(404),有问题请联系客服！')
                    } else {
                        var hash_json = JSON.parse(res.data),
                            hash = hash_json.result.hash;
                        cache.showModal(hash.json.msg)
                    }
                }
            },
            fail: function(t) {
                cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）")
            }
        });
    },
    completeCut: function(code, o, i) {
        var that = this;
        that.initRatio = that.data.videoH / o;
        var d = this.data.cutL / that.initRatio - that.data.videoLeft / that.initRatio,
            r = this.data.cutT / that.initRatio - that.data.videoTop / that.initRatio,
            c = this.data.cutW / that.initRatio;
        this.data.cutW + this.data.cutL > that.data.videoW + that.data.videoLeft && (console.log("超过了楼楼"),
            c = (that.data.videoW + that.data.videoLeft - this.data.cutL) / that.initRatio);
        var u = this.data.cutH / that.initRatio;
        this.data.cutH + this.data.cutT > that.data.videoH + that.data.videoTop && (console.log("超过了高"),
            u = (that.data.videoH + that.data.videoTop - this.data.cutT) / that.initRatio), d < 0 && (c += d,
            d = 0), r < 0 && (u += r, r = 0), c > i && (console.log("超过了宽"), c = i - d), u > o && (console.log("高超过了高"),
            u = o - r);
        if (hash_data[0].length < 5) {
            cache.showModal('视频处理错误,请联系客服咨询！')
        }
        var coordinate = '"x":' + d.toFixed(0) + ',"y":' + r.toFixed(0) + ',"w":' + c.toFixed(0) + ',"h":' + u.toFixed(0),
            payload = '{"v":"' + hash_data[0] + '",' + coordinate + '}';
        console.log(payload)
        console.log(coordinate);

        wx.request({
            url: app.globalData.video_api + '/tasks',
            method: "POST",
            data: {
                code: code,
                appid: app.globalData.appid,
                type: 'crop',
                payload: payload,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            success: function(res) {
                wx.hideLoading()
                if (res.statusCode == 200 || res.statusCode == 201) {
                    console.log(res)
                    console.log('提交成功')
                    wx.removeStorageSync('video_xiugai')
                    var upload_data = cache.get('upload_data'),
                        json_upload_data = JSON.parse(JSON.stringify(upload_data));
                    cache.record(res.data.result.id, 4, (json_upload_data.duration).toFixed(2), (json_upload_data.size / 1024 / 1024).toFixed(2), res.data.result.created_at, res.data.result.expired_at)
                    if (app.globalData.mode == 2) {
                        cache.video_modify(app.globalData.appid, 1);
                    }
                    cache.showModal('视频已经在处理中，请在首页"剪辑记录下载"查看状态以及下载。')
                } else {
                    if (res.statusCode == 401) {
                        cache.showModal('错误信息，代码(code),有问题请联系客服！')
                    } else if (res.statusCode == 502) {
                        cache.showModal('错误信息，代码(502),有问题请联系客服！')
                    } else if (res.statusCode == 404) {
                        cache.showModal('错误信息，代码(404),有问题请联系客服！')
                    } else {
                        cache.showModal(res.data.msg)
                    }
                }
            },
            fail: function(e) {
                cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作")
            }
        });
    },

    onShow: function() {
        var that = this;
        that.setData({
            windowWidth: wx.getSystemInfoSync().windowWidth,
            windowHeight: wx.getSystemInfoSync().windowHeight
        })
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});