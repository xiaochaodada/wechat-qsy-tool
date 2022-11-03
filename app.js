//app.js
//const ald = require('./utils/ald-stat.js')


// globalData: {
//     Version: "4.0.0",
//     tonyon: "https://api.wuxitoto.com",//用户
//     video_api: "https://video.wuxitoto.com",//视频
//     jiexi_api: 'https://qsy.85xn.cn/api/api.php',//解析
//     appid: "wx5dd7ae8d00e679b9",
//     operation:"WX",//当前操作平台
//     statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
//     swidth: wx.getSystemInfoSync().windowWidth,
//     sheight: wx.getSystemInfoSync().windowHeight,
//     mode:1,
//     config_base_list: {
//               advertisements: {
//         BannerAD_ID: "adunit-d344f22c7c41f03b",//banner
//         box_ad: "adunit-8918f59a3bc7acab",//微信盒子广告，QQ：feeds
//         chaping: "adunit-514e557ab96ff1ff",//插屏
//         index_video_ad: "adunit-6b9341152cb6807e",//微信：视频广告 QQ：卡片广告
//         primordialVideo:"adunit-f8c8af89bac8b1ec",//微信：原生广告 QQ：积木广告
//         videoAD_ID:"adunit-38c9a0c746b825b8",//激励视频
//         rewardedVideoAdTips:"广告未播放完成，无法保存视频\n提示：只要看完广告，即可无限制使用（全天内）免费工具。\n运营成本太高，谢谢您的谅解~\n一天只需要看一次广告 就可无限次使用本程序！",//激励看广告提示
//         videoAD_appear:0
//         }
//     }




// globalData: {
//     Version: "3.7.0",
//     tonyon: "https://api.wuxitoto.com",//用户
//     video_api: "https://video.wuxitoto.com",//视频
//     jiexi_api: 'https://api.forrmb.com/api/api.php',//解析
//     appid: "wxeaef5799b13d3edd",
//     operation:"WX",//当前操作平台
//     statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
//     swidth: wx.getSystemInfoSync().windowWidth,
//     sheight: wx.getSystemInfoSync().windowHeight,
//     mode:1,
//     config_base_list: {
//         advertisements: {
//             BannerAD_ID: "adunit-0522dccd471d0623",//banner
//             box_ad: "adunit-73aa4d5ae780f473",//微信盒子广告，QQ：feeds
//             chaping: "adunit-3c05135be0987e63",//插屏
//             index_video_ad: "adunit-4cbb76f1f32b1735",//微信：视频广告 QQ：卡片广告
//             primordialVideo:"adunit-6ddb2f3eb817ba06",//微信：原生广告 QQ：积木广告
//             videoAD_ID:"adunit-e5df782515bccfd4",//激励视频
//             rewardedVideoAdTips:"广告未播放完成，无法保存视频\n提示：只要看完广告，即可无限制使用（全天内）免费工具。\n运营成本太高，谢谢您的谅解~\n一天只需要看一次广告 就可无限次使用本程序！",//激励看广告提示
//             videoAD_appear:0
//         }
//     }

// },





    // globalData: {
    //     Version: "3.7.0",
    //     tonyon: "https://api.85xn.cn",//用户
    //     video_api: "https://video.wuxitoto.com",//视频
    //     jiexi_api: 'https://api.forrmb.com/api/api.php',//解析
    //     appid: "wx3a82048858980c7b",
    //     operation:"WX",//当前操作平台
    //     statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    //     swidth: wx.getSystemInfoSync().windowWidth,
    //     sheight: wx.getSystemInfoSync().windowHeight,
    //     mode:1,
    //     config_base_list: {
    //         advertisements: {
    //             BannerAD_ID: "adunit-514dbd292a298297",//banner
    //             box_ad: "adunit-c60f78b15cf31a4e",//微信盒子广告，QQ：feeds
    //             chaping: "adunit-fb7e99595af6f451",//插屏
    //             index_video_ad: "adunit-6b11ce873764a6c4",//微信：视频广告 QQ：卡片广告
    //             primordialVideo:"adunit-0d643a9279ed436b",//微信：原生广告 QQ：积木广告
    //             videoAD_ID:"adunit-3f31575d9d370dbe",//激励视频
    //             rewardedVideoAdTips:"广告未播放完成，无法保存视频\n提示：只要看完广告，即可无限制使用（全天内）免费工具。\n运营成本太高，谢谢您的谅解~\n一天只需要看一次广告 就可无限次使用本程序！",//激励看广告提示
    //             videoAD_appear:0
    //         }
    //     }

    // },

var cache = require('utils/cache.js');
require("wordclooud/js1.js"), require("wordclooud/js2.js"),
    require("wordclooud/js3.js");
App({
    _get: function (t, a) {
        for (var s = t.split("&"), n = 0; n < s.length; n++) {
            var e = s[n].split("=");
            if (e[0]) return e[1];
        }
        return "";
    },
   globalData: {
        Version: "4.2.0",
        tonyon: "https://user.qsy.1132111.com",//用户
        video_api: "https://video.qsy.1132111.com",//视频
        jiexi_api: 'https://jx.qsy.1132111.com/api/api.php',//解析
        appid: "wx5dd7ae8d00e679b9",
        operation:"WX",//当前操作平台
        statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
        swidth: wx.getSystemInfoSync().windowWidth,
        sheight: wx.getSystemInfoSync().windowHeight,
        mode:1,
        config_base_list: {
                 advertisements: {
                BannerAD_ID: "adunit-514dbd292a298297",//banner
                box_ad: "adunit-c60f78b15cf31a4e",//微信盒子广告，QQ：feeds
                chaping: "adunit-fb7e99595af6f451",//插屏
                index_video_ad: "adunit-6b11ce873764a6c4",//微信：视频广告 QQ：卡片广告
                primordialVideo:"adunit-0d643a9279ed436b",//微信：原生广告 QQ：积木广告
                videoAD_ID:"adunit-3f31575d9d370dbe",//激励视频
                rewardedVideoAdTips:"广告未播放完成，无法保存视频\n提示：只要看完广告，即可无限制使用（全天内）免费工具。\n运营成本太高，谢谢您的谅解~\n一天只需要看一次广告 就可无限次使用本程序！",//激励看广告提示
                videoAD_appear:0
            }
        }

    },

     onLaunch: function () {
         var that = this;
         
         wx.getSystemInfo({
             success: function (t) {
                 that.windowWidthh = t.windowWidth, that.windowHeighth = t.windowHeight;
                 that.globalData.ratio = t.windowWidth / 750;
             }
         });
         wx.getSystemInfo({
             success: function (res) {
                 console.log(res)
                 if (res.platform == "ios") {
                     console.log('ios')
                     that.globalData.platform = 'ios';
                 } else {
                     that.globalData.platform = 'android';
                 }
             }
         });
     }

});

if (cache.get('days')) {} else {
    cache.set('days', new Date().toLocaleDateString() + " " + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
}
if (cache.get('down_count')) {} else {
    cache.set('down_count', 0)
}

try{
    //检查是否存在新版本
if (typeof wx.getUpdateManager === 'function') { // 请在使用前先判断是否支持
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log("是否有新版本：" + res.hasUpdate)
    })
    updateManager.onUpdateReady(function() {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            }
        })
    })
    updateManager.onUpdateFailed(function() {
        // 新的版本下载失败
        wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
        })
    })
};
} catch (error) {
 console.log('更新出错')
}