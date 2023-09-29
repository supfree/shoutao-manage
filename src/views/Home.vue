<template>
  <div class="container">
    <!-- banner内容 -->
    <div class="section-hero">
      <div class="sticky-wrapper">
        <div class="banner-box">
          <!-- <img id="bg-image" src="../assets/images/swiper/swiper.png" alt=""> -->
          <video id="bg-image" autoPlay loop muted src="../assets/video/video2.mp4"></video>
          <div class="mask-image"></div>
          <el-icon class="icon-play touch" size="40" color="#FFFFFF" @click="handleTogglePlay">
            <VideoPause v-if="isPlay" />
            <VideoPlay v-else />
          </el-icon>
        </div>
      </div>
      <div class="banner-title">
        <!-- 光生致力于生产出创新、有趣的内容，不断发掘富有创造力的内容创作者。 -->
        <div class="title animate__animated animate__fadeInUp" v-html="topInfo.editor">
        </div>
        <div class="info-item">
          <div class="icon">
            <img :src="imageUrl + topInfo.platform" alt="">
            <div class="name">{{ topInfo.name }}</div>
          </div>
          <div class="text">
            <div class="text-title">
              <span class="light-spans">粉丝</span>
              <span class="bold-spans">{{ topInfo.fans }}</span>
            </div>
            <div class="text-title">
              <span class="light-spans">获赞</span>
              <span class="bold-spans">{{ topInfo.like }}</span>
              <span class="light-spans">万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="intro">
      <div class="intro-box">
        <div class="intro-box-title hidden animate__animated animate__delay-0.5s">
          <div>{{ topIntro.title }}</div>
          <div class="content">{{ topIntro.editor }}</div>
        </div>
        <div class="intro-item hidden animate__animated animate__delay-0.5s">
          <div class="tip" v-for="(item, index) in topIntro.children" :key="index">
            <div class="tip-title">{{ item.title }}</div>
            <div class="tip-con">{{ item.title_deputy }}</div>
            <div class="tip-info">{{ item.editor }}</div>
            <el-button round size="large">{{ item.button_name }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 娱乐直播 -->
    <div class="ent-live entertainment">
      <div class="title">{{ $t('main.Entertainment-live') }}</div>
      <swiper class="mySwiper" :slidesPerView="Boolean(_isMobile) ? 'auto' : 3" :centeredSlides="Boolean(_isMobile)"
        :autoplay="Boolean(_isMobile) ? '' : '{ delay: 3000, disableOnInteraction: false }'" :loop="Boolean(_isMobile)"
        :spaceBetween="36" :modules="modules" :navigation="{
          nextEl: '.entertainment .swiper-button-next',
          prevEl: '.entertainment .swiper-button-prev',
        }" :pagination="{ clickable: true }">
        <swiper-slide v-for="(item, index) in list1" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <!-- 查看全部 -->
      <div class="btn-bottom">
        <el-button plain size="large" round>
          {{ $t('other.View-all') }}<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
        <el-icon size="28" color="#111111" class="touch">
          <VideoPause />
        </el-icon>
      </div>
    </div>
    <!-- 电商直播 -->
    <div class="ent-live commerce">
      <div class="title">{{ $t('main.E-commerce-live') }}</div>
      <swiper class="mySwiper" :slidesPerView="Boolean(_isMobile) ? 'auto' : 3" :centeredSlides="Boolean(_isMobile)"
        :autoplay="Boolean(_isMobile) ? '' : '{ delay: 3000, disableOnInteraction: false }'" :loop="Boolean(_isMobile)"
        :spaceBetween="36" :modules="modules" :navigation="{
          nextEl: '.commerce .swiper-button-next',
          prevEl: '.commerce .swiper-button-prev',
        }" :pagination="{ clickable: true }">
        <swiper-slide v-for="(item, index) in list2" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <!-- 查看全部 -->
      <div class="btn-bottom">
        <el-button plain size="large" round>
          {{ $t('other.View-all') }}<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
        <el-icon size="28" color="#111111" class="touch">
          <VideoPause />
        </el-icon>
      </div>
    </div>

    <!-- 底部swiper -->
    <div class="bottom-swiper">
      <div class="inner">
        <swiper class="swiper-one" :speed="2000" :modules="modules" :loop="true" :slides-per-view="'auto'"
          :centeredSlides="true" :space-between="14">
          <swiper-slide v-for="(item, index) in swiper1.children" :key="index">
            <img :src="imageUrl + item.image" alt="">
            <div class="swiper-mask-info">
              <p class="name">{{ item.name }}</p>
              <div class="info">
                <p class="u-line-3">{{ item.editor }}</p>
                <el-button plain size="large" round>
                  {{ $t('other.Information') }}<el-icon class="el-icon--right">
                    <ArrowRight />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <!-- 轮播盒子 -->
        <div class="swiper-box">
          <div>
            <swiper class="swiper-item" :speed="4000" :freeMode="true" :modules="modules" :loop="true"
              :slides-per-view="4" :space-between="14" :autoplay="{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }" v-if="swiperList.length">
              <swiper-slide v-for="(item, index) in swiperList" :key="index">
                <img :src="item.url" alt="">
              </swiper-slide>
            </swiper>
          </div>
          <div>
            <swiper class="swiper-item" :speed="5000" :freeMode="true" :modules="modules" :loop="true"
              :slides-per-view="4" :space-between="14" :autoplay="{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }" v-if="swiperList.length">
              <swiper-slide v-for="(item, index) in swiperList" :key="index">
                <img :src="item.url" alt="">
              </swiper-slide>
            </swiper>
          </div>
          <!-- 查看全部 -->
          <div class="btn-bottom">
            <el-button plain size="large" round>
              {{ $t('other.View-all') }}<el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </el-button>
            <el-icon size="28" color="#FFFFFF" class="touch">
              <VideoPause />
            </el-icon>
          </div>
        </div>
      </div>
    </div>


    <!-- 问题 -->
    <div class="question">
      <div class="title">{{ $t('other.Questions') }}</div>
      <el-collapse>
        <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in questionList" :key="index">
          <div v-html="item.editor"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { get, imageUrl } from '../assets/js/request.js';
