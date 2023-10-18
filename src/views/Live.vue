<template>
  <div class="live">
    <!-- banner -->
    <div class="banner">
      <img class="bg" :src="imageUrl + detail.image" alt="" />
      <div class="banner-op">
        <img src="../assets/images/font1.svg" alt="" />
        <p class="btn-group btn-play" @click="toggleBox(detail.url)">
          {{ $t("other.Watch-video")
          }}<el-icon>
            <VideoPlay />
          </el-icon>
        </p>
        <p
          class="btn-group btn-link"
          style="border: none"
          @click="goInfo(detail.button_url)"
        >
          {{ $t("other.Information")
          }}<el-icon>
            <ArrowRight />
          </el-icon>
        </p>
      </div>
    </div>
    <!-- gird-img -->
    <div class="gird-img">
      <div class="img-item">
        <img class="bg" :src="imageUrl + detail1.image" alt="" />
        <div class="banner-op">
          <img class="bpone" src="../assets/images/font2.svg" alt="" />
          <div>
            <p class="btn-group btn-play mr15" @click="toggleBox(detail1.url)">
              {{ $t("other.Watch-video")
              }}<el-icon>
                <VideoPlay />
              </el-icon>
            </p>
            <p class="btn-group btn-link" @click="goInfo(detail.button_url)">
              {{ $t("other.Information")
              }}<el-icon>
                <ArrowRight />
              </el-icon>
            </p>
          </div>
        </div>
      </div>
      <div class="img-item">
        <img class="bg" :src="imageUrl + detail2.image" alt="" />
        <div class="banner-op">
          <img src="../assets/images/font3.svg" alt="" />
          <div>
            <p class="btn-group btn-play mr15" @click="toggleBox(detail2.url)">
              {{ $t("other.Watch-video")
              }}<el-icon>
                <VideoPlay />
              </el-icon>
            </p>
            <p class="btn-group btn-link" @click="goInfo(detail.button_url)">
              {{ $t("other.Information")
              }}<el-icon>
                <ArrowRight />
              </el-icon>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新直播 -->
    <div class="live-box" id="liveBox">
      <div class="box">
        <div class="header">
          <h3>{{ $t("other.Recently-live") }}</h3>
          <el-affix position="top" :offset="0" v-if="_isMobile">
            <div class="tab">
              <div
                :class="[index == lid ? 'active' : '']"
                v-for="(item, index) in tabs"
                :key="index"
                @click="changeLive(index)"
              >
                {{ item.name }}
              </div>
            </div>
          </el-affix>
          <div class="tab" v-else>
            <div
              :class="[index == lid ? 'active' : '']"
              v-for="(item, index) in tabs"
              :key="index"
              @click="changeLive(index)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 网页端 -->
        <div class="pc-swiper" v-if="list.length">
          <div>
            <div class="live-list">
              <Card :item="item" v-for="item in list" :key="item"></Card>
            </div>
            <div class="load-box" @click="getMoreList" v-if="!end">
              {{ end ? $t("other.No-Load-more") : $t("other.Load-more") }}
            </div>
          </div>
        </div>
      </div>

      <!-- 手机端 -->
      <div class="mobie-swiper" v-if="list.length">
        <swiper
          :direction="'vertical'"
          :pagination="{
            clickable: true,
          }"
          :scrollbar="{
            hide: true,
          }"
          :modules="modules"
          class="vertical-list"
        >
          <swiper-slide v-for="item in list" :key="item">
            <Card :item="item"></Card>
          </swiper-slide>
        </swiper>
      </div>

      <el-empty :image-size="200" v-if="list.length == 0" />
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
      <video
        class="myVideo"
        :src="video_src"
        autoPlay
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        preload="auto"
        loop
        controls
      ></video>
    </el-dialog>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { get, imageUrl } from "../assets/js/request.js";
import { ref, getCurrentInstance, onMounted } from "vue";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import { useRouter } from "vue-router";
const router = useRouter();
const { proxy } = getCurrentInstance();
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile(); // 判断设备

const modules = [Navigation];
const tabs = [
  {
    name: proxy.$t("other.All"),
    active: true,
  },
  {
    name: proxy.$t("main.Entertainment-live"),
  },
  {
    name: proxy.$t("main.E-commerce-live"),
  },
];

onMounted(() => {
  getBroadcast("refresh");
});

// 导航index
const lid = ref(0);
const changeLive = (index) => {
  lid.value = index;
  page.value = 1;
  end.value = false;
  getBroadcast("refresh");
};

// 获取直播列表
const end = ref(false);
const page = ref(1);
const list = ref([]);
let detail = ref({});
let detail1 = ref({});
let detail2 = ref({});
const getBroadcast = (status) => {
  get("index/broadcast", {
    store_id: localStorage.getItem("key") || 1,
    type: lid.value,
    page: page.value,
  }).then((res) => {
    console.log(res);
    if (status == "refresh") {
      list.value = res.data[1];
    } else {
      if (res.data[1].length == 0) {
        end.value = true;
      }
      list.value = list.value.concat(res.data[1]);
    }
    detail = res.data[0].children[0];
    detail1 = res.data[0].children[1];
    detail2 = res.data[0].children[2];
  });
};

