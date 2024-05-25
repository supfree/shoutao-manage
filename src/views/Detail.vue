<template>
  <div class="detail">
    <div class="contain">
      <div class="header">
        <p class="date">
          {{
            traversalTime(detail.date)[0] +
            $t("other.Month") +
            traversalTime(detail.date)[1] +
            $t("other.Day")
          }}
        </p>
        <h2>{{ detail.name }}</h2>
        <p class="intro">{{ detail.title_deputy }}</p>
        <div class="icon-box">
          <img
            :src="item.icon"
            alt=""
            v-for="(item, index) in iconList"
            :key="item"
            @click="operation(index)"
          />
        </div>
      </div>

      <!-- 轮播 -->
      <!-- :navigation="!Boolean(_isMobile)" -->
      <div class="swiper-box">
        <swiper
          class="mySwiper"
          :modules="modules"
          :space-between="36"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="item in banner" :key="item">
            <img :src="imageUrl + item" alt="" />
          </swiper-slide>
        </swiper>
        <div
          class="swiper-button-next"
          style="
            right: -40px;
            top: var(--swiper-navigation-top-offset, 50%);
            color: rgba(17, 17, 17, 0.77) !important;
          "
        ></div>
        <div
          class="swiper-button-prev"
          style="
            left: -40px;
            top: var(--swiper-navigation-top-offset, 50%);
            color: rgba(17, 17, 17, 0.77) !important;
          "
        ></div>
      </div>

      <!-- 详情 -->
      <div class="content" v-html="detail.editor"></div>

      <div class="bottom">
        <h2>{{ $t("other.Share") }}</h2>
        <div class="icon-box">
          <img
            :src="item.icon"
            alt=""
            v-for="(item, index) in iconList"
            :key="item"
            @click="operation(index)"
          />
        </div>
        <el-divider />
      </div>

      <div class="recommend">
        <h2>{{ $t("other.Spot-news") }}</h2>
        <div
          class="recommend-item"
          v-for="item in recommendList"
          :key="item"
          @click="goInfo(item.id)"
        >
          <img :src="imageUrl + item.image1" alt="" />
          <div>
            <h3 class="u-line-2">{{ item.name }}</h3>
            <p>
              {{
                traversalTime(item.date)[0] +
                $t("other.Month") +
                traversalTime(item.date)[1] +
                $t("other.Day")
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, onMounted, getCurrentInstance } from "vue";
import { get, imageUrl } from "../assets/js/request.js";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let value = ref(route.query.id);

import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const modules = [Navigation, Pagination, Scrollbar];

onMounted(() => {
  getInfo();
  getNewList();
});

// 判断设备
const traversalTime =
  getCurrentInstance().appContext.config.globalProperties.$utils.traversalTime;

const detail = ref({});
const banner = ref([]);
const getInfo = () => {
  get("index/artistDetails", {
    store_id: localStorage.getItem("key") || 1,
    id: value.value,
  }).then((res) => {
    detail.value = res.data;
    banner.value = res.data.image.split(",") || [];
  });
};

const operation = (index) => {
  console.log(index);
  if (index == 0) {
    let email = detail.value.store.email;
    console.log(email);
    window.location.href = "mailto:" + email;
  } else if (index == 1) {
    console.log(index);
  } else if (index == 2) {
    window.open(
      "https://service.weibo.com/share/share.php?url=" +
        encodeURIComponent(window.location.href) +
        "&title=" +
        // this.sysInfo
        detail.value.name
    );
  } else {
    copy(window.location.href);
  }
};

const recommendList = ref([]);
const getNewList = () => {
  get("index/news", {
    store_id: localStorage.getItem("key") || 1,
    page: 1,
  }).then((res) => {
    recommendList.value = res.data.data;
    recommendList.value.map((item) => {
      item.image1 = item.image.split(",")[0] || [];
    });
  });
};

const copy = async (Msg) => {
  try {
    //复制
    await toClipboard(Msg);
    console.log(Msg);
    ElMessage({
      message: "copy successfully",
      type: "success",
    });
  } catch (e) {
    //复制失败
    console.error(e);
  }
};

const goInfo = (e) => {
  // console.log(e);
  let page = router.resolve({ path: "/detail", query: { id: e } });
  console.log(page, window.location);
  window.open(page.href, "_blank");
};

const iconList = [
  {
    icon: require("@/assets/images/icons/email.svg"),
    title: "email",
  },
  {
    icon: require("@/assets/images/icons/wechat.svg"),
    title: "wechat",
  },
  {
    icon: require("@/assets/images/icons/weibo.svg"),
    title: "weibo",
  },
  {
    icon: require("@/assets/images/icons/link.svg"),
    title: "link",
  },
];
</script>

<style scoped lang="scss">
.detail {
  width: 100%;
  height: 100%;
}

.contain {
  width: 51%;
  max-width: 980px;
  margin: 0 auto;

  .header {
    padding: 100px 0.625rem 50px;

    .date {
      letter-spacing: 2px;
      font-size: 14px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.55);
    }

    h2 {
      margin: 20px 0;
      font-size: 48px;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(17, 17, 17, 0.93);
      line-height: 1.4;
    }

    .intro {
      font-size: 24px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      word-break: break-all;
      color: rgba(17, 17, 17, 0.77);
      line-height: 36px;
    }
  }

  .icon-box {
    display: flex;
    margin-top: 50px;

    img {
      width: 28px;
      height: 28px;
      margin-right: 14px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: block !important;
    transform: rotate3d(0, 1, 0, 50deg);
  }

  .swiper-box {
    position: relative;
    width: 100%;
  }

  .mySwiper {
    width: 100%;
    height: 2.87rem;
    max-height: 550px;
    // margin: 0 20px;
    border-radius: 14px;
    overflow: hidden;

    :deep(.swiper-pagination) {
      bottom: var(--swiper-pagination-bottom, 0px);
      .swiper-pagination-bullet-active {
        background-color: rgba(17, 17, 17, 0.9) !important;
      }
    }

    .swiper-slide {
      width: 100%;
      //   max-width: 980px;
      padding-bottom: 36px;
      display: flex;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        border-radius: 14px;
        object-fit: cover;
      }
    }
  }

  :deep(.content) {
    max-width: 980px;
    padding: 60px 0;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    font-weight: 400;
    color: rgba(17, 17, 17, 0.77);
    line-height: 1.6;

    p {
      width: 100%;
      height: 100%;
      overflow: hidden;

      span {
        display: inline-block;
        padding: 0 0.625rem !important;
        font-size: 17px !important;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.77);
        line-height: 27px;
      }
    }

    img {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }

  .bottom,
  .recommend {
    padding: 0 0.625rem 30px;
    h2 {
      font-size: 24px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      color: rgba(17, 17, 17, 0.93);
    }

    .icon-box {
      margin-top: 30px;
    }

    .el-divider {
      margin: 72px 0 34px;
    }
  }

  .recommend {
    & > div:last-child {
      border: none;
    }
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 30px 0;
      border-bottom: 1px solid #DBDBDB;
      cursor: pointer;
      // &::after {
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   content: "";
      //   width: 100%;
      //   height: 1px;
      //   background-color: rgba(255, 255, 255, 0);
      //   box-shadow: inset 1px 1px 1px 1px rgba(17, 17, 17, 0.15);
      // }

      & > img {
        width: 256px;
        height: 143px;
        margin-right: 28px;
        border-radius: 4px;
      }

      & > div {
        width: 60%;

        h3 {
          font-size: 20px;
          font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          font-weight: bold;
          color: rgba(17, 17, 17, 0.93);
        }

        p {
          margin-top: 20px;
          font-size: 14px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.55);
        }
      }
    }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .contain {
    width: 100%;

    .header {
      padding: 28px;
      .date {
        font-size: 12px;
      }
      h2 {
        font-size: 32px;
      }
      .intro {
        font-size: 14px;
        line-height: 20px;
      }
      .icon-box {
        margin-top: 25px;
      }
    }

    .mySwiper {
      height: auto;
      border-radius: 0;
      .swiper-slide {
        padding-bottom: 22px;
        img {
          height: 210px;
          border-radius: 0;
        }
      }
    }

    .swiper-box {
      .swiper-button-next,
      .swiper-button-prev {
        display: none !important;
      }
    }

    :deep(.content) {
      padding-top: 23px;
      & > p {
        & > span {
          display: inline-block;
          font-size: 14px !important;
          padding: 0 28px !important;
          line-height: 22px;
        }
      }
      img {
        width: 100vw;
        height: auto !important;
        margin: 0;
        border-radius: 0;
      }
    }

    .bottom {
      padding: 0 30px;
      h2 {
        font-size: 15px;
      }
      .icon-box {
        margin-top: 25px;
      }

      .el-divider {
        margin: 27px 0 32px;
      }
    }

    .recommend {
      padding: 0 30px;

      h2 {
        font-size: 15px;
      }

      &-item {
        padding: 20px 0;

        & > img {
          width: 128px;
          height: 72px;
          margin-right: 14px;
          border-radius: 4px;
        }

        & > div {
          h3 {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
