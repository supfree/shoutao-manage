<template>
    <div class="artist">
        <div class="mask-box">
            <img class="bg-poster" src="../assets/images/banner-item1.png" alt="">
            <div class="mask"></div>
        </div>
        <div class="contian">
            <div class="header wow animate__animated animate__fadeInUpBig">
                <div class="info">
                    <h3>聂雨彤</h3>
                    <p class="tip">
                        <span class="span1">全网粉丝</span>
                        <span class="span2">{{ 11 }}万</span> | <span class="span1">获赞</span>
                        <span class="span2">{{ 200 }}万</span>
                    </p>
                    <p class="intro">
                        张尧1992年出生于中华人民共和国湖南省岳阳市。他曾就读于岳阳学院路小学和岳阳中学。小时候，李佳琦就对化妆感到喜爱。2011年，他考入了南昌大学艺术与设计专业，但因工作原因提前离校。2015年，成为了南昌的一名欧莱雅化妆品专柜美容顾问。他以用自己的嘴巴为顾客试色的方法，获取了越来越高的业绩和客户满意度，并多次获得了专柜销售冠军。
                    </p>
                </div>
            </div>
            <el-divider />
            <!-- 触达平台 -->
            <div class="flex-icon">
                <h3>触达平台</h3>
                <div class="logo-list">
                    <div class="box" v-for="(item, index) in logoList" :key="item">
                        <div class="fadea-transition" v-if="showIcon(index)">
                            <img :src="item.url" alt="">
                            <p class="name">{{ item.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <el-divider />
            <!-- 合作品牌 -->
            <div class="flex-icon">
                <h3>合作品牌</h3>
                <div class="logo-list">
                    <div class="box" v-for="(item, index) in ocList" :key="item">
                        <img class="fadea-transition" :src="item" alt="" v-if="showIcon1(index)">
                    </div>
                </div>
            </div>

            <!-- 娱乐直播 -->
            <div class="ent-live entertainment">
                <div class="title">娱乐直播</div>
                <swiper class="mySwiper" :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
                    :centeredSlides="Boolean(_isMobile)"
                    :autoplay="Boolean(_isMobile) ? '' : { delay: 3000, disableOnInteraction: false }" :loop="true"
                    :spaceBetween="36" :modules="modules" :navigation="{
                        nextEl: '.entertainment .swiper-button-next',
                        prevEl: '.entertainment .swiper-button-prev',
                    }" :pagination="{ clickable: true }">
                    <swiper-slide v-for="(item, index) in list" :key="index">
                        <Card :item="item"></Card>
                    </swiper-slide>
                </swiper>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>

            <!-- 电商直播 -->
            <div class="ent-live commerce">
                <div class="title">电商直播</div>
                <swiper class="mySwiper" :slidesPerView="Boolean(_isMobile) ? 'auto' : 3"
                    :centeredSlides="Boolean(_isMobile)"
                    :autoplay="Boolean(_isMobile) ? '' : { delay: 3000, disableOnInteraction: false }" :loop="true"
                    :spaceBetween="36" :modules="modules" :navigation="{
                        nextEl: '.commerce .swiper-button-next',
                        prevEl: '.commerce .swiper-button-prev',
                    }" :pagination="{ clickable: true }">
                    <swiper-slide v-for="(item, index) in list1" :key="index">
                        <Card :item="item"></Card>
                    </swiper-slide>
                </swiper>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
        <div class="contact">
            <div class="qrcode">
                <div class="box">
                    <img src="../assets/images/qrcode1.png" alt="">
                    <div>
                        <p>商务合作</p>
                        <p>微信扫描二维码</p>
                        <p>长按图片保存二维码到本地</p>
                    </div>
                </div>
                <div class="box">
                    <img src="../assets/images/qrcode1.png" alt="">
                    <div>
                        <p>签约咨询</p>
                        <p>微信扫描二维码</p>
                        <p>长按图片保存二维码到本地</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { WOW } from 'wowjs';
import { getCurrentInstance, onMounted, ref, onUnmounted } from "vue";
import Card from "@/components/Card.vue";
import { get, post, imageUrl } from '../assets/js/request.js';
import { useRoute } from "vue-router";
const route = useRoute();
let value = ref(route.query.id);
// import Swiper core and required modules
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const modules = [
    Navigation, Autoplay
];

// 判断设备
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();

onMounted(() => {
    new WOW().init();
    getArtist();
    getHomeInfo();
    window.addEventListener("scroll", handleScroll);
})


const getArtist = () => {
    get('index/artistDetails', {
        store_id: localStorage.getItem('key') || 1,
        id: value.value
    }).then(res => {
        console.log(res, value, imageUrl);
    })
}

