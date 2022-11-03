var t = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), a = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), i = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), e = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), n = wx.createAnimation({
    duration: 50,
    timingFunction: "ease"
}), s = "", o = "", r = "", c = "", u = "", d = !0, l = getApp(), m = null;
let interstitialAd = null;
Page({
    data: {
        img1: "./images/sz1.png",
        img2: "./images/sz2.png",
        img3: "./images/sz3.png",
        img4: "./images/sz4.png",
        img5: "./images/sz5.png",
        diceNum: 5,
        addDiceOpacity: 1,
        minDiceOpacity: 1
    },
    onLoad: function(t) {
        this.setData({
            config: l.globalData.config_base_list,
            mode: l.globalData.mode,
        })
        var chaping = l.globalData.config_base_list.advertisements.chaping;
        if (chaping) {
            if (wx.createInterstitialAd) {
                interstitialAd = wx.createInterstitialAd({
                    adUnitId: chaping
                })
                interstitialAd.onLoad(() => {
                    if (interstitialAd) {
                        interstitialAd.show().catch((err) => {
                            console.error(err)
                        })
                    }
                })
                interstitialAd.onError((err) => { })
                interstitialAd.onClose(() => { })
            }
        }
    },
    onReady: function() {},
    onShow: function() {
        this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation4 = e, 
        this.animation5 = n, this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export(),
            animation4: e.export(),
            animation5: n.export()
        });
    },
    rotateAni: function() {
        for (var t = 1; t <= this.data.diceNum; t++) 1 == t ? (this.animation1.translate3d(60, -125, 0).rotate(-360).step({
            duration: 200
        }).translate3d(60, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-80, 0, 0).rotate(-720).step({
            duration: 100
        }).translate3d(-50, -50, 0).rotate(-360).step({
            duration: 50
        }).translate3d(70, -30, 0).rotate(360).step({
            duration: 300
        }).translate3d(0, 0, 0).rotate(-0).step({
            duration: 400
        }), this.setData({
            animation1: this.animation1.export()
        })) : 2 == t ? (this.animation2.translate3d(30, -155, 0).rotate(-360).step({
            duration: 200
        }).translate3d(30, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-30, -70, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(-100, -30, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(-110, -10, 0).rotate(-720).step({
            duration: 100
        }).translate3d(0, 0, 0).rotate(-360).step({
            duration: 800
        }), this.setData({
            animation2: this.animation2.export()
        })) : 3 == t ? (this.animation3.translate3d(110, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(110, 0, 0).rotate(-360).step({
            duration: 100
        }).translate3d(10, -20, 0).rotate(-720).step({
            duration: 100
        }).translate3d(-30, 0, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(50, -40, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(110, 0, 0).rotate(360).step({
            duration: 200
        }).translate3d(0, 0, 0).rotate(0).step({
            duration: 1e3
        }), this.setData({
            animation3: this.animation3.export()
        })) : 4 == t ? (this.animation4.translate3d(80, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(80, -30, 0).rotate(-360).step({
            duration: 100
        }).translate3d(10, -60, 0).rotate(-1080).step({
            duration: 100
        }).translate3d(-45, 0, 0).rotate(-1440).step({
            duration: 100
        }).translate3d(-25, -20, 0).rotate(-720).step({
            duration: 100
        }).translate3d(50, 0, 0).rotate(720).step({
            duration: 200
        }).translate3d(0, 0, 0).rotate(360).step({
            duration: 400
        }), this.setData({
            animation4: this.animation4.export()
        })) : 5 == t && (this.animation5.translate3d(20, -175, 0).rotate(-360).step({
            duration: 200
        }).translate3d(20, -40, 0).rotate(-360).step({
            duration: 100
        }).translate3d(-105, 0, 0).rotate(-720).step({
            duration: 100
        }).translate3d(0, 0, 0).rotate(360).step({
            duration: 800
        }), this.setData({
            animation5: this.animation5.export()
        }));
    },
    next: function() {
        // if (!l.globalData.isSign1) {
        //     var t = wx.getStorageSync("clicks");
        //     if (4 == t) wx.setStorageSync("clicks", parseInt(0)), m && (m.show().catch(function(t) {
        //         console.error(t);
        //     }), wx.request({
        //         method: "POST",
        //         data: {
        //             session_id: l.globalData.sessionId,
        //             sign_type: 1
        //         },
        //         complete: function(t) {
        //             l.globalData.isSign1 = !0, console.log("成功", t);
        //         }
        //     })); else {
        //         var a = parseInt(t + 1);
        //         wx.setStorageSync("clicks", a);
        //     }
        // }
        if (d) {
            d = !1;
            var i = this, e = this.data.diceNum;
            for (i.rotateAni(), n = 1; n <= e; n++) console.log(n), i.getImg(n);
            for (var n = this.data.diceNum + 1; n <= this.data.diceNum; n++) console.log(n), 
            i.getImg(n);
            if (i.setData({
                img1: s,
                img2: o,
                img3: r,
                img4: c,
                img5: u
            }), e < 5) switch (e) {
              case 4:
                i.setData({
                    img5: null
                });
                break;

              case 3:
                i.setData({
                    img4: null,
                    img5: null
                });
                break;

              case 2:
                i.setData({
                    img3: null,
                    img4: null,
                    img5: null
                });
                break;

              case 1:
                i.setData({
                    img2: null,
                    img3: null,
                    img4: null,
                    img5: null
                });
            }
            var g = wx.createInnerAudioContext();
            g.autoplay = !0, g.src = "/packageA/pages/tools/newsaizi/images/yao.mp3", g.onPlay(function() {}), g.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), setTimeout(function() {
                d = !0;
            }, 1500);
        }
    },
    getImg: function(t) {
        var a, i = "./images/sz";
        a = parseInt(6 * Math.random()) + 1, 1 == t ? s = i + a + ".png" : 2 == t ? o = i + a + ".png" : 3 == t ? r = i + a + ".png" : 4 == t ? c = i + a + ".png" : 5 == t && (u = i + a + ".png");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "来摇骰筛子，就等你来～",
            path: "/packageA/pages/tools/newsaizi/newsaizi",
            success: function(t) {}
        };
    },
    addDice: function() {
        var t = this.data.diceNum + 1;
        t > 5 || (5 == t ? this.setData({
            diceNum: t,
            addDiceOpacity: .5,
            minDiceOpacity: 1
        }) : this.setData({
            diceNum: t,
            addDiceOpacity: 1,
            minDiceOpacity: 1
        }), this.changeAddDiceNum());
    },
    reduceDice: function() {
        var t = this.data.diceNum - 1;
        t < 1 || (1 == t ? this.setData({
            diceNum: t,
            minDiceOpacity: .5,
            addDiceOpacity: 1
        }) : this.setData({
            diceNum: t,
            minDiceOpacity: 1,
            addDiceOpacity: 1
        }), this.changeDiceNum());
    },
    changeAddDiceNum: function() {
        var t = this;
        switch (t.data.diceNum) {
          case 5:
            t.setData({
                img5: "./images/sz5.png"
            });
            break;

          case 4:
            t.setData({
                img4: "./images/sz4.png"
            });
            break;

          case 3:
            t.setData({
                img3: "./images/sz3.png"
            });
            break;

          case 2:
            t.setData({
                img2: "./images/sz2.png"
            });
        }
    },
    changeDiceNum: function() {
        var t = this, a = t.data.diceNum;
        if (a < 5) switch (a) {
          case 4:
            t.setData({
                img5: null
            });
            break;

          case 3:
            t.setData({
                img4: null,
                img5: null
            });
            break;

          case 2:
            t.setData({
                img3: null,
                img4: null,
                img5: null
            });
            break;

          case 1:
            t.setData({
                img2: null,
                img3: null,
                img4: null,
                img5: null
            });
        }
    }
});