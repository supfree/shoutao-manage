<template>
  <div class="about-box">
    <!-- header -->
    <div class="header animate__animated animate__fadeInUp" style="animation-duration: 2s;">
      <img class="logo" :src="imageUrl + detail.image" alt="">
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
          <div class="box" v-for="(item, index) in detail1.children" :key="item">
              <div class="fadea-transition" v-if="showIcon(index)">
                <el-image :src="imageUrl + item.image" alt="" />
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
          <div class="box" v-for="(item, index) in detail2.children" :key="index">
            <img class="oc-img fadea-transition" :src="imageUrl + item.image" alt="" v-if="showIcon1(index)">
          </div>
        </div>
      </div>
    </div>
    <!-- 团队介绍 -->
    <div class="team-info">
      <swiper class="mySwiper" :autoHeight="true" :pagination="true" :modules="modules" @slideChange="change">
        <swiper-slide v-for="item in detail3.children" :key="item">
          <div class="background" :style="{ backgroundImage: `url(${imageUrl + item.image})` }"></div>
          <div class="team-item">
            <h3>{{ detail3.title }}</h3>
            <div class="img">
              <img :src="imageUrl + item.image" alt="">
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
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
        <swiper class="myService" :navigation="true" :modules="modules">
          <swiper-slide v-for="item in detail4.children" :key="item">
            <div class="service-item">
              <img :src="imageUrl + item.image" alt="">
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
      <div class="icon-box">
        <div class="title">
          <h3>{{ detail5.title }}</h3>
          <p>{{ detail5.editor }}</p>
        </div>
        <swiper class="myCompany" :slidesPerView="1" :spaceBetween="30" :modules="modules">
          <swiper-slide v-for="item in companyList" :key="item">
            <div class="company-item">
              <img :src="item.url" alt="">
            </div>
          </swiper-slide>
        </swiper>
        <div class="area-list">
          <el-icon>
            <ArrowLeftBold />
          </el-icon>
          <swiper :slidesPerView="_isMobile ? 3 : 6" :spaceBetween="30" @click="selectArea">
            <swiper-slide v-for="(item, index) in cityList" :key="item">
              <div :class="['area-item touch', index == cid ? 'area-active' : '']">{{ item }}</div>
            </swiper-slide>
          </swiper>
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </div>
        <div class="company-contact">
          <div class="box">
            <el-icon size="30" color="#111111">
              <Message />
            </el-icon>
            <p class="tip">{{ $t('other.E-Mail') }}</p>
            <p class="info">{{ detail6.email }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <el-icon size="30" color="#111111">
              <Phone />
            </el-icon>
            <p class="tip">{{ $t('other.Phone') }}</p>
            <p class="info">{{ detail6.mobile }}</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <el-icon size="30" color="#111111">
              <LocationInformation />
            </el-icon>
            <p class="tip">{{ $t('other.Address') }}</p>
            <p class="info">{{ detail6.address }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="contact">
      <div class="icon-box">
        <div class="title">
          <h3>{{ $t('other.Cooperation') }}</h3>
        </div>
        <div class="qrcode">
          <div class="box">
            <p>商务合作</p>
            <img src="../assets/images/qrcode1.png" alt="">
            <p>微信扫描二维码</p>
          </div>
          <el-divider :direction="_isMobile ? 'horizontal' : 'vertical'" />
          <div class="box">
            <p>商务合作</p>
            <img src="../assets/images/qrcode1.png" alt="">
            <p>微信扫描二维码</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WOW } from 'wowjs';
import { get, imageUrl } from '../assets/js/request.js';
import { ref, onMounted, getCurrentInstance, onUnmounted } from 'vue'
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const modules = [
  Navigation,
  Pagination
]

const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile(); // 判断设备

onMounted(() => {
  new WOW().init();
  getAbout();
  window.addEventListener("scroll", handleScroll);
})


// 关于
let detail = ref({});
let detail1 = ref({});
let detail2 = ref({});
let detail3 = ref({});
let detail4 = ref({});
let detail5 = ref({});
let detail6 = ref({});
const getAbout = () => {
  get('index/about', {
    store_id: localStorage.getItem('key') || 1,
  }).then(res => {
    console.log(res);
    detail.value = res.data[0];
    detail1.value = res.data[1];
    detail2.value = res.data[2];
    detail3.value = res.data[3];
    detail4.value = res.data[4];
    detail5.value = res.data[5];
    detail6.value = res.data[6];
  })
}

// 团队介绍
const team_index = ref(0);
const change = (index) => {
  team_index.value = index.activeIndex;
}

// 公司地址
const companyList = [
  {
    url: require('../assets/images/company1.png'),
  },
  {
    url: require('../assets/images/company2.png'),
  },
  {
    url: require('../assets/images/company3.png'),
  },
  {
    url: require('../assets/images/company4.png'),
  },
  {
    url: require('../assets/images/company5.png'),
  }
]

const cityList = [
  '北京',
  '青岛',
  '杭州',
  '西安',
  '成都',
  '自贡',
  '广州',
]


const cid = ref(0);
const selectArea = (index) => {
  console.log(index);
  cid.value = index.clickedIndex;
}

// 触达平台
let visibleIcons = ref([]);
const showIcon = (index) => {
  return visibleIcons.value.indexOf(index) != -1;
}

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
}

// 合作品牌
let visibleIcons1 = ref([]);
const showIcon1 = (index) => {
  return visibleIcons.value.indexOf(index) != -1;
}

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
}