const is_video = ref(false);
var video_src = ref("");
const toggleBox = (url) => {
  video_src.value = url || "";
  is_video.value = !is_video.value;
};

const getMoreList = () => {
  if (end.value) {
    return false;
  }
  page.value = page.value + 1;
  getBroadcast();
};

const goInfo = (e) => {
  console.log(e);
  router.push({ path: "/artist", query: { id: e } });
};
</script>

<style lang="scss" scoped>
.live {
  width: 100%;
  height: 100%;

  .banner {
    z-index: 1;
    position: relative;
    width: 100%;
    height: calc(100vh - 56px);

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-op {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, -30%);
      z-index: 2;

      & > img {
        width: 390px;
        height: 150px;
      }
    }
  }

  .gird-img {
    display: flex;
    flex-direction: row;
    width: 100%;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-item {
      position: relative;
      width: 50%;
      height: 2.8125rem;

      .banner-op {
        z-index: 2;
        position: absolute;
        left: 0;
        bottom: 0.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 0.36rem;
        // transform: translate(-50%, -30%);

        .bpone {
          width: 1.77rem;
          height: 0.36rem;
        }

        .bptwo {
          width: 266px;
          height: 108px;
        }

        & > div {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .btn-play {
            margin: 0;
          }
        }

        .mr15 {
          margin-right: 15px !important;
        }
      }
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.76rem;
    height: 0.25rem;
    font-size: 0.09rem;
  }

  .btn-play {
    margin: 20px auto;
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    font-weight: 500;
    border-radius: 24px;
    color: rgba(17, 17, 17, 0.93);
    background-color: #ffffff;
    cursor: pointer;

    .el-icon {
      margin-left: 5px;
    }
  }

  .btn-link {
    margin: 0 auto;
    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
    font-weight: 500;
    border-radius: 24px;
    color: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;

    .el-icon {
      margin-left: 5px;
    }
  }

  .live-box {
    width: 100%;
    height: 100%;
    margin-bottom: 144px;
    background-color: #ffffff;

    .box {
      width: 62.5%;
      height: 100%;
      margin: 0 auto;

      .header {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin: 132px 0 62px;
        background-color: #ffffff;

        h3 {
          font-size: 36px;
          font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          font-weight: bold;
          color: rgba(17, 17, 17, 0.93);
        }

        .tab {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;

          div {
            flex: 0 0 auto;
            padding: 11px 28px;
            margin-left: 14px;
            border-radius: 21px;
            text-align: center;
            font-size: 17px;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.93);
            background-color: rgba(17, 17, 17, 0.05);
            cursor: pointer;
          }
        }

        .active {
          color: rgba(255, 255, 255, 0.93) !important;
          background-color: #111111 !important;
        }
      }

      .pc-swiper {
        width: 100%;

        .live-list {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 36px;
          width: 100%;
        }
      }
    }
  }

  :deep(.mobie-swiper) {
    display: none !important;
    width: 100%;
    height: 100%;
    .swiper {
      width: 100%;
      height: 100vh;
    }
    .swiper-slide {
      width: 100% !important;
      height: 100% !important;
    }
  }
}

@media only screen and (max-width: 1300px) {
  .live-list {
    grid-template-columns: repeat(2, 45%) !important;
    grid-gap: 50px !important;
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .live {
    .banner {
      .banner-op {
        & > img {
          width: 300px;
          height: 114px;
          object-position: center;
          object-fit: cover;
        }
      }
    }

    .btn-group {
      width: 134px;
      height: 42px;
      font-size: 15px;
    }
  }

  .gird-img {
    flex-direction: column !important;

    .img-item {
      width: 100% !important;
      margin-top: 15px;

      .banner-op {
        flex-direction: column !important;

        img {
          margin-bottom: 10px;
        }

        .btn-link {
          border: none;
        }

        .btn-play {
          color: #ffffff;
          background: none;
        }
      }
    }
  }

  .live-box {
    margin-bottom: 0 !important;
    .box {
      width: 100% !important;

      .header {
        flex-direction: column !important;
        margin: 62px 0 28px !important;
        h3 {
          margin-bottom: 21px;
        }

        .el-affix {
          width: 100% !important;
          height: 100% !important;
        }

        .tab {
          width: 100%;
          margin: 0;
          padding: 10px 0 10px 20px;
          overflow-x: scroll;
          overflow-y: hidden;
          div {
            font-size: 14px !important;
            margin-left: 0 !important;
            margin-right: 14px !important;
          }
        }
      }

      .load-box {
        width: 90% !important;
        margin: 36px auto;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .live-box {
    .pc-swiper {
      display: none !important;
    }
  }

  .ent-item {
    height: 100vh !important;
  }

  .live {
    .mobie-swiper {
      display: block !important;
    }
  }
}
</style>
