<template>
  <div class="container">
    <!-- banner内容 -->
    <div class="banner-box">
      <img src="../assets/images/swiper/swiper.png" alt="">
      <div class="title">光生致力于生产出创新、有趣的内容，不断发掘富有创造力的内容创作者。</div>
      <div class="info-item">
        <div class="icon">
          <img src="../assets/images/icons/douyin.png" alt="">
          <div class="name">苏雅</div>
        </div>
        <div class="text">
          <div class="text-title">
            <span class="light-spans">粉丝</span>
            <span class="bold-spans">156543</span>
          </div>
          <div class="text-title">
            <span class="light-spans">获赞</span>
            <span class="bold-spans">2.9</span>
            <span class="light-spans">万</span>
          </div>
        </div>
      </div>
      <el-icon class="icon-play touch" size="28" color="#FFFFFF">
        <VideoPlay />
      </el-icon>
    </div>
    <!-- 介绍 -->
    <div class="intro">
      <div class="intro-box">
        <div class="intro-box-title">
          <div>每月都有新的达人加入光生。</div>
          <div class="content">光生为用户和博主以及品牌方提供全方位服务。从内容制作、包装、宣传、推广到商业变现，实现更多商业曝光和上升通道。</div>
        </div>
        <div class="intro-item">
          <div class="tip">
            <div class="tip-title">加入光生</div>
            <div class="tip-con">成为光生的一员</div>
            <div class="tip-info">光生在规模化孵化博主方面已形成高效协同的短视频产业链，同时借助集团优势，为博主匹配影视、综艺项目，实现更多商业曝光和上升通道。</div>
            <el-button round size="large">投递简历</el-button>
          </div>
          <div class="tip">
            <div class="tip-title">商务合作</div>
            <div class="tip-con">一触即达</div>
            <div class="tip-info">公司拥有成熟的主播运营团队和高效的直播培训机制，以专业化的管理流程，打造模式精细化和个性化的平台发展策略。</div>
            <el-button round size="large">商务合作</el-button>
          </div>
          <div class="tip">
            <div class="tip-title">关于</div>
            <div class="tip-con">发展历程</div>
            <div class="tip-info">光生以全国性、区域化 KOL 及 KOC 孵化管理能力为核心基础，为品牌提供品效合一的全域营销服务。</div>
            <el-button round size="large">了解光生</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 娱乐直播 -->
    <div class="ent-live">
      <div class="title">娱乐直播</div>
      <swiper :slidesPerView="3" :spaceBetween="30" :modules="modules" :navigation="true" :pagination="{
        clickable: true,
      }" class="mySwiper">
        <swiper-slide v-for="(item, index) in list" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <!-- 电商手机端轮播 -->
      <swiper class="myCarousel">
        <swiper-slide v-for="(item, index) in list" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <div class="btn-bottom">
        <el-button plain size="large" round>
          查看全部<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
        <el-icon size="28" color="#111111" class="touch">
          <VideoPause />
        </el-icon>
      </div>
    </div>
    <!-- 电商直播 -->
    <div class="ent-live">
      <div class="title">电商直播</div>
      <swiper :slidesPerView="3" :spaceBetween="30" :modules="modules" :navigation="true" :pagination="{
        clickable: true,
      }" class="mySwiper">
        <swiper-slide v-for="(item, index) in list1" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <!-- 电商手机端轮播 -->
      <swiper class="myCarousel">
        <swiper-slide v-for="(item, index) in list1" :key="index">
          <Card :item="item"></Card>
        </swiper-slide>
      </swiper>
      <!-- 查看全部 -->
      <div class="btn-bottom">
        <el-button plain size="large" round>
          查看全部<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
        <el-icon size="28" color="#111111" class="touch">
          <VideoPause />
        </el-icon>
      </div>
    </div>

    <!-- 底部swiper -->
    <div class="bottom-swiper" v-if="0">
      <swiper :slidesPerView="3" :spaceBetween="30" :freeMode="true" class="mySwiper">
        <swiper-slide v-for="(item, index) in list1" :key="index">
          <div class="bottom-swiper-item">

          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 问题 -->
    <div class="question">
      <div class="title">有问，就有答。</div>
      <el-collapse>
        <el-collapse-item title="光生能为达人提供哪些资源？" name="1">
          <div>
            光生传媒上接内容下对资源，核心业务包含直播电商及流媒体；电商维度主要以自运营为主，同时也开展代运营、电商执行顾问、品宣商务承接、KOL
            达人孵化及嫁接。流媒体业务在公司拥有成熟的主播运营团队和高效的直播培训机制，以专业化的管理流程，打造模式精细化和个性化的平台发展策略。
          </div>
        </el-collapse-item>
        <el-collapse-item title="加入光生需要具备哪些条件？" name="2">
          <div>
            光生传媒上接内容下对资源，核心业务包含直播电商及流媒体；电商维度主要以自运营为主，同时也开展代运营、电商执行顾问、品宣商务承接、KOL
            达人孵化及嫁接。流媒体业务在公司拥有成熟的主播运营团队和高效的直播培训机制，以专业化的管理流程，打造模式精细化和个性化的平台发展策略。
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何进行商务合作？" name="3">
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
        </el-collapse-item>
        <el-collapse-item title="商务合作的合作方式是什么？" name="4">
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
        <el-collapse-item title="光生能为达人提供哪些资源？" name="5">
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";

const modules = [
  Navigation,
];

// console.log($utils);

// const modules1 = [
//   Navigation,
//   Pagination,
//   Mousewheel
// ];

// const swiperOptions = {
//   pagination: {
//     nextEl: ".button-next",
//     prevEl: ".button-prev",
//   },
// }

const list = [
  {
    url: image1,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image2,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image3,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image1,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
]

const list1 = [
  {
    url: image4,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image5,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image6,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
  {
    url: image4,
    name: '@侯阳靖雯',
    play_num: 2.3,
    like: 10.9,
    info: '笑出腹肌又嗨到爆，看我怎么在泰国,笑出腹肌又嗨到爆，看我怎么在泰国',
    id: 1744176865
  },
]

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 0;
}

.banner-box {
  z-index: 1;
  position: relative;
  width: 100%;
  height: 920px;

  img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }

  .title {
    position: absolute;
    left: 20%;
    bottom: 20%;
    width: 50%;
    line-height: 1.6;
    text-align: left;
    font-size: .2813rem;
    font-weight: bold;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.9);
  }

  .icon-play {
    position: absolute;
    right: 5%;
    bottom: 10%;
  }

  .info-item {
    position: absolute;
    left: 20%;
    bottom: 10%;
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
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg1.png) no-repeat;
  background-size: 100% 100%;

  &-box {
    width: 62.5%;
    height: 100%;
    padding: 130px 0;
    margin: 0 auto;

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
  width: 70%;
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
    padding: 0 30px;

    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      text-align: center;
      background-color: #fff;
      /* Center slide text vertically */
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

  :deep(.myCarousel) {
    display: none;
    width: 100%;
    height: 100%;
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
  width: 100%;
  height: 1200px;
  padding: 20px;
  background-color: #111111;

  &-item {}

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

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .banner-box {
    height: 750px;

    .title {
      bottom: 25%;
      left: 10%;
      width: 80%;
    }

    .info-item {
      left: 10%;
      flex-wrap: wrap;

      .icon {
        width: 100%;
        flex-grow: 1;
        margin-bottom: 10px;
      }
    }
  }

  .intro {
    &-box {
      width: 80%;
      padding: 100px 0 40px;
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

    .mySwiper {
      display: none;
    }

    .myCarousel {
      display: block;
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