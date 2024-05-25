<template>
  <div class="about-box">
    <!-- header -->
    <div class="header animate__animated animate__fadeInUp" style="animation-duration: 2s">
      <img class="logo" :src="imageUrl + detail.image" alt />
      <div class="tips" v-html="detail.editor"></div>
    </div>
    <!-- 触达平台 -->
    <div class="platform wow animate__animated animate__fadeInUpBig">
      <div class="icon-box">
        <div class="title">
          <h3 v-html="detail1.title"></h3>
          <p v-html="detail1.editor"></p>
        </div>
        <div class="logo-list">
          <div class="box" v-for="(item, index) in detail1.children" :key="item">
            <transition name="fadea">
              <div class="fadea-transition" v-show="showIcon(index)">
                <img :src="imageUrl + item.image" alt />
                <p class="name" v-html="item.title"></p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作品牌 -->
    <div class="co-brand wow animate__animated animate__fadeInUpBig">
      <div class="icon-box">
        <div class="title">
          <h3 v-html="detail2.title"></h3>
          <p v-html="detail2.editor"></p>
        </div>
        <div class="logo-list1">
          <div class="box" v-for="(item, index) in detail2.children" :key="index">
            <transition name="fadea">
              <div class="fadea-transition" v-show="showIcon1(index)">
                <img class="oc-img" :src="imageUrl + item.image" alt />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- 团队介绍 -->
    <div class="team-info" :style="{ backgroundImage: `url(${imageUrl + teamItem.image})` }">
      <div class="bg-filter"></div>
      <div class="team-item">
        <h3 v-html="detail3.title"></h3>
        <div class="img">
          <swiper
            class="mySwiper"
            :navigation="{
              nextEl: '.team-info .swiper-button-next',
              prevEl: '.team-info .swiper-button-prev',
            }"
            :modules="modules"
            @swiper="initSwiper"
            @slideChange="change"
          >
            <swiper-slide v-for="(item, index) in detail3.children" :key="index">
              <img :src="imageUrl + item.image" alt />
            </swiper-slide>
          </swiper>
          <div class="swiper-button-next" @click="nextSlide"></div>
          <div class="swiper-button-prev" @click="prevSlide"></div>
        </div>
        <transition name="el-fade-in">
          <div class="info" v-show="is_show">
            <p class="name" v-html="teamItem.name"></p>
            <p class="position" v-html="teamItem.title_deputy"></p>
            <p class="intro" v-html="teamItem.editor"></p>
          </div>
        </transition>
      </div>
      <div class="circle">
        <span
          :class="team_index == index ? 'active' : ''"
          v-for="(item, index) in detail3.children"
          :key="item"
        ></span>
      </div>
    </div>
    <!-- 服务内容 -->
    <div class="service">
      <div class="icon-box">
        <div class="title">
          <h3 v-html="detail4.title"></h3>
          <p v-html="detail4.editor"></p>
        </div>
        <swiper
          class="myService s-swiper"
          :loop="true"
          :space-between="50"
          :navigation="{
            nextEl: '.s-swiper .swiper-button-next',
            prevEl: '.s-swiper .swiper-button-prev',
          }"
          :modules="modules"
        >
          <swiper-slide v-for="item in detail4.children" :key="item">
            <div class="service-item">
              <div class="left-item" :style="{ backgroundImage: `url(${imageUrl + item.image})` }"></div>
              <div class="right-item">
                <h2 v-html="item.title"></h2>
                <p v-html="item.editor"></p>
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
          <h3 v-html="detail5.title"></h3>
          <p v-html="detail5.editor"></p>
        </div>
        <swiper
          class="myCompany"
          :slides-per-view="'auto'"
          :spaceBetween="_isMobile ? 0 : 144"
          :centeredSlides="true"
          :modules="modules"
          @swiper="initSwiperCompany"
          @slideChange="companyChange"
        >
          <swiper-slide v-for="item in swiperList" :key="item">
            <img :src="imageUrl + item.image" alt />
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
                v-html="item.title"
              ></div>
            </swiper-slide>
          </swiper>
          <el-icon @click="nextSlide1">
            <ArrowRightBold />
          </el-icon>
        </div>
        <div class="company-contact">
          <div class="box">
            <img class="icon-email" src="../assets/images/icons/email-light.svg" alt />
            <p class="tip">{{ $t("other.E-Mail") }}</p>
            <p class="info">{{ companyInfo.email }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <img class="icon-phone" src="../assets/images/icons/phone.svg" alt />
            <p class="tip">{{ $t("other.Phone") }}</p>
            <p class="info">{{ companyInfo.mobile }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <img class="icon-search" src="../assets/images/icons/icon-search.svg" alt />
            <p class="tip">{{ $t("other.Address") }}</p>
            <p class="info">{{ companyInfo.address }}</p>
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


        <div class="deliver" v-if="value!=1">
          <div class="input-box">
            <el-input size="large" v-model="form.name" :placeholder="$t('other.Name')" />
            <el-input size="large" v-model="form.email" :placeholder="$t('other.E-Mail')" />
            <el-input
              v-model="form.textarea"
              :rows="5"
              type="textarea"
              :placeholder="$t('other.Info')"
            />
          </div>
          <el-button class="btn-push" size="large" round @click="submit">
            Submit
          </el-button>
        </div>
    

        <div class="qrcode" v-if="value==1">
          <div class="box">
            <p>{{$t("other.Commercial")}}</p>
            <img :src="imageUrl + detail6.merchant_cooperation" alt />
            <p>微信扫描二维码</p>
          </div>
          <el-divider :direction="_isMobile ? 'horizontal' : 'vertical'" />
          <div class="box">
            <p>{{$t("other.Sign")}}</p>
            <img :src="imageUrl + detail6.signing_consultation" alt />
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
import { ElMessage } from "element-plus";
import { ref, onMounted, getCurrentInstance, onUnmounted, toRaw,reactive } from "vue";
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
const value = ref(1);
let form = reactive({
  name: "",
  email: "",
  textarea: "",
});


onMounted(() => {
  value.value = Number(localStorage.getItem("key")||1);
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
var teamItem = ref({});
var companyInfo = ref({});
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
    detail6 = res.data[6];
    swiperList.value = res.data[5].children || [];
    companyInfo.value = swiperList.value[0];
    teamItem.value = detail3.value.children[0];
    console.log(detail6,1234);
  });
};

// 团队介绍
const is_show = ref(false);
const team_index = ref(0);
var teamSwiper = ref(null);
const initSwiper = (swiper) => {
  teamSwiper = toRaw(swiper);
};
const nextSlide = () => {
  return;
  // eslint-disable-next-line
  teamSwiper.slideNext();
};
const prevSlide = () => {
  return;
  // eslint-disable-next-line
  teamSwiper.slidePrev();
};
const change = (index) => {
  is_show.value = false;
  setTimeout(() => {
    is_show.value = true;
  }, 500);
  team_index.value = index.activeIndex;
  teamItem.value = detail3.value.children[index.activeIndex];
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
  cid.value = swiper.activeIndex;
  companyInfo.value = swiperList.value[swiper.activeIndex];
};
// init地址swiper
const initSwiperArea = (swiper) => {
  aeraSwiper = toRaw(swiper);
};

const nextSlide1 = () => {
  companySwiper.slideNext();
  aeraSwiper.slideNext();
};
const prevSlide1 = () => {
  companySwiper.slidePrev();
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

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  if (_isMobile) {
    fadeShow();
    fadeShow1();
    is_show.value = true;
    return;
  }
  if (scrollTop >= 600) {
    fadeShow();
  }
  if (scrollTop >= 1600) {
    fadeShow1();
  }
  if (scrollTop >= 2600) {
    is_show.value = true;
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});


const submit = () => {
  console.log(form);
  if (!form.name) {
    ElMessage({
      message: "请输入姓名",
      type: "info",
    });
    return;
  }
  if (!form.email) {
    ElMessage({
      message: "请输入邮箱",
      type: "info",
    });
    return;
  }
  if (!form.textarea) {
    ElMessage({
      message: "请输入详情",
      type: "info",
    });
    return;
  }
  get("index/submitVitae", {
    store_id: localStorage.getItem("key") || 1,
    name: form.name,
    email: form.email,
    details: form.textarea,
  }).then((res) => {
    if (res.code == 1) {
      ElMessage({
        message: "提交成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: res.msg,
        type: "error",
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.about-box {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 51%;
    max-width: 980px;
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
      max-width: 500px;
      margin-top: 20px;
      font-size: 16px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.93);
      line-height: 26px;
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
    width: 51%;
    max-width: 980px;
    padding: 128px 0 144px 0;
    margin: 0 auto;

    .title {
      width: 100%;
      max-width: 732px;
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
      max-width: 980px;
      display: grid;
      grid-gap: 62px;
      grid-template-columns: repeat(6, 112px);

      .box {
        height: 144px;
        text-align: center;
      }

      img {
        width: 112px;
        height: 112px;
        // max-width: 112px;
        // max-height: 112px;
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
      max-width: 980px;
      display: grid;
      grid-gap: 65px;
      grid-template-columns: repeat(5, 144px);

      div:last-child {
        //grid-column-end: span 5;
      }

      .box {
        text-align: center;
      }

      .oc-img {
        width: 144px;
        height: 89px;
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
    background-position: 0 22%;
    background-repeat: no-repeat;
    transition: background-image 1s;

    .bg-filter {
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(9px);
      background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%);
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

      .mySwiper {
        position: relative;
        width: 240px;
        height: 240px;

        :deep(.swiper-pagination) {
          bottom: var(--swiper-pagination-bottom, 56px);
        }

        :deep(.swiper-pagination-bullet) {
          background-color: rgba(255, 255, 255, 0.35);
        }

        :deep(.swiper-pagination-bullet-active) {
          background-color: rgba(255, 255, 255, 0.9);
        }
      }

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
          object-fit: cover;
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

    .circle {
      z-index: 9;
      position: absolute;
      bottom: 56px;
      left: 0;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.35);
      }

      .active {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .service {
    width: 100%;
    height: 100%;

    .icon-box {
      width: 100%;
      max-width: 1040px;
      padding: 128px 0 0;
      box-sizing: content-box;
    }

    .myService {
      width: 100%;
      height: 100%;
      padding: 0 40px;

      .swiper-button-next {
        top: var(--swiper-navigation-top-offset, 48%);
        right: var(--swiper-navigation-sides-offset, 0);
      }

      .swiper-button-prev {
        top: var(--swiper-navigation-top-offset, 48%);
        left: var(--swiper-navigation-sides-offset, 0);
      }

      .swiper-slide {
        // width: 100% !important;
      }

      .service-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .left-item {
          z-index: 1;
          position: relative;
          width: 430px;
          height: 500px;
          padding: 0 28px;
          max-width: 430px;
          min-height: 660px;
          border-radius: 60px 60px 0 0;
          overflow: hidden;
          background-size: cover;
          background-color: #d6d5d5;
          box-shadow: 50px 25px 50px #d6d5d5;
          // & > img {
          //   z-index: 99;
          //   position: absolute;
          //   left: 0;
          //   bottom: 0;
          //   width: 100%;
          //   height: 100%;
          //   object-fit: fill;
          //   clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
          //   clip: rect(0px,0px,0px,0px);
          //   border-radius: 10px;
          // }
        }

        .right-item {
          z-index: 9;
          position: relative;
          width: 50%;
          max-width: 470px;
          padding: 0 28px;
          margin-top: -20px;
          background-color: transparent;

          & > h2 {
            width: max-content;
            max-width: 470px;
            font-size: 36px;
            font-weight: bold;
            color: rgba(17, 17, 17, 0.93);
            font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          }

          & > p {
            font-size: 16px;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.77);
            line-height: 26px;
          }
        }
      }

      :deep(.swiper-button-prev) {
        color: #111111;
      }

      :deep(.swiper-button-next) {
        color: #111111;
      }
    }
  }

  .company {
    width: 100%;
    background-color: #fbfbfd;

    .company-box {
      width: 100%;
      padding: 128px 0;
      .title {
        width: 51%;
        max-width: 732px;
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
      max-width: 980px;
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
      max-width: 980px;
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


.deliver {
  width: 51%;

  margin: 0 auto;
  text-align: center;

  .logo {
    width: 172px;
    height: 172px;
    object-fit: cover;
  }

  h2 {
    margin: 16px 6px;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.93);
  }

  p {
    width: 100%;
    max-width: 730px;
    margin: 0 auto;
    font-size: 24px !important;
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    font-weight: 500;
    color: rgba(17, 17, 17, 0.93);
    line-height: 1.5;
  }

  .input-box {
    margin: 52px auto 56px auto;

    :deep(.el-input) {
      width: 100%;
      height: 56px;
      margin-bottom: 28px;
      .el-input__wrapper {
        border-radius: 8px;
      }

      .el-input__wrapper.is-focus {
        box-shadow: none;
        border: 4px solid rgba(42, 98, 208, 0.2);
      }

      // --el-input-focus-border-color: rgba(42, 98, 208, 0.49);
    }

    :deep(.el-textarea) {
      .el-textarea__inner {
        border-radius: 8px;
        // box-shadow: 0 0 0 4px;
      }

      --el-input-focus-border: rgba(42, 98, 208, 0.2);
      --el-input-focus-border-color: rgba(42, 98, 208, 0.2);
    }
  }

  .btn-push {
    min-width: 160px;
    height: 56px;
    line-height: 56px;
    font-size: 17px;
    font-weight: 500;
    border-radius: 28px;
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    color: rgba(17, 17, 17, 0.77);
    background-color: #e8e8ee;
    padding: 0 28px;
  }

  :deep(.el-divider) {
    width: 100%;
    margin: 78px auto;
    .el-divider__text {
      background-color: #fbfbfd;
    }
  }

  .qrcode {
    width: 148px;
    height: 148px;
  }

  .mt24 {
    margin-top: 24px;
    font-size: 14px !important;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    font-weight: 400;
    color: rgba(17, 17, 17, 0.55);
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
      padding: 36px 28px 67px;
      flex-direction: column;
      .logo {
        width: 184px;
        height: 72px;
        margin: 0;
      }

      .tips {
        width: 100%;
        max-width: 319px;
        margin-top: 10px;
        font-size: 14px;
        line-height: 23px;
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
      padding: 62px 28px;

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

        div:last-child {
          grid-column-end: span 1 !important;
        }

        .oc-img {
          width: 96px;
          height: 60px;
        }
      }
    }
    .team-info {
      height: 812px !important;
      background-position: center;
    }

    .team-item {
      height: auto !important;
      padding-top: 62px !important;
      h3 {
        font-size: 32px !important;
      }

      .img {
        margin-top: 29px !important;
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
        line-height: 33px;
      }

      .position {
        margin-top: 4px !important;
        line-height: 20px;
      }

      .intro {
        width: 80% !important;
        margin-top: 5px !important;
        font-size: 14px !important;
        line-height: 23px !important;
      }
    }

    .circle {
      bottom: 36px !important;
    }

    .service {
      .myService {
        padding: 0;

        .swiper-button-next {
          top: var(--swiper-navigation-top-offset, 180px);
          right: var(--swiper-navigation-sides-offset, 28px);
        }

        .swiper-button-prev {
          top: var(--swiper-navigation-top-offset, 180px);
          left: var(--swiper-navigation-sides-offset, 28px);
        }
      }

      .service-item {
        flex-direction: column !important;
        width: 100%;
        text-align: center;

        .left-item {
          width: 215px !important;
          height: 355px !important;
          min-height: auto !important;
          padding: 0 30px !important;
          border-radius: 33px 33px 0 0 !important;
          box-shadow: 50px 25px 30px #d6d5d5 !important;
          // width: 320px;
          // height: 550px;
        }

        .right-item {
          width: 100% !important;
          padding-top: 20px !important;
          padding-bottom: 67px !important;
          text-align: center;
          background-color: #ffffff !important;

          h2 {
            width: 100% !important;
            font-size: 22px !important;
          }

          p {
            font-size: 14px !important;
            line-height: 23px !important;
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


    .deliver {
    width: 100%;
    padding: 0 0 0;

    .logo {
      width: 96px;
      height: 96px;
    }

    h2 {
      font-size: 32px;
    }

    p {
      width: 100% !important;
      font-size: 14px !important;
    }

    .input-box {
      width: 100%;
      margin: 30px 0;
      .el-input {
        margin-bottom: 14px;
      }
    }

    .btn-push {
      width: 116px;
      height: 42px;
      font-size: 15px;
    }
  }
}

@media (min-width: 992px) and (max-width: 1900px) {
  .logo-list {
    width: auto !important;
  }
  .logo-list1 {
    width: auto !important;
  }
}
</style>