const list = ref([]);
const list1 = ref([]);
const getHomeInfo = () => {
    post('index/index', {
        store_id: localStorage.getItem('key') || 1
    }).then(res => {
        // console.log(res);
        list.value = res.data[2];
        list1.value = res.data[3];
    })
}


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

// 触达平台
let visibleIcons = ref([]);
const showIcon = (index) => {
    return visibleIcons.value.indexOf(index) != -1;
}

const fadeShow = () => {
    let index = ref(0);
    // 使用定时器逐个显示图标
    let interval = setInterval(() => {
        if (index.value >= logoList.length) {
            clearInterval(interval);
            return;
        }
        visibleIcons.value.push(index.value);
        index.value++;
    }, 200); // 间隔200ms显示一个图标
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
        if (index.value >= ocList.length) {
            clearInterval(interval);
            return;
        }
        visibleIcons1.value.push(index.value);
        index.value++;
    }, 200); // 间隔200ms显示一个图标
}

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    if (scrollTop >= 100) {
        fadeShow();
    }
    if (scrollTop >= 400) {
        fadeShow1();
    }
}

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
})
</script>
<style lang="scss" scoped>
.artist {
    width: 100%;
    height: 100%;

    .mask-box {
        position: relative;
        width: 100%;
        height: 4rem;

        .mask {
            z-index: 1;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 350px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 20%, #FFFFFF 100%);
        }
    }

    .bg-poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.contian {
    z-index: 99;
    position: relative;
    width: 51%;
    margin: -50px auto 0;

    .el-divider {
        margin: 60px 0;
    }

    .header {

        .info {
            width: 70%;

            h3 {
                font-size: 36px;
                font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
                font-weight: bold;
                color: rgba(17, 17, 17, 0.9);
            }

            .tip {
                margin: 20px 0;

                .span1 {
                    font-size: 14px;
                    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;

                    color: rgba(17, 17, 17, 0.55);
                }

                .span2 {
                    margin-left: 10px;
                    font-size: 15px;
                    font-family: NotoSans-Regular, NotoSans;
                    color: rgba(17, 17, 17, 0.93);
                }
            }

            .intro {
                font-size: 16px;
                font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
                font-weight: 400;
                color: rgba(17, 17, 17, 0.77);
                line-height: 1.5;
            }
        }

    }

    .flex-icon {
        h3 {
            font-size: 24px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            color: rgba(17, 17, 17, 0.93);
        }

        .logo-list {
            display: flex;
            flex-wrap: wrap;

            .box {
                width: .375rem;
                text-align: center;
                margin: 25px 25px 25px 0;
            }

            img {
                width: .375rem;
                height: .375rem;
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
    }

    .ent-live {
        position: relative;
        width: 100%;
        // padding: 0 30px;
        margin: 30px auto;

        .title {
            margin-bottom: 30px;
            font-size: 24px;
            font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
            color: rgba(17, 17, 17, 0.93);
        }

        .mySwiper {
            position: relative;
            width: 100%;
            height: 100%;

            .swiper-slide {
                width: 1.9rem !important;
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
            top: var(--swiper-navigation-top-offset, 55%);
            left: var(--swiper-navigation-sides-offset, -40px);
            color: #111111 !important;
        }

        :deep(.swiper-button-next) {
            top: var(--swiper-navigation-top-offset, 55%);
            right: var(--swiper-navigation-sides-offset, -40px);
            color: #111111 !important;
        }
    }
}

.contact {

    .qrcode {
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 51%;
        margin: 100px auto 200px;

        .box {
            display: flex;
            align-items: center;
            text-align: left;
            padding: 30px;
            margin-right: 30px;
            border-radius: 8px;
            background-color: #FAFAFA;

            p {
                margin-top: 5px;
                font-size: 13px;
                font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
                font-weight: 400;
                color: rgba(17, 17, 17, 0.55);
            }

            p:first-child {
                font-size: 24px;
                font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
                font-weight: 500;
                color: rgba(17, 17, 17, 0.93);
            }


            img {
                width: 74px;
                height: 74px;
                margin-right: 20px;
            }
        }

        .el-divider {
            width: 1px;
            height: 120px;
            margin-top: 60px;
        }
    }
}

@media only screen and (max-width: 1300px) {
    .ent-live {
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
    .artist {

        .mask-box {
            height: 200px;
        }

        // .bg-poster {
        //     height: 180px;
        // }
    }



    .contian {
        width: 100% !important;
        padding: 0 30px;

        .header {
            .info {
                width: 100%;
            }
        }

        .logo-list {
            .box {
                width: 56px !important;
            }
        }

        .ent-live {

            .mySwiper {
                width: 100% !important;

                .swiper-slide {
                    width: 330px !important;
                    // height: 500px !important;
                }
            }
        }
    }

    .contact {
        padding: 0 30px !important;

        .qrcode {
            display: block;
            width: 100% !important;
            margin: 40px auto 70px;

            .box {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
}</style>