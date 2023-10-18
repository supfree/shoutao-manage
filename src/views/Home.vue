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
          class="title animate__animated animate__fadeInUp"
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
              <!-- <span class="light-spans">万</span> -->
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
          <div>{{ topIntro.title }}</div>
          <div class="content">{{ topIntro.editor }}</div>
        </div>
        <div class="intro-item hidden animate__animated animate__delay-0.5s">
          <div
            class="tip"
            v-for="(item, index) in topIntro.children"
            :key="index"
          >
            <div class="tip-title">{{ item.title }}</div>
            <div class="tip-con">{{ item.title_deputy }}</div>
            <div class="tip-info">{{ item.editor }}</div>
            <el-button round size="large" @click="goInfo(item.button_url)">
              {{ item.button_name }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 娱乐直播 -->
    <div class="ent-live entertainment">
      <div class="title">{{ $t("main.Entertainment-live") }}</div>
      <swiper
        class="mySwiper"
        :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
        :centeredSlides="Boolean(_isMobile)"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="Boolean(_isMobile)"
        :spaceBetween="20"
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
        <el-button plain size="large" round @click="goInfo('live')">
          {{ $t("other.View-all")
          }}<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
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
    <!-- 电商直播 -->
    <div class="ent-live commerce">
      <div class="title">{{ $t("main.E-commerce-live") }}</div>
      <swiper
        class="mySwiper"
        :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
        :centeredSlides="Boolean(_isMobile)"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="Boolean(_isMobile)"
        :spaceBetween="20"
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
        <el-button plain size="large" round @click="goInfo('live')">
          {{ $t("other.View-all")
          }}<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
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
          <swiper-slide v-for="(item, index) in swiper1" :key="index">
            <img :src="imageUrl + item.image" alt="" />
            <transition name="el-zoom-in-bottom">
              <div class="swiper-mask-info" v-show="show">
                <p class="name">{{ item.name }}</p>
                <div class="info">
                  <p class="u-line-3">{{ item.editor }}</p>
                  <el-button
                    plain
                    size="large"
                    round
                    @click="goInfo('artist', item.button_url)"
                  >
                    {{ $t("other.Information") }}
                    <el-icon class="el-icon--right">
                      <ArrowRight />
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </transition>
          </swiper-slide>
        </swiper>
        <!-- 轮播盒子 -->
        <div class="swiper-box">
          <div>
            <swiper
              class="swiper-item"
              id="b-swiper1"
              :speed="speed1"
              :freeMode="true"
              :modules="modules"
              :loop="true"
              :slides-per-view="4"
              :space-between="14"
              :autoplay="{
                delay: 0,
              }"
              @swiper="initSwiper1"
              @mouseenter.native="mouseEnter1"
              @mouseleave.native="mouseLeave1"
              v-if="swiper2.length"
            >
              <swiper-slide
                class="touch"
                v-for="(item, index) in swiper2"
                :key="index"
              >
                <img :src="imageUrl + item.image" alt="" />
                <p>{{ item.name }}</p>
              </swiper-slide>
            </swiper>
          </div>
          <div>
            <swiper
              class="swiper-item"
              id="b-swiper2"
              :speed="speed2"
              :freeMode="true"
              :modules="modules"
              :loop="true"
              :slides-per-view="4"
              :space-between="14"
              :autoplay="{
                delay: 0,
              }"
              @swiper="initSwiper2"
              @mouseenter.native="mouseEnter2"
              @mouseleave.native="mouseLeave2"
              v-if="swiper3.length"
            >
              <swiper-slide
                class="touch"
                v-for="(item, index) in swiper3"
                :key="index"
              >
                <img :src="imageUrl + item.image" alt="" />
                <p>{{ item.name }}</p>
              </swiper-slide>
            </swiper>
          </div>
          <!-- 查看全部 -->
          <div class="btn-bottom">
            <el-button plain size="large" round @click="goInfo('master')">
              {{ $t("other.View-all")
              }}<el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </el-button>
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
console.log(Boolean(_isMobile));

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
let swiper3 = ref([]);
const getHomeInfo = () => {
  get("index/index", {
    store_id: localStorage.getItem("key") || 1,
  }).then((res) => {
    // console.log(res);
    topInfo.value = res.data[0];
    topIntro.value = res.data[1];
    list1.value = res.data[2];
    list2.value = res.data[3];
    questionList.value = res.data[5];
    swiper1.value = res.data[4].children;
    swiper2.value = res.data[6].children;
    swiper3.value = res.data[7].children;

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
  console.log(intro.offsetHeight, 111);
  nextTick(() => {
    stickyWrapper.style.height = totalHeight + "px";
  });
};

// 监听滑动 X
const handleResize = () => {
  const width = window.innerWidth;
  if (width > 1000) {
    console.log(width);
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
  // const swiperArr = document.querySelectorAll(
  //     ".swiper-one .swiper-wrapper .swiper-slide"
  //   );
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  // console.log(scrollTop);

  if (scrollTop >= 5642) {
    const transY = windowHeight / 2 - 250;
    // oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
    oPicture.style.transform = `translateY(${transY}px)`;
    oPicture.style.opacity = "1";
    oPicture.style.transition = " 1s ease-in-out ";
    oPicture.style.transitionDelay = " 1s ease-in-out ";
    // swiperArr.forEach((item) => {
    //   item.style.opacity = "1";
    //   item.style.transition = " 1s ease-in-out ";
    //   item.style.transitionDelay = " 1s ease-in-out ";
    // });
  } else if (scrollTop >= 3242 && scrollTop < 5642) {
    show.value = false;
    const transY = windowHeight / 2;
    const transYBtn = 80 + ((scrollTop - 3242) / (5642 - 3242)) * (transY - 80);
    const scale = 2.5 - ((scrollTop - 3242) / (5642 - 3242)) * 1.5;
    oSwiper.style.transform = `scale(${scale}) translateY(${transYBtn}px)`;
    oSwiper.style.transition = "transform";
    oPicture.style.opacity = "0";
    // swiperArr.forEach((item) => {
    //   item.style.opacity = "0";
    // });
  } else if (scrollTop >= 0 && scrollTop < 3242) {
    const transY = windowHeight / 2 - 250;
    // oSwiper.style.transform = `scale(2.5) translateY(80px)`;
    oPicture.style.opacity = "0";
    oPicture.style.transform = `translateY(${transY}px)`;
  }

  if (scrollTop >= 5642) {
    show.value = true;
    // bottomSwiper.autoplay.start();
    const transY = windowHeight / 2 - 250;
    oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
  } else {
    const transY = windowHeight / 2 - 250;
    const transYBtn =
      75 + ((scrollTop - 4300) / (5642 - 3800)) * (transY - 100);
    const scale = 10 - (scrollTop / 5642) * 9;
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

// 底部swiper autoplay
var bottomSwiper = ref(null);
var bottomSwiper1 = ref(null);
var bottomSwiper2 = ref(null);
const is_bottom_auto = ref(true);
const initSwiper = (swiper) => {
  bottomSwiper = toRaw(swiper);
  console.log(bottomSwiper);
};
const initSwiper1 = (swiper) => {
  bottomSwiper1 = toRaw(swiper);
};
const initSwiper2 = (swiper) => {
  bottomSwiper2 = toRaw(swiper);
};

const bottomSwiperAuto = () => {
  // const swiper1 = document.querySelector("#b-swiper1 .swiper-wrapper");
  // nextTick(() => {
  //   swiper1.style.transitionDelay = 0 + "ms";
  //   swiper1.style.transitionDuration = 0 + "ms";
  // });
  // transition-delay: 0ms;
  // transition-duration: 0ms;
  is_bottom_auto.value = !is_bottom_auto.value;
  if (is_bottom_auto.value) {
    bottomSwiper1.autoplay.start();
    bottomSwiper2.autoplay.start();
  } else {
    bottomSwiper1.autoplay.stop();
    bottomSwiper2.autoplay.stop();
  }
};

// 底部swiper降速
const speed1 = ref(3500);
const speed2 = ref(4000);
const mouseEnter1 = () => {
  // const swiper1 = document.querySelector("#b-swiper1 .swiper-wrapper");
  // nextTick(() => {
  //   swiper1.style.transitionDuration = 2000 + "ms";
  // });
  speed1.value = 6000;
  bottomSwiper1.update();
};
const mouseLeave1 = () => {
  speed1.value = 3500;
  bottomSwiper1.update();
};

const mouseEnter2 = () => {
  speed2.value = 6000;
  bottomSwiper2.autoplay.start();
};
const mouseLeave2 = () => {
  speed2.value = 4000;
  bottomSwiper2.autoplay.start();
};

const goInfo = (e, id) => {
  console.log(e);
  router.push({ path: e, query: { id: id } });
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.container {
  font-size: 0;
}

.section-hero {
  z-index: 3;
  height: 100vh;

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
    bottom: 20%;
    img {
      width: 28px;
      height: 28px;
    }
  }
}

.banner-title {
  z-index: 1;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  .title {
    position: absolute;
    left: 20%;
    bottom: 30%;
    width: 51%;
    text-align: left;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .info-item {
    position: absolute;
    left: 20%;
    bottom: 20%;
    display: flex;
    align-items: center;
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
  // background: url(../assets/images/bg1.png) no-repeat;
  // background-size: 100% 100%;

  &-box {
    width: 62.5%;
    height: 100%;
    padding: 130px 0;
    margin: 0 auto;
    box-sizing: content-box;

    &-title {
      line-height: 1.5;
      text-align: left;
      font-size: 56px;
      font-weight: bold;
      letter-spacing: 0.03em;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      color: rgba(255, 255, 255, 0.9);
    }

    .content {
      padding: 30px 0 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
  }

  &-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 40px 0;

    .tip {
      width: 30%;
      text-align: left;

      &-title {
        height: 36px;
        margin-bottom: 20px;
        font-size: 24px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }

      &-con {
        margin-bottom: 20px;
        font-size: 32px;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
      }

      &-info {
        height: 150px;
        margin-bottom: 20px;
        font-size: 16px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        line-height: 26px;
      }

      .el-button {
        width: 152px;
        height: 56px;
        padding: 0 !important;
        border-radius: 28px;
        font-size: 17px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: #111111;
      }
    }
  }
}

.ent-live {
  position: relative;
  width: 70%;
  padding: 0 30px;
  margin: 0.65rem auto;

  .title {
    margin-bottom: 60px;
    font-size: 0.3rem;
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
    margin-top: 30px;

    .el-button {
      display: block;
      width: 132px;
      height: 44px;
      margin: 0 auto;
      font-size: 16px;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      border-radius: 24px;
      color: #111111;
      border: 2px solid #111111;
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
  // padding: 30px 0;
  overflow: visible !important;
  background-color: #111111;

  .inner {
    position: sticky;
    top: 0;
    // width: 100vw;
    height: 1600px;
    overflow: hidden;

    .swiper-one {
      width: 100%;
      height: 506px;

      .swiper-slide-active {
        opacity: 1 !important;
      }

      .swiper-slide {
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
          left: 40px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
          width: calc(100% - 60px);

          p {
            width: 60%;
            font-size: 16px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.55);
            line-height: 1.3;
          }

          .el-button {
            width: 132px;
            height: 48px;
            font-size: 17px;
            font-weight: 500;
            color: #111111;
            border-radius: 24px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          }
        }
      }
    }

    .swiper-box {
      position: relative;
      height: 800px;
      box-sizing: content-box;

      .swiper-item {
        margin-top: 14px !important;

        :deep(.swiper-wrapper) {
          -webkit-transition-timing-function: linear;
          /*之前是ease-out*/
          -moz-transition-timing-function: linear;
          -ms-transition-timing-function: linear;
          -o-transition-timing-function: linear;
          transition-timing-function: linear;
        }

        .swiper-slide {
          position: relative;
          width: 450px !important;
          height: 250px !important;
          // color: red;
          text-align: center;
          background-size: cover;
          background-position: center;

          img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
          }

          p {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 20px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            color: #ffffff;
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

        .el-button {
          display: block;
          width: 132px;
          height: 48px;
          margin: 0 auto;
          font-size: 17px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          border-radius: 24px;
          color: #ffffff;
          border-color: #ffffff;
          background-color: transparent !important;
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
  margin: 100px auto;

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
    --el-collapse-header-height: 0.5rem;

    .el-collapse-item__header {
      // padding: 10px 0;
      font-size: 24px;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(17, 17, 17, 0.93);
    }

    .el-collapse-item__content {
      width: 80%;
      text-align: left;
      font-size: 16px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.77);
    }

    .el-collapse-item__arrow {
      transform: rotate(270deg);
    }

    .el-collapse-item__arrow.is-active {
      transform: rotate(90deg) !important;
    }
  }
}

@media only screen and (max-width: 1300px) {
  .ent-live {
    width: 100%;
    padding: 0;

    .mySwiper {
      .ent-item {
        height: 600px;
      }
    }

    .btn-bottom {
      & > .el-icon {
        position: absolute;
        right: 30px;
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
    .title {
      width: 80%;
      bottom: 30%;
      left: 10%;
      font-size: 32px;
    }

    .info-item {
      left: 10%;
      bottom: 15%;
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
      width: 80%;
      padding: 100px 0 40px;
      // box-sizing: border-box;
      &-title {
        font-size: 32px;
      }

      .content {
        padding: 45px 0 100px;
      }
    }

    &-item {
      flex-direction: column;

      .tip {
        width: 90%;
        margin-bottom: 50px;

        &-title {
          height: 36px;
          margin-bottom: 5px;
          font-size: 16px;
        }

        &-con {
          margin-bottom: 5px;
          font-size: 24px;
        }

        &-info {
          height: auto;
          margin: 10px 0 20px;
          font-size: 14px;
        }

        .el-button {
          width: 116px;
          height: 42px;
          font-size: 15px;
        }
      }
    }
  }

  .ent-live {
    width: 100%;
    padding: 0;

    .title {
      margin-bottom: 30px;
    }

    .mySwiper {
      width: 100% !important;

      .swiper-slide {
        width: 303px !important;
        // height: 500px !important;
      }
    }
  }

  .bottom-swiper {
    .inner {
      height: 1050px;

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

            .el-button {
              width: 130px;
              height: 42px;
              font-size: 15px;
            }
          }
        }
      }

      .swiper-box {
        .swiper-item {
          .swiper-slide {
            width: 180px !important;
            height: 100px !important;
          }

          .btn-bottom {
            .el-button {
              width: 130px;
              height: 42px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }

  .question {
    width: 85%;
    margin: 60px auto;

    .title {
      margin-bottom: 30px;
      font-size: 32px;
    }

    :deep(.el-collapse) {
      // --el-collapse-header-height: 70px;

      .el-collapse-item__content {
        width: 100%;
      }

      .el-collapse-item__header {
        font-size: 16px;
      }

      .el-collapse-item__content {
        font-size: 14px;
      }
    }
  }
}
</style>
