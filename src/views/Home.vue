<template>
  <div class="container">
    <!-- banner内容 -->
    <div class="section-hero">
      <div class="sticky-wrapper">
        <div class="banner-box">
          <!-- <img id="bg-image" src="../assets/images/swiper/swiper.png" alt=""> -->
          <video
            id="bg-image"
            autoPlay
            x5-playsinline="true"
            playsinline="true"
            webkit-playsinline="true"
            preload="auto"
            loop
            muted
            :src="topInfo.url"
          ></video>
          <div class="mask-image"></div>

          <div class="icon-play touch" @click="handleTogglePlay">
            <img src="../assets/images/icons/pause.svg" alt="" v-if="isPlay" />
            <img src="../assets/images/icons/play.svg" alt="" v-else />
          </div>
        </div>
      </div>
      <div class="banner-title">
        <!-- 光生致力于生产出创新、有趣的内容，不断发掘富有创造力的内容创作者。 -->
        <div
          class="title animate__animated animate__fadeInDown"
          v-html="topInfo.editor"
        ></div>
        <div class="info-item">
          <div class="icon">
            <img :src="imageUrl + topInfo.platform" alt="" />
            <div class="name">{{ topInfo.name }}</div>
          </div>
          <div class="text">
            <div class="text-title">
              <span class="light-spans">{{ $t("other.Fans") }}</span>
              <span class="bold-spans">{{ topInfo.fans }}</span>
            </div>
            <el-divider direction="vertical" />
            <div class="text-title">
              <span class="light-spans">{{ $t("other.Like") }}</span>
              <span class="bold-spans">{{ topInfo.like }}</span>
              <span class="light-spans">{{ topInfo.like_unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="intro">
      <div class="intro-box">
        <div
          class="intro-box-title hidden animate__animated animate__delay-0.5s"
        >
          <div v-html="topIntro.title"></div>
          <div class="content" v-html="topIntro.editor"></div>
        </div>
        <div class="intro-item hidden animate__animated animate__delay-0.5s">
          <div
            class="tip"
            v-for="(item, index) in topIntro.children"
            :key="index"
          >
            <div class="tip-title" v-html="item.title"></div>
            <div class="tip-con" v-html="item.title_deputy"></div>
            <div class="tip-info" v-html="item.editor"></div>
            <el-button round size="large" @click="goInfo(item.button_url)">
              {{ item.button_name }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 娱乐直播 -->
    <div style="background:white">
    <div class="ent-live entertainment">
      <div class="title">{{ $t("main.Entertainment-live") }}</div>
      <swiper
        class="mySwiper"
        :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
        :centeredSlides="Boolean(_isMobile)"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="Boolean(_isMobile)"
        :spaceBetween="Boolean(_isMobile) ? 14 : 36"
        :modules="modules"
        :navigation="{
          nextEl: '.entertainment .swiper-button-next',
          prevEl: '.entertainment .swiper-button-prev',
        }"
        :pagination="{ clickable: true }"
        @swiper="initSwiperEnt"
      >
        <swiper-slide v-for="(item, index) in list1" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <!-- 查看全部 -->
      <div class="btn-bottom">
        <div class="gl-button" @click="goInfo('live')">
          {{ $t("other.View-all") }}
          <el-icon size="12" class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </div>
        <el-icon size="28" color="#111111" class="touch" @click="entTogglePlay">
          <img
            src="../assets/images/icons/pause_dark.svg"
            alt=""
            v-if="entPlay"
          />
          <img src="../assets/images/icons/play_dark.svg" alt="" v-else />
        </el-icon>
      </div>
    </div>
    </div>
    <!-- 电商直播 -->
    <div class="ent-live commerce">
      <div class="title">{{ $t("main.E-commerce-live") }}</div>
      <swiper
        class="mySwiper"
        :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
        :centeredSlides="Boolean(_isMobile)"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="Boolean(_isMobile)"
        :spaceBetween="Boolean(_isMobile) ? 14 : 36"
        :modules="modules"
        :navigation="{
          nextEl: '.commerce .swiper-button-next',
          prevEl: '.commerce .swiper-button-prev',
        }"
        :pagination="{ clickable: true }"
        @swiper="initSwiperCom"
      >
        <swiper-slide v-for="(item, index) in list2" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <!-- 查看全部 -->
      <div class="btn-bottom">
        <div class="gl-button" @click="goInfo('live')">
          {{ $t("other.View-all") }}
          <el-icon size="12" class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </div>
        <el-icon size="28" color="#111111" class="touch" @click="comTogglePlay">
          <img
            src="../assets/images/icons/pause_dark.svg"
            alt=""
            v-if="comPlay"
          />
          <img src="../assets/images/icons/play_dark.svg" alt="" v-else />
        </el-icon>
      </div>
    </div>

    <!-- 底部swiper -->
    <div class="bottom-swiper">
      <div class="inner">
        <swiper
          class="swiper-one"
          :modules="modules"
          :loop="true"
          :slides-per-view="'auto'"
          :centeredSlides="true"
          :space-between="14"
          :observer="true"
          @swiper="initSwiper"
          v-if="swiper1.length"
        >
          <swiper-slide v-for="(item, index) in [...swiper1,...swiper1,...swiper1,...swiper1,...swiper1]" :key="index">
            <img :src="imageUrl + item.image" alt="" />
            <transition name="el-zoom-in-bottom">
              <div class="swiper-mask-info" v-show="show">
                <p class="name">{{ item.name }}</p>
                <div class="info">
                  <p class="u-line-3" v-html="item.editor"></p>
                  <div
                    class="gl-button"
                    @click="goInfo('artist', item.button_url)"
                  >
                    {{ $t("other.Information") }}
                    <el-icon size="12">
                      <ArrowRight />
                    </el-icon>
                  </div>
                </div>
              </div>
            </transition>
          </swiper-slide>
        </swiper>
        <!-- 轮播盒子 -->
        <div class="swiper-box">
          <div class="flex-swiper-box">
            <div class="flex-swiper swiper-two">
              <div
                v-for="(item, index) in swiper2"
                :key="index"
                :style="`background: url(${imageUrl + item.image})`"
              >
                <div class="btn-mask"></div>
                <transition name="el-zoom-in-bottom">
                  <div class="button-inter" @click="goInfo('artist', item.id)">
                    {{ $t("other.Information") }}
                    <img src="../assets/images/icons/play-filling.svg" alt="" />
                  </div>
                </transition>
                <img :src="imageUrl + item.image" alt="" />
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>

          <div class="flex-swiper-box">
            <div class="flex-swiper swiper-three">
              <div
                v-for="(item, index) in swiper3"
                :key="index"
                :style="`background: url(${imageUrl + item.image})`"
              >
                <div class="btn-mask"></div>
                <div class="button-inter" @click="goInfo('artist', item.id)">
                  {{ $t("other.Information") }}
                  <img src="../assets/images/icons/play-filling.svg" alt="" />
                </div>
                <img :src="imageUrl + item.image" alt="" />
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>

          <!-- 查看全部 -->
          <div class="btn-bottom">
            <div class="gl-button" @click="goInfo('master')">
              {{ $t("other.View-all") }}
              <el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </div>
            <el-icon
              size="28"
              color="#FFFFFF"
              class="touch"
              @click="bottomSwiperAuto"
            >
              <VideoPause v-if="is_bottom_auto" />
              <VideoPlay v-else />
            </el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 问题 -->
    <div class="question">
      <div class="title">{{ $t("other.Questions") }}</div>
      <el-collapse>
        <el-collapse-item
          :title="item.title"
          :name="index"
          v-for="(item, index) in questionList"
          :key="index"
        >
          <div v-html="item.editor"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { get, imageUrl } from "../assets/js/request.js";
import {
  onMounted,
  onUnmounted,
  getCurrentInstance,
  nextTick,
  ref,
  toRaw,
} from "vue";
import Card from "@/components/Card.vue";
import { useRouter } from "vue-router";
const router = useRouter();
// import Swiper core and required modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

// 判断设备
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

const modules = [Navigation, Autoplay, FreeMode];

onMounted(() => {
  getHomeInfo();
  handleResize();

  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
});

// 获取首页信息
const list1 = ref([]);
const list2 = ref([]);
let topInfo = ref({});
let topIntro = ref({});
let questionList = ref([]);
let swiper1 = ref([]);
let swiper2 = ref([]);
let swiperList2 = ref([]);
let swiper3 = ref([]);
const getHomeInfo = () => {
  get("index/index", {
    store_id: localStorage.getItem("key") || 1,
  }).then((res) => {
    // console.log(res);
    topInfo.value = res.data[0];
    topIntro.value = res.data[1];
    list1.value = res.data[2].data;
    list2.value = res.data[3].data;
    questionList.value = res.data[5]||[];
    swiper1.value = res.data[4].children||[];
    swiper2.value = res.data[6].children||[];
    swiperList2.value = res.data[6].children||[];
    swiper3.value = res.data[7].children||[];

    setTimeout(() => {
      calculateTotalHeight();
    }, 500);
  });
};

// 播放暂停按钮
const isPlay = ref(true);
const handleTogglePlay = () => {
  const MyVideo = document.querySelector("#bg-image");
  if (isPlay.value) {
    MyVideo.pause();
  } else {
    MyVideo.play();
  }
  isPlay.value = !isPlay.value;
};

// 设置顶部粘性布局高度
const calculateTotalHeight = () => {
  const stickyWrapper = document.querySelector(".sticky-wrapper");
  const title = document.querySelector(".banner-title");
  const intro = document.querySelector(".intro");
  const totalHeight = title.offsetHeight + intro.offsetHeight;
  // console.log(intro.offsetHeight, 111);
  nextTick(() => {
    stickyWrapper.style.height = totalHeight + "px";
  });
};

// 监听滑动 X
const handleResize = () => {
  const width = window.innerWidth;
  if (width > 10000) {
    console.log(1);
  }
};

// 监听滑动 Y
const show = ref(false);
const handleScroll = () => {
  const maskImage = document.querySelector(".mask-image");
  const titleEl = document.querySelector(".banner-title");
  const bgImage = document.querySelector("#bg-image");
  const title1 = document.querySelector(".intro-box-title");
  const titleBox = document.querySelector(".intro-item");
  const scrollTop = document.documentElement.scrollTop;
  //console.log(scrollTop);

  // 文案效果
  if (scrollTop >= 250) {
    title1.classList.remove("hidden");
    title1.classList.add("animate__fadeInUp", "show");
  }
  if (scrollTop >= 700) {
    title1.classList.remove("hidden");
    titleBox.classList.add("animate__fadeInUp", "show");
  }

  // 顶部效果
  if (scrollTop >= 800) {
    maskImage.style.opacity = "1";
    bgImage.style.opacity = "0";
  } else if (scrollTop > 10 && scrollTop < 800) {
    const ImageScrol = scrollTop / 800;
    const VideoScrol = 1 - scrollTop / 500;
    maskImage.style.opacity = `${ImageScrol}`;
    bgImage.style.opacity = `${VideoScrol}`;
    titleEl.style.opacity = `${VideoScrol}`;
  } else if (scrollTop === 0) {
    maskImage.style.opacity = "0";
    bgImage.style.opacity = "1";
  }

  // 多轮播
  const oSwiper = document.querySelector(".swiper-one");
  const oPicture = document.querySelector(".swiper-box");
  const swiperArr = document.querySelectorAll(
    ".swiper-one .swiper-wrapper .swiper-slide"
  );
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (scrollTop >= 5680) {
    const transY = windowHeight / 2 - 250;
    // oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
    oPicture.style.transform = `translateY(${transY}px)`;
    oPicture.style.opacity = "1";
    oPicture.style.transition = " 1s ease-in-out ";
    oPicture.style.transitionDelay = " 1s ease-in-out ";
    swiperArr.forEach((item) => {
      item.style.opacity = "1";
    });
  } else if (scrollTop >= 3242 && scrollTop < 5680) {
    show.value = false;
    const transY = windowHeight / 2;
    const transYBtn = 80 + ((scrollTop - 3242) / (5680 - 3242)) * (transY - 80);
    const scale = 2.5 - ((scrollTop - 3242) / (5680 - 3242)) * 1.5;
    oSwiper.style.transform = `scale(${scale}) translateY(${transYBtn}px)`;
    oSwiper.style.transition = "transform";
    oPicture.style.opacity = "0";
    swiperArr.forEach((item) => {
      item.style.opacity = (scrollTop - 5000) / 100;
    });
  } else if (scrollTop >= 0 && scrollTop < 3242) {
    const transY = windowHeight / 2 - 250;
    // oSwiper.style.transform = `scale(2.5) translateY(80px)`;
    oPicture.style.opacity = "0";
    oPicture.style.transform = `translateY(${transY}px)`;
  }

  if (scrollTop >= 5680) {
    show.value = true;
    // bottomSwiper.autoplay.start();
    const transY = windowHeight / 2 - 250;
    oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
  } else {
    const transY = windowHeight / 2 - 250;
    const transYBtn =
      75 + ((scrollTop - 4400) / (5560 - 4650)) * (transY - 125);
    const scale = 10 - ((scrollTop - 3242) / (5680 - 3242)) * 9;
    // console.log(scale.toFixed(2));
    oSwiper.style.transform = `scale(${scale.toFixed(
      3
    )}) translateY(${transYBtn}px)`;
    oSwiper.style.transition = "transform";
  }
};

// 娱乐直播 autoplay
var entSwiper = ref(null); // 实例化swiper
const entPlay = ref(true);

const initSwiperEnt = (swiper) => {
  entSwiper = toRaw(swiper);
  setTimeout(() => {
    entSwiper.autoplay.start();
  }, 0);
};

const entTogglePlay = () => {
  entPlay.value = !entPlay.value;
  if (entPlay.value) {
    entSwiper.autoplay.start();
  } else {
    entSwiper.autoplay.stop();
  }
};

// 娱乐直播 autoplay
var comSwiper = ref(null); // 实例化swiper
const comPlay = ref(true);

const initSwiperCom = (swiper) => {
  comSwiper = toRaw(swiper);
};

const comTogglePlay = () => {
  comPlay.value = !comPlay.value;
  if (comPlay.value) {
    comSwiper.autoplay.start();
  } else {
    comSwiper.autoplay.stop();
  }
};

// 底部轮播定时器(translate方法)
// const translateX = ref(-100);
// var intervalId = null;
// var step = ref(0);

// const count = () => {
//   step.value = step.value + 1;
//   if (step.value > 10) {
//     reset();
//   }
// };

// const start = () => {
//   if (intervalId == null) {
//     count();
//     intervalId = setInterval(count, 1000);
//   }
// };

// const stop = () => {
//   clearInterval(intervalId);
//   intervalId = null;
// };

// const reset = () => {
//   stop();
//   step.value = 0;
//   start();
// };

// 底部swiper autoplay
const is_bottom_auto = ref(true);

const bottomSwiperAuto = () => {
  const swiperOne = document.querySelector(".swiper-two");
  const swiperTwo = document.querySelector(".swiper-three");
  is_bottom_auto.value = !is_bottom_auto.value;
  if (is_bottom_auto.value) {
    swiperOne.style.animationPlayState = "running";
    swiperTwo.style.animationPlayState = "running";
    // bottomSwiper1.autoplay.start();
    // bottomSwiper2.autoplay.start();
  } else {
    // bottomSwiper1.autoplay.stop();
    // bottomSwiper2.autoplay.stop();
    swiperOne.style.animationPlayState = "paused";
    swiperTwo.style.animationPlayState = "paused";
  }
};

const goInfo = (e, id) => {
  console.log(e, id);
  router.push({ path: e, query: { id: id } });
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>

.el-collapse{
  --el-collapse-header-height:none;
}
.container {
  font-size: 0;
}

.section-hero {
  z-index: 3;
  height: calc(100vh - 56px);

  .sticky-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 56px;
    background-color: #111111;
  }
}

.banner-box {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  #bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mask-image {
    opacity: 0.1;
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: opacity;
    pointer-events: none;
    background-size: 100% 100% !important;
    background-position: center;
    background: url("../assets/images/bg2.png") no-repeat;
  }

  .icon-play {
    position: absolute;
    right: 5%;
    bottom: 160px;
    img {
      width: 28px;
      height: 28px;
    }
  }
}

