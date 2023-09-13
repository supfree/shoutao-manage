<template>
  <div class="about-box">
    <!-- header -->
    <div class="header">
      <img class="logo" src="../assets/images/logo_cn.png" alt="">
      <div class="tips">
        光生传媒作为业内领先的MCN机构，致力于不断建立标准化线下网红孵化管理基地，为直播与短视频全产业链开发等提供整合营销方案。目前拥有红人孵化、游戏发行、账号代运营、海外直播运营等主营业务。我们旨在成为基于艺⼈养成的在线娱乐内容提供商。
      </div>
    </div>
    <!-- 触达平台 -->
    <div class="platform">
      <div class="icon-box">
        <div class="title">
          <h3>触达平台</h3>
          <p>光生传媒的直播和短视频业务触及广泛，包含抖音、快手、斗鱼、YouTube、Facebook等10个平台，致力于在众多平台发布符合平台调性的优质内容。</p>
        </div>
        <div class="logo-list">
          <div class="box" v-for="item in logoList" :key="item">
            <img :src="item.url" alt="">
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作品牌 -->
    <div class="co-brand">
      <div class="icon-box">
        <div class="title">
          <h3>合作品牌</h3>
          <p>优质合作伙伴<br />优质品牌与优质内容强强联合，发挥最大价值。</p>
        </div>
        <div class="logo-list1">
          <div class="box" v-for="item in ocList" :key="item">
            <img class="oc-img" :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 团队介绍 -->
    <div class="team-info">
      <swiper class="mySwiper" :autoHeight="true" :pagination="true" :modules="modules" @slideChange="change">
        <swiper-slide v-for="item in teamList" :key="item">
          <div class="background" :style="{ backgroundImage: `url(${teamList[team_index].url})` }"></div>
          <div class="team-item">
            <h3>团队介绍</h3>
            <div class="img">
              <img :src="item.url" alt="">
            </div>
            <p class="name">{{ item.name }}</p>
            <p class="position">{{ item.position }}</p>
            <p class="intro">{{ item.intro }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 服务内容 -->
    <div class="service">
      <div class="icon-box">
        <div class="title">
          <h3>服务内容</h3>
          <p>多项互通业务广泛涉及，各项专业操作推动发展。</p>
        </div>
        <swiper class="myService" :navigation="true" :modules="modules">
          <swiper-slide v-for="item in list1" :key="item">
            <div class="service-item">
              <img :src="item.url" alt="">
              <div>
                <h2>电商直播</h2>
                <p>拥有三大能力带动商品转化和品牌营销。保证人、货、场单方的严谨优质和三方的完美配合。运用真实专业的描述介绍产品，利用真诚生动的语言达成沟通。</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 公司地址 -->
    <div class="company">
      <div class="icon-box">
        <div class="title">
          <h3>公司地址</h3>
          <p>光生传媒(北京)有限公司青岛分公司成立于 2020 年 11 月 25 日，注册地位于山东省青岛市李沧区巨峰路 176 号 5 号楼 609 - 617 房间。</p>
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
          <swiper :slidesPerView="[_isMobile ? 3 : 6]" :spaceBetween="30" @click="selectArea">
            <swiper-slide v-for="(item, index) in cityList" :key="item">
              <div :class="['area-item', index == cid ? 'area-active' : '']">{{ item }}</div>
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
            <p class="tip">电子邮件</p>
            <p class="info">vividtide@vividtide.com</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <el-icon size="30" color="#111111">
              <Phone />
            </el-icon>
            <p class="tip">电话</p>
            <p class="info">18562809966</p>
          </div>
          <el-divider direction="vertical" />
          <div class="box">
            <el-icon size="30" color="#111111">
              <LocationInformation />
            </el-icon>
            <p class="tip">地址</p>
            <p class="info">青岛市李沧区巨峰路176-5号金水·信联天地5号楼</p>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="contact">
      <div class="icon-box">
        <div class="title">
          <h3>商务合作 & 签约咨询</h3>
        </div>
        <div class="qrcode">
          <div class="box">
            <p>商务合作</p>
            <img src="../assets/images/qrcode1.png" alt="">
            <p>微信扫描二维码</p>
          </div>
          <el-divider :direction="[_isMobile ? 'horizontal' : 'vertical']" />
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
import { ref, getCurrentInstance } from 'vue'
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

// 判断设备
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

// 触达平台
const logoList = [
  {
    name: "抖音",
    url: require('../assets/images/icons/douyin.png')
  },
  {
    name: "斗鱼",
    url: require('../assets/images/icons/douyu.png')
  },
  {
    name: "虎牙",
    url: require('../assets/images/icons/huya.png')
  },
  {
    name: "淘宝",
    url: require('../assets/images/icons/taobao.png')
  },
  {
    name: "快手",
    url: require('../assets/images/icons/kuaishou.png')
  },
  {
    name: "Facebook",
    url: require('../assets/images/icons/facebook.png')
  },
  {
    name: "Facebook",
    url: require('../assets/images/icons/facebook.png')
  },
  {
    name: "Facebook",
    url: require('../assets/images/icons/facebook.png')
  },
];

// 合作品牌
const ocList = [
  require('../assets/images/brand1.png'),
  require('../assets/images/brand2.png'),
  require('../assets/images/brand3.png'),
  require('../assets/images/brand4.png'),
  require('../assets/images/brand5.png'),
  require('../assets/images/brand6.png'),
  require('../assets/images/brand6.png'),
];

// 团队介绍
const team_index = ref(0);

const teamList = [
  {
    url: require('../assets/images/avatar1.png'),
    name: "梁娅婷",
    position: "艺人经纪部主管",
    intro: "新媒体从业时间 4 年，曾就职于抖音平台前十 MCN 机构。月个人招募量达到 50 人以上，旗下主播月流水达到 50 万以上。视频包放量 200 万以上，与小米、海信等品牌长期合作。"
  },
  {
    url: require('../assets/images/avatar2.png'),
    name: "梁娅婷",
    position: "艺人经纪部主管",
    intro: "新媒体从业时间 4 年，曾就职于抖音平台前十 MCN 机构。月个人招募量达到 50 人以上，旗下主播月流水达到 50 万以上。视频包放量 200 万以上，与小米、海信等品牌长期合作。"
  },
  {
    url: require('../assets/images/avatar3.png'),
    name: "梁娅婷",
    position: "艺人经纪部主管",
    intro: "新媒体从业时间 4 年，曾就职于抖音平台前十 MCN 机构。月个人招募量达到 50 人以上，旗下主播月流水达到 50 万以上。视频包放量 200 万以上，与小米、海信等品牌长期合作。"
  },
];

const change = (index) => {
  console.log(index.activeIndex);
  team_index.value = index.activeIndex;
}

// 服务内容
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
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

const cid = ref(0);

const cityList = [
  '北京',
  '青岛',
  '杭州',
  '西安',
  '成都',
  '自贡',
  '广州',
]

const selectArea = (index) => {
  console.log(index);
  cid.value = index.clickedIndex;
}
</script>

<style lang="scss" scoped>
.about-box {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
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
    height: 100%;
    background-color: #FBFBFD;
  }

  .icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: .67rem 0 .5rem;
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
        width: 0.5rem;
        height: 0.31rem;
      }
    }
  }

  .co-brand {
    width: 100%;
  }

  .team-info {
    width: 100%;
    height: 100%;

    .mySwiper {
      width: 100%;
      height: 100%;

      .swiper-slide {
        position: relative;
        height: 920px;
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
      height: 920px;
      padding: 0.625rem 0;
      text-align: center;
      box-sizing: content-box !important;

      h3 {
        font-size: .3rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.93);
      }

      .img {
        margin-top: .3125rem;

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
      width: 70%;
      height: 100%;
      margin: 0 30px;

      .swiper-slide {
        width: 100%;
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
      padding: 20px 0;
      margin: 0 auto;
      border-bottom: 1px solid rgba(17, 17, 17, 0.15);

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
      padding: 60px 60px 0;

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
      padding: 30px 20px;
      flex-direction: column;
    }

    // .platform {}8

    .icon-box {
      width: 100%;
      padding: 60px 30px;

      .title {
        width: 100%;
      }

      .logo-list {
        grid-template-columns: repeat(4, .6rem);
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
          width: 100%;
          border-radius: 14px;
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
