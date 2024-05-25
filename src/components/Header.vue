<template>
  <div class="header">
    <!-- <div class="m-header-search" v-if="is_search">
            <div class="u-flex alignItems">
                <el-input class="inputDeep" size="large" v-model="key_word" placeholder="请输入您要搜索的内容"
                    suffix-icon="Search" @keydown.enter="search" />
                <el-icon style="font-weight: bold;float: right;" size="20" @click="toggleSearch">
                    <Close />
                </el-icon>
            </div>
        </div> -->
    <div class="header-box">
      <div
        class="header-logo touch"
        @click="gotoInfo('/')"
        v-if="mobile_search"
      >
        <img :src="logo" alt="" />
        <!-- <span class="logo-text">{{ $t('main.Title') }}</span> -->
      </div>
      <!-- <div v-if="!is_search" class="header-nav"> -->
      <div class="header-nav_item" v-if="!is_search">
        <router-link to="/live">{{ $t("main.Live") }}</router-link>
      </div>
      <div class="header-nav_item" v-if="!is_search">
        <router-link to="/master">{{ $t("main.Talent") }}</router-link>
      </div>
      <div class="header-nav_item" v-if="!is_search">
        <router-link to="/join">{{ $t("main.Join-us") }}</router-link>
      </div>
      <div class="header-nav_item" v-if="!is_search">
        <router-link to="/new">{{ $t("main.News") }}</router-link>
      </div>
      <div class="header-nav_item" v-if="!is_search">
        <router-link to="/about">{{ $t("main.About") }}</router-link>
      </div>
      <!-- </div> -->
      <div
        class="right u-flex alignItems"
        :style="mobile_search ? '' : 'width: 100%'"
      >
        <div class="search" v-if="is_search">
          <el-input
            class="inputDeep"
            v-model="key_word"
            size="small"
            placeholder="请输入您要搜索的内容"
            @keydown.enter="search"
          ></el-input>
          <img
            class="icon-search"
            src="../assets/images/icons/search.svg"
            alt="menu"
            @click="search"
            v-if="_isMobile"
          />
          <el-icon class="touch" size="20" @click="toggleSearch"
            ><Close
          /></el-icon>
        </div>
        <div class="u-flex alignItems" v-else>
          <img
            class="icon-search"
            src="../assets/images/icons/search.svg"
            alt="menu"
            @click="toggleSearch"
          />
          <!-- <img class="icon-menu" src="../assets/images/icons/menu.png" alt="menu" @click="toggleMenu"> -->
          <div class="icon-menu" id="btnSwitch" @click="toggleMenu">
            <div class="BtnLine">
              <div class="LineTop"></div>
              <div class="LineBottom"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu" @touchmove.prevent v-if="is_menu">
        <div class="menu-list animate__animated animate__fadeIn">
          <div
            class="logo-text touch"
            v-for="item in menuList"
            :key="item"
            @click="gotoInfo(item.path)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
// 判断设备
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

const props = defineProps({
  dark: String,
});

let key_word = ref("");
let menuList = ref([
  // {
  //     name: t('main.Index'),
  //     path: '/'
  // },
  {
    name: t("main.Live"),
    path: "/live",
  },
  {
    name: t("main.Talent"),
    path: "/master",
  },
  {
    name: t("main.Join-us"),
    path: "/join",
  },
  {
    name: t("main.News"),
    path: "/new",
  },
  {
    name: t("main.About"),
    path: "/about",
  },
]);
let logo = ref("");
console.log(props.dark);
if (props.dark == 0) {
  logo.value =
    localStorage.getItem("value") != "cn"
      ? require("../assets/images/logo_en1.png")
      : require("../assets/images/logo_cn1.png");
} else {
  logo.value =
    localStorage.getItem("value") != "cn"
      ? require("../assets/images/logo_en.png")
      : require("../assets/images/logo_cn.png");
}

const is_search = ref(false);
const is_menu = ref(false);

onMounted(() => {
  console.log(t("main.Live"));
});

const mobile_search = computed(() => {
  if (_isMobile) {
    if (is_search.value) {
      return false;
    }
  }
  return true;
});

// 控制搜索栏显示
const toggleSearch = () => {
  is_search.value = !is_search.value;
};

