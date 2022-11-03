Component({
    externalClasses: [ "content-class" ],
    properties: {
        show: {
            type: Boolean,
            default: !1
        },
        showClose: {
            type: Boolean,
            default: !1
        }
    },
    methods: {
        onClose: function() {
            this.triggerEvent("OnClose");
        },
        onEmpty: function() {}
    }
});