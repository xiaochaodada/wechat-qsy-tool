var app = getApp();

Component({
    pageLifetimes: {
        show: function() {
            "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                selected: 0
            });
        }
    },
    properties: {},
    data: {
        toView: '',
        //每个配置内容
        config_base_list: [],
        //全局配置内容
        config_data_list: [],
        faq: []
    },
    methods: {
        onLoad: function(options) {
            var that = this;
            setTimeout(function() {
                that.setData({
                    toView: options.into
                })
            }, 500);
        },
        onShow: function() {
            this.setData({
                config_base_list: app.globalData.config_base_list,
                mode: app.globalData.mode
            })
        }
    }
});