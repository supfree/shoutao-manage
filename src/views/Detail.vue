<template>
    <div class="detail">
        <div class="contain">
            <div class="header">
                <p class="date">5 月 11 日</p>
                <h2>光生传媒日本官网正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站</h2>
                <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                <div class="icon-box">
                    <img :src="item.icon" alt="" v-for="item in iconList" :key="item">
                </div>
            </div>

            <!-- 轮播 -->
            <swiper class="mySwiper" :navigation="!Boolean(_isMobile)" :pagination="true" :modules="modules">
                <swiper-slide v-for="item in swiperList" :key="item">
                    <img :src="item" alt="">
                </swiper-slide>
            </swiper>
            <!-- 手机轮播 -->

            <div class="content">
                即使直播的画面无法完整露出全身造型，即使直播间不像红毯，会出现谁艳压谁的比美之势，但明星们依然对战袍无比重视。无论是精致的直播出发图，还是明星光鲜亮丽的战袍，路人看到的是明星的美貌，粉丝看到的是团队的业务水平，是工作人员对艺人的用心程度。
                有什么必要呢，相信随便甩张以上明星被路人抓拍的真·生图出来，没有一个经不住拷打。纠结直播图生不生，没啥意思。倒是从这些精致的九宫格，甚至十八宫格里突然意识到，什么时候明星的直播状态也成了吃瓜群众津津乐道的谈资了，重点是一定要凑在一起比出个高下，各家粉丝也很打鸡血进行控评，唯恐自家哥哥姐姐输了阵仗。
                明星上直播，除了带货，某种程度也是向粉丝传递本人的接地气。印象里，最早一批上直播的明星还会刻意穿得相对亲民，T恤、衬衫、毛衣、卫衣......怎么生活化怎么来，但到了现在，俨然都是抄着走时装周的架势准备战袍。
            </div>
            <img class="content-img" src="../assets/images/swiper/swiper2.png" alt="">
            <div class="content">
                即使直播的画面无法完整露出全身造型，即使直播间不像红毯，会出现谁艳压谁的比美之势，但明星们依然对战袍无比重视。无论是精致的直播出发图，还是明星光鲜亮丽的战袍，路人看到的是明星的美貌，粉丝看到的是团队的业务水平，是工作人员对艺人的用心程度。
                有什么必要呢，相信随便甩张以上明星被路人抓拍的真·生图出来，没有一个经不住拷打。纠结直播图生不生，没啥意思。倒是从这些精致的九宫格，甚至十八宫格里突然意识到，什么时候明星的直播状态也成了吃瓜群众津津乐道的谈资了，重点是一定要凑在一起比出个高下，各家粉丝也很打鸡血进行控评，唯恐自家哥哥姐姐输了阵仗。
                明星上直播，除了带货，某种程度也是向粉丝传递本人的接地气。印象里，最早一批上直播的明星还会刻意穿得相对亲民，T恤、衬衫、毛衣、卫衣......怎么生活化怎么来，但到了现在，俨然都是抄着走时装周的架势准备战袍。
            </div>

            <div class="bottom">
                <h2>分享文章</h2>
                <div class="icon-box">
                    <img :src="item.icon" alt="" v-for="item in iconList" :key="item">
                </div>
                <el-divider />
            </div>

            <div class="recommend">
                <h2>最新消息</h2>
                <div class="recommend-item" v-for="item in recommendList" :key="item">
                    <img :src="item.url" alt="">
                    <div>
                        <h3 class="u-line-2">{{ item.title }}</h3>
                        <p>{{ item.date }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
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
];

// 判断设备
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();
console.log(_isMobile);


const iconList = [
    {
        icon: require('@/assets/images/icons/email.png'),
        title: 'email'
    },
    {
        icon: require('@/assets/images/icons/wechat.png'),
        title: 'wechat'
    },
    {
        icon: require('@/assets/images/icons/weibo.png'),
        title: 'weibo'
    },
    {
        icon: require('@/assets/images/icons/link.png'),
        title: 'link'
    }
]