// h5菜单显示
const toggleMenu = () => {
  is_menu.value = !is_menu.value;

  const GloHeader = document.getElementById("globalheader");
  const NavigationBar = document.querySelector(".header-box");
  const lineTop = document.querySelector(".LineTop");
  const lineBottom = document.querySelector(".LineBottom");
  const logoText = document.querySelector(".menu .logo-text");
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  if (is_menu.value) {
    GloHeader.style.transition = "0.5s";
    GloHeader.style.backgroundColor = "#000";
    // logoText.style.color = "#FFFFFF";
    NavigationBar.style.backgroundColor = "#111111";
    NavigationBar.style.transition = "1s";
    lineTop.style.transform = "translateY(3px) rotate(45deg)";
    lineTop.style.backgroundColor = "#FFFFFF";
    lineBottom.style.backgroundColor = "#FFFFFF";
    lineBottom.style.width = "18px";
    lineBottom.style.transform = "translateY(-3px) rotate(-45deg)";
    htmlElement.style.overflow = "hidden";
    bodyElement.style.overflow = "hidden";

    logo.value =
      localStorage.getItem("value") != "cn"
        ? require("../assets/images/logo_en1.png")
        : require("../assets/images/logo_cn1.png");
  } else {
    logo.valie =
      localStorage.getItem("value") != "cn"
        ? require("../assets/images/logo_en.png")
        : require("../assets/images/logo_cn.png");

    GloHeader.style.transition = "0.5s";
    NavigationBar.style.transition = "1s";
    lineTop.style.transform = "translateY(0) rotate(0deg)";
    lineBottom.style.width = "12px";
    lineBottom.style.transform = "translateY(0) rotate(0deg)";
    htmlElement.style.overflow = "visible";
    bodyElement.style.overflow = "visible";
    if (props.dark == 0) {
      return;
    }
    logoText.style.color = "#000000";
    NavigationBar.style.backgroundColor = "#ffffff";
    GloHeader.style.backgroundColor = "#ffffff";
    lineTop.style.backgroundColor = "#111111";
    lineBottom.style.backgroundColor = "#111111";
  }

  // if (localStorage.getItem("value") != "cn") {
  //   if (is_menu.value) {
  //     logo = require("../assets/images/logo_cn1.png");
  //   } else {
  //     logo = require("../assets/images/logo_cn.png");
  //   }
  // } else {
  //   if (is_menu.value) {
  //     logo = require("../assets/images/logo_en1.png");
  //   } else {
  //     logo = require("../assets/images/logo_en.png");
  //   }
  // }
};

// 搜索跳转
const search = () => {
  is_search.value = false;
  setTimeout(() => {
    router.push({ path: "/search", query: { value: key_word.value } });
  }, 500);
};

const gotoInfo = (path) => {
  console.log(path);
  router.push({ path: path });
  if (is_menu.value) {
    toggleMenu();
  }
};
</script>

<style lang="scss" scoped>
.dark {
  background-color: rgba(17, 17, 17, 0.93);
  .header-nav_item {
    a {
      color: rgba(255, 255, 255, 0.77);
    }
  }

  .right {
    .icon-search {
      filter: invert(100%);
    }
    .search {
      .el-icon {
        color: #ffffff;
      }
    }
  }

  .icon-menu {
    .BtnLine {
      .LineTop,
      .LineBottom {
        background-color: #ffffff;
      }
    }
  }
}

.header {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(7px);
  box-shadow: inset 0px 0px 0px 0px rgba(17, 17, 17, 0.15);
}

.m-header-search {
  display: none;
  width: 100%;
  height: 100%;
  padding: 0.1rem;

  :deep(.el-input) {
    .el-icon {
      color: #111111;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.header-box {
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 62.5%;
  max-width: 1200px;
  height: 100%;
  // padding: 8px 0;
  margin: 0 auto;
  box-sizing: border-box;
}

.header-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    width: 128px;
    height: 48px;
    object-fit: contain;
    margin-right: 10px;
  }

  .logo-text {
    font-size: 19px;
    font-weight: bold;
    color: #111111;
  }
}

.header-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_item {
    font-size: 14px;
    font-weight: 400;

    a {
      color: rgba(17, 17, 17, 0.77);
      text-decoration: none;

      &:hover {
        color: #888888;
      }
    }
  }
}

.search {
  display: flex;
  align-items: center;
  .el-input__wrapper {
    box-shadow: none;

    :hover {
      box-shadow: none;
    }

    :focus {
      box-shadow: none;
    }
  }
}

.right {
  margin-right: 20px;
  .icon-search {
    width: 14px;
    height: 14px;
    object-fit: cover;
    cursor: pointer;
  }

  .el-input__inner::placeholder {
    font-size: 14px;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    font-weight: 400;
    color: rgba(17, 17, 17, 0.55);
  }

  // .icon-menu {
  //     display: none;
  //     width: 28px;
  //     height: 28px;
  //     margin-left: 10px;
  //     cursor: pointer;
  // }

  .icon-menu {
    display: none;

    .BtnLine {
      // width: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .LineTop {
      width: 18px;
      height: 2px;
      transition: 0.5s;
      border-radius: 10px;
      background-color: #111111;
    }

    .LineBottom {
      width: 12px;
      height: 2px;
      margin-top: 4px;
      transition: 0.5s;
      border-radius: 10px;
      background-color: #111111;
    }
  }
}

.menu {
  z-index: 999;
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #111111;

  &-list {
    width: 100%;
    // height: calc(100vh - 58px);
    padding: 0 20px;
    overflow-y: hidden;
    color: #ffffff;

    div {
      line-height: 29px;
      padding: 22px 28px;
      text-align: left;
      font-size: 20px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.93);
    }
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
    cursor: default;
    background: none;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset !important;

    .el-input__inner {
      cursor: default !important;
    }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .header-box {
    width: 100%;
    padding: 14px;

    .search {
      width: 100%;
    }
  }

  .header-nav_item {
    display: none;
  }

  .header-logo {
    margin: 0 !important;
    img {
      width: 96px;
      height: 36px;
    }

    .logo-text {
      font-size: 14px;
    }
  }

  .header-nav {
    display: none;
  }

  .right {
    margin: 0 !important;
    .icon-search {
      margin-right: 21px;
    }
  }

  .icon-menu {
    display: block !important;
  }
}
</style>
