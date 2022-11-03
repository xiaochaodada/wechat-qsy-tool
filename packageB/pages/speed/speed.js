var app = getApp(),
    cache = require('../../../utils/cache'),
    hash_data = ['0'];

Page({
    data: {
        cutout: !1,
        duration: 0,
        heigh: 0,
        low: 0,
        cut: !1,
        originVideoH: 0,
        originVideoW: 0,
        save: !1,
        video: "",
        Value_X:"1.0"
     
    },
    ValueChange: function (e) {
        console.log(e)
        this.setData({
            Value_X: e.detail
        });
    },
    toSplic: function () {

        //关闭更新所有配置
        var that = this;
        if (!that.data.video) {
            wx.showToast({
                title: "您还没有选择视频",
                icon: "none"
            });
            return;
        }
        if (that.data.Value_X == "1.0"){
            wx.showToast({
                title: "1.0倍是不加速，无需更改。",
                icon: "none"
            }) 
        }else{
            wx.showModal({
                content: "您确定是更改为:" + that.data.Value_X+"倍速度？",
                success: function (t) {
                    t.confirm && that.login();
                }
            })
        }
    },
    login: function (type) {
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
                    that.submit(res.code)
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
    submit: function (code) {
        var that = this;
        if (hash_data[0].length < 5) {
            cache.showModal("提交参数缺少，联系客服咨询!")
        } else {
            var Value_X = that.data.Value_X;
            var payload = '{"v":"' + hash_data[0] + '","r":"' + Value_X + '"}';
            console.log(payload)

            wx.request({
                url: app.globalData.video_api + '/tasks',
                method: "POST",
                data: {
                    code: code,
                    appid: app.globalData.appid,
                    type: "rate",
                    payload: payload,
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                success: function (res) {
                    wx.hideLoading()
                    if (res.statusCode == 200 || res.statusCode == 201) {
                        console.log(res)
                        console.log('提交成功')
                        wx.removeStorageSync('video_xiugai')
                        var upload_data = cache.get('upload_data'),
                            json_upload_data = JSON.parse(JSON.stringify(upload_data));
                        cache.record(res.data.result.id, 7, (json_upload_data.duration).toFixed(2), (json_upload_data.size / 1024 / 1024).toFixed(2), res.data.result.created_at, res.data.result.expired_at)
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
            })
        }
    },
    upload: function (code) {
        var that = this;
        wx.showLoading({
            title: "视频上传中"
        });
        var upload_video = that.data.video;
        wx.uploadFile({
            url: app.globalData.video_api + '/files',
            filePath: upload_video,
            name: "file",
            method: "POST",
            formData: {
                'code': code,
                'appid': app.globalData.appid
            },
            success: function (res) {
                console.log(res)
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
            fail: function (t) {
                cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）")
            }
        });
    },
    onLoad: function (t) {

    },

    chooseVideo: function (e) {
        var t = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: !1,
            success: function (e) {
                console.log("时间：", e)
                cache.set('upload_data', e, 0)
                e.size > 45e6 ? wx.showToast({
                    title: "视频过大，请选择小一点的视频哦",
                    icon: "none"
                }) : t.setData({
                    timer: e.duration,
                    video: e.tempFilePath,
                    originVideoH: e.height,
                    originVideoW: e.width,
                    duration: Math.round(e.duration),
                    heigh: Math.round(e.duration),
                    save: !1,
                    cut: !0
                });
            }
        });
    },
    onShow: function () {
        console.log("1")
        hash_data = ['0']
    },
    onShareAppMessage: function () {

    }
});