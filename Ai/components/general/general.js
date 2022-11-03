Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        img_path: {
            type: String,
            value: ""
        },
        img_file: {
            type: String,
            value: ""
        },
        arrayRes: {
            type: Array,
            value: []
        }
    },
    data: {},
    lifetimes: {},
    methods: {
        preImg: function() {
            var e = "";
            e = this.properties.img_file ? "data:image/jpeg;base64," + this.properties.img_file : this.properties.img_path, 
            wx.previewImage({
                urls: [ e ]
            });
        }
    }
});