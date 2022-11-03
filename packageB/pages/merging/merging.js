var app = getApp(),
    cache = require('../../../utils/cache.js'),
    hash_data = [1, 2, 3],
    a = "",
    d = 0,
    c = [];
let isCompressed = wx.getStorageSync("isCompressed");

Page({
    data: {
        start: "",
        progress: 0,
        save: !1,
        video1: "",
        video2: "",
        videoW: 0,
        videoH: 0,
        videoLeft: 0,
        videoTop: 0,
        bgHeight: 0,
        bgWidth: 0,
        video: "",
        videoWidth: 0,
        videoHeight: 0,
        motto: "Hello World",
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function(t) {
        hash_data = [1, 2, 3]
        isCompressed = wx.getStorageSync("isCompressed");
    },
    chooseV: function(e) {
        var t = this;
        e.currentTarget.dataset.type;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: isCompressed == true ? true : false,
            success: function(e) {
                console.log(e), e.duration < 1 ? wx.showModal({
                    title: "提示",
                    content: "视频长度须>=1秒，请重新选择。",
                    showCancel: !1
                }) : e.size >= 52428800 ? wx.showModal({
                    title: "提示",
                    content: "视频尺寸须<50M，请重新选择。",
                    showCancel: !1
                }) : (
                    t.setData({
                        video: e.tempFilePath,
                        videoWidth: e.width,
                        videoHeight: e.height,
                        video_size: e.size,
                        video_duration: e.duration,
                        save: !1
                    }), hash_data[1] = e.tempFilePath)
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    chooseVideo1: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: isCompressed == true ? true : false,
            success: function(t) {
                console.log(t), t.duration < 1 ? wx.showModal({
                    title: "提示",
                    content: "视频长度须>=1秒，请重新选择。",
                    showCancel: !1
                }) : t.size >= 52428800 ? wx.showModal({
                    title: "提示",
                    content: "视频尺寸须<50M，请重新选择。",
                    showCancel: !1
                }) : (
                e.setData({
                    video1: t.tempFilePath,
                    video1_size: t.size,
                    video1_duration: t.duration,
                    save: !1
                }), hash_data[0] = t.tempFilePath)
            }
        });
    },
    chooseVideo2: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: isCompressed == true ? true : false,
            success: function(t) {
                console.log(t), t.duration < 1 ? wx.showModal({
                    title: "提示",
                    content: "视频长度须>=1秒，请重新选择。",
                    showCancel: !1
                }) : t.size >= 52428800 ? wx.showModal({
                    title: "提示",
                    content: "视频尺寸须<50M，请重新选择。",
                    showCancel: !1
                }) : (
                e.setData({
                    video2: t.tempFilePath,
                    video2_size: t.size,
                    video2_duration: t.duration,
                    save: !1
                }), hash_data[2] = t.tempFilePath)
            }
        });
    },
    toBack: function() {
        this.setData({
            save: !1,
            video: ""
        });
    }, //获取code置入类型
    login: function(type, upload_times) {
        var that = this,
            upload_times = upload_times,
            typr = type;
        wx.login({
            success(res) {
                console.log(type)
                if (type == 'video_1' && upload_times == 1) {
                    that.uploadVideo(res.code, upload_times)
                } else if (type == 'video_2') {

                    hash_data[0].length > 5 ? that.uploadVideo(res.code, upload_times - 1) : that.login('video_3', upload_times);
                } else if (type == 'video_3') {
                    if (upload_times == 0) {
                        upload_times = 1
                    }

                    hash_data[2].length > 5 ? that.uploadVideo(res.code, upload_times + 1) : that.login('submit', upload_times);
                } else if (type == 'submit') {
                    wx.showLoading({
                        title: "提交中"
                    });
                    that.concatVideo(res.code)
                } else {
                    console.log('提交参数缺少，联系客服咨询！1')
                    wx.showModal({
                        title: '提示',
                        content: '提交参数缺少，联系客服咨询！',
                        showCancel: !1
                    })
                }
            },
            fail(a) {
                console.log('提交参数缺少，联系客服咨询！2')
                wx.showModal({
                    title: "提示",
                    content: "信息获取失败，请联系客服咨询！",
                    showCancel: !1
                });
                return;
            }
        })
    },
    uploadBefore: function(code, upload_times) {
        var e = this;
        console.log("vids的长" + hash_data.length);
        for (var t in hash_data) console.log('循环' + hash_data[t]);
        hash_data[1].length < 5 ? wx.showModal({
            title: "温馨提示",
            content: "您还没有选择主视频哦"
        }) : hash_data[0].length < 4 && hash_data[2].length < 4 ? wx.showModal({
            title: "温馨提示",
            content: "至少要选择加片头或者片尾"
        }) : (console.log("vids[0].length==" + hash_data[0].length), console.log("vids[2].length==" + hash_data[2].length),
            hash_data[0].length < 5 ? hash_data.splice(0, 1) : hash_data[2].length < 5 && hash_data.splice(2, 1), e.login('video_1', 1));
    },
    uploadVideo: function(code, upload_times) {
        var that = this,
            text_upload = upload_times;
        text_upload == 0 ? text_upload = '片头' : text_upload == 2 ? text_upload = '片尾' : text_upload = '主'
        wx.showLoading({
            title: '正在上传"' + text_upload + '"视频中'
        })
        wx.uploadFile({
            url: app.globalData.video_api + '/files',
            filePath: hash_data[upload_times],
            name: "file",
            method: "POST",
            formData: {
                'code': code,
                'appid': app.globalData.appid
            },
            success: function(res) {
                console.log(res)
                console.log('成功上传' + text_upload + '视频')
                if (res.statusCode == 200 || res.statusCode == 201) {
                    var hash_json = JSON.parse(res.data),
                        hash = hash_json.result.hash;
                    if (upload_times == 1) {
                        hash_data[1] = hash, that.login('video_2', upload_times)
                    } else if (upload_times == 0) {
                        hash_data[0] = hash, that.login('video_3', upload_times)
                    } else if (upload_times == 2) {
                        wx.showLoading({
                            title: "正在提交..."
                        })
                        hash_data[2] = hash, that.login('submit', upload_times)
                    } else {
                        cache.showModal("视频未成功上传，请重新操作上传视频!")
                    }
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
    getScale1: function(e, t) {
        var o = 0,
            i = 0,
            s = 0,
            n = 0,
            a = e,
            d = t,
            c = d / a,
            r = this;
        wx.createSelectorQuery().select(".main").boundingClientRect(function(e) {
            i = e.height, o = e.width, c < i / o ? (s = o, n = o * d / a) : (n = i, s = i * a / d),
                r.startY = i / 2 - n / 2, r.startX = o / 2 - s / 2, r.setData({
                    videoW: s,
                    videoH: n,
                    videoLeft: r.startX,
                    videoTop: r.startY,
                    bgHeight: i,
                    bgWidth: o
                });
        }).exec(), wx.hideLoading();
    },
    saveVideo: function() {
        var e = this,
            t = (e.data.save, e.data.video);
        e.ShowProgress(), e.downloadTask = wx.downloadFile({
            url: t,
            success: function(e) {
                wx.hideLoading(), wx.saveVideoToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "视频成功保存大相册",
                            icon: "none"
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "视频保存失败" + e.errMsg,
                            icon: "none"
                        });
                    }
                });
            },
            fail: function(t) {
                e._cancelPress(), wx.showToast({
                    title: "视频下载失败" + t.errMsg,
                    icon: "none"
                });
            }
        }), e.downloadTask.onProgressUpdate(function(t) {
            100 === t.progress ? (e._cancelPress(), e.setData({
                progress: "",
                isShowVideo: !0
            })) : e.setData({
                progress: t.progress + "%",
                isShowVideo: !1
            });
        });
    },
    concatVideo: function(code) {
        var that = this,
            payload = '{"v": [',
            array = new Array(),
            video_size_data = 0,
            video_duration_data = 0;
        for (var i = 0; i < hash_data.length; i++) {
            var hash = hash_data[i];
            switch (i) {
                case 0:
                    if (hash_data[i].length == 40) {
                        array[array.length] = '"' + hash + '"';
                        console.log(that.data.video1_size)
                        video_size_data += that.data.video1_size
                        video_duration_data += that.data.video1_duration
                    }
                    break;
                case 1:
                    if (hash_data[i].length != 40) {
                        // 中断流程 弹出提示 未选择主体视频
                        console.log('未选择主体视频');
                        cache.showModal("视频未成功上传，请重新操作上传视频!")
                        return;
                    }
                    video_size_data += that.data.video_size
                    video_duration_data += that.data.video_duration
                    array[array.length] = '"' + hash + '"';
                    break;
                case 2:
                    if (hash_data[i].length == 40) {
                        array[array.length] = '"' + hash + '"';
                        video_size_data += that.data.video2_size
                        video_duration_data += that.data.video2_duration
                    }
                    break;
            }
        }
        payload += array.join(', ');
        payload += ']}';
        console.log('payload: ' + payload);
        // var video_1 = hash_data[0],
        //   video_2 = hash_data[2], payload = '';
        // hash_data[0].length == 40 && hash_data[1].length == 40 && hash_data[2].length == 40 ? payload = '{"v":["' + video_1 + '","' + hash_data[1] + '","' + video_2 + '"]}' : (hash_data[0].length == 40 ? payload = '{"v":["' + hash_data[1] + '","' + video_2 + '"]}' : (hash_data[2].length == 40 ? video_2 = hash_data[2] : payload = '{"v":["' + video_1 + '","' + hash_data[1] + '"]}'))
        // console.log(payload)

        wx.request({
            url: app.globalData.video_api + '/tasks',
            method: "POST",
            data: {
                code: code,
                appid: app.globalData.appid,
                type: 'concat',
                payload: payload,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            success: function(res) {
                if (res.statusCode == 200 || res.statusCode == 201) {
                    wx.hideLoading(), console.log(res), console.log('提交成功'), wx.removeStorageSync('video_xiugai')
                    cache.record(res.data.result.id, 5, (video_duration_data).toFixed(2), (video_size_data / 1024 / 1024).toFixed(2), res.data.result.created_at, res.data.result.expired_at)
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
            fail: function (e) {
                cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作")
            }
        });
    },
    test: function() {
        wx.navigateTo({
            url: "../test/test"
        });
    },
    showDialog: function(e) {
        var t = e.currentTarget.dataset.start;
        this.setData({
            start: t
        }), this.select.showDialog();
    },
    _cancelEvent: function() {
        this.select.hideDialog();
    },
    _confirmEvent: function() {
        this.select.hideDialog();
    },
    get_emit: function(e) {
        console.log('get_emit')
        var t = this,
            o = e.detail.val;
        t.data.start;
        wx.chooseVideo({
            compressed: !1,
            success: function(e) {
                "first" == o ? (t.setData({
                    save: !1,
                    video1: e.tempFilePath,
                    originVideoH: e.height,
                    originVideoW: e.width
                }), n[0] = e.tempFilePath) : (t.setData({
                    save: !1,
                    video2: e.tempFilePath,
                    originVideoH: e.height,
                    originVideoW: e.width
                }), n[2] = e.tempFilePath);
            }
        });
    },
    onReady: function() {
        this.select = this.selectComponent("#select"), this.myprogress = this.selectComponent("#myprogress");
    },
    onShow: function() {

    },

});