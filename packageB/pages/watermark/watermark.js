var app = getApp(),
    cache = require('../../../utils/cache.js'),
    n = 0,
    s = [],
    hash_data = ['0', '1'],
    c = !0;

Page({
    data: {
        slider: !1,
        imageW: 0,
        imageH: 0,
        imageLet: 0,
        imageTop: 0,
        imageUrl: "",
        video: "",
        save: !1,
        originVideoW: 0,
        originVideoH: 0,
        isShowvip: !1,
        cutW: 0,
        cutH: 0,
        cutL: 0,
        cutT: 0,
        isChooseWidth: !1,
        isChooseColor: !1,
        isCroper: !1,
        windowWidth: 0,
        windowHeight: 0,
        bgWidth: 0,
        tempItems: {},
        page: "",
        imgViewHeight: 0,
        tempImageSrc: "",
        imgWidth: 0,
        imgHeight: 0,
        imgTop: 0,
        imgLeft: 0,
        imgList: [],
        itemList: [],
        allColor: ["#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200", "#22b14c", "#00a2e8", "#ffaec9", "#a349a4", "#ffffff", "#c3c3c3"],
        canvasHeight: 0
    },
    setOpacity: function(e) {
        var t = this;
        if (console.log("获取透明度" + s.length), s.length <= 0) wx.showToast({
            title: "请先添加水印",
            icon: "none"
        });
        else {
            var o = t.data.slider;
            t.setData({
                slider: !o
            });
        }
    },
    getOpacity: function(e) {
        var t = this,
            o = e.detail.value;
        console.log("获得=====" + o), console.log(n), s[n].opacity = o, t.setData({
            itemList: s
        });
    },
    hiddSilder: function() {
        this.setData({
            slider: !1
        });
    },

    toSpend: function(e) {
        this.spendCobin(e);
    },

    onLoad: function(t) { //加载页面
        console.log("选择视频");
        var that = this;
        that.page ? wx.removeStorageSync('pasterTag') : wx.removeStorageSync('pasterTag');
        // var upload_data = cache.get('upload_data'),
        //     json_upload_data = JSON.parse(JSON.stringify(upload_data));

        // console.log("选择视频");

        // console.log("原视频的宽高：===" + json_upload_data.width + "===" + json_upload_data.height), console.log("视频的大小：" + json_upload_data.size),
        //     json_upload_data.size > 45e6 ? wx.showToast({
        //         title: "视频太大了，不能超过50M哦",
        //         icon: "none"
        //     }) : (s = new Array(), n = null, that.setData({
        //         save: !1,
        //         itemList: s,
        //         video: json_upload_data.tempFilePath,
        //         originVideoH: json_upload_data.height,
        //         originVideoW: json_upload_data.width
        //     }));



    },
    setDropItem: function(e) {
        for (var t = 0; t < s.length; t++) s[t].active = !1;
        var o = {},
            a = this;
        wx.getImageInfo({
            src: e.url,
            success: function(t) {
                var i = a.getImgSize(t.width, t.height);
                o.width = i.width, o.height = i.height, o.image = e.url, o.id = s.length + 1, o.top = a.data.windowHeight / 2,
                    o.left = a.data.windowWidth / 2, console.log(a.data.windowHeight + "====" + o.left),
                    o.x = o.left + o.width / 2, o.y = o.top + o.height / 2, o.scale = 1, o.oScale = 1,
                    o.rotate = 1, o.active = !0, o.opacity = 1, n = s.length, console.log("这里添加图片index====" + n),
                    console.log(o), s.push(o), console.log(s), a.setData({
                        itemList: s
                    });
            }
        });
    },
    getImgSize: function(e, t) {
        var o = 0,
            a = 0,
            i = e,
            n = t,
            s = this;
        n / i < 1 ? (o = 80, a = 80 * n / i) : (a = 80, o = 80 * i / n), s.startY = 40 - a / 2,
            s.startX = 40 - o / 2;
        var c = {};
        return c.width = o, c.height = a, c;
    },
    getImgSizeText: function(e, t) {
        var o = 0,
            a = 0,
            i = e,
            n = t,
            s = this;
        n / i < .8 ? (o = 250, a = 250 * n / i) : (a = 200, o = 200 * i / n), s.startY = 100 - a / 2,
            s.startX = 125 - o / 2;
        var c = {};
        return c.width = o, c.height = a, c;
    },
    getImage: function() {
        if ((t = this).data.video) {
            var t = this;
            wx.showActionSheet({
                itemList: ["相册", "贴纸"],
                success: function(o) {
                    0 == o.tapIndex ? (wx.removeStorageSync('pasterTag'), wx.chooseImage({
                        sourceType: ["album"],
                        sizeType: ['original', 'compressed'],
                        success: function(e) {
                            var o = e.tempFilePaths[0];
                            wx.showLoading({
                                title: "检测图片可用中...",
                            })
                            t.checkImage(o); //检测图片
                            // t.setDropItem({
                            //   url: o
                            // })
                        }
                    })) : wx.navigateTo({
                        url: "./source/source?page=add"
                    });
                },
                fail: function(e) {
                    console.log(e.errMsg);
                }
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "您还没有选择视频",
            showCancel: !1
        });
    },
    checkImage: function(e) {
        var o = this;
        console.log(app.globalData.tonyon)
        wx.uploadFile({
            url: app.globalData.tonyon + "/api/jiance/api.php",
            filePath: e,
            name: "file",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data)

                if (wx.hideLoading(), 200 == t.statusCode) 0 == (a = JSON.parse(t.data)).errcode ? (wx.hideLoading(), wx.showToast({
                    title: "图片可用",
                    icon: "none"
                }), o.setDropItem({
                    url: e
                })) : "87014" == a.errcode ? wx.showToast({
                    title: "此图片可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他图片",
                    icon: "none"
                }) : "-1" == a.errcode ? wx.showToast({
                    title: "图片太大，请更换小点图片，重新试试！",
                    icon: "none"
                }) : (wx.showToast({
                    title: a.errmsg,
                    icon: "none"
                }));
                else {
                    var a = {};
                    a.errcode = 11, a.errmsg = "检测方法出错，请重新选择图片检测" + t.statusCode, wx.showToast({
                        title: a.errmsg,
                        icon: "none"
                    });
                }
            },
            fail: function(e) {
                console.log(e)
                wx.hideLoading(), wx.showToast({
                    title: "检测图片img_sec_check方法出错，请重试",
                    icon: "none"
                });
            }
        });
    },
    WraptouchStart: function(e) {
        for (var t = 0; t < s.length; t++) s[t].active = !1, e.currentTarget.dataset.id == s[t].id && (s[n = t].active = !0);
        this.setData({
            itemList: s
        }), s[n].lx = e.touches[0].clientX, s[n].ly = e.touches[0].clientY;
    },
    WraptouchMove: function(e) {
        s[n]._lx = e.touches[0].clientX, s[n]._ly = e.touches[0].clientY, s[n].left += s[n]._lx - s[n].lx,
            s[n].top += s[n]._ly - s[n].ly, s[n].x += s[n]._lx - s[n].lx, s[n].y += s[n]._ly - s[n].ly,
            s[n].lx = e.touches[0].clientX, s[n].ly = e.touches[0].clientY, this.setData({
                itemList: s
            });
    },
    oTouchStart: function(e) {
        for (var t = 0; t < s.length; t++) s[t].active = !1, e.currentTarget.dataset.id == s[t].id && (s[n = t].active = !0);
        s[n].tx = e.touches[0].clientX, s[n].ty = e.touches[0].clientY, s[n].anglePre = this.countDeg(s[n].x, s[n].y, s[n].tx, s[n].ty),
            s[n].r = this.getDistancs(s[n].x, s[n].y, s[n].left, s[n].top);
    },
    oTouchMove: function(e) {
        c && (c = !1, setTimeout(function() {
                c = !0;
            }, 100)), s[n]._tx = e.touches[0].clientX, s[n]._ty = e.touches[0].clientY, s[n].disPtoO = this.getDistancs(s[n].x, s[n].y, s[n]._tx, s[n]._ty - 20),
            s[n].scale = s[n].disPtoO / s[n].r, s[n].oScale = 1 / s[n].scale, s[n].angleNext = this.countDeg(s[n].x, s[n].y, s[n]._tx, s[n]._ty),
            s[n].new_rotate = s[n].angleNext - s[n].anglePre, s[n].rotate += s[n].new_rotate,
            s[n].angle = s[n].rotate, s[n].tx = e.touches[0].clientX, s[n].ty = e.touches[0].clientY,
            s[n].anglePre = this.countDeg(s[n].x, s[n].y, s[n].tx, s[n].ty), this.setData({
                itemList: s
            });
    },
    getDistancs: function(e, t, o, a) {
        var i = o - e,
            n = a - t;
        return Math.sqrt(i * i + n * n);
    },
    countDeg: function(e, t, o, a) {
        var i = o - e,
            n = a - t,
            s = Math.abs(i / n),
            c = Math.atan(s) / (2 * Math.PI) * 360;
        return i < 0 && n < 0 ? c = -c : i <= 0 && n >= 0 ? c = -(180 - c) : i > 0 && n < 0 ? c = c : i > 0 && n > 0 && (c = 180 - c),
            c;
    },
    deleteItem: function(e) {
        for (var t = [], o = 0; o < s.length; o++) e.currentTarget.dataset.id != s[o].id && t.push(s[o]);
        t.length > 0 && (t[t.length - 1].active = !0), s = t, this.setData({
            itemList: s
        });
    },
    showDialog: function(e) {
        var t = this;
        this.data.video ? t.addText.showDialog() : wx.showModal({
            title: "提示",
            content: "请选择视频",
            showCancel:!1
        });
    },
    get_emit: function(e) {
        var t = this,
            o = e.detail.val;
        wx.getImageInfo({
            src: o,
            success: function(e) {
                t.setDropItemText({
                    url: o
                });
            }
        });
    },
    setDropItemText: function(e) {
        for (var t = 0; t < s.length; t++) s[t].active = !1;
        var o = {},
            a = this;
        wx.getImageInfo({
            src: e.url,
            success: function(t) {
                var i = a.getImgSizeText(t.width, t.height);
                o.width = i.width, o.height = i.height, o.image = e.url, o.id = s.length + 1, o.top = 20,
                    o.left = 20, o.x = o.left + o.width / 2, o.y = o.top + o.height / 2, o.scale = 1,
                    o.oScale = 1, o.rotate = 1, o.active = !0, o.opacity = 1, n = s.length;
                for (var c in s) s[c].active = !1, s[c].id == o.id && s.splice(c, 1);
                s.push(o), a.setData({
                    itemList: s
                });
            }
        });
    },
    addMark: function() {
        if (this.data.video)
            if (s.length <= 0) wx.showModal({
                title: "温馨提示",
                content: "你还没有添加水印",
                showCancel: !1
            });
            else {
                var that = this;
                that.setData({
                    slider: !1
                });
                that.login('video_1');
                //that.uploadVideo()
            }
        else wx.showModal({
            title: "温馨提示",
            content: "您还没有选择视频",
            showCancel: !1
        });
    },
    //获取code置入类型
    login: function(type, width, height) {
        var that = this,
            type = type,
            video_hash = hash_data[0],
            width = width,
            height = height,
            img_hash = hash_data[1];
        wx.login({
            success(res) {
                console.log(type)
                console.log(video_hash)
                if (type == 'video_1') {
                    wx.showLoading({
                        title: "视频上传中"
                    });
                    that.uploadVideo(res.code);
                } else if (type == 'img_1') {
                    that.saveCanvas(res.code, width, height);
                } else if (type == 'submit') {
                    wx.showLoading({
                        title: "提交中..."
                    });
                    that.submit(res.code)
                } else {
                    console.log('提交参数缺少，联系客服咨询！1')
                    cache.showModal('提交参数缺少，联系客服咨询!')
                    return;
                }
            },
            fail(a) {
                console.log('提交参数缺少，联系客服咨询！2')
                cache.showModal('提交参数缺少，联系客服咨询!')
                return;
            }
        })
    },
    showModal: function (msg) {
        wx.hideLoading()
        wx.showModal({
            title: "温馨提示",
            content: msg,
            confirmText: "知道了",
            confirmColor: "#1AAD19",
            showCancel: false,
            success(confirmText) {
                if (confirmText.confirm) {
                    wx.navigateBack({})
                } else if (confirmText.cancel) {
                    wx.navigateBack({})
                }
            }
        });
    },
    uploadVideo: function(code) {
        var that = this,
            upload_video = that.data.video,
            width = that.data.originVideoW,
            height = that.data.originVideoH;
        that.getScale1(width, height);
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
                console.log('成功' + res)
                console.log('成功上传视频')
                if (res.statusCode == 200 || res.statusCode == 201) {
                    var hash_json = JSON.parse(res.data),
                    hash = hash_json.result.hash;
                hash_data[0] = hash
                that.login('img_1', width, height)
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
            fail: function(e) {
                cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）")
            }
        });
    },
    submit: function(code) {
        var that = this;
        if (hash_data[0].length < 5 || hash_data[1].length < 5) {
            cache.showModal("提交参数缺少，联系客服咨询!")
        } else {
            var payload = '{"v":"' + hash_data[0] + '","...":[{"i":"' +
                hash_data[1] + '","x":0,"y":0}]}';
            console.log(payload)

            wx.request({
                url: app.globalData.video_api + '/tasks',
                method: "POST",
                data: {
                    code: code,
                    appid: app.globalData.appid,
                    type: 'overlay',
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
                    cache.record(res.data.result.id, 3, (json_upload_data.duration).toFixed(2), (json_upload_data.size / 1024 / 1024).toFixed(2), res.data.result.created_at, res.data.result.expired_at)
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
                fail:function(e){
                    cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作")
                }
            })
        }
    },
    saveCanvas: function(code, width, height) {
        var that = this;
        that.initRatio = that.data.videoH / height, wx.showLoading({
            title: "加水印中..."
        });
        var i = wx.createCanvasContext("mycanvas");
        that.toSaveImg(s, i, height), i.draw(!1, void setTimeout(function() {
            that.saveImgUseTempCanvas(that, 500, null, code, width, height);
        }, 1e3));
    },
    saveImgUseTempCanvas: function(t, o, a, code, width, height) {
        var that = this;
        console.log("width:" + width + "=========height:" + height), console.log("delay:====" + o),
            console.log("将canvas转换成图片"), wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: width,
                height: height,
                destWidth: width,
                destHeight: height,
                fileType: "png",
                quality: 1,
                canvasId: "mycanvas",
                success: function(o) {
                    //加水印成功
                    console.log(o.tempFilePath)
                    wx.uploadFile({
                        url: app.globalData.video_api + '/files',
                        filePath: o.tempFilePath,
                        name: "file",
                        method: "POST",
                        formData: {
                            'code': code,
                            'appid': app.globalData.appid
                        },
                        success: function(res) {
                            console.log(res)
                            console.log('成功上传img视频')
                            if (res.statusCode == 200 || res.statusCode == 201) {
                            var img_hash_json = JSON.parse(res.data),
                                img_hash = img_hash_json.result.hash;
                            console.log(res)
                            hash_data[1] = img_hash
                            that.login('submit')
                            }else{
                                if (res.statusCode == 401) {
                                    cache.showModal('错误信息，代码(code),有问题请联系客服！')
                                } else {
                                    var hash_json = JSON.parse(res.data),
                                        hash = hash_json.result.hash;
                                    cache.showModal(hash.json.msg)
                                }
                            }
                        },
                        fail: function(e) {
                            cache.showModal("错误，原因：1.可能服务器拥堵，可尝试重新上传操作2.（上传视频时长超过小程序规定的时长(1分钟) ，解决方法：1.前往修改视频页面勾选压缩上传，2.早上上传，避免上传高峰期）")
                        }
                    });
                },
                fail: function(e) {
                    console.log(e), console.log("将canvas转成图片失败"), wx.showToast({
                        title: "saveImgUseTempCanvas调用失败" + e.errMsg,
                        icon: "none"
                    });
                },
                complete: function() {
                    console.log("wx.saveImgToCanvas完成"), wx.removeStorageSync('pasterTag');
                }
            });
    },
    toSaveImg: function(e, t, o) {
        var a = this;
        console.log("画布有的东西"), console.log(e);
        for (var i = a.data.videoH / o, n = 0; n < e.length; n++) {
            t.save(), t.translate((e[n].x - a.data.videoLeft) / i, (e[n].y - a.data.videoTop) / i),
                e[n].angle || (e[n].angle = 0), t.rotate(e[n].angle / 180 * Math.PI), t.scale(e[n].scale, e[n].scale),
                t.translate(-(e[n].x - a.data.videoLeft) / i, -(e[n].y - a.data.videoTop) / i),
                t.globalAlpha = e[n].opacity;
            var s = (e[n].left - a.data.videoLeft) / i,
                c = (e[n].top - a.data.videoTop) / i,
                r = e[n].width / i,
                o = e[n].height / i;
            console.log("水印的位置：left==" + s + "=====top:==" + c + "====width:===" + r + "====height===" + o),
                t.drawImage(e[n].image, (e[n].left - a.data.videoLeft) / i, (e[n].top - a.data.videoTop) / i, e[n].width / i, e[n].height / i),
                t.restore();
        }
    },
    getVideo: function() {
        console.log("选择视频");
        var e = this;
        wx.chooseVideo({
            sourceType: ["album"],
            compressed: !1,
            success: function(t) {
                cache.set('upload_data', t, 0)
                console.log("原视频的宽高：===" + t.width + "===" + t.height), console.log("视频的大小：" + t.size),
                    t.size > 45e6 ? wx.showToast({
                        title: "视频太大了，不能超过50M哦",
                        icon: "none"
                    }) : (s = new Array(), n = null, e.setData({
                        save: !1,
                        itemList: s,
                        video: t.tempFilePath,
                        originVideoH: t.height,
                        originVideoW: t.width
                    }));
            }
        });
    },
    reChooseVideo: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: ["album"],
            success: function(t) {
                t.size > 45e6 ? wx.showToast({
                    title: "视频太大了，不能超过50M哦",
                    icon: "none"
                }) : (s = new Array(), n = null, e.setData({
                    save: !1,
                    itemList: s,
                    video: t.tempFilePath,
                    originVideoH: t.height,
                    originVideoW: t.width
                }));
            }
        });
    },
    getScale1: function(e, t) {
        var o = 0,
            a = 0,
            i = 0,
            n = 0,
            s = e,
            c = t,
            r = c / s,
            d = (wx.createSelectorQuery(),
                this);
        r < (a = .9 * wx.getSystemInfoSync().windowHeight) / (o = wx.getSystemInfoSync().windowWidth) ? (i = o,
                n = o * c / s) : (n = a, i = a * s / c), d.startY = a / 2 - n / 2, d.startX = o / 2 - i / 2,
            d.setData({
                videoW: i,
                videoH: n,
                videoLeft: d.startX,
                videoTop: d.startY,
                bgHeight: a,
                bgWidth: o
            });
    },
    onShow: function() {
        var that = this;

        that.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight,
            windowWidth: wx.getSystemInfoSync().windowWidth
        });
    
        var img_data = wx.getStorageSync('pasterTag');
        console.log("============" + img + "===========");
        var img = wx.getStorageSync(img_data);
        console.log("已经下载过的图片"), console.log(img), img && that.setDropItem({
            url: img.img_url
        });
    },
    onHide: function() {
        console.log("页面隐藏unHide"), wx.removeStorageSync('pasterTag');
    },
    onUnload: function() {
        console.log("使用");
        var t = this;
        wx.removeStorageSync('pasterTag'), s = new Array(), t.setData({
            video: "",
            itemList: []
        }),  t.downloadTask && t.downloadTask.abort();
    },

    onReady: function() {
        this.addText = this.selectComponent("#addText")
    }
});