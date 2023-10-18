<template>
  <div class="about-box">
    <!-- header -->
    <div
      class="header animate__animated animate__fadeInUp"
      style="animation-duration: 2s"
    >
      <img class="logo" :src="imageUrl + detail.image" alt="" />
      <div class="tips">{{ detail.editor }}</div>
    </div>
    <!-- 触达平台 -->
    <div class="platform wow animate__animated animate__fadeInUpBig">
      <div class="icon-box">
        <div class="title">
          <h3>{{ detail1.title }}</h3>
          <p v-html="detail1.editor"></p>
        </div>
        <div class="logo-list">
          <div
            class="box"
            v-for="(item, index) in detail1.children"
            :key="item"
          >
            <div class="fadea-transition" v-show="showIcon(index)">
              <img :src="imageUrl + item.image" alt="" />
              <p class="name">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作品牌 -->
    <div class="co-brand wow animate__animated animate__fadeInUpBig">
      <div class="icon-box">
        <div class="title">
          <h3>{{ detail2.title }}</h3>
          <p v-html="detail2.editor"></p>
        </div>
        <div class="logo-list1">
          <div
            class="box"
            v-for="(item, index) in detail2.children"
            :key="index"
          >
            <div class="fadea-transition" v-show="showIcon1(index)">
              <img class="oc-img" :src="imageUrl + item.image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 团队介绍 -->
    <div
      class="team-info"
      :style="{ backgroundImage: `url(${imageUrl + background})` }"
    >
      <swiper
        class="mySwiper"
        :navigation="{
          nextEl: '.team-info .swiper-button-next',
          prevEl: '.team-info .swiper-button-prev',
        }"
        :pagination="true"
        :modules="modules"
        @swiper="initSwiper"
        @slideChange="change"
      >
        <swiper-slide v-for="(item, index) in detail3.children" :key="index">
          <div class="background"></div>
          <div class="bg-filter"></div>
          <div class="team-item">
            <h3>{{ detail3.title }}</h3>
            <div class="img">
              <img :src="imageUrl + item.image" alt="" />
              <div class="swiper-button-next" @click="nextSlide"></div>
              <div class="swiper-button-prev" @click="prevSlide"></div>
            </div>
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="position">{{ item.title_deputy }}</p>
              <p class="intro">{{ item.editor }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 服务内容 -->
    <div class="service">
      <div class="icon-box">
        <div class="title">
          <h3>{{ detail4.title }}</h3>
          <p>{{ detail4.editor }}</p>
        </div>
        <swiper
          class="myService s-swiper"
          :navigation="{
            nextEl: '.s-swiper .swiper-button-next',
            prevEl: '.s-swiper .swiper-button-prev',
          }"
          :modules="modules"
        >
          <swiper-slide v-for="item in detail4.children" :key="item">
            <div class="service-item">
              <img :src="imageUrl + item.image" alt="" />
              <div>
                <h2>{{ item.title }}</h2>
                <p>{{ item.editor }}</p>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </swiper>
      </div>
    </div>
    <!-- 公司地址 -->
    <div class="company">
      <div class="company-box">
        <div class="title">
          <h3>{{ detail5.title }}</h3>
          <p>{{ detail5.editor }}</p>
        </div>
        <swiper
          class="myCompany"
          :slides-per-view="'auto'"
          :space-between="144"
          :centeredSlides="true"
          :modules="modules"
          @swiper="initSwiperCompany"
          @slideChange="companyChange"
        >
          <swiper-slide v-for="item in swiperList" :key="item">
            <img :src="imageUrl + item.image" alt="" />
          </swiper-slide>
        </swiper>
        <div class="area-list">
          <el-icon @click="prevSlide1">
            <ArrowLeftBold />
          </el-icon>
          <swiper
            :slidesPerView="_isMobile ? 3 : 6"
            :spaceBetween="_isMobile ? 14 : 30"
            @click="selectArea"
            @swiper="initSwiperArea"
          >
            <swiper-slide v-for="(item, index) in swiperList" :key="item">
              <div
                :class="['area-item touch', index == cid ? 'area-active' : '']"
              >
                {{ item.title }}
              </div>
            </swiper-slide>
          </swiper>
          <el-icon @click="nextSlide1">
            <ArrowRightBold />
          </el-icon>
        </div>
        <div class="company-contact">
          <div class="box">
            <img
              class="icon-email"
              src="../assets/images/icons/email-light.svg"
              alt=""
            />
            <p class="tip">{{ $t("other.E-Mail") }}</p>
            <p class="info">{{ detail6.email }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <img
              class="icon-phone"
              src="../assets/images/icons/phone.svg"
              alt=""
            />
            <p class="tip">{{ $t("other.Phone") }}</p>
            <p class="info">{{ detail6.mobile }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <img
              class="icon-search"
              src="../assets/images/icons/icon-search.svg"
              alt=""
            />
            <p class="tip">{{ $t("other.Address") }}</p>
            <p class="info">{{ detail6.address }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 商务合作 -->
    <div class="contact">
      <div class="icon-box">
        <div class="title">
          <h3>{{ $t("other.Cooperation") }}</h3>
        </div>
        <div class="qrcode">
          <div class="box">
            <p>商务合作</p>
            <img :src="imageUrl + detail6.merchant_cooperation" alt="" />
            <p>微信扫描二维码</p>
          </div>
          <el-divider :direction="_isMobile ? 'horizontal' : 'vertical'" />
          <div class="box">
            <p>签约咨询</p>
            <img :src="imageUrl + detail6.signing_consultation" alt="" />
            <p>微信扫描二维码</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WOW } from "wowjs";
import { get, imageUrl } from "../assets/js/request.js";
import { ref, onMounted, getCurrentInstance, onUnmounted, toRaw } from "vue";
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const modules = [Navigation, Pagination];

const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile(); // 判断设备

onMounted(() => {
  new WOW().init();
  getAbout();
  window.addEventListener("scroll", handleScroll);
});

// 关于
var detail = ref({});
var detail1 = ref({});
var detail2 = ref({});
var detail3 = ref({});
var detail4 = ref({});
var detail5 = ref({});
var detail6 = ref({});
var swiperList = ref([]);
var background = ref("");
const getAbout = () => {
  get("index/about", {
    store_id: localStorage.getItem("key") || 1,
  }).then((res) => {
    detail.value = res.data[0];
    detail1.value = res.data[1];
    detail2.value = res.data[2];
    detail3.value = res.data[3];
    detail4.value = res.data[4];
    detail5.value = res.data[5];
    detail6.value = res.data[6];
    swiperList.value = res.data[5].children || [];
    background.value = detail3.value.children[0].image;
  });
};

// 团队介绍
const team_index = ref(0);
var teamSwiper = ref(null);
const initSwiper = (swiper) => {
  teamSwiper = toRaw(swiper);
};
const nextSlide = () => {
  teamSwiper.slideNext();
};
const prevSlide = () => {
  teamSwiper.slidePrev();
};
const change = (index) => {
  background.value = detail3.value.children[index.activeIndex].image;
  team_index.value = index.activeIndex;
};

// 公司地址
var aeraSwiper = ref(null);
var companySwiper = ref(null);
var cid = ref(0);
const selectArea = (index) => {
  cid.value = index.clickedIndex;
  companySwiper.slideTo(index.clickedIndex, 1000);
};
const initSwiperCompany = (swiper) => {
  companySwiper = toRaw(swiper);
};
const companyChange = (swiper) => {
  console.log(swiper);
  cid.value = swiper.activeIndex;
};
// init地址swiper
const initSwiperArea = (swiper) => {
  aeraSwiper = toRaw(swiper);
};

const nextSlide1 = () => {
  aeraSwiper.slideNext();
};
const prevSlide1 = () => {
  aeraSwiper.slidePrev();
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
    if (index.value >= detail1.value.children.length) {
      clearInterval(interval);
      return;
    }
    visibleIcons.value.push(index.value);
    index.value++;
  }, 300); // 间隔200ms显示一个图标
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
    if (index.value >= detail2.value.children.length) {
      clearInterval(interval);
      return;
    }
    visibleIcons1.value.push(index.value);
    index.value++;
  }, 500); // 间隔200ms显示一个图标
};

