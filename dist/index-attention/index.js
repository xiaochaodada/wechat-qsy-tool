Component({
  properties: {
    showAddMeBtn: {
      type: Boolean,
      value: !0
    },
    countDownNum: String,
      show_name: {
          type: String,
          value: ''
      }
  },
  data: {
    showAddMeBtn: !0,
  },

  methods: {
    onClickAddToMinProgramCloseBtn: function() {
      var t = new Date().toLocaleDateString();
      wx.setStorage({
        key: "showAddMeBtn",
        data: t
      }), this.setData({
        showAddMeBtn: !1
      });
    },
    Close_the_window: function() {
      wx.setStorage({
        key: "Close_the_window",
        data: '1'
      }), this.setData({
        showAddMeBtn: !1
      });
    }
  }
});