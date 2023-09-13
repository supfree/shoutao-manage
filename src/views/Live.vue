<template>
    <div class="live">
        <!-- banner -->
        <div class="banner">
            <img class="bg" src="../assets/images/banner-item1.png" alt="">
            <div class="banner-op">
                <img src="../assets/images/font1.svg" alt="">
                <p class="btn-play">观看视频<el-icon>
                        <VideoPlay />
                    </el-icon></p>
                <p class="btn-link">了解达人<el-icon>
                        <ArrowRight />
                    </el-icon></p>
            </div>
        </div>
        <!-- gird-img -->
        <div class="gird-img">
            <div class="img-item">
                <img class="bg" src="../assets/images/banner-item1.png" alt="">
                <div class="banner-op">
                    <img src="../assets/images/font2.svg" alt="">
                    <div>
                        <p class="btn-play mr15">观看视频<el-icon>
                                <VideoPlay />
                            </el-icon></p>
                        <p class="btn-link">了解达人<el-icon>
                                <ArrowRight />
                            </el-icon></p>
                    </div>
                </div>
            </div>
            <div class="img-item">
                <img class="bg" src="../assets/images/swiper/swiper.png" alt="">
                <div class="banner-op">
                    <img src="../assets/images/font3.svg" style="zoom: 1;" alt="">
                    <div>
                        <p class="btn-play mr15">观看视频<el-icon>
                                <VideoPlay />
                            </el-icon></p>
                        <p class="btn-link">了解达人<el-icon>
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
                    <h3>最新直播</h3>
                    <div class="tab">
                        <div :class="[index == l_id ? 'active' : '']" v-for="(item, index) in tabs" :key="index"
                            @click="changeLive(index)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="live-list">
                    <Card :item="item" v-for="item in list" :key="item"></Card>
                </div>
                <div class="load-box">加载更多</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from "@/components/Card.vue";

import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";

// 选择
const l_id = ref(0)

const tabs = [
    {
        name: '全部',
        active: true
    },
    {
        name: '娱乐直播'
    },
    {
        name: '电商直播'
    }
]

const changeLive = (index) => {
    console.log(index);
    l_id.value = index;
}

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
</script>

<style lang="scss" scoped>
.live {
    width: 100%;
    height: 100%;

    .banner {
        z-index: 1;
        position: relative;
        width: 100%;
        height: 920px;

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
                    margin-top: 20px;
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
        grid-template-columns: repeat(2, 50%) !important;
        grid-gap: 50px !important;
    }
}
</style>