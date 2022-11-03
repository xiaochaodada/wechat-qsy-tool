var app = getApp();
Component({
  options: {
    addGlobalClass: !0
  },
  data: {
    selected: 1
  },
  methods: {
    onLoad: function() {
      console.log(app.globalData.config_base_list);
    },
    onShow: function() {
      console.log(app.globalData.config_base_list);
    },
    switchTab: function(t) {
      var a = t.currentTarget.dataset.path;
      wx.switchTab({
        url: a
      });
    }
  },
  pageLifetimes: {}
});