import { onMounted, onUnmounted, getCurrentInstance, nextTick, ref } from "vue";
import Card from "@/components/Card.vue";
// import Swiper core and required modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// 判断设备
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();
console.log(Boolean(_isMobile));

const modules = [
  Navigation, Autoplay, FreeMode
];



const swiperList = [
  {
    url: require('../assets/images/swiper/swiper.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  },
  {
    url: require('../assets/images/swiper/swiper1.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  },
  {
    url: require('../assets/images/swiper/swiper2.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  },
  {
    url: require('../assets/images/swiper/swiper3.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  },
  {
    url: require('../assets/images/swiper/swiper4.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  },
  {
    url: require('../assets/images/swiper/swiper5.png'),
    name: '苏雅',
    info: '2007年，与D-dico、double G组建嘻哈团体T.H.P，并担任团体女主唱 [3]  。2019年3月25日，获得“国家的宝藏妙物官”称号，4月11日，获得“全球好物推荐官”称号。',
  }
]




onMounted(() => {
  getHomeInfo();
  handleResize();

  window.addEventListener('resize', handleResize);
  window.addEventListener("scroll", handleScroll);
})

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
  get('index/index', {
    store_id: localStorage.getItem('key') || 1
  }).then(res => {
    // console.log(res);
    topInfo.value = res.data[0];
    topIntro.value = res.data[1];
    list1.value = res.data[2];
    list2.value = res.data[3];
    questionList.value = res.data[5];
    swiper1.value = res.data[4];
    swiper2.value = res.data[6];
    swiper3.value = res.data[7];

    setTimeout(() => {
      calculateTotalHeight();
    }, 500)
  })
}

// 播放暂停按钮
const isPlay = ref(true);
const handleTogglePlay = (() => {
  const MyVideo = document.querySelector("#bg-image");
  if (isPlay.value) {
    MyVideo.pause();
  } else {
    MyVideo.play();
  }
  isPlay.value = !isPlay.value;
})

// 设置顶部粘性布局高度
const calculateTotalHeight = (() => {
  const stickyWrapper = document.querySelector(".sticky-wrapper");
  const title = document.querySelector(".banner-title");
  const intro = document.querySelector(".intro");
  const totalHeight = title.offsetHeight + intro.offsetHeight;
  console.log(intro.offsetHeight, 111);
  nextTick(() => {
    stickyWrapper.style.height = totalHeight + 'px';
  })
})

// 监听滑动 X
const handleResize = (() => {
  const width = window.innerWidth;
  if (width > 1000) {
    console.log(width);
  }
})

// 监听滑动 Y
const handleScroll = (() => {
  const maskImage = document.querySelector(".mask-image");
  const titleEl = document.querySelector(".banner-title");
  const bgImage = document.querySelector("#bg-image");
  const title1 = document.querySelector(".intro-box-title");
  const titleBox = document.querySelector(".intro-item");
  const scrollTop = document.documentElement.scrollTop;

  // 文案效果
  if (scrollTop >= 250) {
    title1.classList.remove('hidden');
    title1.classList.add('animate__fadeInUp', 'show');
  }
  if (scrollTop >= 700) {
    title1.classList.remove('hidden');
    titleBox.classList.add('animate__fadeInUp', 'show');
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
  const maskTitle = document.querySelector(".swiper-mask-info");
  console.log(maskTitle);
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  console.log(scrollTop);

  if (scrollTop >= 5400) {
    const transY = windowHeight / 2 - 253;
    // oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
    oPicture.style.transform = `translateY(${transY}px)`;
    oPicture.style.opacity = "1";
    oPicture.style.transitionDelay = " 1s ease-in-out ";
    oPicture.style.transition = " 1s ease-in-out ";
  } else if (scrollTop >= 4200 && scrollTop < 5400) {
    const transY = windowHeight / 2 - 253;
    const transYBtn =
      80 + ((scrollTop - 4200) / (5400 - 4200)) * (transY - 80) - 300;
    const scale = 2.5 - ((scrollTop - 4200) / (5400 - 4200)) * 1.5;
    oSwiper.style.transform = `scale(${scale}) translateY(${transYBtn}px)`;
    oSwiper.style.transition = "transform";
    oPicture.style.opacity = "0.1";
  } else if (scrollTop >= 0 && scrollTop < 4200) {
    const transY = windowHeight / 2 - 253;
    // oSwiper.style.transform = `scale(2.5) translateY(80px)`;
    oPicture.style.opacity = "0";
    oPicture.style.transform = `translateY(${transY}px)`;
  }

  if (scrollTop >= 5400) {
    // maskTitle.classList.remove("hidden");
    // maskTitle.classList.add("animate__fadeInUp", "show");

    const transY = windowHeight / 2 - 253;
    oSwiper.style.transform = `scale(1) translateY(${transY}px)`;
  } else {
    const transY = windowHeight / 2 - 253;
    const transYBtn =
      80 + ((scrollTop - 4200) / (5400 - 4200)) * (transY - 100);
    const scale = 10 - (scrollTop / 5400) * 9;
    oSwiper.style.transform = `scale(${scale}) translateY(${transYBtn}px)`;
    oSwiper.style.transition = "transform";
  }
})




onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener('resize', handleResize);
})

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
    background-size: cover !important;
    background-position: center;
    background: url("../assets/images/bg1.png") no-repeat;
  }

  .icon-play {
    position: absolute;
    right: 5%;
    bottom: 20%;
  }
}

.banner-title {
  z-index: 1;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  .title {
    position: absolute;
    left: 20%;
    bottom: 30%;
    width: 50%;
    line-height: 1.6;
    text-align: left;
    font-size: .2813rem;
    font-weight: bold;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.9);
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

      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }

      .name {
        margin-right: 15px;
        font-size: 24px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.93);
        line-height: 36px;
      }
    }

    .text {
      display: flex;
      align-items: baseline;

      .text-title {
        margin-right: 15px;

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
      font-size: .2813rem;
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
    }
  }
}

.ent-live {
  position: relative;
  width: 70%;
  padding: 0 30px;
  margin: .65rem auto;

  .title {
    margin-bottom: 60px;
    font-size: .2917rem;
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
      width: 1.875rem;
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
    padding: 0 30px;
    margin-top: 30px;

    .el-button {
      display: block;
      width: .66rem;
      height: .25rem;
      padding: .052rem;
      margin: 0 auto;
      font-size: .08rem !important;
      font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      font-weight: 500;
      border-radius: 40px;
      color: #111111;
      border-color: #111111;
    }

    &>.el-icon {
      position: absolute;
      right: 30px;
    }
  }
}

.bottom-swiper {
  position: relative;
  width: 100%;
  height: 3000px;
  padding: 30px 0;
  overflow: visible !important;
  // margin: 0.65rem 0;
  background-color: #111111;

  .inner {
    position: sticky;
    top: 0;
    width: 100%;
    height: 1460px;
    overflow: hidden;

    .swiper-one {
      width: 100%;
      height: 430px;

      .swiper-slide {
        position: relative;
        width: 900px !important;
        height: 430px !important;
        overflow: hidden;
        border-radius: 20px;


        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name {
          position: absolute;
          top: 30px;
          left: 30px;
          font-size: 40px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.93);
        }

        .info {
          position: absolute;
          bottom: 30px;
          left: 30px;
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
            line-height: 1.4;
          }
        }
      }
    }

    .swiper-box {
      position: relative;
      height: 800px;

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
          width: .66rem;
          height: .25rem;
          padding: .052rem;
          margin: 0 auto;
          font-size: .08rem !important;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          border-radius: 40px;
          color: #FFFFFF;
          border-color: #FFFFFF;
          background-color: transparent !important;
        }

        &>.el-icon {
          position: absolute;
          right: 30px;
        }
      }
    }
  }

}

