var app = getApp(),
    a = new Array(),
    s = null,
    cache = require('../../../utils/cache.js'),
    hash_data = ['0'];

Page({
    data: {
        save: !1,
        duration: 0,
        timer: 0,
        itemList: [],
        play: !1,
        remark: !0,
        remove: !1,
        video: "",
        videoW: 0,
        videoH: 0,
        videoLeft: 0,
        videoTop: 0,
    },
    deleteAll: function() {
        a = new Array(), this.setData({
            itemList: a
        });
    },
    //触摸开始
    drawStart: function(t) {
        console.log("触摸开始");
        var that = this;
        this.lx = t.touches[0].clientX, this.ly = t.touches[0].clientY;
        for (var o in a) a[o].active = !1;
        console.log("页面大小==" + .05 * wx.getSystemInfoSync().windowWidth);
        var i = {
            id: a.length + 1,
            x: this.lx - that.data.videoLeft,
            y: this.ly - that.data.videoTop,
            width: 0,
            height: 0,
            active: !0
        };
        s = a.length, console.log(i), a.push(i);
    },
    drawMove: function(t) {
        console.log("index==" + s), this._lx = t.touches[0].clientX, this._ly = t.touches[0].clientY,
            this.dragLengthX = this._lx - this.lx, this.dragLengthY = this._ly - this.ly, a[s].width = this.dragLengthX,
            a[s].height = this.dragLengthY, this.setData({
                itemList: a
            });
    },
    //加载页面
    onLoad: function(e) {
        var that = this;
    
    },
    getScale1: function(t, e) {
        var o = 0,
            i = 0,
            n = 0,
            a = 0,
            s = t,
            r = e,
            d = r / s,
            l = (wx.createSelectorQuery(),
                this);
        i = .88 * wx.getSystemInfoSync().windowHeight, o = wx.getSystemInfoSync().windowWidth,
            console.log("view的高：" + i + "===view的宽" + o), d < i / o ? (n = o, a = o * r / s) : (a = i,
                n = i * s / r), console.log("图片显示的大小" + n + "--" + a), l.startY = i / 2 - a / 2,
            l.startX = o / 2 - n / 2, l.setData({
                videoW: n,
                videoH: a,
                videoLeft: l.startX,
                videoTop: l.startY
            });
    },
    getVideo: function() {
        var t = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: !1,
            success: function(e) {
                t.getScale1(e.width, e.height);
                cache.set('upload_data', e, 0)
                var o = {};
                o = {
                    id: a.length + 1,
                    width: 100,
                    height: 35,
                    active: !0,
                    y: 5,
                    color: Math.floor(256 * Math.random()).toString(16),
                    x: 5
                }, a.push(o), t.setData({
                    itemList: a,
                    remark: !0,
                    video: e.tempFilePath,
                    duration: Math.floor(e.duration),
                    originVideoH: e.height,
                    originVideoW: e.width,
                    save: !1
                });
            }
        });
    },
    addText: function() {
        this.data.itemList;
        console.log("添加");
        for (var t = 0; t < a.length; t++) a[t].active = !1;
        var e = {
            id: a.length + 1,
            width: 100,
            height: 30,
            active: !0,
            top: 0,
            color: Math.floor(256 * Math.random()).toString(16),
            left: 0
        };
        a.push(e), console.log(a), this.setData({
            itemList: a,
            remark: !0
        });
    },
    WraptouchStart: function(t) {
        console.log("移动------------------------------------"), console.log("点击的id" + t.currentTarget.dataset.id),
            console.log(a);
        for (var e = 0; e < a.length; e++) a[e].active = !1, t.currentTarget.dataset.id == a[e].id && (a[s = e].active = !0);
        a[s].lx = t.touches[0].clientX, a[s].ly = t.touches[0].clientY, this.setData({
            itemList: a
        });
    },
    WraptouchMove: function(t) {
        var e = this;
        a[s]._lx = t.touches[0].clientX, a[s]._ly = t.touches[0].clientY, a[s].x += a[s]._lx - a[s].lx,
            a[s].y += a[s]._ly - a[s].ly, a[s].x < 0 && (a[s].x = 0);
        e.data.videoW, a[s].width;
        a[s].y < 0 && (a[s].y = 0), a[s].lx = t.touches[0].clientX, a[s].ly = t.touches[0].clientY,
            this.setData({
                itemList: a
            });
    },
    drawEnd: function() {
        console.log("hhhh------------");
    },
    dragPointStart: function(t) {
        for (var e = 0; e < a.length; e++) a[e].active = !1, t.currentTarget.dataset.id == a[e].id && (a[s = e].active = !0);
        a[s].lx = t.touches[0].clientX, a[s].ly = t.touches[0].clientY, this.setData({
            itemList: a
        });
    },
    dragPointMove: function(t) {
        console.log("缩放");
        var e = this;
        a[s]._lx = t.touches[0].clientX, a[s]._ly = t.touches[0].clientY, a[s].width += a[s]._lx - a[s].lx,
            a[s].height += a[s]._ly - a[s].ly, a[s].width < 10 && (a[s].width = 10), a[s].height < 10 && (a[s].height = 10),
            a[s].lx = t.touches[0].clientX, a[s].ly = t.touches[0].clientY, e.setData({
                itemList: a
            });
    },
    onReady: function() {
        this.videoC = wx.createVideoContext("myvideo");
    },
    pauseVideo: function() {
        this.videoC.pause();
        this.data.play;
        this.setData({
            play: !0
        });
    },
    playVideo: function() {
        this.videoC.play(), this.setData({
            play: !1
        });
    },
    seeStatus: function() {
        console.log(this.videoC.play());
    },
    end: function() {
        console.log("播放结束"), this.setData({
            play: !0
        });
    },
    getTimer: function(t) {
        var e = t.detail.currentTime,
            o = Math.floor(e);
        console.log(o), this.setData({
            timer: o
        });
    },
    slider3change: function(t) {
        t.value = this.data.timer;
    },
    seekVideo: function(t) {
        this.videoC.seek(10);
    }, //获取code置入类型
    login: function(type) {
        var that = this,
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
                    that.toRemove(res.code)
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
        if (a.length < 1) wx.showToast({
            title: "你还没有任何操作",
            icon: "none"
        });
        else {
            var upload_video = that.data.video;
            wx.showLoading({
                title: "视频上传"
            })
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
                    console.log('成功' + res)
                    console.log('成功上传视频')
                    if (res.statusCode == 200 || res.statusCode == 201) {
                        var hash_json = JSON.parse(res.data),
                            hash = hash_json.result.hash;
                        hash_data[0] = hash
                        that.login('submit')
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
                fail: function() {
                    cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）")
                },
                complete: function() {}
            });
        }
    },
    toRemove: function(code) {
        var that = this;
        var i = '',
            n = '';
        that.initRatio = that.data.videoH / that.data.originVideoH, console.log("显示比例" + that.initRatio);
        for (var s = "", r = 0; r < a.length; r++) s = s + (s == 0 ? '' : ',') + '{"x":' + (d = a[r].x / that.initRatio).toFixed(0) + ',"y":' + (l = a[r].y / that.initRatio).toFixed(0) + ',"w":' + (a[r].width / that.initRatio).toFixed(0) + ', "h":' + (a[r].height / that.initRatio).toFixed(0) + '}';
        var d = (i = s.split(","))[0].split(":")[1],
            l = i[0].split(":")[1];
        if (hash_data[0].length < 5) {
            cache.showModal('视频处理错误,请联系客服咨询！')
        }

        var coordinate = '[' + s + ']',
            payload = '{"v":"' + hash_data[0] + '","...":' + coordinate + '}';
        console.log(payload)
        console.log(coordinate)
        console.log("x===" + d + "------y===" + l), d < 0 || l < 0 ? wx.showModal({
            title: "温馨提示",
            content: "水印框不能超出视频外哦"
        }) : "" != code && null != code ? wx.request({
            url: app.globalData.video_api + '/tasks',
            method: "POST",
            data: {
                code: code,
                appid: app.globalData.appid,
                type: 'delogo',
                payload: payload,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            success: function(res) {
                console.log(res)
                console.log('提交成功')
                wx.hideLoading()
                if (res.statusCode == 200 || res.statusCode == 201) {
                    wx.removeStorageSync('video_xiugai')
                    var upload_data = cache.get('upload_data'),
                        json_upload_data = JSON.parse(JSON.stringify(upload_data));
                    cache.record(res.data.result.id, 2, (json_upload_data.duration).toFixed(2), (json_upload_data.size / 1024 / 1024).toFixed(2), res.data.result.created_at, res.data.result.expired_at)
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
            }
            }) : cache.showModal('视频未成功上传，请重新操作上传视频!')
    },
    play: function() {
        this.setData({
            play: !1
        });
    },
    deleteItem: function(t) {
        console.log("删除按钮:", t);
        for (var e = 0; e < a.length; e++) t.currentTarget.dataset.id == a[e].id && (a.splice(e, 1),
            this.setData({
                itemList: a
            }));
    },
    onShow: function() {

    },
    onHide: function() {},
    onUnload: function() {
        console.log("这里是关闭也remove页面"), this.downloadTask && this.downloadTask.abort(), this.uploadPro && this.uploadPro.abort(),
            a = new Array(), this.setData({
                itemList: []
            });
    }
});