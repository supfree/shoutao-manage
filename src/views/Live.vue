<template>
    <div class="live">
        <!-- banner -->
        <div class="banner">
            <img class="bg" :src="imageUrl + detail.image" alt="">
            <div class="banner-op">
                <img class="animate__animated animate__tada" src="../assets/images/font1.svg" alt="">
                <p class="btn-play">{{ $t('other.Watch-video') }}<el-icon>
                        <VideoPlay />
                    </el-icon></p>
                <p class="btn-link">{{ $t('other.Information') }}<el-icon>
                        <ArrowRight />
                    </el-icon></p>
            </div>
        </div>
        <!-- gird-img -->
        <div class="gird-img">
            <div class="img-item">
                <img class="bg" :src="imageUrl + detail1.image" alt="">
                <div class="banner-op">
                    <img class="wow animate__animated animate__flash" src="../assets/images/font2.svg" alt="">
                    <div>
                        <p class="btn-play mr15">{{ $t('other.Watch-video') }}<el-icon>
                                <VideoPlay />
                            </el-icon></p>
                        <p class="btn-link">{{ $t('other.Information') }}<el-icon>
                                <ArrowRight />
                            </el-icon></p>
                    </div>
                </div>
            </div>
            <div class="img-item">
                <img class="bg" :src="imageUrl + detail2.image" alt="">
                <div class="banner-op">
                    <img class="wow animate__animated animate__flash" src="../assets/images/font3.svg" style="zoom: 1;"
                        alt="">
                    <div>
                        <p class="btn-play mr15">{{ $t('other.Watch-video') }}<el-icon>
                                <VideoPlay />
                            </el-icon></p>
                        <p class="btn-link">{{ $t('other.Information') }}<el-icon>
                                <ArrowRight />
                            </el-icon></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 最新直播 -->
        <div class="live-box">
            <div class="box">
                <div class="header">
                    <h3>{{ $t('other.Recently-live') }}</h3>
                    <div class="tab">
                        <div :class="[index == lid ? 'active' : '']" v-for="(item, index) in tabs" :key="index"
                            @click="changeLive(index)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div v-if="list.length">
                    <div class="live-list">
                        <Card :item="item" v-for="item in list" :key="item"></Card>
                    </div>
                    <div class="load-box" @click="getMoreList">{{ $t('other.Load-more') }}</div>
                </div>
                <el-empty :image-size="200" v-else />
            </div>
        </div>

        <swiper :direction="'vertical'" :pagination="{
            clickable: true,
        }" :modules="modules">
            <swiper-slide v-for="item in list" :key="item">
                <Card :item="item"></Card>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { get, imageUrl } from '../assets/js/request.js';
import { ref, getCurrentInstance, onMounted } from 'vue';
import Card from "@/components/Card.vue";
const { proxy } = getCurrentInstance();
const tabs = [
    {
        name: proxy.$t('other.All'),
        active: true
    },
    {
        name: proxy.$t('other.Entertainment-talent')
    },
    {
        name: proxy.$t('other.E-commerce-talent')
    }
]

onMounted(() => {
    getBroadcast('refresh');
})

// 导航index
const lid = ref(0);
const changeLive = (index) => {
    lid.value = index;
    page.value = 1;
    getBroadcast('refresh');
}

// 获取直播列表
const page = ref(1);
const list = ref([]);
let detail = ref({});
let detail1 = ref({});
let detail2 = ref({});
const getBroadcast = (status) => {
    get('index/broadcast', {
        store_id: localStorage.getItem('key') || 1,
        type: lid.value,
        page: page.value
    }).then(res => {
        console.log(res);
        if (status == 'refresh') {
            list.value = res.data[1];
        } else {
            list.value = list.value.concat(res.data[1]);
        }
        detail = res.data[0].children[0];
        detail1 = res.data[0].children[1];
        detail2 = res.data[0].children[2];
    })
}

const getMoreList = () => {
    page.value = page.value + 1;
    getBroadcast();
}
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

            &>img {
                width: 2.2rem;
                height: 0.78rem;
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
            height: 2.8rem;


            .banner-op {
                z-index: 2;
                position: absolute;
                left: 50%;
                bottom: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 0 5%;
                transform: translate(-50%, -30%);

                &>img {
                    width: 1.77rem;
                    height: 0.36rem;
                }

                &>div {
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

    .btn-play {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 146px;
        height: 48px;
        margin: 20px auto;
        font-size: 17px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 600;
        line-height: 48px;
        border-radius: 24px;
        color: rgba(17, 17, 17, 0.93);
        background-color: #FFFFFF;
        cursor: pointer;

        .el-icon {
            margin-left: 5px;
        }
    }

    .btn-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 146px;
        height: 48px;
        margin: 0 auto;
        font-size: 17px;
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
        font-weight: 500;
        line-height: 48px;
        border-radius: 24px;
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
        cursor: pointer;

        .el-icon {
            margin-left: 5px;
        }
    }

    .live-box {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;

        .box {
            width: 62.5%;
            margin: .8rem auto;

            .header {
                display: flex;
                align-items: center;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                background-color: #FFFFFF;

                h3 {
                    font-size: 36px;
                    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
                    font-weight: bold;
                    color: rgba(17, 17, 17, 0.93);
                }

                .tab {
                    display: flex;
                    align-items: center;

                    div {
                        flex-shrink: 0;
                        padding: 10px 30px;
                        margin-right: 20px;
                        font-size: 14px;
                        border-radius: 20px;
                        background-color: rgba(17, 17, 17, 0.05);
                        cursor: pointer;
                    }
                }

                .active {
                    color: #FFFFFF !important;
                    background-color: #111111 !important;
                }
            }

            .live-list {
                display: grid;
                grid-template-columns: repeat(3, 33%);
                grid-gap: 30px;
                width: 100%;
                margin-top: 60px;
            }
        }
    }
}

@media only screen and (max-width: 750px) {
    .live-box {
        .live-list {
            display: block !important;
        }
    }

    .ent-item {
        height: 100vh !important;
    }
}


/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
    .gird-img {
        flex-direction: column !important;

        .img-item {
            width: 100% !important;
            margin-top: 15px;

            .banner-op {
                flex-direction: column !important;

                .btn-link {
                    border: none;
                }

                .btn-play {
                    color: #FFFFFF;
                    background: none;
                }
            }
        }
    }

    .live-box {
        .box {
            width: 100% !important;

            .header {
                padding: 0 20px;
                flex-direction: column !important;

                .tab {
                    width: 100%;
                    margin-top: 20px;
                    overflow-x: scroll;
                }
            }

            .load-box {
                width: 90% !important;
                margin: 36px auto;
            }
        }
    }
}

@media only screen and (max-width: 1120px) {
    .live-list {
        grid-template-columns: repeat(2, 45%) !important;
        grid-gap: 50px !important;
    }

    .ent-item {
        height: 600px;
    }
}
</style>