.banner-title {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 62.5%;
  max-width: 1200px;
  height: 100%;
  padding-bottom: 105px;
  margin: 0 auto;
  overflow: hidden;
  pointer-events: none;

  .title {
    max-width: 980px;
    text-align: left;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
    line-height: 78px;
  }
  .info-item {
    display: flex;
    align-items: center;
    margin-top: 42px;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);

    .icon {
      display: flex;
      align-items: center;
      margin-right: 36px;

      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }

      .name {
        margin-right: 8px;
        font-size: 24px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.93);
      }
    }

    .text {
      display: flex;
      align-items: baseline;

      .el-divider {
        height: 14px;
        margin: 0 15px;
        border-color: rgba(255, 255, 255, 50%) !important;
      }

      .text-title {
        // margin-right: 15px;

        span {
          display: inline-block;
        }

        .light-spans {
          margin-right: 5px;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
        }

        .bold-spans {
          font-size: 24px;
          font-family: NotoSans-Regular, NotoSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.93);
        }
      }
    }
  }
}

.intro {
  position: relative;
  z-index: 9;
  width: 100%;
  height: 100%;

  &-box {
    width: 62.5%;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 127px 0 144px;
    box-sizing: content-box;

    &-title {
      max-width: 980px;
      text-align: left;
      font-size: 56px;
      font-weight: bold;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      color: rgba(255, 255, 255, 0.9);
      line-height: 83px;
    }

    .content {
      padding: 27px 0 46px;
      font-size: 56px;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.9);
      line-height: 78px;
    }
  }

  &-item {
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    width: 100%;
    padding-top: 48px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);

    .tip {
      width: 30%;
      max-width: 300px;
      margin-right: 72px;
      text-align: left;
      position:relative;

      &-title {
        min-height: 36px;
        font-size: 24px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        line-height: 36px;
      }

      &-con {
        margin: 3px 0 20px;
        font-size: 36px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
        line-height: 54px;
      }

      &-info {
        min-height: 104px;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        line-height: 26px;
        margin-bottom:107px;
      }

      .el-button {
        min-width: 152px;
        height: 56px;
        line-height:56px;
        padding: 0 28px !important;
        //margin-top: 51px;
        border-radius: 28px;
        font-size: 17px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: #111111;
        position:absolute;
        bottom:0;
      }
    }
  }
}

