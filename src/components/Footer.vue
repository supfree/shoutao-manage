<template>
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
      <div>
        <p>Copyright © 2023 光生传媒。 保留所有权利。</p>
        <p>京ICP备10214630 营业执照</p>
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
.footer-box {
  width: 62.5%;
  min-height: 360px;
  padding: 30px 0;
  margin: 0 auto;
  text-align: left;
  box-sizing: border-box;

  .footer-list {
    width: 100%;
    display: flex;
    line-height: 38px;

    & > div {
      margin-right: 7vw;
    }

    p {
      width: max-content;
      margin-top: 10px;
      font-size: 12px;
      font-weight: 600;
      color: #111111;
      transform: scale(0.91, 0.91);
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    }

    a {
      display: block;
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
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #dbdbdb;

    div {
      p {
        line-height: 1.4;
        font-size: 12px;
        color: rgba(17, 17, 17, 0.55);
        transform: scale(0.91, 0.91);
      }
    }

    .language {
      display: flex;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }

      :deep(.el-select) {
        border: none;

        .el-input {
          width: max-content;
          max-width: 60px;
          border: none;
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
  #el-footer-list {
    display: block !important;
  }

  :deep(.el-collapse) {
    border-top: none !important;

    .el-collapse-item__header {
      background: none !important;
    }
    .el-collapse-item__arrow {
      transform: rotate(270deg);
    }

    .el-collapse-item__arrow.is-active {
      transform: rotate(90deg) !important;
    }
  }

  :deep(.el-collapse-item__wrap) {
    background: none !important;

    a {
      text-indent: 1em !important;
      margin-top: 10px !important;
      font-size: 14px;
      color: #111111;
      display: block;
      text-decoration: none;
    }
  }

  .footer-box {
    width: 85%;

    .footer-list {
      display: none;
    }
  }

  .language {
    margin: 20px 0;
  }

  .footer-info {
    border: none !important;
    font-size: 10px !important;
    flex-direction: column-reverse;
  }
}
</style>