const swiperList = [
    require('@/assets/images/swiper/swiper1.png'),
    require('@/assets/images/swiper/swiper2.png'),
]

const recommendList = [
    {
        url: require('@/assets/images/swiper/swiper1.png'),
        title: '光生传媒日本官网正式上线光生传媒日本官网正式上线光生传媒日本官网正式上',
        date: '5 月 11 日'
    },
    {
        url: require('@/assets/images/swiper/swiper2.png'),
        title: '光生传媒日本官网正式上线光生传媒日本官网正式上线光生传媒日本官网正式上',
        date: '5 月 11 日'
    },
    {
        url: require('@/assets/images/swiper/swiper1.png'),
        title: '光生传媒日本官网正式上线光生传媒日本官网正式上线光生传媒日本官网正式上',
        date: '5 月 11 日'
    },
    {
        url: require('@/assets/images/swiper/swiper2.png'),
        title: '光生传媒日本官网正式上线光生传媒日本官网正式上线光生传媒日本官网正式上',
        date: '5 月 11 日'
    }
]
</script>

<style scoped lang="scss">
.detail {
    width: 100%;
    height: 100%;
}

.contain {
    width: 52%;
    margin: 0 auto;

    .header {
        padding: 100px .625rem 50px;

        .date {
            font-size: 14px;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.55);
        }

        h2 {
            margin: 20px 0;
            font-size: .25rem;
            font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
            font-weight: bold;
            color: rgba(17, 17, 17, 0.93);
            line-height: 1.4;
        }

        .intro {
            font-size: .125rem;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            color: rgba(17, 17, 17, 0.77);
            line-height: 1.4;
        }
    }

    .icon-box {
        display: flex;
        margin-top: 0.2rem;

        img {
            width: 28px;
            height: 28px;
            margin-right: 14px;
        }
    }

    .mySwiper {
        width: 100%;
        height: 100%;
        // margin: 0 20px;

        .swiper-slide {
            width: 100%;
            display: flex;
            justify-content: center;

            img {
                border-radius: 14px;
            }
        }

        :deep(.swiper-button-prev) {
            left: var(--swiper-navigation-sides-offset, 0);
            color: #111111;
        }

        :deep(.swiper-button-next) {
            right: var(--swiper-navigation-sides-offset, 0);
            color: #111111;
        }
    }

    .content {
        padding: .3125rem .625rem;
        font-size: .09rem;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.77);
        line-height: 1.5;
    }

    .content-img {
        width: calc(100% - 40px);
        height: 2.86rem;
        margin-left: 40px;
        border-radius: 14px;
        overflow: hidden;
    }

    .bottom,
    .recommend {
        padding: 0 .625rem 30px;
    }

    .recommend {
        h2 {
            color: rgba(17, 17, 17, 0.93);
        }

        &-item {
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: 30px 0;
            border-bottom: 1px solid rgba(17, 17, 17, 0.15);

            &>img {
                width: 1.3rem;
                height: .73rem;
                margin-right: .1563rem;
                border-radius: 14px;
            }

            &>div {
                width: 60%;

                h3 {
                    font-size: 22px;
                    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
                    font-weight: bold;
                    color: rgba(17, 17, 17, 0.93);
                }

                p {
                    margin-top: 20px;
                    font-size: 14px;
                    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
                    font-weight: 400;
                    color: rgba(17, 17, 17, 0.55);
                }
            }
        }
    }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
    .contain {
        width: 100%;

        .header {
            padding: 28px;
        }

        .mySwiper {
            .swiper-slide {
                display: block;
                padding: 20px 0;

                img {
                border-radius: 0;
            }
            }
        }

        .content {
            padding: 30px;
        }

        .content-img {
            width: 100%;
            height: 210px;
            margin: 0;
            border-radius: 0;
        }

        .bottom {
            padding: 30px;
        }

        .recommend {
            padding: 0 30px;

            &-item {
                padding: 20px 0;
                &>img {
                    width: 120px;
                    height: 70px;
                    border-radius: 4px;
                }

                &>div {
                    h3 {
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>