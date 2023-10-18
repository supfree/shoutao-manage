<template>
  <div class="artist">
    <div class="mask-box">
      <img class="bg-poster" :src="imageUrl + detail.image" alt="" />
      <div class="mask"></div>
    </div>
    <div class="contian">
      <div class="header wow animate__animated animate__fadeInUpBig">
        <div class="info">
          <h3>{{ detail.name }}</h3>
          <p class="tip">
            <span class="span1">全网粉丝</span>
            <span class="span2">{{ detail.fans }}</span>
            <el-divider
              direction="vertical"
              style="color: rgba(17, 17, 17, 0.55)"
            />
            <span class="span1">获赞</span>
            <span class="span2">{{ detail.like }}</span>
          </p>
          <p class="intro">{{ detail.editor }}</p>
        </div>
      </div>

      <el-divider class="el-divider-line" />

      <!-- 触达平台 -->
      <div class="flex-icon">
        <h3>触达平台</h3>
        <div class="logo-list">
          <div class="box" v-for="(item, index) in detail.platform" :key="item">
            <div class="fadea-transition" v-show="showIcon(index)">
              <img :src="imageUrl + item.image" alt="" />
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <el-divider class="el-divider-line" />

      <!-- 合作品牌 -->
      <div class="flex-icon">
        <h3>合作品牌</h3>
        <div class="logo-list">
          <div class="box1" v-for="(item, index) in detail.brand" :key="item">
            <img
              class="fadea-transition"
              :src="imageUrl + item.image"
              alt=""
              v-show="showIcon1(index)"
            />
          </div>
        </div>
      </div>

      <el-divider class="el-divider-line" />

      <!-- 娱乐直播 -->
      <div class="ent-live entertainment">
        <div class="title">娱乐直播</div>
        <!-- :autoplay="Boolean(_isMobile) ? '' : { delay: 3000, disableOnInteraction: false }" -->
        <swiper
          class="mySwiper"
          :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
          :centeredSlides="true"
          :loop="true"
          :spaceBetween="36"
          :modules="modules"
          :navigation="{
            nextEl: '.entertainment .swiper-button-next',
            prevEl: '.entertainment .swiper-button-prev',
          }"
          :pagination="{ clickable: true }"
        >
          <swiper-slide
            v-for="(item, index) in detail.entertainment"
            :key="index"
          >
            <Card :item="item"></Card>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <!-- 电商直播 -->
      <div class="ent-live commerce">
        <div class="title">电商直播</div>
        <swiper
          class="mySwiper"
          :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
          :centeredSlides="true"
          :loop="true"
          :spaceBetween="36"
          :modules="modules"
          :navigation="{
            nextEl: '.commerce .swiper-button-next',
            prevEl: '.commerce .swiper-button-prev',
          }"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(item, index) in detail.commerce" :key="index">
            <Card :item="item"></Card>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <el-divider class="el-divider-bottom" />
    </div>

    <div class="contact">
      <div class="qrcode">
        <div class="box">
          <img :src="imageUrl + store.merchant_cooperation" alt="" />
          <div>
            <p>商务合作</p>
            <p>微信扫描二维码</p>
            <p>长按图片保存二维码到本地</p>
          </div>
        </div>
        <div class="box">
          <img :src="imageUrl + store.signing_consultation" alt="" />
          <div>
            <p>签约咨询</p>
            <p>微信扫描二维码</p>
            <p>长按图片保存二维码到本地</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { WOW } from "wowjs";
import { getCurrentInstance, onMounted, ref, onUnmounted } from "vue";
import Card from "@/components/Card.vue";
import { get, post, imageUrl } from "../assets/js/request.js";
import { useRoute } from "vue-router";
const route = useRoute();
let value = ref(route.query.id);
// import Swiper core and required modules
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const modules = [Navigation, Autoplay];

// 判断设备
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

onMounted(() => {
  new WOW().init();
  getArtist();
  getHomeInfo();
  window.addEventListener("scroll", handleScroll);
});

const detail = ref({});
const store = ref({});
const logoList = ref([]);
const ocList = ref([]);
const getArtist = () => {
  get("index/artistDetails", {
    store_id: localStorage.getItem("key") || 1,
    id: value.value,
  }).then((res) => {
    detail.value = res.data;
    logoList.value = res.data.platform;
    ocList.value = res.data.brand;
    store.value = res.data.store;
    console.log(res, value, imageUrl);
  });
};

const list = ref([]);
const list1 = ref([]);
const getHomeInfo = () => {
  post("index/index", {
    store_id: localStorage.getItem("key") || 1,
  }).then((res) => {
    // console.log(res);
    list.value = res.data[2];
    list1.value = res.data[3];
  });
};

// 触达平台
let visibleIcons = ref([]);
const showIcon = (index) => {
  return visibleIcons.value.indexOf(index) != -1;
};

const fadeShow = () => {
  let index = ref(0);
  // 使用定时器逐个显示图标
  let interval = setInterval(() => {
    if (index.value >= logoList.length) {
      clearInterval(interval);
      return;
    }
    visibleIcons.value.push(index.value);
    index.value++;
  }, 200); // 间隔200ms显示一个图标
};

