<template>
    <div class="master">
        <!-- banner -->
        <div class="banner">
            <img class="bg" :src="imageUrl + detail.image" alt="">
            <div class="info">
                <img class="animate__animated animate__fadeInLeft" src="../assets/images/font3.png" alt="">
                <div class="animate__animated animate__fadeInUp" style="animation-duration: 3s;">
                    <h2>{{ detail.name }}</h2>
                    <p class="tip">
                        <span class="span1">全网粉丝</span>
                        <span class="span2">{{ detail.fans }}</span> | <span class="span1">全网获赞</span>
                        <span class="span2">{{ detail.like }}</span>
                    </p>
                    <p class="intro">{{ detail.editor }}</p>
                    <p class="btn-link">
                        {{ $t('other.Information') }}
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
                    <h3>{{ $t('main.List-of-talents') }}</h3>
                    <el-affix :offset="[_isMobile ? 120 : 0]">
                        <div class="tab">
                            <div :class="[index == lid ? 'active' : '']" v-for="(item, index) in tabs" :key="index"
                                @click="changeLive(index)">
                                {{ item.name }}
                            </div>
                        </div>
                    </el-affix>
                </div>
                <div v-if="list.length">
                    <div class="live-list">
                        <Card :item="item" :icon="false" v-for="item in list" :key="item"></Card>
                    </div>
                    <div class="load-box" @click="getMoreList">{{ $t('other.Load-more') }}</div>
                </div>
                <el-empty :image-size="200" v-else />
            </div>
        </div>
    </div>
</template>

<script setup>
import { get, imageUrl } from '../assets/js/request.js';
import { ref, getCurrentInstance, onMounted } from 'vue';
import Card from "@/components/Card.vue";
const _isMobile = getCurrentInstance().appContext.config.globalProperties.$utils._isMobile(); // 判断设备
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
    getArtist('refresh');
})

// 导航index
const lid = ref(0);
const changeLive = (index) => {
    lid.value = index;
    getArtist('refresh');
}

// 获取直播列表
const page = ref(1);
const list = ref([]);
const detail = ref({});
const getArtist = (status) => {
    get('index/artist', {
        store_id: localStorage.getItem('key') || 1,
        type: lid.value,
        page: page.value
    }).then(res => {
        // console.log(res);
        console.log(status, status == 'refresh');
        if (status == 'refresh') {
            // list.value = [];
            list.value = res.data[1];
        } else {
            list.value = list.value.concat(res.data[1]);
        }
        detail.value = res.data[0];
    })
}

const getMoreList = () => {
    page.value = page.value + 1;
    getArtist();
}
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

            &>img {
                width: 1.77rem;
                height: .78rem;
                margin-bottom: 50px;
                border-radius: 50%;
            }

            &>div {
                width: 100%;
                margin-left: 30px;

                h2 {
                    font-size: 24px;
                    font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.93);
                }

                .tip {
                    margin: 10px 0;

                    .span1 {
                        font-size: 14px;
                        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 0.55);
                    }

                    .span2 {
                        margin-left: 5px;
                        font-size: 15px;
                        font-family: NotoSans-Regular, NotoSans;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 0.93);
                    }
                }

                .intro {
                    width: 25%;
                    font-size: 15px;
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
                margin: 40px 0;
                font-size: 17px;
                font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
                font-weight: 500;
                border-radius: 24px;
                color: #FFFFFF;
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
        background-color: #FFFFFF;

        .box {
            width: 62.5%;
            margin: .8rem auto;

            .header {
                display: flex;
                align-items: center;
                flex-direction: row;
                align-self: flex-start;
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
                grid-template-columns: repeat(3, 32%);
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

    .master {
        .banner {
            .info {
                width: 90%;
                left: 5%;
                text-align: center;

                &>img {
                    margin-left: 15%;
                }

                &>div {
                    margin-left: 0;
                }

                .intro {
                    width: 100% !important;
                }
            }

            .btn-link {
                margin: 40px auto !important;
                justify-content: center;

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