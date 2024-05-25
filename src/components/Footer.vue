<template>
  <div>
    <div class="footer-box">
      <div class="footer-list">
        <div>
          <div>
            <p>{{ $t("main.Live") }}</p>
            <router-link to="/live#liveBox">{{
              $t("main.Entertainment-live")
            }}</router-link>
            <router-link to="/live#liveBox">{{
              $t("main.E-commerce-live")
            }}</router-link>
          </div>
          <div>
            <p>{{ $t("main.Talent") }}</p>
            <router-link to="/master">{{
              $t("main.List-of-talents")
            }}</router-link>
          </div>
        </div>

        <div>
          <div>
            <p>{{ $t("main.Join-us") }}</p>
            <router-link to="/join">{{ $t("main.Join") }}</router-link>
            <router-link to="/join">{{ $t("main.Employee-life") }}</router-link>
          </div>
          <div>
            <p>{{ $t("main.News") }}</p>
            <router-link to="/new">{{ $t("main.Hot-news") }}</router-link>
          </div>
        </div>

        <div>
          <div>
            <p>{{ $t("main.About") }}</p>
            <router-link to="/about">{{ $t("main.About") }}</router-link>
            <router-link to="/about">{{
              $t("main.Touch-the-platform")
            }}</router-link>
            <router-link to="/about">{{
              $t("main.Cooperative-brand")
            }}</router-link>
            <router-link to="/about">{{
              $t("main.Team-introduction")
            }}</router-link>
            <router-link to="/about">{{
              $t("main.Service-content")
            }}</router-link>
            <router-link to="/about">{{
              $t("main.Company-address")
            }}</router-link>
          </div>
        </div>

        <div>
          <div>
            <p>{{ $t("main.Manage") }}</p>
            <router-link to="/">{{ $t("main.Artist-management") }}</router-link>
          </div>
        </div>
      </div>
      <!-- 手机端 -->
      <el-collapse id="el-footer-list">
        <el-collapse-item :title="$t('main.Live')" name="1">
          <router-link to="/">{{ $t("main.Entertainment-live") }}</router-link>
          <router-link to="/">{{ $t("main.E-commerce-live") }}</router-link>
        </el-collapse-item>
        <el-collapse-item :title="$t('main.Talent')" name="2">
          <router-link to="/">{{ $t("main.List-of-talents") }}</router-link>
        </el-collapse-item>
        <el-collapse-item :title="$t('main.Join-us')" name="3">
          <router-link to="/">{{ $t("main.Join") }}</router-link>
          <router-link to="/">{{ $t("main.Employee-life") }}</router-link>
        </el-collapse-item>
        <el-collapse-item :title="$t('main.News')" name="4">
          <router-link to="/">{{ $t("main.Hot-news") }}</router-link>
        </el-collapse-item>
        <el-collapse-item :title="$t('main.About')" name="5">
          <router-link to="/">{{ $t("main.About") }}</router-link>
          <router-link to="/">{{ $t("main.Touch-the-platform") }}</router-link>
          <router-link to="/">{{ $t("main.Cooperative-brand") }}</router-link>
          <router-link to="/">{{ $t("main.Team-introduction") }}</router-link>
          <router-link to="/">{{ $t("main.Service-content") }}</router-link>
          <router-link to="/">{{ $t("main.Company-address") }}</router-link>
        </el-collapse-item>
        <el-collapse-item :title="$t('main.Manage')" name="6">
          <router-link to="/">{{ $t("main.Artist-management") }}</router-link>
        </el-collapse-item>
      </el-collapse>
      <div class="footer-info">
        <div class="left">
          <p>
            {{
              locale == "cn"
                ? "Copyright © 2023 光生传媒。 保留所有权利。"
                : "Copyright © 2023 VividTide.  All rights reserved."
            }}
          </p>
          <p v-if="locale == 'cn'">京ICP备10214630 营业执照</p>
        </div>
        <div class="language">
          <img src="../assets/images/icons/icon-earth.png" alt="" />
          <el-select
            class="inputDeep"
            v-model="value"
            value-key="id"
            size="large"
            @change="selectChange"
          >
            <el-option
              v-for="item in language"
              :key="item.id"
              :label="item.lang"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "../assets/js/request.js";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const value = ref(1);
let language = ref([]);

onMounted(() => {
  getLanguage();
  if (localStorage.getItem("key")) {
    value.value = Number(localStorage.getItem("key"));
    locale.value = localStorage.getItem("value");
  } else {
    localStorage.setItem("key", 1);
    localStorage.setItem("value", "cn");
    localStorage.setItem("label", "中文");
  }
});

// 获取首页信息
const getLanguage = () => {
  get("index/store").then((res) => {
    language.value = res.data;
  });
};