const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  console.log(scrollTop);
  if (scrollTop >= 600) {
    fadeShow();
  }
  if (scrollTop >= 1600) {
    fadeShow1();
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
})
</script>

<style lang="scss" scoped>
.fadea-transition {
  opacity: 1;
  /* 初始状态为透明 */
  transition: opacity 0.5s;
  /* 过渡效果，持续时间为0.5秒 */
}

.about-box {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 100vh;
    padding: 1.5rem 0;
    margin: 0 auto;

    .logo {
      width: 1.6rem;
      height: .5rem;
      margin-right: .36rem;
    }

    .tips {
      width: 3rem;
      margin-top: 20px;
      font-size: 15px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.93);
      line-height: 1.5;
    }
  }

  .platform {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-color: #FBFBFD;
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
    padding: .9rem;
    margin: 0 auto;

    .title {
      width: 60%;
      text-align: center;

      &>h3 {
        font-size: .3rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.93);
      }

      &>p {
        width: 100%;
        margin: 30px 0 50px;
        font-size: 15px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.93);
        line-height: 1.5;
      }
    }

    .logo-list {
      display: grid;
      grid-template-columns: repeat(6, .75rem);
      grid-gap: 60px;
      // grid-template-rows: 100px 200px;

      .box {
        text-align: center;
      }

      img {
        width: .6rem;
        height: .6rem;
      }

      .name {
        width: 100%;
        margin-top: 10px;
        font-size: 14px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.7);
      }
    }

    .logo-list1 {
      display: grid;
      grid-template-columns: repeat(5, .75rem);
      grid-gap: 60px;

      .oc-img {
        width: 0.6rem;
        height: 0.4rem;
      }
    }
  }

  .co-brand {
    width: 100%;
    min-height: 100vh;
  }

  .team-info {
    width: 100%;
    height: 100%;

    .mySwiper {
      position: relative;
      width: 100%;
      height: 100%;

      .swiper-slide {
        position: relative;
        height: 100vh;
      }

      .background {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: no-repeat center center fixed;
        background-size: cover;
        filter: blur(8px);
      }
    }

    .team-item {
      z-index: 9;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      padding-top: 20vh;
      // padding: 0.625rem 0;
      text-align: center;
      box-sizing: content-box !important;

      h3 {
        font-size: .3rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.93);
      }

      .img {
        position: relative;
        margin-top: .3125rem;

        :deep(.swiper-button-prev) {
          left: var(--swiper-navigation-sides-offset, 38%);
          color: #FFFFFF;
        }

        :deep(.swiper-button-next) {
          right: var(--swiper-navigation-sides-offset, 38%);
          color: #FFFFFF;
        }

        img {
          width: 240px;
          height: 240px;
          margin: 0 auto;
        }
      }

      .name {
        margin-top: .1563rem;
        font-size: 0.18rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
      }

      .position {
        margin-top: 0.1rem;
        font-size: 0.08rem;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
      }

      .intro {
        width: 30%;
        margin: .15rem auto 0;
        font-size: 0.09rem;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.4;
      }
    }
  }

  .service {
    width: 100%;
    height: 100%;

    .myService {
      width: 100%;
      height: 100%;
      padding: 0 30px;

      .swiper-slide {
        width: 100% !important;
      }

      .service-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &>img {
          width: 200px;
          height: 300px;
          margin-right: 60px;
          border-radius: 10px;
        }

        &>div {
          width: 50%;
          margin-top: 30px;
          line-height: 1.5;

          &>h2 {
            font-size: 0.27rem;
            color: #111111;
          }

          &>p {
            width: 80%;
            font-size: 15px;
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
    background-color: #FBFBFD;

    .myCompany {
      width: 100%;
      border-radius: 14px;

      .company-item {
        width: 100%;

        &>img {
          width: 100%;
          height: 2.8rem;
          border-radius: 14px;
        }
      }
    }

    .area-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: 0 auto;
      border-bottom: 1px solid rgba(17, 17, 17, 0.15);

      .swiper {
        padding: 20px;
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
      width: 100%;
      padding-top: 60px;

      .el-divider {
        width: 1px;
        height: 90px;
      }

      .box {
        text-align: center;
        flex: 1;

        .tip {
          margin: 10px 0;
          font-size: 18px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.93);
        }

        .info {
          // width: 30%;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(17, 17, 17, 0.77);
          line-height: 1.3;
        }
      }
    }
  }

  .contact {
    .qrcode {
      display: flex;
      // align-items: center;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      padding: 60px 60px 0;

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
        height: 120px;
        margin-top: 60px;
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
      }

      .logo-list {
        grid-template-columns: repeat(4, .55rem);
        grid-gap: 25px;
      }

      .logo-list1 {
        grid-template-columns: repeat(3, .8rem);
        grid-gap: 25px;
      }
    }

    .mySwiper {
      height: 780px !important;
    }

    .team-item {

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
        margin-top: 60px !important;
      }

      .intro {
        width: 80% !important;
      }
    }

    .service {
      .myService {
        width: 100%;
      }

      .service-item {
        flex-direction: column !important;
        text-align: center;

        &>img {
          margin-right: 0 !important;
        }

        &>div {
          width: 100% !important;

          p {
            margin: 0 auto;
          }
        }
      }
    }

    .company {
      .company-item {
        &>img {
          height: 180px !important;
        }
      }

      .area-list {
        width: 100%;
      }

      .company-contact {
        flex-direction: column;

        .el-divider {
          display: none;
        }

        .box {
          margin-bottom: 30px;
        }
      }
    }

    .contact {
      .qrcode {
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