const show = ref(false);
const handleScroll = () => {
  if (_isMobile) {
    fadeShow();
    fadeShow1();
  }
  const scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop);
  if (scrollTop >= 600) {
    fadeShow();
  }
  if (scrollTop >= 1600) {
    fadeShow1();
  }
  if (scrollTop >= 2800) {
    show.value = true;
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.about-box {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 50%;
    height: 100vh;
    margin: 0 auto;

    .logo {
      width: 288px;
      height: 113px;
      margin-right: 70px;
      object-fit: cover;
    }

    .tips {
      // width: 2.6rem;
      margin-top: 20px;
      font-size: 16px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.93);
      line-height: 1.5;
    }
  }

  .platform {
    width: 100%;
    // min-height: 100vh;
    height: 100%;
    background-color: #fbfbfd;
  }

  .fadea-transition {
    opacity: 1;
    /* 初始状态为透明 */
    transition: opacity 0.5s;
    /* 过渡效果，持续时间为0.5秒 */
  }

  .fadea-enter-active,
  .fadea-leave-active {
    opacity: 0;
    /* 动画激活时的最终状态，完全显示 */
  }

  .icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 0.9rem 0;
    margin: 0 auto;

    .title {
      width: 60%;
      text-align: center;

      & > h3 {
        font-size: 56px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.93);
      }

      & > p {
        width: 100%;
        margin: 20px 0 65px;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.93);
        line-height: 1.5;
      }
    }

    .logo-list {
      width: 100%;
      display: grid;
      grid-gap: 0.3125rem;
      grid-template-columns: repeat(6, 0.7rem);

      .box {
        height: 0.73rem;
        text-align: center;
      }

      img {
        width: 0.6rem;
        height: 0.6rem;
      }

      .name {
        width: 100%;
        height: auto;
        padding-top: 10px;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.7);
      }
    }

    .logo-list1 {
      width: 100%;
      display: grid;
      grid-gap: 0.3125rem;
      grid-template-columns: repeat(5, 0.8rem);

      .box {
        text-align: center;
      }

      .oc-img {
        width: 0.75rem;
        height: 0.45rem;
      }
    }
  }

  .co-brand {
    width: 100%;
  }

  .team-info {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 1s;

    .mySwiper {
      position: relative;
      width: 100%;
      height: 100%;

      .swiper-slide {
        position: relative;
        height: 100%;
      }

      .bg-filter {
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(8px);
        background: linear-gradient(
          180deg,
          rgba(17, 17, 17, 0) 0%,
          #111111 100%
        );
      }
    }

    .team-item {
      z-index: 9;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      padding-top: 20vh;
      // padding: 0.625rem 0;
      text-align: center;

      h3 {
        font-size: 56px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.93);
      }

      .img {
        position: relative;
        margin-top: 60px;

        :deep(.swiper-button-prev) {
          left: var(--swiper-navigation-sides-offset, -20%);
          color: #ffffff;
        }

        :deep(.swiper-button-next) {
          right: var(--swiper-navigation-sides-offset, -20%);
          color: #ffffff;
        }

        img {
          width: 240px;
          height: 240px;
          margin: 0 auto;
        }
      }

      .name {
        margin-top: 24px;
        font-size: 36px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
      }

      .position {
        margin-top: 6px;
        font-size: 14px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
      }

      .intro {
        width: 35%;
        margin: 20px auto 0;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 26px;
      }
    }
  }

  .service {
    width: 100%;
    height: 100%;

    .myService {
      width: 100%;
      height: 100%;

      .swiper-slide {
        width: 100% !important;
      }

      .service-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & > img {
          width: 200px;
          height: 300px;
          margin-right: 60px;
          border-radius: 10px;
        }

        & > div {
          width: 50%;
          margin-top: 30px;
          line-height: 1.5;

          & > h2 {
            font-size: 36px;
            font-weight: bold;
            color: rgba(17, 17, 17, 0.93);
          }

          & > p {
            width: 80%;
            font-size: 16px;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.77);
            line-height: 1.3;
          }
        }
      }

      :deep(.swiper-button-prev) {
        left: var(--swiper-navigation-sides-offset, -2px);
        color: #111111;
      }

      :deep(.swiper-button-next) {
        right: var(--swiper-navigation-sides-offset, -2px);
        color: #111111;
      }
    }
  }

  .company {
    width: 100%;
    background-color: #fbfbfd;

    .company-box {
      width: 100%;
      padding: 0.9rem 0;
      .title {
        width: 51%;
        padding: 0 70px;
        margin: 0 auto;
        text-align: center;

        & > h3 {
          font-size: 56px;
          font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          font-weight: bold;
          color: rgba(17, 17, 17, 0.93);
        }

        & > p {
          width: 100%;
          margin: 20px 0 65px;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.93);
          line-height: 1.5;
        }
      }
    }

    .myCompany {
      width: 100%;
      height: 550px;
      border-radius: 5px;
      overflow: hidden;

      .swiper-slide {
        width: 980px;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        opacity: 0.17;
        & > img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          object-fit: cover;
        }
      }

      .swiper-slide-active {
        opacity: 1;
        transition: 1s ease-in-out;
      }
    }

    .area-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 51%;
      padding: 0 70px;
      margin: 0 auto;
      border-bottom: 1px solid rgba(17, 17, 17, 0.15);

      .swiper {
        padding: 30px;
      }

      .swiper-slide {
        width: 84px !important;
        height: 36px;
      }

      .area-item {
        width: 84px;
        height: 36px;
        font-size: 16px;
        text-align: center;
        line-height: 36px;
        border-radius: 20px;
        color: rgba(17, 17, 17, 0.93);
        background-color: rgba(17, 17, 17, 0.05);
      }

      .area-active {
        font-size: 14px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.93);
        background-color: #111111;
      }

      .el-icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        font-size: 16px;
        border-radius: 50%;
        border: 1px solid #111;
        cursor: pointer;
      }
    }

    .company-contact {
      display: flex;
      // align-items: center;
      flex-direction: row;
      justify-content: space-around;
      width: 51%;
      padding-top: 60px;
      margin: 0 auto;

      .el-divider {
        width: 1px;
        height: 70px;
      }

      .box {
        text-align: center;
        flex: 1;

        .icon-email {
          width: 40px;
          height: 39px;
        }

        .icon-phone {
          width: 40px;
          height: 40px;
        }
        
        .icon-search {
          width: 39px;
          height: 40px;
          transform: rotate(45deg);
        }

        .tip {
          margin: 10px 0 17px;
          font-size: 18px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.93);
        }

        .info {
          width: 200px;
          margin: 0 auto;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.77);
          line-height: 22px;
        }
      }
    }
  }

  .contact {
    .qrcode {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 54px 0;

      .box {
        text-align: center;
        flex: 1;

        p:first-child {
          font-size: 24px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.93);
        }

        p:last-child {
          font-size: 13px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.55);
        }

        img {
          width: 148px;
          height: 148px;
          margin: 20px 0 10px;
        }
      }

      .el-divider {
        width: 1px;
        height: 148px;
        margin: 50px 72px;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .about-box {
    .icon-box {
      .logo-list {
        grid-template-columns: repeat(4, 67px) !important;
      }
    }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .about-box {
    .header {
      width: 100%;
      height: 100%;
      padding: 30px 30px 60px;
      flex-direction: column;
      .logo {
        width: 184px;
        height: 72px;
        margin: 0;
      }

      .tips {
        width: 100%;
        font-size: 14px;
      }
    }

    .platform {
      min-height: auto !important;
    }

    .co-brand {
      min-height: auto !important;
    }

    .icon-box {
      width: 100%;
      padding: 60px 30px;

      .title {
        width: 100%;

        & > h3 {
          font-size: 32px;
        }

        & > p {
          margin: 7px 0 30px;
          font-size: 14px;
        }
      }

      .logo-list {
        grid-gap: 20px;
        grid-template-columns: repeat(4, auto);

        .box {
          height: 70px;
          margin-top: 20px;
          text-align: center;
        }

        img {
          width: 56px;
          height: 56px;
        }

        .name {
          font-size: 13px;
          color: rgba(17, 17, 17, 0.55);
        }
      }

      .logo-list1 {
        grid-gap: 20px;
        grid-template-columns: repeat(3, auto);

        .box {
          width: 96px;
          height: 60px;
        }
      }
    }
    .team-info {
      height: 812px !important;
    }

    .team-item {
      padding-top: 60px !important;
      h3 {
        font-size: 32px !important;
      }

      .img {
        margin-top: 30px;
      }
      .info {
        transition: opacity 0.5s ease;
      }

      :deep(.swiper-button-prev) {
        display: none !important;
      }

      :deep(.swiper-button-next) {
        display: none !important;
      }

      .name {
        font-size: 22px !important;
        margin-top: 64px !important;
      }

      .intro {
        width: 80% !important;
        font-size: 14px !important;
        line-height: 23px !important;
      }
    }

    .service {
      .myService {
        width: 100%;
      }

      .service-item {
        flex-direction: column !important;
        text-align: center;

        & > img {
          margin-right: 0 !important;
        }

        & > div {
          margin-top: 20px !important;
          width: 100% !important;

          h2 {
            font-size: 22px !important;
          }

          p {
            margin: 0 auto;
            font-size: 14px !important;
          }
        }
      }
    }

    .company {
      .company-box {
        padding: 60px 30px;
        .title {
          width: 100%;
          padding: 0;

          & > h3 {
            font-size: 32px;
          }

          & > p {
            margin: 7px 0 30px;
            font-size: 14px;
          }
        }
      }
      .myCompany {
        height: 180px;
        .swiper-slide {
          width: 100%;
          height: 100%;
        }
      }

      .area-list {
        width: 100%;
        padding: 0;

        .swiper {
          width: 100%;
          padding: 20px 14px !important;
          box-sizing: content-box;
        }
      }

      .company-contact {
        width: 100%;
        flex-direction: column;

        .tip {
          margin: 5px 0 10px !important;
          font-size: 15px !important;
        }
        .info {
          font-size: 14px !important;
        }
        .el-divider {
          display: none;
        }

        .box {
          margin-bottom: 30px;

          .icon-email {
          width: 26px;
          height: 20px;
        }

        .icon-phone {
          width: 26px;
          height: 26px;
        }
        
        .icon-search {
          width: 26px;
          height: 26px;
          transform: rotate(45deg);
        }
        }
      }
    }

    .contact {
      .qrcode {
        align-items: center;
        flex-direction: column;

        .el-divider {
          width: 100%;
          height: 1px;
          text-align: center;
        }
      }
    }
  }
}
</style>
