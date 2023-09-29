<template>
    <div class="detail">
        <div class="contain">
            <div class="header">
                <p class="date">{{ detail.date }}</p>
                <h2>{{ detail.name }}</h2>
                <p class="intro">{{ detail.title_deputy }}</p>
                <div class="icon-box">
                    <img :src="item.icon" alt="" v-for="(item, index) in iconList" :key="item" @click="operation(index)">
                </div>
            </div>

            <!-- 轮播 -->
            <!-- :navigation="!Boolean(_isMobile)" -->
            <div class="swiper-box">
                <swiper class="mySwiper" :modules="modules" :space-between="36" :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }" :pagination="{ clickable: true }">
                    <swiper-slide v-for="item in banner" :key="item">
                        <img :src="imageUrl + item" alt="">
                    </swiper-slide>
                </swiper>
                <div class="swiper-button-next" style="
                right: -40px;
                top: var(--swiper-navigation-top-offset, 50%);
                color: rgba(17, 17, 17, 0.77) !important;
                "></div>
                <div class="swiper-button-prev" style="
                left: -40px;
                top: var(--swiper-navigation-top-offset, 50%);
                color: rgba(17, 17, 17, 0.77) !important;
                "></div>
            </div>

            <!-- 详情 -->
            <div class="content" v-html="detail.editor"></div>

            <div class="bottom">
                <h2>{{ $t('other.Share') }}</h2>
                <div class="icon-box">
                    <img :src="item.icon" alt="" v-for="(item, index) in iconList" :key="item" @click="operation(index)">
                </div>
                <el-divider />
            </div>

            <div class="recommend">
                <h2>{{ $t('other.Spot-news') }}</h2>
                <div class="recommend-item" v-for="item in recommendList" :key="item" @click="goInfo(item.id)">
                    <img :src="imageUrl + item.image1" alt="">
                    <div>
                        <h3 class="u-line-2">{{ item.name }}</h3>
                        <p>{{ item.date }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { get, imageUrl } from '../assets/js/request.js';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let value = ref(route.query.id);

import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard()
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const modules = [
    Navigation,
    Pagination,
    Scrollbar
];

onMounted(() => {
    getInfo();
    getNewList();
})

// 判断设备
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile();
console.log(_isMobile);


const detail = ref({});
const banner = ref([]);
const getInfo = () => {
    get('index/artistDetails', {
        store_id: localStorage.getItem('key') || 1,
        id: value.value
    }).then(res => {
        console.log(res);
        detail.value = res.data;
        banner.value = res.data.image.split(',') || [];
        console.log(banner);
    })
}


const operation = (index) => {
    console.log(index);
    if (index == 0) {
        console.log(1);
    } else if (index == 1) {
        console.log(index);
    } else if (index == 2) {
        window.open(
            "https://service.weibo.com/share/share.php?url=" +
            encodeURIComponent(window.location.href) +
            "&title=" +
            // this.sysInfo
            detail.value.name
        );
    } else {
        copy(window.location.href);
    }
}

const recommendList = ref([]);
const getNewList = () => {
    get('index/news', {
        store_id: localStorage.getItem('key') || 1,
        page: 1
    }).then(res => {
        recommendList.value = res.data;
        recommendList.value.map(item => {
            item.image1 = item.image.split(',')[0] || [];
        })
        console.log(recommendList);
    })
}

const copy = async (Msg) => {
    try {
        //复制
        await toClipboard(Msg)
        console.log(Msg)
        ElMessage({
            message: 'copy successfully',
            type: 'success',
        });
    } catch (e) {
        //复制失败
        console.error(e)
    }
}

const goInfo = (e) => {
    // console.log(e);
    let page = router.resolve({ path: '/detail', query: { id: e } });
    console.log(page);
    window.open(window.location.host + page.href, '_blank');
    window.location.reload()
}


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
            cursor: pointer;
        }
    }

    .swiper-button-next {
        display: block !important;
    }

    .swiper-button-prev {
        display: block !important;
    }

    .swiper-box {
        position: relative;
        width: 100%;
    }

    .mySwiper {
        width: 100%;
        height: 100%;
        // margin: 0 20px;
        border-radius: 14px;


        .swiper-slide {
            width: 100%;
            display: flex;
            justify-content: center;

            img {
                width: 100%;
                height: 100%;
                border-radius: 14px;
                object-fit: cover;
            }
        }
    }

    :deep(.content) {
        padding: .3125rem 0;
        font-size: .09rem !important;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        color: rgba(17, 17, 17, 0.77);
        line-height: 1.5;

        p {
            width: 100%;
        }

        img {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 2.86rem;
            border-radius: 14px;
            overflow: hidden;
        }
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
            cursor: pointer;

            &>img {
                width: 1.3rem;
                height: .8rem;
                margin-right: .1563rem;
                border-radius: 14px;
            }

            &>div {
                width: 60%;

                h3 {
                    font-size: 20px;
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

        .swiper-box {

            .swiper-button-next,
            .swiper-button-prev {
                display: none !important;
            }
        }

        :deep(.content) {
            padding: 30px;

            img {
                width: 100%;
                height: 210px;
                margin: 0;
                border-radius: 0;
            }
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