import { createI18n } from "vue-i18n";
import cn from "./cn";
import en from "./en";
import ja from "./ja";
import ko from "./ko";
import ru from "./ru";
import th from "./th";

// 准备翻译的语言环境信息
const i18n = createI18n({
    locale: "cn",   // 初始化中文
    legacy: false,
    globalInjection: true,
    messages: {
        "cn": cn,
        "en": en,
        "ja": ja,
        "ko": ko,
        "ru": ru,
        "th": th
    }
});

export default i18n