.question {
  width: 50%;
  margin: 100px auto;

  .title {
    margin-bottom: 50px;
    text-align: center;
    font-size: .2917rem;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.93);
  }

  :deep(.el-collapse) {

    --el-collapse-header-height: 0.5rem;

    .el-collapse-item__header {
      // padding: 10px 0;
      font-size: .125rem;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(17, 17, 17, 0.93);
    }

    .el-collapse-item__content {
      width: 80%;
      text-align: left;
      font-size: .0833rem;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.77);
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
      bottom: 25%;
      left: 10%;
      width: 80%;
    }

    .info-item {
      left: 10%;
      bottom: 10%;
      flex-wrap: wrap;

      .icon {
        width: 100%;
        flex-grow: 1;
        margin-bottom: 10px;
      }
    }
  }

  .icon-play {
    bottom: 10% !important;
  }

  .intro {
    &-box {
      width: 80%;
      padding: 100px 0 40px;
      // box-sizing: border-box;
    }

    &-item {
      flex-direction: column;

      .tip {
        width: 90%;
        margin-bottom: 50px;

        &-title {
          height: 36px;
          margin-bottom: 5px;
        }

        &-con {
          margin-bottom: 5px;
        }

        &-info {
          height: auto;
          margin: 10px 0 20px
        }
      }
    }
  }

  .ent-live {
    width: 100% !important;
    padding: 0;

    .mySwiper {
      width: 100% !important;

      .swiper-slide {
        width: 330px !important;
        // height: 500px !important;
      }
    }
  }

  .bottom-swiper {
    .inner {
      height: 1000px;

      .swiper-one {
        height: 540px !important;

        .swiper-slide {
          width: 300px !important;
          height: 540px !important;

          .name {
            font-size: 30px;
          }

          .info {
            flex-direction: column;
            p {
              width: 100%;
              margin-bottom: 20px;
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
        }
      }
    }
  }

  .question {
    width: 85%;
    margin: 60px auto;

    .title {
      margin-bottom: 30px;
    }

    :deep(.el-collapse) {

      // --el-collapse-header-height: 70px;

      .el-collapse-item__content {
        width: 100%;
      }

      // .el-collapse-item__header {
      //   font-size: 16px;
      // }

      // .el-collapse-item__content {
      //   font-size: 14px;
      // }
    }
  }
}
</style>