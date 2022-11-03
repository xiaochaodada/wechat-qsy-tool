Page({
    data: {
        b: [ 0, 0 ],
        blood: [ [ "A型", "B型", "O型", "AB型" ], [ "A型", "B型", "O型", "AB型" ] ],
        setBlood: [ "A", "B", "O", "AB" ],
        dataInfo: [],
        flag: 0
    },
    onLoad: function(A) {
    
    },
    bindPickerChange: function(A) {
        this.setData({
            b: A.detail.value
        });
    },
    formSubmit: function(A) {
        var B = "请选择正确的血型", a = this.data.setBlood[this.data.b[0]], t = this.data.setBlood[this.data.b[1]];
        "A" == a && "B" == t && (B = "您的孩子的血型可能为 A 型、B 型、AB 型、O 型"), "B" == a && "A" == t && (B = "您的孩子的血型可能为 A 型、B 型、AB 型、O 型"), 
        "A" == a && "A" == t && (B = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型"), "A" == a && "O" == t && (B = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型"), 
        "O" == a && "A" == t && (B = "您的孩子的血型可能为 A 型或 O 型，不可能为 B 型 和 AB 型"), "A" == a && "AB" == t && (B = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型"), 
        "AB" == a && "A" == t && (B = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型"), "B" == a && "B" == t && (B = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型"), 
        "B" == a && "O" == t && (B = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型"), "O" == a && "B" == t && (B = "您的孩子的血型可能为 B 型或 O 型，不可能为 A 型 和 AB 型"), 
        "B" == a && "AB" == t && (B = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型"), "AB" == a && "B" == t && (B = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型"), 
        "O" == a && "O" == t && (B = "您的孩子的血型可能为 O 型，不可能为 A 型、B 型和 AB 型"), "O" == a && "AB" == t && (B = "您的孩子的血型可能为 A 型或 B 型，不可能为 O 型 和 AB 型"), 
        "AB" == a && "O" == t && (B = "您的孩子的血型可能为 A 型或 B 型，不可能为 O 型 和 AB 型"), "AB" == a && "AB" == t && (B = "您的孩子的血型可能为  A 型 、B型 及 AB型之一，不可能为 O 型"), 
        this.setData({
            dataInfo: B,
            flag: 1
        });
    },
    onShareAppMessage: function(A) {
        return {
            title: "子女血型查询",
            path: "/packageA/pages/tools/blood/blood"
        };
    }
});