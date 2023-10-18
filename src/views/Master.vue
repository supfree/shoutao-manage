<template>
  <div class="master">
    <!-- banner -->
    <div class="banner">
      <img class="bg" :src="imageUrl + detail.image" alt="" />
      <div class="info">
        <img
          class="animate__animated animate__fadeInLeft"
          src="../assets/images/font3.png"
          alt=""
        />
        <div
          class="animate__animated animate__fadeInUp"
          style="animation-duration: 3s"
        >
          <h2>{{ detail.name }}</h2>
          <p class="tip">
            <span class="span1">全网粉丝</span>
            <span class="span2">{{ detail.fans }}</span>
            <el-divider direction="vertical" />
            <span class="span1">全网获赞</span>
            <span class="span2">{{ detail.like }}</span>
          </p>
          <p class="intro">{{ detail.editor }}</p>
          <p class="btn-link" @click="goInfo(detail.button_url)">
            {{ $t("other.Information") }}
            <el-icon>
              <ArrowRight />
            </el-icon>
          </p>
        </div>
      </div>
    </div>
    <!-- 达人列表 -->
    <div class="live-box">
      <div class="box">
        <div class="header">
          <h3>{{ $t("main.List-of-talents") }}</h3>
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
          <div class="live-list">
            <Card
              :item="item"
              :icon="false"
              v-for="item in list"
              :key="item"
              @click="goInfo(item.id)"
            ></Card>
          </div>
          <div class="load-box" @click="getMoreList" v-if="!end">
            {{ end ? $t("other.No-Load-more") : $t("other.Load-more") }}
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
              <Card :item="item" :icon="false"></Card>
            </swiper-slide>
          </swiper>
        </div>

        <el-empty :image-size="200" v-if="list.length == 0" />
      </div>
    </div>
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

const modules = [Navigation];
import { useRouter } from "vue-router";
const router = useRouter();
const _isMobile =
  getCurrentInstance().appContext.config.globalProperties.$utils._isMobile(); // 判断设备

const { proxy } = getCurrentInstance();
const tabs = [
  {
    name: proxy.$t("other.All"),
    active: true,
  },
  {
    name: proxy.$t("other.Entertainment-talent"),
  },
  {
    name: proxy.$t("other.E-commerce-talent"),
  },
];

onMounted(() => {
  getArtist("refresh");
});

// 导航index
const lid = ref(0);
const changeLive = (index) => {
  lid.value = index;
  page.value = 1;
  end.value = false;
  getArtist("refresh");
};

// 获取直播列表
const end = ref(false);
const page = ref(1);
const list = ref([]);
const detail = ref({});
const getArtist = (status) => {
  get("index/artist", {
    store_id: localStorage.getItem("key") || 1,
    type: lid.value,
    page: page.value,
  }).then((res) => {
    // console.log(res);
    if (status == "refresh") {
      // list.value = [];
      list.value = res.data[1];
    } else {
      if (res.data[1].length == 0) {
        end.value = true;
      }
      list.value = list.value.concat(res.data[1]);
    }
    detail.value = res.data[0];
  });
};

const getMoreList = () => {
  if (end.value) {
    return false;
  }
  page.value = page.value + 1;
  getArtist();
};

const goInfo = (e) => {
  console.log(e);
  router.push({ path: "/artist", query: { id: e } });
};
</script>

<style lang="scss" scoped>
.master {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

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

    .info {
      position: absolute;
      left: 20%;
      bottom: 0;
      width: 100%;
      z-index: 2;

      & > img {
        width: 346px;
        height: 154px;
        margin-bottom: 24px;
      }

      & > div {
        width: 100%;
        margin-left: 45px;

        h2 {
          font-size: 24px;
          font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.93);
        }

        .tip {
          display: flex;
          align-items: center;
          margin: 10px 0;

          .span1 {
            font-size: 16px;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.55);
          }

          .el-divider {
            height: 18px;
            margin: 0 14px;
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: inset 1px 0px 0px 0px rgba(255, 255, 255, 0.5);
          }

          .span2 {
            margin-left: 5px;
            font-size: 24px;
            font-family: NotoSans-Regular, NotoSans;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.93);
          }
        }

        .intro {
          width: 25%;
          margin-top: 14px;
          font-size: 16px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.77);
          line-height: 1.5;
        }
      }

      .btn-link {
        display: flex;
        align-items: center;
        width: 146px;
        height: 48px;
        margin: 45px 0 52px;
        font-size: 17px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        cursor: pointer;

        .el-icon {
          margin-left: 5px;
        }
      }
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
        align-self: flex-start;
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

@media only screen and (max-width: 750px) {
  .live-box {
    .pc-swiper {
      display: none !important;
    }
  }

  .ent-item {
    height: 100vh !important;
  }

  .master {
    .mobie-swiper {
      display: block !important;
    }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .master {
    .banner {
      .info {
        width: 90%;
        left: 5%;
        text-align: center;

        & > img {
          width: 140px;
          height: 62px;
          margin-left: 5%;
          object-fit: cover;
          object-position: center;
        }

        & > div {
          margin-left: 0;

          h2 {
            font-size: 22px;
          }

          .tip {
            justify-content: center;

            .span1 {
              font-size: 14px;
            }

            .el-divider {
              height: 15px;
            }

            .span2 {
              font-size: 15px;
            }
          }

          .intro {
            width: 100% !important;
            font-size: 14px;
          }
        }
        .btn-link {
          font-size: 15px;
          margin: 18px auto 58px !important;
          justify-content: center;
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

@media only screen and (max-width: 1300px) {
  .live-list {
    grid-template-columns: repeat(2, 45%) !important;
    grid-gap: 50px !important;
  }
}
</style>