.ent-live {
  position: relative;
  width: 100%;
  max-width: 1260px;
  padding: 0 30px;
  margin: 126px auto 0;

  .title {
    margin-bottom: 58px;
    font-size: 56px;
    text-align: center;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.93);
  }

  .mySwiper {
    position: relative;
    width: 100%;
    height: 100%;

    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 668px;
      font-size: 18px;
      text-align: center;
      background-color: #fff;
      /* Center slide text vertically */
    }
  }

  :deep(.swiper-button-prev) {
    top: var(--swiper-navigation-top-offset, 50%);
    left: var(--swiper-navigation-sides-offset, -20px);
    color: #111111 !important;
  }

  :deep(.swiper-button-next) {
    top: var(--swiper-navigation-top-offset, 50%);
    right: var(--swiper-navigation-sides-offset, -20px);
    color: #111111 !important;
  }

  .btn-bottom {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 28px;

    .gl-button {
      display: block;
      width: 132px;
      height: 48px;
      margin: 0 auto;
      font-size: 17px;
      line-height: 45px;
      text-align: center;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      border-radius: 50px;
      color: #111111;
      border: 1.5px solid #111111;

      .el-icon--right {
        margin: -4px;
      }
    }

    & > .el-icon {
      position: absolute;
      right: 0;
    }
  }
}

