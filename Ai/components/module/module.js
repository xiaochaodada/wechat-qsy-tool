Component({
    properties: {
        category: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        onTap: function() {
            this.triggerEvent("click");
        }
    }
});