// 合作品牌
let visibleIcons1 = ref([]);
const showIcon1 = (index) => {
  return visibleIcons.value.indexOf(index) != -1;
};

const fadeShow1 = () => {
  let index = ref(0);
  // 使用定时器逐个显示图标
  let interval = setInterval(() => {
    if (index.value >= ocList.length) {
      clearInterval(interval);
      return;
    }
    visibleIcons1.value.push(index.value);
    index.value++;
  }, 400); // 间隔200ms显示一个图标
};

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop);
  if (scrollTop >= 100) {
    fadeShow();
  }
  if (scrollTop >= 400) {
    fadeShow1();
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
.artist {
  width: 100%;
  height: 100%;

  .mask-box {
    position: relative;
    width: 100%;
    height: 920px;

    .mask {
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 350px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 20%,
        #ffffff 100%
      );
    }
  }

  .bg-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.contian {
  z-index: 99;
  position: relative;
  width: 51%;
  margin: -50px auto 0;

  .el-divider-line {
    margin: 64px 0;
  }

  .el-divider-bottom {
    margin: 72px 0;
  }

  .header {
    .info {
      width: 75%;

      h3 {
        font-size: 36px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.9);
      }

      .tip {
        margin: 20px 0;

        .span1 {
          margin-right: 8px;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.55);
        }

        .el-divider {
          height: 14px;
          margin: 0 14px;
        }

        .span2 {
          font-size: 24px;
          font-family: NotoSans-Regular, NotoSans;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.93);
        }
      }

      .intro {
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.77);
        line-height: 26px;
      }
    }
  }

  .flex-icon {
    h3 {
      margin-bottom: 30px;
      font-size: 24px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      color: rgba(17, 17, 17, 0.93);
    }

    .logo-list {
      display: flex;
      flex-wrap: wrap;

      .box {
        width: 0.375rem;
        text-align: center;
        margin: 0 25px 25px 0;
        img {
          width: 0.375rem;
          height: 0.375rem;
        }
      }

      .box1 {
        width: 144px;
        height: 90px;
        margin: 0 16px 25px 0;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        width: 100%;
        margin-top: 10px;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.7);
      }
    }
  }

  .commerce .title {
    margin-top: 64px;
  }

  .ent-live {
    position: relative;
    width: 100%;

    .title {
      margin-bottom: 30px;
      font-size: 24px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      color: rgba(17, 17, 17, 0.93);
    }

    .mySwiper {
      position: relative;
      width: 100%;
      height: 100%;

      .swiper-slide {
        width: 1.9rem !important;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        text-align: center;
        background-color: #fff;
        /* Center slide text vertically */
      }
    }

    :deep(.swiper-button-prev) {
      top: var(--swiper-navigation-top-offset, 55%);
      left: var(--swiper-navigation-sides-offset, -40px);
      color: #111111 !important;
    }

    :deep(.swiper-button-next) {
      top: var(--swiper-navigation-top-offset, 55%);
      right: var(--swiper-navigation-sides-offset, -40px);
      color: #111111 !important;
    }
  }
}

.contact {
  .qrcode {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 51%;
    margin: 0 auto 200px;

    .box {
      display: flex;
      align-items: center;
      text-align: left;
      padding: 30px;
      margin-right: 30px;
      border-radius: 8px;
      background-color: #fafafa;

      p {
        margin-top: 5px;
        font-size: 13px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.55);
      }

      p:first-child {
        font-size: 24px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(17, 17, 17, 0.93);
      }

      img {
        width: 74px;
        height: 74px;
        margin-right: 20px;
      }
    }

    .el-divider {
      width: 1px;
      height: 120px;
      margin-top: 60px;
    }
  }
}

@media only screen and (max-width: 1300px) {
  .ent-live {
    .mySwiper {
      .ent-item {
        height: 600px;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .artist {
    .mask-box {
      height: 200px;
    }

    .bg-poster {
      height: 200px;
    }
  }

  .contian {
    width: 100% !important;
    padding: 0 30px;

    .el-divider-line {
      margin: 31px 0;
    }

    .el-divider-bottom {
      margin: 36px 0;
    }

    .header {
      .info {
        width: 100%;
        h3 {
          font-size: 22px;
        }

        .tip {
          margin: 4px 0;

          .span1 {
            font-size: 14px;
          }

          .el-divider {
            height: 13px;
            margin: 0 8px;
          }

          .span2 {
            font-size: 15px;
          }
        }

        .intro {
          font-size: 14px;
        }
      }
    }

    .flex-icon {
      h3 {
        margin-bottom: 24px;
        font-size: 15px;
      }

      .logo-list {
        .box {
          width: 56px;
          height: 56px;
        }

        .box1 {
          width: 28%;
          height: 60px;
        }

        .name {
          font-size: 13px;
        }
      }
    }

    .commerce .title {
      margin-top: 31px;
    }

    .ent-live {
      .title {
        margin-bottom: 24px;
        font-size: 15px;
      }
      .mySwiper {
        width: 100% !important;

        .swiper-slide {
          width: 330px !important;
          // height: 500px !important;
        }
      }
    }
  }

  .contact {
    padding: 0 30px !important;

    .qrcode {
      display: block;
      width: 100% !important;
      margin: 40px auto 70px;

      .box {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