.bottom-swiper {
  position: relative;
  width: 100%;
  height: 3100px;
  margin-top: 144px;
  // padding: 30px 0;
  overflow: visible !important;
  background-color: #111111;

  .inner {
    position: sticky;
    top: 0;
    // width: 100vw;
    height: 1346px;
    max-height: 1520px;
    padding-bottom: 36px;
    overflow: hidden;
    box-sizing: content-box;

    .swiper-one {
      width: 100%;
      height: 506px;

      .swiper-slide-active {
        opacity: 1 !important;
        .swiper-mask-info {
          opacity: 1 !important;
          // display: block !important;
        }
      }

      .swiper-mask-info {
        opacity: 0 !important;
      }

      .swiper-slide {
        opacity: 0;
        position: relative;
        width: 900px;
        height: 506px;
        overflow: hidden;
        border-radius: 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name {
          position: absolute;
          top: 40px;
          left: 40px;
          font-size: 40px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.93);
        }

        .info {
          position: absolute;
          bottom: 30px;
          left: 42px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
          width: calc(100% - 88px);

          p {
            width: 60%;
            font-size: 16px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.55);
            line-height: 1.3;
          }

          .gl-button {
            display: block;
            width: 132px;
            height: 48px;
            font-size: 17px;
            line-height: 45px;
            text-align: center;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            border-radius: 50px;
            color: #111111;
            background-color: #ffffff;
            cursor: pointer;

            .el-icon--right {
              margin-left: -4px;
            }
          }
        }
      }
    }

    .swiper-box {
      position: relative;
      // height: 800px;
      max-height: 592px;
      box-sizing: content-box;

      .flex-swiper-box {
        position: relative;
        height: 250px;
        margin-top: 14px;

        .swiper-two {
          animation: rolling 16s linear infinite;
        }

        .swiper-three {
          animation: rolling 14s linear infinite;
        }

        @keyframes rolling {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .flex-swiper {
          position: absolute;
          display: flex;
          white-space: nowrap;
          &:hover {
            animation-play-state: paused;
          }

          & > div {
            display: inline-block;
            position: relative;
            width: 450px;
            height: 250px;
            border-radius: 15px;
            margin-right: 14px;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            cursor: pointer;

            &:hover {
              .btn-mask,
              .button-inter {
                visibility: visible;
              }
            }
            .btn-mask {
              z-index: 99;
              visibility: hidden;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 50%);
            }
            .button-inter {
              z-index: 999;
              visibility: hidden;
              position: absolute;
              top: calc(50% - 24px);
              left: calc(50% - 66px);
              width: 132px;
              height: 48px;
              font-size: 17px;
              text-align: center;
              line-height: 48px;
              font-weight: 500;
              color: #000000;
              border-radius: 100px;
              background-color: #ffffff;
              opacity: 1;
              font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
              pointer-events: auto;
              img {
                width: 14px;
                height: 14px;
              }
            }

            img {
              width: 100%;
              height: 100%;
              border-radius: 15px;
              object-fit: cover;
            }

            p {
              position: absolute;
              top: 28px;
              left: 36px;
              font-size: 20px;
              font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
              font-weight: 500;
              color: #ffffff;
            }
          }
        }
      }

      .btn-bottom {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 30px;
        margin-top: 30px;

        .gl-button {
          display: block;
          width: 132px;
          height: 48px;
          margin: 0 auto;
          font-size: 17px;
          font-weight: 500;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          line-height: 45px;
          text-align: center;
          border-radius: 24px;
          color: #ffffff;
          border: 1.5px solid #ffffff;
          background-color: transparent !important;

          .el-icon {
            font-size: 12px;
          }
        }

        & > .el-icon {
          position: absolute;
          right: 30px;
        }
      }
    }
  }
}

