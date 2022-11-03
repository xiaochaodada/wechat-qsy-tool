Component({
  externalClasses: ["i-class"],
  properties: {
    close: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: ""
    },
    loop: {
      type: Boolean,
      value: !1
    },
    backgroundcolor: {
      type: String,
      value: "#eff0f5"
    },
    iconColor: {
      type: String,
      value: "#fff"
    },
    color: {
      type: String,
      value: "#585969"
    },
    speed: {
      type: Number,
      value: 1e3
    }
  },
  data: {
    isShow: true,
    wrapWidth: 0,
    width: 0,
    duration: 0,
    animation: null,
    timer: null
  },
  detached: function() {
    this.destroyTimer();
  },
  ready: function() {
    this.data.loop && this.initAnimation();
  },
  methods: {
    onDismissNotice: function onDismissNotice(event) {
      this.setData({
        isShow: false
      });
      var detail = event.detail;
      var option = {};
      this.triggerEvent("close", detail, option);
    },
    initAnimation: function() {
      var e = this;
      wx.createSelectorQuery().in(this).select(".i-noticebar-content-wrap").boundingClientRect(function(n) {
        wx.createSelectorQuery().in(e).select(".i-noticebar-content").boundingClientRect(function(t) {
          var i = t.width / 40 * e.data.speed,
            a = wx.createAnimation({
              duration: i,
              timingFunction: "linear"
            });
          e.setData({
            wrapWidth: n.width,
            width: t.width,
            duration: i,
            animation: a
          }, function() {
            e.startAnimation();
          });
        }).exec();
      }).exec();
    },
    startAnimation: function() {
      var t = this;
      if (0 !== this.data.animation.option.transition.duration) {
        this.data.animation.option.transition.duration = 0;
        var i = this.data.animation.translateX(this.data.wrapWidth).step();
        this.setData({
          animationData: i.export()
        });
      }
      this.data.animation.option.transition.duration = this.data.duration;
      var a = this.data.animation.translateX(-this.data.width).step();
      setTimeout(function() {
        t.setData({
          animationData: a.export()
        });
      }, 100);
      var n = setTimeout(function() {
        t.startAnimation();
      }, this.data.duration);
      this.setData({
        timer: n
      });
    },
    destroyTimer: function() {
      this.data.timer && clearTimeout(this.data.timer);
    },
    handleClose: function() {
      this.destroyTimer(), this.setData({
        show: !1,
        timer: null
      });
    }
  }
});