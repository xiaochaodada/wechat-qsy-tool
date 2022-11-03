module.exports = {
    getImage: function() {
        return wx.getStorageSync("HeadImage");
    },
    setImage: function(e) {
        wx.setStorage({
            key: "HeadImage",
            data: e
        });
    },
    getName: function() {
        return wx.getStorageSync("NickName");
    },
    setName: function(e) {
        wx.setStorage({
            key: "NickName",
            data: e
        });
    }
};