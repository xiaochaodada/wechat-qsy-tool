var dtime = '_deadtime';

function set(k, v, t) {
    wx.setStorageSync(k, v)
    var seconds = parseInt(t);
    if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        wx.setStorageSync(k + dtime, timestamp + "")
    } else {
        wx.removeStorageSync(k + dtime)
    }
}

function get(k, def) {
    var deadtime = parseInt(wx.getStorageSync(k + dtime))
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            if (def) {
                return def;
            } else {
                return;
            }
        }
    }
    var res = wx.getStorageSync(k);
    if (res) {
        return res;
    } else {
        return def;
    }
}

function Download_Video_frequency(k) {
    let Download_Video_frequency = wx.getStorageSync("Download_Video_frequency" + getDateStr(0));
    if (k == 5) {
        if (Download_Video_frequency != null) {
            if (Download_Video_frequency > 0) {
                return true;
            } else {
                return false;
            }

        } else {
            wx.removeStorageSync("Download_Video_frequency" + getDateStr(-1))
            return false;
        }
    }
    if (k) {
        if (Download_Video_frequency != null) {
            wx.removeStorageSync("Download_Video_frequency" + getDateStr(-1))
            if (Download_Video_frequency > 0) {
                Download_Video_frequency = Download_Video_frequency - 1;
                wx.setStorage({
                    key: "Download_Video_frequency" + getDateStr(0),
                    data: Download_Video_frequency
                })
                return true;
            } else {
                return false;
            }
        } else {
            wx.removeStorageSync("Download_Video_frequency" + getDateStr(-1))
            return false;
        }
    } else {
        if (Download_Video_frequency != null) {
            wx.removeStorageSync("Download_Video_frequency" + getDateStr(-1))
            Download_Video_frequency = Download_Video_frequency + 1;
            wx.setStorage({
                key: "Download_Video_frequency" + getDateStr(0),
                data: Download_Video_frequency
            })
        } else {
            wx.setStorage({
                key: "Download_Video_frequency" + getDateStr(0),
                data: 1
            })
            wx.removeStorageSync("Download_Video_frequency" + getDateStr(-1))
        }
    }
}

function remove(k) {
    wx.removeStorageSync(k);
    wx.removeStorageSync(k + dtime);
}

function getDateStr(addDayCount) {
    var date;
    date = new Date();
    date.setDate(date.getDate() + addDayCount); //获取AddDayCount天后的日期 
    var y = date.getFullYear();
    var m = date.getMonth() + 1; //获取当前月份的日期 
    var d = date.getDate();
    if (m < 10) {
        m = '0' + m;
    };
    if (d < 10) {
        d = '0' + d;
    };
    console.log(y + "-" + m + "-" + d)
    return y + "-" + m + "-" + d;
}

function clear() {
    wx.clearStorageSync();
}
//储存解析记录
function record(Video_id, Type, Duration, Filesize, CreationTime, ExpirationDate) {
    var notesExprs = function(expr) {
        //获取存储数据的数组
        var exprs = wx.getStorageSync("uploadrecord") || []
        //向数组中添加新的元素
        exprs.unshift(expr)
        //将添加的元素存储到本地
        wx.setStorageSync("uploadrecord", exprs)
    }

    var str = {
        "Video_id": Video_id, //视频id
        "Type": Type, //视频类型
        "Duration": Duration, //视频长度
        "Filesize": Filesize, //视频大小
        "CreationTime": CreationTime, //上传时间
        "ExpirationDate": ExpirationDate //到期时间
    };
    console.log("视频类型：", Type)

    var exprsss = wx.getStorageSync("uploadrecord") || [];
    if (exprsss.length > 15) {
        var arr = wx.getStorageSync("uploadrecord");
        arr.splice(14, 1);
        wx.setStorageSync("uploadrecord", arr);
        notesExprs(str);
    } else {
        notesExprs(str);
    }
}


module.exports = {
    set: set,
    get: get,
    record: record,
    remove: remove,
    clear: clear,
    getDateStr: getDateStr,
    Download_Video_frequency: Download_Video_frequency,
    showModal: function(msg) {
        wx.hideLoading()
        wx.showModal({
            title: "温馨提示",
            content: msg,
            confirmText: "知道了",
            confirmColor: "#1AAD19",
            showCancel: false,
            success(confirmText) {
                if (confirmText.confirm) {
                    if (msg == '视频已经在处理中，请在首页"剪辑记录下载"查看状态以及下载。') {
                        wx.navigateTo({
                            url: '/pages/xiugai/xiugai'
                        })
                    } else {
                        wx.navigateBack({})
                    }
                } else if (confirmText.cancel) {
                    wx.navigateBack({})
                }
            }
        });
    },
    video_modify: function(appid, type, fun) {
        wx.login({
            success: function(res) {
                wx.request({
                    url: getApp().globalData.tonyon + '/api/WeChat/user/video_modify.php',
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: appid,
                        type: type
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(a) {
                        console.log(a)
                        if (type == 0) {
                            if (a.data.code == 200) {
                                fun(1)
                            } else {
                                fun(0)
                            }
                        } else {
                            return 1;
                        }
                    },
                    fail: function(e) {
                        fun(0)
                    }
                })
            },
            fail: function(e) {
                fun(0)
            }
        })
    },
    checktext: function(text, success, fail) {
        wx.request({
            url: getApp().globalData.tonyon + "/api/jiance/api.php",
            method: "POST",
            data: {
                content: text
            },
            header: {
                "content-type": "content:application/json;chartset=uft-8"
            },
            success: function(t) {
                console.log(t.data.errcode)
                if (wx.hideLoading(), 200 == t.statusCode) {
                    0 == (a = JSON.parse(JSON.stringify(t.data)).errcode) ? (success()) : "87014" == a.errcode ? fail("此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本") : fail(a.errmsg), console.log("此视");
                } else {
                    var a = {};
                    a.errcode = 11, a.errmsg = "检测方法出错，请重新输入文本检测" + t.statusCode, fail(a.errmsg)
                }
            },
            fail: function(e) {
                fail("检测文本方法出错，请重试")
            }
        });
    },
    checkimg:function(file, success, fail){
        wx.uploadFile({
            url: getApp().globalData.tonyon + "/api/jiance/api.php",
            filePath: file,
            name: "file",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data)
                if (wx.hideLoading(), 200 == t.statusCode) 0 == (a = JSON.parse(t.data)).errcode ? (wx.hideLoading(), success()) : "87014" == a.errcode ? fail('此图片可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他图片') : "-1" == a.errcode ? fail('图片太大，请更换小点图片，重新试试！') : (fail(a.errmsg));
                else {
                    var a = {};
                    a.errcode = 11, a.errmsg = "检测方法出错，请重新选择图片检测" + t.statusCode, fail(a.errmsg)
                }
            },
            fail: function(e) {
                console.log(e)
               fail('检测图片img_sec_check方法出错，请重试')
            }
        });
    }
}