var app = getApp(),a = new Array(),
  o = (new Array(),
    new Array(), new Array());

new Array(), new Array();

Page({
  data: {
    page: "",
    progressId: 0,
    progress: "",
    img_name: "",
    img_tag: 0,
    showType: 65,
    showImg: 67,
    imgUrl: app.globalData.tonyon+'/api/tu/',
    paList: [],
    itemList: [],
    imageTypeList: [],
    videoTypeList: [],
    imgBgList: [],
    imgCoverList: [],
    imgList: [],
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  onLoad: function(e) {
    var t = this;
    console.log("首页传过来的图片的尺寸比例：" + e.imgscale);
    var a = 1;
    t.setData({
      page: e.page
    }), "frame" == e.page ? (wx.setNavigationBarTitle({
      title: "相框"
    }), e.imgscale && (a = e.imgscale), console.log("===========" + a), t.getCategory(a)) : (wx.setNavigationBarTitle({
      title: "贴纸"
    }), t.getPaster());
  },
  getPaster: function(t) {
    var a = this;
    wx.request({
      url: app.globalData.tonyon+'/api/tu/img_calss.php',
      method: "POST",
      data: {
        class_tag: 83
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(e) {
        console.log(e), console.log(e.data.data), e.data && 1 == e.data.return_code && e.data.data.length > 0 ? (o = e.data.data,
          a.setData({
            itemList: e.data.data,
            img_tag: o[0].id,
            img_name: "paster"
          }), a.getGoodsInfo(o[0].id)) : wx.showToast({
          title: "暂时没有素材",
          icon: "none"
        });
      }
    });
  },
  getCategory: function(t) {
    var a = this;
    wx.request({
      url: 'https://www.shoudaokeji.com/index.php/v14/goods_class_factory/get_all_stick_class/',
      method: "POST",
      data: {
        class_tag: 75
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(e) {
        console.log(e.data.data), o = e.data.data;
        for (var n = 0; n < o.length; n++)
          if (t > .5 && t < .7) {
            if (o[n].name.indexOf("9:16") > -1) {
              a.setData({
                img_tag: o[n].id,
                img_name: "n-and-sixteen"
              }), a.getGoodsInfo(o[n].id);
              break;
            }
          } else if (t > .95 && t < 1.1) {
          if (o[n].name.indexOf("1:1") > -1) {
            a.setData({
              img_tag: o[n].id,
              img_name: "one"
            }), a.getGoodsInfo(o[n].id);
            break;
          }
        } else if (o[n].name.indexOf("16:9") > -1) {
          a.setData({
            img_tag: o[n].id,
            img_name: "sixteen-and-n"
          }), a.getGoodsInfo(o[n].id);
          break;
        }
        a.setData({
          itemList: e.data.data
        });
      }
    });
  },
  getGoodsInfo: function(t) {
    wx.showLoading({
      title: "加载中..."
    });
    var a = this;
    wx.request({
      url: app.globalData.tonyon +'/api/tu/img_calss_id.php',
      method: "POST",
      data: {
        class_id: t
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(e) {
        console.log(e), a.setData({
          imgList: e.data.data
        }), wx.hideLoading();
      }
    });
  },
  toSearch: function(e) {
    var t = this,
      a = e.currentTarget.dataset.cid;
    console.log(a);
    var o = t.data.itemList;
    t.setData({
      showType: a
    });
    for (var n = new Array(), s = 0; s < o.length; s++) o[s].parent_id == a && n.push(o[s]);
    if (n.length > 0) {
      for (var i = new Array(), g = 0, r = "", d = 0; d < o.length; d++) o[d].parent_id == n[0].id && (console.log(o[d].id),
        i.push(o[d]));
      console.log(i), i.length > 0 && (g = i[0].id, r = i[0].name.indexOf("1:1") > -1 ? "one" : i[0].name.indexOf("9:16") > -1 ? "n-and-sixteen" : i[0].name.indexOf("3:4") > -1 ? "th-and-fo" : i[0].name.indexOf("4:3") > -1 ? "fo-and-th" : "sixteen-and-n",
        t.getGoodsInfo(g)), t.setData({
        showImg: n[0].id,
        img_tag: g,
        img_name: r
      });
    } else this.setData({
      showType: 0,
      showImg: 0,
      imgList: []
    });
  },
  selectImgType: function(e) {
    var t = this,
      a = e.currentTarget.dataset.cid,
      o = this.data.itemList;
    console.log(a), this.setData({
      showImg: a
    }), console.log(o);
    for (var n = {}, s = "", i = this.data.img_tag, g = 0; g < o.length; g++)
      if (o[g].id == i) {
        console.log(o[g]), n = o[g];
        break;
      }
    if (n) {
      for (var r = 0; r < o.length; r++)
        if (o[r].name == n.name && o[r].parent_id == a) {
          console.log("找到的最后的数据"), console.log(o[r]), n = o[r];
          break;
        }
      s = n.name.indexOf("1:1") > -1 ? "one" : n.name.indexOf("9:16") > -1 ? "n-and-sixteen" : n.name.indexOf("3:4") > -1 ? "th-and-fo" : n.name.indexOf("4:3") > -1 ? "fo-and-th" : "sixteen-and-n",
        console.log(n.id + "========" + s), t.setData({
          img_tag: n.id,
          img_name: s
        }), this.getGoodsInfo(n.id);
    } else t.setData({
      imgList: []
    });
  },
  getImageList: function(e) {
    var t = this,
      a = e.currentTarget.dataset.sid,
      o = "";
    console.log("页面=========" + t.data.page), "frame" == t.data.page ? a && (o = a.name.indexOf("1:1") > -1 ? "one" : a.name.indexOf("9:16") > -1 ? "n-and-sixteen" : a.name.indexOf("3:4") > -1 ? "th-and-fo" : a.name.indexOf("4:3") > -1 ? "fo-and-th" : "sixteen-and-n",
      t.getGoodsInfo(a.id), t.setData({
        img_tag: a.id,
        img_name: o
      })) : a && (t.getGoodsInfo(a.id), t.setData({
      img_tag: a.id,
      img_name: "paster"
    }));
  },
  getUserInfo: function(e) {
    console.log(e), t.globalData.userInfo = e.detail.userInfo, this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: !0
    });
  },
  selectBefore: function(e) {
    var t = this;
    "frame" == t.data.page ? (console.log("相框页面"), t.selectedSource(e)) : (console.log("加水印页面"),
      t.selectPaster(e));
  },
  selectPaster: function(t) {
    var that = this,
      ocurrent_data = (that.data.itemList, that.data.imgUrl, t.currentTarget.dataset.item);
    console.log('图片id查询' + ocurrent_data);
    that.setData({
      progressId: ocurrent_data.id
    });
    console.log('图片id查询' + that.data.progressId);
    var save_current_picture = "img" + ocurrent_data.id,
      check_pictures = wx.getStorageSync(save_current_picture);
    check_pictures ? wx.getImageInfo({
      src: check_pictures.img_url,
      success: function() {
        console.log("图片已经存在" + save_current_picture), wx.setStorageSync('pasterTag', save_current_picture), wx.navigateBack({});
      },
      fail: function() {
        console.log("图片已经不存在"), that.downloadPaster(ocurrent_data);
      }
    }) : (console.log("图片未下载过"), that.downloadPaster(ocurrent_data));
  },
  downloadPaster: function(t) {
    var that = this,
      download_pictures = that.data.imgUrl;
    wx.showLoading({
      title: "下载中",
      mask: !0
    }), that.downloadTask = wx.downloadFile({
      url: download_pictures + t.img_url,
      header: {},
      success: function(res) {
        console.log("下载下来的图片"), console.log(res), t.img_url = res.tempFilePath;
        var save_current_picture = "img" + t.id;
        try {
          wx.setStorageSync(save_current_picture, t), wx.setStorageSync('pasterTag', save_current_picture);
        } catch (e) {
          var n = "数据保存失败";
          wx.getStorageInfo({
            success: function(e) {
              console.log(e.keys), console.log(e.currentSize), console.log(e.limitSize), e.currentSize >= e.limitSize && (n = "数据缓存空间不足，请清理空间（删除小程序再重新搜索）");
            }
          }), wx.showModal({
            title: "温馨提示",
            content: n
          });
        }
        wx.navigateBack({
          success: function() {
            wx.hideLoading();
          }
        });
      },
      fail: function(e) {},
      complete: function(e) {}
    }), that.downloadTask.onProgressUpdate(function(e) {
      100 === e.progress ? that.setData({
        progress: "",
        isShowVideo: !0
      }) : that.setData({
        progress: e.progress + "%",
        isShowVideo: !1
      });
    });
  },
  selectedSource: function(t) {
    var a = this,
      o = (a.data.itemList, a.data.imgUrl, t.currentTarget.dataset.item);
    a.setData({
      progressId: o.id
    });

    var n = "img" + o.id,
      s = wx.getStorageSync(n);
    s ? wx.getImageInfo({
      src: s.img_url,
      success: function() {
        console.log("图片已经存在"), wx.setStorageSync(e.Config.imageInfoTag, n), wx.navigateBack({});
      },
      fail: function() {
        console.log("图片已经不存在"), a.downLoadImage(o);
      }
    }) : (console.log("图片未下载过"), a.downLoadImage(o));
  },
  downLoadImage: function(t) {
    var a = this,
      o = a.data.imgUrl;
    wx.showLoading({
      title: "下载中",
      mask: !0
    }), a.downloadTask = wx.downloadFile({
      url: o + t.img_url,
      header: {},
      success: function(a) {
        console.log("下载下来的图片"), console.log(a), t.img_url = a.tempFilePath;
        var o = "img" + t.id;
        try {
          wx.setStorageSync(o, t), wx.setStorageSync(e.Config.imageInfoTag, o);
        } catch (e) {
          var n = "数据保存失败";
          wx.getStorageInfo({
            success: function(e) {
              console.log(e.keys), console.log(e.currentSize), console.log(e.limitSize), e.currentSize >= e.limitSize && (n = "数据缓存空间不足，请清理空间（删除小程序再重新搜索）");
            }
          }), wx.showModal({
            title: "温馨提示",
            content: n
          });
        }
        wx.navigateBack({
          success: function() {
            wx.hideLoading();
          }
        });
      },
      fail: function(e) {},
      complete: function(e) {}
    }), a.downloadTask.onProgressUpdate(function(e) {
      100 === e.progress ? a.setData({
        progress: "",
        isShowVideo: !0
      }) : a.setData({
        progress: e.progress + "%",
        isShowVideo: !1
      });
    });
  },
//   onReady: function() {
//     this.myprogress = this.selectComponent("#myprogress");
//   },
//   ShowProgress: function() {
//     this.myprogress.showDialog();
//   },
//   _cancelPress: function() {
//     console.log("你点击了取消"), this.myprogress.hideDialog();
//   },
  onUnload: function() {
    a = new Array(), o = new Array(), this.setData({
      paList: a,
      sizeList: o
    });
  }
});