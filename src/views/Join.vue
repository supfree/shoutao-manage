<template>
    <div class="container">
        <!-- 加入1 -->
        <div class="join-one">
            <div class="btn-join">达人应聘</div>
            <div class="color-font">
                加入光生，
                <br />在工作中互相成就。
            </div>
            <p>这里有丰富的资源和注重包容、成长和独创性的协作文化，，助你缔造精彩人生。</p>
        </div>
        <!-- banner内容1 -->
        <div class="banner-box">
            <img src="../assets/images/swiper/swiper.png" alt="">
            <div class="title">在这里，你可以尽情地展现自我，不断实现成</div>
            <div class="info-item">
                <div class="icon">
                    <el-icon class="icon-play touch" size="30" color="#FFFFFF">
                        <VideoPlay />
                    </el-icon>
                    <div class="name">观看影片</div>
                </div>
            </div>
        </div>
        <!-- 加入2 -->
        <div class="join-one">
            <div class="btn-join">达人应聘</div>
            <div class="color-font1">
                加入我们，<br />共同创造我们的社区。
            </div>
            <p>探索我们的工作领域、全球工作地点，<br />以及为学生提供的工作机会。</p>
        </div>
        <!-- banner内容2 -->
        <div class="banner-box">
            <img src="../assets/images/swiper/swiper.png" alt="">
            <div class="title">在这里，你可以尽情地展现自我，不断实现成长和发展。</div>
            <div class="info-item">
                <div class="icon">
                    <el-icon class="icon-play touch" size="30" color="#FFFFFF">
                        <VideoPlay />
                    </el-icon>
                    <div class="name">观看影片</div>
                </div>
            </div>
        </div>

        <!-- 底部swiper -->
        <div class="bottom-swiper" v-if="false">
            <div>员工生活</div>
            <swiper :slidesPerView="3" :spaceBetween="30" :freeMode="true" class="mySwiper">
                <swiper-slide v-for="(item, index) in list1" :key="index">
                    <div class="bottom-swiper-item">

                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <!-- 投递简历 -->
        <div class="deliver">
            <img class="logo" src="../assets/logo.png" alt="">
            <h2>加入我们，展现自我</h2>
            <p>你不需要很厉害才能开始，但你需要开始才能变得很厉害。寻找非同凡响的你，我们欢迎真实的你，以及你想成为的自己。</p>
            <div class="input-box">
                <el-input size="large" placeholder="姓名" />
                <el-input size="large" placeholder="邮箱" />
                <el-input v-model="textarea" :rows="5" type="textarea" placeholder="详情" />
            </div>
            <el-button class="btn-push" size="large" round>投递简历</el-button>
            <el-divider>或</el-divider>
            <img class="qrcode" src="../assets/images/qrcode1.png" alt="">
            <p class="mt30">微信扫描二维码查看其他职位</p>
        </div>
    </div>
</template>
  
<script setup>
// import Swiper core and required modules
import { Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const modules = [
    Navigation,
];

console.log(modules);

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

</script>
  
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    font-size: 0;
}

.join-one {
    width: 80%;
    padding: 0.88rem 0 .3125rem;
    margin: 0 auto;
    text-align: center;

    .btn-join {
        display: inline-block;
        width: 84px;
        height: 32px;
        margin: 0 auto;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        border: 2px solid #000;
        color: #000;
        font-size: .0833rem;
        cursor: pointer;
    }

    .color-font {
        margin-top: 20px;
        font-size: .25rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.9);
        line-height: 1.3;
        background: linear-gradient(135deg, #2D28FF 0%, #14CDAB 51%, #00FF74 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .color-font1 {
        margin-top: 20px;
        font-size: .25rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.9);
        line-height: 1.3;
        background: linear-gradient(135deg, #FFA200 0%, #E400F7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    p {
        margin-top: 10px;
        font-size: .125rem;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        line-height: 1.3;
        color: rgba(17, 17, 17, 0.9);
    }
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

            .icon-play {
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
    }
}

.bottom-swiper {
    width: 100%;
    height: 1200px;
    padding: 20px;
    background-color: #111111;

    &-item {}

}

.deliver {
    width: 51%;
    margin: .6771rem auto;
    text-align: center;

    .logo {
        width: .89rem;
        height: .89rem;
    }

    h2 {
        margin: 20px 0 10px;
        font-size: 0.3rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.93);
    }

    p {
        margin-bottom: 30px;
        font-size: .125rem;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        color: rgba(17, 17, 17, 0.93);
    }

    .input-box {
        width: 70%;
        margin: 0 auto;

        .el-input {
            margin-bottom: 14px;
        }
    }



    .btn-push {
        margin-top: 30px;
        background-color: #E8E8EE;
    }

    .el-divider {
        margin: 0.35rem 0;
    }

    .qrcode {
        width: .8rem;
        height: .8rem;
    }

    .mt30 {
        font-size: 14px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.55);
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

    .deliver {
        width: 80%;

        .input-box {
            width: 100%;
        }
    }
}
</style>