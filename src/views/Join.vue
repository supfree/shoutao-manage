<template>
  <div class="container">
    <!-- 加入1 -->
    <div class="join-one m-join-one">
      <div class="btn-join">{{ detail.button_name }}</div>
      <div class="color-font" v-html="detail.title"></div>
      <p v-html="detail.title_deputy"></p>
    </div>
    <!-- banner内容1 -->
    <div class="banner-box">
      <img :src="imageUrl + detail.image" alt />
      <div class="tip-box">
        <div class="tip-box-info">
          <div
            class="title wow animate__animated animate__fadeInUp animate__delay-0.5s"
            v-html="detail.editor"
          ></div>
          <div class="info-item">
            <div class="icon touch" @click="toggleBox(detail.url)">
              <img class="icon-play" src="../assets/images/icons/play.svg" alt />
              <div class="name">{{ $t("other.Watch-video") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加入2 -->
    <div class="join-one">
      <div class="btn-join">{{ detail1.button_name }}</div>
      <div class="color-font1" v-html="detail1.title"></div>
      <p v-html="detail.title_deputy"></p>
    </div>
    <!-- banner内容2 -->
    <div class="banner-box">
      <img :src="imageUrl + detail1.image" alt />
      <div class="tip-box">
        <div class="tip-box-info">
          <div
            class="title wow animate__animated animate__fadeInUp animate__delay-0.5s"
            v-html="detail1.editor"
          ></div>
          <div class="info-item">
            <div class="icon touch" @click="toggleBox(detail.url)">
              <img class="icon-play" src="../assets/images/icons/play.svg" alt />
              <div class="name">{{ $t("other.Watch-video") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部swiper -->
    <div class="bottom-swiper" v-if="true">
      <h3>{{ detail2.button_name }}</h3>
      <swiper
        :slidesPerView="'auto'"
        :spaceBetween="_isMobile ? 14 : 36"
        :centeredSlides="_isMobile ? false : true"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
        @swiper="initSwiper"
        @slideChange="changeSwiper"
      >
        <swiper-slide v-for="(item, index) in detail2.children" :key="index">
          <div class="bottom-swiper-item">
            <img :src="imageUrl + item.image" alt />
            <p class="animate__animated animate__fadeInUp" v-html="item.editor"></p>
          </div>
        </swiper-slide>
        <div class="arrow-group">
          <div @click="prevSlide" class="touch">
            <el-icon :style="swiperIndex == 0 ? 'opacity: 0.5;' : 'opacity: 1;'">
              <ArrowLeftBold />
            </el-icon>
          </div>
          <div style="margin-left: 17px" @click="nextSlide" class="touch">
            <el-icon
              :style="
                swiperIndex == swiperLength ? 'opacity: 0.5;' : 'opacity: 1;'
              "
            >
              <ArrowRightBold />
            </el-icon>
          </div>
        </div>
      </swiper>
    </div>

    <!-- 投递简历 -->
    <div class="deliver-block">
      <div class="deliver">
        <img class="logo" :src="imageUrl + detail3.image" alt />
        <h2 v-html="detail3.title"></h2>
        <p v-html="detail3.editor"></p>
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
          {{
          detail3.button_name
          }}
        </el-button>
        <p v-if="value==1">
          <el-divider>
            <span
              style="
                color: rgba(17, 17, 17, 0.55);
                font-size: 13px;
                font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
                font-weight: 400;
              "
            >{{ $t("other.OR") }}</span>
          </el-divider>
        </p>
        <img class="qrcode" :src="imageUrl + detail3.platform" alt  v-if="value==1"/>
        <p class="mt24" v-if="value==1">微信扫描二维码查看其他职位</p>
      </div>
    </div>

    <!-- 视频弹窗 -->
    <el-dialog
      class="video-box"
      width="100%"
      v-model="is_video"
      :fullscreen="true"
      :append-to-body="true"
      :destroy-on-close="true"
    >
      <video class="myVideo" :src="video_src" autoplay controls></video>
    </el-dialog>
  </div>
</template>

<script setup>
import { WOW } from "wowjs";
import { ElMessage } from "element-plus";
import { get, imageUrl } from "../assets/js/request.js";
import { ref, onMounted, reactive, toRaw, getCurrentInstance } from "vue";
// import Swiper core and required modules
import { Navigation, FreeMode, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

// 判断设备
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

const modules = [Navigation, FreeMode, Pagination];

let form = reactive({
  name: "",
  email: "",
  textarea: "",
});

const value = ref(1);

onMounted(() => {
  value.value = Number(localStorage.getItem("key")||1);
  new WOW().init();
  getJoinInfo();
});

// initSwiper
var bottomSwiper = ref(null);
const swiperIndex = ref(0);
const initSwiper = (swiper) => {
  bottomSwiper = toRaw(swiper);
  // console.log(bottomSwiper);
};
const changeSwiper = (swiper) => {
  swiperIndex.value = swiper.activeIndex;
};

const nextSlide = () => {
  bottomSwiper.slideNext();
};
const prevSlide = () => {
  bottomSwiper.slidePrev();
};

// 加入我们
const detail = ref({});
const detail1 = ref({});
const detail2 = ref({});
const detail3 = ref({});
const swiperLength = ref(0);
const getJoinInfo = () => {
  get("index/join", {
    store_id: localStorage.getItem("key") || 1,
  }).then((res) => {
    console.log(res, imageUrl);
    detail.value = res.data[0];
    detail1.value = res.data[1];
    detail2.value = res.data[2];
    detail3.value = res.data[3];
    swiperLength.value = res.data[2].children.length - 1;
    console.log(swiperLength);
  });
};

const is_video = ref(false);
var video_src = ref("");
const toggleBox = (url) => {
  video_src.value = url || "";
  is_video.value = !is_video.value;
};

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
.container {
  width: 100%;
  height: 100%;
  font-size: 0;
}

.join-one {
  width: 80%;
  padding: 128px 0 66px;
  margin: 0 auto;
  text-align: center;

  .btn-join {
    display: inline-block;
    min-width: 84px;
    padding: 0 10px;
    height: 32px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #111111;
    color: rgba(17, 17, 17, 0.9);
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    cursor: pointer;
  }

  .color-font {
    margin: 18px 0 15px;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.9);
    background: linear-gradient(135deg, #2d28ff 30%, #14cdab 50%, #00ff74 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .color-font1 {
    margin: 18px 0 15px;
    font-size: 56px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.9);
    line-height: 1.3;
    background: linear-gradient(70deg, #ffa200 25%, #e400f7 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    max-width: 650px;
    margin: 10px auto 0;
    font-size: 24px;
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    font-weight: 500;
    color: rgba(17, 17, 17, 0.9);
    line-height: 36px;
  }
}

.banner-box {
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100vh;

  img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }

  .tip-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    &-info {
      width: 51%;
      max-width: 980px;
      margin: 0 auto;
    }
  }

  .title {
    // width: 51%;
    max-width: 732px;
    margin-bottom: 50px;
    line-height: 48px;
    text-align: left;
    font-size: 36px;
    font-weight: bold;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    color: rgba(255, 255, 255, 0.9);
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 142px;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);

    .icon {
      display: flex;
      align-items: center;

      .icon-play {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }

      .name {
        font-size: 17px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: #ffffff;
        line-height: 25px;
      }
    }
  }
}

.bottom-swiper {
  width: 100%;
  padding: 133px 0 80px 0;
  background-color: #111111;

  .mySwiper {
    position: relative;
    .swiper-slide {
      max-width: 980px;
      flex-shrink: 1;
      padding-bottom: 46px;
      box-sizing: content-box;
    }

    :deep(.swiper-pagination) {
      // width: auto;
      left: -470px;
    }

    :deep(.swiper-pagination-bullet) {
      background-color: rgba(255, 255, 255, 0.75);
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: rgba(255, 255, 255, 0.9);
    }

    .arrow-group {
      z-index: 99;
      position: absolute;
      bottom: 0;
      right: calc(50% - 480px);
      display: flex;
      .el-icon {
        width: 28px;
        height: 28px;
        font-size: 17px;
        color: #ffffff;
        border-radius: 50%;
        border: 2px solid #ffffff;
        pointer-events: none;
      }
    }
  }

  h3 {
    margin-bottom: 63px;
    margin-left: calc(50% - 480px);
    font-size: 36px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.93);
  }

  &-item {
    position: relative;
    width: 980px;
    height: 550px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      object-fit: cover;
    }

    p {
      z-index: 2;
      position: absolute;
      left: 36px;
      bottom: 30px;
      width: 57%;
      font-size: 36px;
      line-height: 1.4;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.deliver-block {
  width: 100%;
  height: 100%;
  background-color: #fbfbfd;
}

.deliver {
  width: 51%;
  padding: 130px 0 141px;
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
    width: 454px;
    margin: 50px auto;

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

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .title.wow {
    width: 319px !important;
  }

  .m-join-one {
    padding-top: 36px !important;
  }
  .join-one {
    padding: 72px 0 30px;

    .btn-join {
      min-width: 68px;
      padding: 0 10px;
      height: 26px;
      line-height: 26px;
      font-size: 13px;
    }

    .color-font,
    .color-font1 {
      margin: 9px 0 6px;
      font-size: 30px;
    }

    p {
      font-size: 14px;
      line-height: 23px;
    }
  }
  .banner-box {
    height: 812px;
    .tip-box {
      &-info {
        width: 100%;
        padding: 0 28px;
      }
    }

    .title {
      width: 100%;
      margin-bottom: 27px;
      font-size: 32px;
      line-height: 38px;
      word-break: break-word;
      visibility: visible;
    }

    .info-item {
      flex-wrap: wrap;
      margin-bottom: 68px;

      .icon {
        width: 100%;
        flex-grow: 1;
        // margin-bottom: 10px;
      }
    }
  }

  .deliver {
    width: 100%;
    padding: 64px 28px 69px;

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

  .bottom-swiper {
    padding: 62px 0 82px 28px;

    .mySwiper {
      :deep(.swiper-pagination) {
        width: auto;
        left: 0;
      }

      .arrow-group {
        right: 38px !important;
      }
    }

    h3 {
      width: 100%;
      font-size: 32px;
      margin: 0 0 30px 0 !important;
    }

    &-item {
      width: 320px;
      height: 180px;

      img {
        border-radius: 8px;
      }

      p {
        width: calc(100% - 30px);
        left: 15px;
        bottom: 15px;
        font-size: 24px;
      }
    }
  }
}
</style>
