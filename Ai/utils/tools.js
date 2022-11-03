var e = require("../../wordclooud/js/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.tools = void 0;

var r = e(require("../../wordclooud/js/defineProperty")), t = {
    detect: function(e) {
        try {
            if (e) {
                var r = (e = e.faces[0].attributes).gender.value;
                r = {
                    Female: "女",
                    Male: "男"
                }[r];
                var t, a = e.age.value, n = e.smile.value > e.smile.threshold ? "微笑" : "正常", s = 0, o = {
                    dark_glasses: "佩戴墨镜",
                    no_glass_eye_close: "闭眼",
                    no_glass_eye_open: "睁眼",
                    normal_glass_eye_close: "佩戴普通眼镜且闭眼",
                    normal_glass_eye_open: "佩戴普通眼镜且睁眼",
                    occlusion: "眼睛被遮挡"
                }, _ = "";
                for (t in e.eyestatus.left_eye_status) e.eyestatus.left_eye_status[t] > s && (_ = t,
                    s = e.eyestatus.left_eye_status[t]);
                _ = o[_];
                var i = "";
                for (t in s = 0, e.eyestatus.left_eye_status) e.eyestatus.right_eye_status[t] > s && (i = t,
                    s = e.eyestatus.right_eye_status[t]);
                i = o[i];
                var l = "";
                for (t in s = 0, e.emotion) e.emotion[t] > s && (l = t, s = e.emotion[t]);
                l = {
                    anger: "愤怒",
                    disgust: "厌恶",
                    fear: "恐惧",
                    happiness: "高兴",
                    neutral: "平静",
                    sadness: "伤心",
                    surprise: "惊讶"
                }[l];
                var u = e.beauty[e.gender.value.toLowerCase() + "_score"], c = "";
                for (t in s = 0, e.mouthstatus) e.mouthstatus[t] > s && (c = t, s = e.mouthstatus[t]);
                c = {
                    surgical_mask_or_respirator: "嘴部被口罩或面罩遮挡",
                    other_occlusion: "嘴部被其他物体遮挡",
                    close: "嘴部闭上",
                    open: "嘴部张开"
                }[c];
                var f = "";
                for (t in s = 0, e.skinstatus) e.skinstatus[t] > s && (f = t, s = e.skinstatus[t]);
                return {
                    "性别": r,
                    "年龄": a,
                    "笑容": n,
                    "左眼": _,
                    "右眼": i,
                    "表情": l,
                    "颜值": u,
                    "嘴巴": c,
                    "皮肤": f = {
                        health: "健康",
                        stain: "色斑",
                        acne: "青春痘",
                        dark_circle: "黑眼圈"
                    }[f]
                };
            }
        } catch (error) {
          console.log("错误")
            wx.showModal({
                title: '温馨提示',
                content: '当前照片检测不出人脸,无法识别,请重新上传。',
                confirmText: '我知道了',
                confirmColor: '#1AAD19',
                showCancel:!1,
                success: function (t) {
                    if (t.confirm) {
                        wx.navigateTo({
                            url: '/Ai/pages/home/home',
                        })
                    }
                }
            })
        }
    },
    beautify: function(e) {
        if (e) return {
            img_file: e.result,
            img_path: e.img_path
        };
    },
    feature: function(e) {
        if (e && (e = e.result)) {
            var r = e.three_parts.one_part.faceup_result;
            r = {
                faceup_normal: "标准",
                faceup_long: "偏长",
                faceup_short: "偏短"
            }[r];
            var t = e.three_parts.two_part.facemid_result;
            t = {
                facemid_normal: "标准",
                facemid_long: "偏长",
                facemid_short: "偏短"
            }[t];
            var a = e.three_parts.three_part.facedown_result;
            a = {
                facedown_normal: "标准",
                facedown_long: "偏长",
                facedown_short: "偏短"
            }[a];
            var n = e.five_eyes.one_eye.righteye_empty_result;
            n = {
                righteye_empty_normal: "外侧适中",
                righteye_empty_short: "外侧偏窄",
                righteye_empty_long: "外侧偏宽"
            }[n];
            var s = e.five_eyes.three_eye.eyein_result;
            s = {
                eyein_normal: "间距适中",
                eyein_short: "间距偏窄",
                eyein_long: "间距偏宽"
            }[s];
            var o = e.five_eyes.five_eye.lefteye_empty_result;
            o = {
                lefteye_empty_normal: "外侧适中",
                lefteye_empty_short: "外侧偏窄",
                lefteye_empty_long: "外侧偏宽"
            }[o];
            var _ = e.face.face_type;
            _ = {
                pointed_face: "瓜子脸",
                oval_face: "椭圆脸",
                diamond_face: "菱形脸",
                round_face: "圆形脸",
                long_face: "长形脸",
                square_face: "方形脸",
                normal_face: "标准脸"
            }[_];
            var i = e.jaw.jaw_type;
            i = {
                flat_jaw: "圆下巴",
                sharp_jaw: "尖下巴",
                square_jaw: "方下巴"
            }[i];
            var l = e.eyebrow.eyebrow_type;
            l = {
                bushy_eyebrows: "粗眉",
                eight_eyebrows: "八字眉",
                raise_eyebrows: "上挑眉",
                straight_eyebrows: "一字眉",
                round_eyebrows: "拱形眉",
                arch_eyebrows: "柳叶眉",
                thin_eyebrows: "细眉"
            }[l];
            var u = e.eyes.eyes_type;
            u = {
                round_eyes: "圆眼",
                thin_eyes: "细长眼",
                big_eyes: "大眼",
                small_eyes: "小眼",
                normal_eyes: "标准眼"
            }[u];
            var c = e.nose.nose_type;
            c = {
                normal_nose: "标准鼻",
                thick_nose: "宽鼻",
                thin_nose: "窄鼻"
            }[c];
            var f = e.mouth.mouth_type;
            return {
                "上庭": r,
                "中庭": t,
                "下庭": a,
                "右眼外侧": n,
                "内眼角": s,
                "左眼外侧": o,
                "脸型": _,
                "下巴": i,
                "眉形": l,
                "眼型": u,
                "鼻型": c,
                "唇形": f = {
                    thin_lip: "薄唇",
                    thick_lip: "厚唇",
                    smile_lip: "微笑唇",
                    upset_lip: "态度唇",
                    normal_lip: "标准唇"
                }[f]
            };
        }
    },
    skin: function(e) {
        if (e) {
            var r = (e = e.result).left_eyelids.value, t = {
                0: "单眼皮",
                1: "平行双眼皮",
                2: "扇形双眼皮"
            };
            r = t[r];
            var a = e.right_eyelids.value;
            a = t[a];
            var n = e.eye_pouch.value;
            n = {
                0: "无眼袋",
                1: "有眼袋"
            }[n];
            var s = e.dark_circle.value;
            s = {
                0: "无黑眼圈",
                1: "有黑眼圈"
            }[s];
            var o = e.forehead_wrinkle.value;
            o = {
                0: "无抬头纹",
                1: "有抬头纹"
            }[o];
            var _ = e.crows_feet.value;
            _ = {
                0: "无鱼尾纹",
                1: "有鱼尾纹"
            }[_];
            var i = e.eye_finelines.value;
            i = {
                0: "无眼部细纹",
                1: "有眼部细纹"
            }[i];
            var l = e.glabella_wrinkle.value;
            l = {
                0: "无眉间纹",
                1: "有眉间纹"
            }[l];
            var u = e.nasolabial_fold.value;
            u = {
                0: "无法令纹",
                1: "有法令纹"
            }[u];
            var c = e.skin_type.skin_type;
            c = {
                0: "油性皮肤",
                1: "干性皮肤",
                2: "中性皮肤",
                3: "混合性皮肤"
            }[c];
            var f = e.pores_forehead.value;
            f = {
                0: "前额无毛孔粗大",
                1: "前额有毛孔粗大"
            }[f];
            var v = e.pores_left_cheek.value, d = {
                0: "脸颊无毛孔粗大",
                1: "脸颊有毛孔粗大"
            };
            v = d[v];
            var y = e.pores_right_cheek.value;
            y = d[y];
            var h = e.pores_jaw.value;
            h = {
                0: "下巴无毛孔粗大",
                1: "下巴有毛孔粗大"
            }[h];
            var p = e.blackhead.value;
            p = {
                0: "无黑头",
                1: "有黑头"
            }[p];
            var m = e.acne.value;
            m = {
                0: "无痘痘",
                1: "有痘痘"
            }[m];
            var g = e.mole.value;
            g = {
                0: "无痣",
                1: "有痣"
            }[g];
            var b = e.skin_spot.value;
            return {
                "左眼": r,
                "右眼": a,
                "眼袋": n,
                "黑眼圈": s,
                "抬头纹": o,
                "鱼尾纹": _,
                "眼部细纹": i,
                "眉间纹": l,
                "法令纹": u,
                "肤质": c,
                "前额毛孔": f,
                "左脸颊": v,
                "右脸颊": y,
                "下巴": h,
                "黑头": p,
                "痘痘": m,
                "痣": g,
                "斑点": b = {
                    0: "无斑点",
                    1: "有斑点"
                }[b]
            };
        }
    },
    gesture: function(e) {
        if (e) {
            e = e.hands[0].gesture;
            var r, t, a = 0;
            for (r in e) e[r] > a && (a = e[r], t = r);
            return t = {
                unknown: "未定义手势",
                heart_a: "比心 A",
                heart_b: "比心 B",
                heart_c: "比心 C",
                heart_d: "比心 D",
                ok: "OK",
                hand_open: "手张开",
                thumb_up: "大拇指向上",
                thumb_down: "大拇指向下",
                rock: "ROCK",
                namaste: "合十",
                palm_up: "手心向上",
                fist: "握拳",
                index_finger_up: "食指朝上",
                double_finger_up: "双指朝上",
                victory: "胜利",
                big_v: "大 V 字",
                phonecall: "打电话",
                beg: "作揖",
                thanks: "感谢"
            }[t], {
                "手势": t
            };
        }
    },
    segment: function(e) {},
    idcard: function(e) {
        for (var r = 0; r < e.cards.length; r++) {
            var t = e.cards[r];
            if (1 == t.type) {
                if ("front" === t.side) return {
                    "姓名": t.name,
                    "性别": t.gender,
                    "民族": t.race,
                    "出生日期": t.birthday,
                    "住址": t.address,
                    "身份证号": t.id_card_number
                };
                if ("back" === t.side) return {
                    "签发机关": t.issued_by,
                    "有效日期": t.valid_date
                };
            }
        }
    },
    drivercard: function(e) {
        if (e) {
            if (e.main.length) {
                var t = e.main[0];
                return (0, r.default)({
                    "姓名": t.name.content,
                    "性别": t.gender.content,
                    "国籍": t.nationality.content,
                    "住址": t.address.content,
                    "出生日期": t.birthday.content,
                    "驾驶证号": {
                        1: "2008或更早版本驾驶证",
                        2: "2013版本驾驶证"
                    }[t.version.content],
                    "驾驶证版本": t.issue_date.content,
                    "准驾车型": t.class.content,
                    "有效期限": t.valid_date.content
                }, "驾驶证号", t.license_number.content);
            }
            if (e.second.length) {
                var a = e.second[0];
                return {
                    "姓名": a.name.content,
                    "驾驶证证号": a.license_number.content,
                    "档案编号": a.file_number.content
                };
            }
        }
    },
    vehiclecard: function(e) {
        if (e) for (var r = 0; r < e.cards.length; r++) {
            var t = e.cards[r];
            if ("front" === t.side) return {
                "号牌号码": t.plate_no,
                "车辆类型": t.vehicle_type,
                "所有人": t.owner,
                "住址": t.address,
                "使用性质": t.use_character,
                "品牌型号": t.model,
                "车辆识别代号": t.vin,
                "发动机号码": t.engine_no,
                "注册日期": t.register_date,
                "发证日期": t.issue_date
            };
        }
    },
    bankcard: function(e) {
        if (e) for (var r = 0; r < e.bank_cards.length; r++) {
            for (var t = e.bank_cards[r], a = "", n = 0; n < t.organization.length; n++) a += 0 === n ? t.organization[n] : "、" + t.organization[n];
            return {
                "所属银行": t.bank,
                "银行卡号": t.number,
                "银行组织": a
            };
        }
    },
    plate: function(e) {
        if (e) for (var r = {
            0: "蓝色",
            1: "黄色",
            2: "黑色",
            3: "白色",
            4: "绿色",
            5: "小型新能源",
            6: "大型新能源",
            7: "缺失",
            8: "无效"
        }, t = 0; t < e.results.length; t++) {
            var a = e.results[t];
            return {
                "车牌号": a.license_plate_number,
                "颜色": r[a.color]
            };
        }
    },
    scene: function(e) {
        if (e) {
            for (var r = "", t = 0, a = 0; a < e.scenes.length; a++) e.scenes[a].confidence > t && (r = e.scenes[a].value);
            var n = "";
            t = 0;
            for (a = 0; a < e.objects.length; a++) e.objects[a].confidence > t && (n = e.objects[a].value);
            return {
                "场景": r,
                "物体": n
            };
        }
    }
};

exports.tools = t;