// 选择
const selectChange = (e) => {
  switch (value.value) {
    case 1:
      locale.value = "cn";
      break;
    case 2:
      locale.value = "en";
      break;
    case 3:
      locale.value = "ja";
      break;
    case 4:
      locale.value = "ru";
      break;
    case 5:
      locale.value = "ko";
      break;
    case 6:
      locale.value = "th";
      break;
    default:
      locale.value = "cn";
      break;
  }
  console.log(e, locale.value);
  localStorage.setItem("key", e);
  localStorage.setItem("label", language.value[e - 1].lang);
  localStorage.setItem("value", locale.value);
  location.reload();
  // window.scrollY(0);
};
</script>

<style lang="scss" scoped>
.dark {
  background-color: #1d1d1f;
  .footer-box {
    .footer-list {
      p {
        color: rgba(255, 255, 255, 0.93);
      }
      a {
        color: rgba(255, 255, 255, 0.77);
      }
    }

    .footer-info {
      border-color: rgba(255, 255, 255, 0.15);
      .left {
        color: rgba(255, 255, 255, 0.55);
      }

      .language {
        img {
          filter: invert(100%);
        }

        :deep(.el-select) {
          .el-input__inner {
            color: rgba(255, 255, 255, 0.77);
          }
        }
      }
    }
  }
}
.footer-box {
  width: 62.5%;
  max-width: 1200px;
  padding-bottom: 17px;
  margin: 0 auto;
  text-align: left;
  box-sizing: border-box;

  .footer-list {
    width: 100%;
    display: flex;
    padding: 11px 0 25px;

    & > div {
      margin-right: 96px;
    }

    p {
      width: max-content;
      margin-top: 21px;
      font-size: 12px;
      font-weight: 500;
      color: #111111;
      transform: scale(0.91, 0.91);
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    }

    a {
      display: block;
      margin-top: 13px;
      margin-left: -1px;
      font-size: 12px;
      color: rgba(17, 17, 17, 0.77);
      text-decoration: none;
      transform: scale(0.91, 0.91);
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;

      &:hover {
        color: #111111;
      }
    }
  }

  .footer-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #dbdbdb;

    .left {
      margin-left: -11px;
      font-size: 12px;
      transform: scale(0.91, 0.91);
      font-weight: 400;
      color: rgba(17, 17, 17, 0.55);
      line-height: 17px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    }

    .language {
      display: flex;
      align-items: center;
      height: 20px;

      img {
        width: 14px;
        height: 14px;
        object-fit: cover;
      }

      :deep(.el-select) {
        width: max-content;
        // height: 17px !important;
        max-width: 90px;
        border: none;
        // line-height: 0 !important;

        .el-input {
          // height: 17px !important;
          border: none;
          // line-height: normal !important;
        }
        .el-input__inner {
          // height: 17px !important;
          color: rgba(17, 17, 17, 0.77);
        }

        --el-select-input-focus-border-color: none;
      }
    }
  }

  #el-footer-list {
    display: none;
  }
}

.inputDeep {
  :deep(.el-input) {
    display: flex;
    align-items: center;
    font-size: 12px;
    transform: scale(0.91, 0.91);
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    font-weight: 400;
    color: rgba(17, 17, 17, 0.77);
    .is-focus {
      border: none !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset !important;

      :hover {
        border: none !important;
      }
    }
  }

  :deep(.el-input__wrapper) {
    padding: 0;
    background: none;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset !important;
    cursor: default;

    // .el-input__inner {
    //     cursor: default !important;
    // }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .dark {
    :deep(.el-collapse) {
      .el-collapse-item__header {
        color: rgba(255, 255, 255, 0.93);
        border-color: rgba(255,255,255,0.15);
      }
    }
  }
  #el-footer-list {
    display: block !important;
  }

  :deep(.el-collapse) {
    border-top: none !important;
    border-bottom: none !important;

    .el-collapse-item__header {
      height: max-content;
      padding: 10px 0 12px;
      font-size: 10px;
      line-height: 15px;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.93);
      background: none !important;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    }
    .el-collapse-item__arrow {
      color: #111111;
      font-size: 14px;
      font-weight: bold;
      transform: rotate(270deg);
    }

    .el-collapse-item__arrow.is-active {
      transform: rotate(90deg) !important;
    }

    .el-collapse-item__content {
      padding: 4px 14px 8px;
    }
  }

  :deep(.el-collapse-item__wrap) {
    background: none !important;

    a {
      // margin-top: 10px !important;
      display: block;
      margin-bottom: 10px;
      font-size: 10px;
      font-weight: 400;
      text-decoration: none;
      color: rgba(17, 17, 17, 0.77);
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    }
  }

  .footer-box {
    width: 100%;
    padding: 14px 28px 34px;

    .footer-list {
      display: none;
    }
  }

  .language {
    margin: 20px 0 21px;
  }

  .footer-info {
    border: none !important;
    font-size: 10px !important;
    flex-direction: column-reverse;
    .left {
      font-size: 10px !important;
    }
  }
}
</style>
