var t = require("../../utils/func");

Component({
    data: {
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        totalLength: 0,
        bigLength: 0,
        ratio: .5,
        sliderLength: 40,
        containerLeft: 0,
        hideOption: ""
    },
    properties: {
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        step: {
            type: Number
        },
        minValue: {
            type: Number
        },
        maxValue: {
            type: Number
        },
        blockColor: {
            type: String
        },
        backgroundColor: {
            type: String
        },
        selectedColor: {
            type: String
        }
    },
    methods: {
        _propertyLeftValueChange: function() {
            var t = this.data.minValue / this.data.max * this.data.bigLength, a = this.data.min / this.data.max * this.data.bigLength;
            this.setData({
                leftValue: t - a
            });
        },
        _propertyRightValueChange: function() {
            var t = this.data.maxValue / this.data.max * this.data.bigLength + this.data.sliderLength;
            this.setData({
                rightValue: t
            });
        },
        _minMove: function(t) {
            var a = t.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2;
            a + this.data.sliderLength >= this.data.rightValue ? a = this.data.rightValue - this.data.sliderLength : a <= 0 && (a = 0), 
            this.setData({
                leftValue: a
            });
            var e = {
                lowValue: parseInt(a / this.data.bigLength * parseInt(this.data.max - this.data.min) + this.data.min)
            };
            this.triggerEvent("lowValueChange", e);
        },
        _maxMove: function(t) {
            var a = t.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2;
            a <= this.data.leftValue + this.data.sliderLength ? a = this.data.leftValue + this.data.sliderLength : a >= this.data.totalLength && (a = this.data.totalLength), 
            this.setData({
                rightValue: a
            }), a -= this.data.sliderLength;
            var e = {
                heighValue: parseInt(a / this.data.bigLength * (this.data.max - this.data.min) + this.data.min)
            };
            this.triggerEvent("heighValueChange", e);
        },
        hide: function() {
            this.setData({
                hideOption: "hide"
            });
        },
        show: function() {
            this.setData({
                hideOption: ""
            });
        },
        reset: function() {
            this.setData({
                rightValue: this.data.totalLength,
                leftValue: 0
            });
        }
    },
    ready: function() {
        var a = this, e = this;
        t.wxPromisify(wx.getSystemInfo), t.wxPromisify(wx.createSelectorQuery().in(this).select(".container").boundingClientRect);
        t.wxPromisify(wx.getSystemInfo)().then(function(t) {
            var a = t.windowWidth / 750;
            e.setData({
                ratio: a
            });
        }).then(function() {
            wx.createSelectorQuery().in(a).select(".container").boundingClientRect(function(t) {
                e.setData({
                    totalLength: t.width / e.data.ratio - e.data.sliderLength,
                    bigLength: t.width / e.data.ratio - 2 * e.data.sliderLength,
                    rightValue: t.width / e.data.ratio - e.data.sliderLength,
                    containerLeft: t.left / e.data.ratio
                }), e._propertyLeftValueChange(), e._propertyRightValueChange();
            }).exec();
        });
    }
});