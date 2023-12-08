var that, app = getApp(),
  func = require('../../utils/func.js');
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    goods_details: [],
    category: [],
    pid: "",
    keyword: "",
    pddGoodsList: [],
    pageIndex: 1,
    showPageLoading: !1,
    cates: [],
    sel_index: 0,
    opt_id: 8569,
    page: 1,
    isover: !1,
    onReachBottom: !1,
    loding: !0,
    qietwo: 0,
    qiethree: 0,
    thiseven: 0, //综合
    qieone: 0,
    sort_type: "0",
    isClose: !0,
    pinduoduo_show: 0, //0.不显示1.拼多多，2.拼多多显示工具上3.工具
    pinduoduo_shows: 0,
    system: !1,
    puzzled_class: [{
        name: "星座匹配",
        path: "../../../../Fortune/pages/index/index",
        icon: "query_9.png"
      },
      // {
      //     name: "星座运势",
      //     path: "../../../../packageA/pages/tools/astro/index",
      //     icon: "query_8.png"
      // }, {
      //     name: "星座解惑",
      //     path: "../../../../packageA/pages/tools/star/star",
      //     icon: "chart_5.png"
      // },
      {
        name: "生肖匹配",
        path: "../../../../Fortune/pages/sx/index/index",
        icon: "query_10.png"
      },
      {
        name: "周公解梦",
        path: "../../../../packageA/pages/tools/zgjm/zgjm",
        icon: "practical_20.png"
      }, {
        name: "老黄历测吉凶",
        path: "../../../../packageA/pages/tools/almanac/almanac",
        icon: "practical_18.png"
      }, {
        name: "测QQ吉凶",
        path: "../../../../packageA/pages/tools/qqtest/qqtest",
        icon: "practical_15.png"
      }, {
        name: "子女血型",
        path: "../../../../packageA/pages/tools/blood/blood",
        icon: "practical_14.png"
      }, {
        name: "生命之钟",
        path: "../../../../packageA/pages/tools/life/shenminsz",
        icon: "practical_17.png"
      }
    ],
    ai_class: [{
      name: "颜值评估",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_1.png"
    }, {
      name: "图片美颜",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_2.png"
    }, {
      name: "特征分析",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_3.png"
    }, {
      name: "皮肤状况",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_4.png"
    }, {
      name: "人体抠图",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_5.png"
    }, {
      name: "手势识别",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_8.png"
    }, {
      name: "更多AI工具",
      path: "../../../../Ai/pages/home/home",
      icon: "ai_7.png"
    }],
    chart_class: [{
        name: "图片转文字",
        path: "../../../../chart/pages/tools/tuzhuanwenzi/tuzhuanwenzi",
        icon: "ai_6.png"
      },
      {
        name: "二维码生成",
        path: "../../../../chart/pages/tools/createQrcode/createQrcode",
        icon: "chart_3.png"
      },
      {
        name: "二维码识别",
        path: "../../../../chart/pages/tools/scanQrcode/scanQrcode",
        icon: "chart_2.png"
      },
      {
        name: "爱心九宫格",
        path: "../../../../chart/pages/tools/axjgg/axjgg",
        icon: "chart_10.jpg"
      }, {
        name: "文字九宫格",
        path: "../../../../chart/pages/tools/jiuword/jiuword",
        icon: "chart_9.jpg"
      }, {
        name: "词图云生成",
        path: "../../../../packageA/pages/tools/wordcloud/wordcloud",
        icon: "chart_8.jpg"
      }, {
        name: "手持弹幕",
        path: "../../../../packageA/pages/tools/danmu/danmu",
        icon: "chart_7.jpg"
      }
    ],
    youxi_class: [{
      name: "24小时计算",
      path: "../../../../Game/pages/tools/twentyfour/index",
      icon: "game_10.jpg"
    }, {
      name: "数字华容道",
      path: "../../../../Game/pages/tools/huarong/index",
      icon: "game_9.jpg"
    }, {
      name: "色盲测试",
      path: "../../../../Game/pages/tools/blind/blind",
      icon: "game_8.jpg"
    }, {
      name: "五子棋",
      path: "../../../../Game/pages/tools/chess/chess",
      icon: "game_7.jpg"
    }, {
      name: "真心话大冒险",
      path: "../../../../Game/pages/tools/zxhdmx/zxhdmx",
      icon: "game_6.jpg"
    }, {
      name: "聚会游戏",
      path: "../../../../Game/pages/tools/juhui/juhui",
      icon: "game_3.png"
    }, {
      name: "抽奖转盘",
      path: "../../../../Game/pages/tools/zhuanpan/zhuanpan",
      icon: "game_5.jpg"
    }, {
      name: "极速口算",
      path: "../../../../Game/pages/tools/soeasy/soeasy",
      icon: "game_4.jpg"
    }],
    practical_class: [{
        name: "文字转语音",
        path: "../../../../packageA/pages/tools/fontToVoice/fontToVoice",
        icon: "practical_13.jpg"
      },

      // {
      //     name: "朋友圈文字",
      //     path: "../../../../packageA/pages/tools/chatz/moments",
      //     icon: "practical_10.jpg"
      // }, {
      //     name: "聊天特效文字",
      //     path: "../../../../packageA/pages/tools/chatz/main",
      //     icon: "practical_9.jpg"
      // }, {
      //     name: "朋友圈数型文字",
      //     path: "../../../../packageA/pages/tools/wx520/wx520",
      //     icon: "practical_8.jpg"
      // }, {
      //     name: "翅膀昵称",
      //     path: "../../../../packageA/pages/tools/nickname/nickname",
      //     icon: "practical_7.jpg"
      // }, {
      //     name: "特效字体",
      //     path: "../../../../packageA/pages/tools/textshow/textshow",
      //     icon: "practical_6.jpg"
      // }

       {
        name: "亲戚关系查询",
        path: "../../../../packageA/pages/tools/qqch/index",
        icon: "practical_5.jpg"
      }, {
        name: "手机真伪查询",
        path: "../../../../packageA/pages/tools/sjzw/index",
        icon: "practical_4.jpg"
      }, {
        name: "恶搞理发器",
        path: "../../../../packageA/pages/tools/eglfq/index",
        icon: "practical_3.jpg"
      }, {
        name: "插电充钱",
        path: "../../../../packageA/pages/tools/charge/main",
        icon: "practical_2.jpg"
      }, {
        name: "网络测速",
        path: "../../../../packageA/pages/tools/networkSpeed/networkSpeed",
        icon: "practical_1.jpg"
      }, {
        name: "朋友摇骰子",
        path: "../../../../packageA/pages/tools/newsaizi/newsaizi",
        icon: "practical_11.jpg"
      }, {
        name: "聊天文件快速保存",
        path: "../../../../packageA/pages/tools/wxsave/wxsave",
        icon: "practical_12.jpg"
      },
      {
        name: "同义反义词",
        path: "../../../../packageA/pages/tools/tyfy/tyfy",
        icon: "practical_19.png"
      },
      {
        name: "手机归属地",
        path: "../../../../packageA/pages/tools/mobile/mobile",
        icon: "practical_16.png"
      }
    ]
  },
  onLoad: function () {
    var that = this;
    this.setData({
      config_base_list: app.globalData.config_base_list,
      mode: app.globalData.mode,
      user_id: app.globalData.user_id
    })

    var chaping = app.globalData.config_base_list.advertisements.chaping;
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: chaping
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }


    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.platform == "ios") {
          console.log('ios')
          that.setData({
            system: !1
          })
        } else {
          that.setData({
            system: !0
          })
        }
      }
    })

  },
  returns: function () {
    this.setData({
      pinduoduo_show: 2,
      pinduoduo_shows: 0
    })
    wx.setNavigationBarTitle({
      title: "工具箱"
    })
  },
  pinduoduo_shows: function () {
    this.category()
    this.setData({
      pinduoduo_show: 1,
      pinduoduo_shows: 1
    })
    wx.setNavigationBarTitle({
      title: "拼多多优惠券"
    })
  },
  onShow: function () {
    var that = this;
    wx.removeTabBarBadge({
      index: 2
    })
    if (app.globalData.pinduoduo_client_id != null && app.globalData.pinduoduo_client_secret != null && app.globalData.pinduoduo_pid != null) {
      if (app.globalData.pinduoduo == '1' || app.globalData.pinduoduo == '2' || app.globalData.pinduoduo == '3') {
        if (app.globalData.pinduoduo == '1') {
          that.setData({
            pinduoduo_show: 1
          })
          wx.setNavigationBarTitle({
            title: "拼多多优惠券"
          })
          if (that.data.isClose && that.data.pinduoduo_show == 1) {
            that.category()
          }
        } else if (app.globalData.pinduoduo == '2') {
          if (that.data.pinduoduo_shows == 1) {
            that.setData({
              pinduoduo_show: 1
            })
          } else {
            that.setData({
              pinduoduo_show: 2,
              chushihuapinduoduo: 1
            })
            wx.setNavigationBarTitle({
              title: "工具箱"
            })
            if (that.data.isClose && that.data.pinduoduo_show == 1) {
              that.category()
            }
          }
        } else {
          that.setData({
            pinduoduo_show: 3
          })
          wx.setNavigationBarTitle({
            title: "工具箱"
          })
        }
      }

      if (that.data.mode == 1 || that.data.mode == 3) {
        if (that.data.config_base_list.advertisements.chaping && that.data.config_base_list.user_information.vip != '1') {
          if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
        }
      } else if (that.data.mode == 2) {
        if (that.data.config_base_list.advertisements.chaping) {
          if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
        }
      }

    } else {
      if (app.globalData.pinduoduo != '0') {
        that.get_pinduoduo_api()
      }
    }

  },
  //远程加载小程序配置
  get_pinduoduo_api: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: app.globalData.tonyon + "/api/WeChat/user/new_user_api.php",
          method: "POST",
          data: {
            code: res.code,
            appid: app.globalData.appid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          success: function (a) {
            that.setData({
              config_base_list: a.data.data,
              mode: a.data.mode
            });
            app.globalData.pinduoduo = a.data.pinduoduo;
            app.globalData.pinduoduo_client_id = a.data.pinduoduo_client_id;
            app.globalData.pinduoduo_client_secret = a.data.pinduoduo_client_secret;
            app.globalData.pinduoduo_pid = a.data.pinduoduo_pid;

            if (that.data.mode == 1 || that.data.mode == 3) {
              if (that.data.config_base_list.advertisements.chaping && that.data.config_base_list.user_information.vip != '1') {
                if (interstitialAd) {
                  interstitialAd.show().catch((err) => {
                    console.error(err)
                  })
                }
              }
            } else if (that.data.mode == 2) {
              if (that.data.config_base_list.advertisements.chaping) {
                if (interstitialAd) {
                  interstitialAd.show().catch((err) => {
                    console.error(err)
                  })
                }
              }
            }

            if (app.globalData.pinduoduo == '1') {
              that.setData({
                pinduoduo_show: 1
              })
              wx.setNavigationBarTitle({
                title: "拼多多优惠券"
              })
              if (that.data.isClose && that.data.pinduoduo_show == 1) {
                that.category()
              }
            } else if (app.globalData.pinduoduo == '2') {
              if (that.data.pinduoduo_shows == 1) {
                that.setData({
                  pinduoduo_show: 1
                })
              } else {
                that.setData({
                  pinduoduo_show: 2,
                  chushihuapinduoduo: 1
                })
                wx.setNavigationBarTitle({
                  title: "工具箱"
                })
                if (that.data.isClose && that.data.pinduoduo_show == 1) {
                  that.category()
                }
              }
            } else {
              that.setData({
                pinduoduo_show: 3
              })
              wx.setNavigationBarTitle({
                title: "工具箱"
              })
            }

          },
          fail: function () {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '网络请求超时',
              confirmText: '重载',
              success: function () {
                wx.reLaunch({
                  url: '/pages/pdd-goods/pdd-goods'
                })
              }
            })
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '网络请求超时',
          confirmText: '重载',
          success: function () {
            wx.reLaunch({
              url: '/pages/pdd-goods/pdd-goods'
            })
          }
        })
      }

    })
  },
  category: function (t) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    var that = this,
      client_id = app.globalData.pinduoduo_client_id,
      client_secret = app.globalData.pinduoduo_client_secret;
    var timestamp = Date.parse(new Date()),
      timestamp = timestamp / 1000,
      s = client_secret + "client_id" + client_id + "parent_opt_id" + '0' + "timestamp" + timestamp + "typepdd.goods.opt.get" + client_secret,
      n = func.md5(s);
    n = n.toUpperCase();
    wx.request({
      url: 'https://gw-api.pinduoduo.com/api/router?type=pdd.goods.opt.get&timestamp=' + timestamp + '&client_id=' + client_id + '&sign=' + n,
      method: "POST",
      data: {
        parent_opt_id: '0',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.goods_opt_get_response.goods_opt_list)
        that.setData({
          category: res.data.goods_opt_get_response.goods_opt_list
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    }), this.loadGoods('1')
  },
  tap_pddcate: function (t) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })

    this.setData({
      qieone: 0,
      qietwo: 0,
      qiethree: 0,
      thiseven: 0,
      sort_type: 0,
      isover: !1,
      onReachBottom: !1,
      page: 1,
      sel_index: t.currentTarget.dataset.index,
      keyword: ""
    }), this.loadGoods();
  },
  loadGoods: function (t) {
    console.log('loadGoods:t' + t)

    var that = this,
      opt_id = '',
      page = that.data.page,
      keyword = that.data.keyword,
      sort_type = that.data.sort_type,
      client_id = app.globalData.pinduoduo_client_id,
      client_secret = app.globalData.pinduoduo_client_secret,
      pid = app.globalData.pinduoduo_pid;
    t == '1' ? opt_id = '1' : opt_id = that.data.category[that.data.sel_index].opt_id;
    var data_url = keyword != "" ? data_url = "keyword" + keyword : data_url = "opt_id" + opt_id;
    var timestamp = Date.parse(new Date()),
      timestamp = timestamp / 1000,
      s = client_secret + "client_id" + client_id + data_url + "page" + page + "page_size15" + "pid" + pid + "sort_type" + sort_type + "timestamp" + timestamp + "typepdd.ddk.goods.search" + "with_coupontrue" + client_secret,
      n = func.md5(s);
    n = n.toUpperCase();
    console.log("s" + s)
    console.log('page' + page)
    console.log('opt_id' + opt_id)
    console.log('keyword' + keyword)
    var data_url = keyword != "" ? data_url = "&keyword=" + keyword : data_url = "&opt_id=" + opt_id;
    console.log(data_url)
    wx.request({
      url: 'https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.goods.search' + data_url + '&timestamp=' + timestamp + '&client_id=' + client_id + '&sign=' + n,
      method: "POST",
      data: {
        pid: pid,
        page: page,
        page_size: 15,
        with_coupon: true,
        sort_type: sort_type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.goods_search_response.goods_list)
        if (res.data.goods_search_response.goods_list.length < 2) {
          wx.hideLoading()
          wx.showToast({
            title: '此关键词无商品，请更换关键词搜索！',
            icon: 'none',
            duration: 1500
          })
          return;
        }
        that.setData({
          search: res.data.goods_search_response.goods_list
        })
        console.log("search" + that.data.search.length)
        var arr1 = that.data.goods_details;
        var goods_details = new Array();

        if (!that.data.onReachBottom) {
          arr1 = [];
        }

        console.log("start goods_details.length: " + goods_details.length);
        for (var i = 0; i < that.data.search.length; i++) {
          var timestamp = Date.parse(new Date()),
            timestamp = timestamp / 1000,
            goods_id = that.data.search[i].goods_id,
            s = client_secret + "client_id" + client_id + "goods_id_list[" + goods_id + "]pid" + pid + "timestamp" + timestamp + "typepdd.ddk.goods.detail" + client_secret,
            n = func.md5(s);
          n = n.toUpperCase();
          wx.request({
            url: 'https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.goods.detail&timestamp=' + timestamp + '&client_id=' + client_id + '&sign=' + n,
            method: "POST",
            data: {
              goods_id_list: "[" + goods_id + "]",
              pid: pid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            success: function (res) {

              goods_details[goods_details.length] = res.data.goods_detail_response.goods_details[0];
              if (goods_details.length == that.data.search.length) {
                that.setData({
                  goods_details: arr1.concat(goods_details)
                })
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                console.log(that.data.goods_details.length)
              }
              console.log("ing goods_details.length: " + goods_details.length);


            }
          })

        }
        console.log("end goods_details.length: " + goods_details.length);
      },
      fail: function (b) {
        console.log(b)

      }
    })
  },
  pddSearch: function () {
    console.log("搜索" + this.data.sort_type)
    var that = this;
    that.setData({
      keyword: that.data.input
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.keyword)
    if (that.data.keyword != null && that.data.keyword != "") {
      that.setData({
        qieone: 0,
        qietwo: 0,
        qiethree: 0,
        thiseven: 0,
        sort_type: 0,
        onReachBottom: !1,
      })
      that.loadGoods();
    } else {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      wx.showToast({
        title: '请输入搜索的商品名称！',
        icon: 'none',
        duration: 1500
      })
    }
  },
  pdd_bindconfirm: function (t) {
    console.log(t)
    if (this.data.input != null && this.data.input != "") {
      if (t.type = "confirm") {
        this.pddSearch()
      }
    } else {
      wx.showToast({
        title: '请输入搜索的商品名称！',
        icon: 'none',
        duration: 1500
      })
    }

  },
  pdd_input: function (t) {
    this.setData({
      input: t.detail.value
    });
  },
  sort_click: function (t) {
    var number = t.currentTarget.dataset.index,
      that = this;
    console.log(number)
    if (number == 0) {
      that.setData({
        qieone: 0,
        qietwo: 0,
        qiethree: 0,
        thiseven: 0,
        sort_type: 0,
        onReachBottom: !1
      })
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
      })
      this.loadGoods();
    } else if (number == 1) {
      that.setData({
        qietwo: 0,
        qiethree: 0,
      })
      if (that.data.qieone == 0) {
        that.setData({
          thiseven: 1,
          qieone: 1,
          sort_type: 9,
          onReachBottom: !1
        })
      } else if (that.data.qieone == 1) {
        that.setData({
          thiseven: 1,
          qieone: 2,
          sort_type: 10,
          onReachBottom: !1
        })
      } else if (that.data.qieone == 2) {
        that.setData({
          thiseven: 1,
          qieone: 1,
          sort_type: 9,
          onReachBottom: !1
        })
      }
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
      })
      this.loadGoods();
    } else if (number == 2) {
      that.setData({
        qieone: 0,
        qiethree: 0,
      })
      if (that.data.qietwo == 0) {
        that.setData({
          thiseven: 2,
          qietwo: 1,
          sort_type: 5,
          onReachBottom: !1
        })
      } else if (that.data.qietwo == 1) {
        that.setData({
          thiseven: 2,
          qietwo: 2,
          sort_type: 6,
          onReachBottom: !1
        })
      } else if (that.data.qietwo == 2) {
        that.setData({
          thiseven: 2,
          qietwo: 1,
          sort_type: 5,
          onReachBottom: !1
        })
      }
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
      })
      this.loadGoods();
    } else if (number == 3) {
      that.setData({
        qieone: 0,
        qietwo: 0
      })
      if (that.data.qiethree == 0) {
        that.setData({
          thiseven: 3,
          qiethree: 1,
          sort_type: 3,
          onReachBottom: !1
        })
      } else if (that.data.qiethree == 1) {
        that.setData({
          thiseven: 3,
          qiethree: 2,
          sort_type: 4,
          onReachBottom: !1
        })
      } else if (that.data.qiethree == 2) {
        that.setData({
          thiseven: 3,
          qiethree: 1,
          sort_type: 3,
          onReachBottom: !1
        })
      }
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
      })
      this.loadGoods();
    }
  },
  onReady: function () {

  },
  onReachBottom: function () {
    if (this.data.pinduoduo_show == 1) {
      console.log(this.data.sort_type)
      this.setData({
        onReachBottom: !0,
        loding: !1
      })
      this.data.page++, this.loadGoods();
    }

  },
  onPddGoodsBtnClicked: function (t) {
    var that = this,
      data = t.currentTarget.dataset.pddGoods.goods_id;
    console.log(data)
    data ? (wx.navigateTo({
      url: "./details/details?goods_id=" + data
    }), that.setData({
      isClose: !1
    })) : wx.showToast({
      title: "缺少信息，请稍后重试",
      icon: "none",
      duration: 3e3
    });
  },
  onPddGoodsItemClicked: function (t) {
    var that = this,
      data = t.currentTarget.dataset.pddGoods.goods_id;
    console.log(data)
    data ? (wx.navigateTo({
      url: "./details/details?goods_id=" + data
    }), that.setData({
      isClose: !1
    })) : wx.showToast({
      title: "缺少信息，请稍后重试",
      icon: "none",
      duration: 3e3
    });
  },
  onShareAppMessage: function () {
    return {
      title: this.data.config_base_list.share_title ? this.data.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
      path: '/pages/index/index?inviter_id=' + this.data.user_id,
      imageUrl: this.data.config_base_list.share_imageUrl ? this.data.config_base_list.share_imageUrl : '/images/share.jpg',
      success: function (e) {
        wx.showToast({
          title: "分享成功",
          icon: "success",
          duration: 2e3
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "分享失败",
          icon: "none",
          duration: 2e3
        });
      }
    }
  }
});