.question {
  width: 51%;
  max-width: 980px;
  margin: 126px auto 144px;

  .title {
    margin-bottom: 50px;
    text-align: center;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.93);
  }

  :deep(.el-collapse) {
    border-top: none !important;
    // --el-collapse-header-height: 0.5rem;

    .el-collapse-item__header {
      height: 24px;
      padding: 28px 0 30px;
      font-size: 24px;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(17, 17, 17, 0.93);
      box-sizing: content-box;
    }

    .el-collapse-item__content {
      width: 100%;
      max-width: 732px;
      padding-bottom: 31px;
      text-align: left;
      font-size: 16px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.77);
      line-height: 26px;
    }

    .el-collapse-item__arrow {
      color: #111111;
      font-size: 14px;
      font-weight: bold;
      transform: rotate(90deg);
    }

    .el-collapse-item__arrow.is-active {
      transform: rotate(270deg) !important;
    }
  }
}

@media screen and (min-width: 1930px) and (max-width: 3000px) {
  .bottom-swiper {
    .inner {
      height: 1529px !important;
    }
  }
}

@media only screen and (max-width: 1300px) {
  .ent-live {
    width: 100%;
    padding: 0;

    .btn-bottom {
      & > .el-icon {
        position: absolute;
        right: 36px;
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
  .banner-title {
    width: 100% !important;
    padding: 0 28px 67px;
    .title {
      width: 100%;
      font-size: 32px;
      line-height: 41px;
    }

    .info-item {
      flex-wrap: wrap;

      .icon {
        width: 100%;
        margin-bottom: 24px;
        img {
          width: 28px;
          height: 28px;
        }

        .name {
          font-size: 22px;
        }
      }

      .text {
        .text-title {
          .light-spans {
            font-size: 14px;
          }

          .bold-spans {
            font-size: 20px;
          }
        }
      }
    }
  }

  .icon-play {
    bottom: 15% !important;
    img {
      width: 26px;
      height: 26px;
    }
  }

  .intro {
    &-box {
      width: 100%;
      padding: 137px 28px 0;
      box-sizing: border-box !important;
      &-title {
        width: 100%;
        font-size: 32px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
        line-height: 41px;
      }

      .content {
        width: 100%;
        padding: 45px 0 52px;
        font-size: 32px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
        line-height: 41px;
      }
    }

    &-item {
      flex-direction: column;

      .tip {
        width: 100%;
        margin-bottom: 50px;

        &-title {
          height: 24px;
          font-size: 16px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          line-height: 24px;
        }

        &-con {
          height: 36px;
          margin: 2px 0;
          font-size: 24px;
          font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.9);
          line-height: 36px;
        }

        &-info {
          height: 69px;
          min-height: 100%;
          font-size: 14px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 23px;
        }

        .el-button {
          width: 116px;
          height: 42px;
          margin-top: 23px;
          font-size: 15px;
        }
      }
    }
  }

  .ent-live {
    width: 100%;
    padding: 0;
    margin-top: 63px;

    .title {
      margin-bottom: 30px;
      font-size: 32px;
    }

    .mySwiper {
      width: 100% !important;

      .swiper-slide {
        width: 310px !important;
        height: 540px !important;
      }
    }

    .btn-bottom {
      .gl-button {
        width: 130px;
        height: 42px;
        line-height: 40px;
        font-size: 15px;
      }
    }
  }

  .bottom-swiper {
    margin-top: 72px;
    .inner {
      height: 1013px;

      .swiper-one {
        height: 540px !important;

        .swiper-slide {
          width: 300px !important;
          height: 540px !important;

          .name {
            top: 28px;
            left: 28px;
            font-size: 30px;
          }

          .info {
            left: 0;
            flex-direction: column;
            width: 100%;
            padding: 0 20px;

            p {
              width: 100%;
              margin-bottom: 20px;
              font-size: 14px;
              color: rgba(255, 255, 255, 0.93);
              line-height: 22px;
              text-shadow: 0px 2px 4px rgba(17, 17, 17, 0.5);
              font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            }

            .gl-button {
              width: 130px;
              height: 42px;
              line-height: 40px;
              font-size: 15px;
            }
          }
        }
      }

      .swiper-box {
        .flex-swiper-box {
          height: 100px;

          .flex-swiper {
            & > div {
              width: 180px !important;
              height: 100px !important;
              p {
                top: 9px;
                left: 14px;
                font-size: 16px;
              }
            }
          }
        }
        .btn-bottom {
          .gl-button {
            width: 130px;
            height: 42px;
            line-height: 40px;
            font-size: 15px;
          }
        }
      }
    }
  }

  .question {
    width: 85%;
    margin: 60px auto;

    .title {
      margin-bottom: 1px;
      font-size: 32px;
      line-height: 47px;
    }

    :deep(.el-collapse) {
      // --el-collapse-header-height: 70px;

      .el-collapse-item__content {
        width: 100%;
      }

      .el-collapse-item__header {
        height: 16px;
        padding: 22px 0 24px;
        font-size: 16px;
      }

      .el-collapse-item__content {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>
