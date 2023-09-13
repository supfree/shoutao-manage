<template>
    <div class="artist">
        <div class="mask-box">
            <img class="bg-poster" src="../assets/images/banner-item1.png" alt="">
            <div class="mask"></div>
        </div>
        <div class="contian">
            <div class="header">
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
                    <div class="box" v-for="item in logoList" :key="item">
                        <img :src="item.url" alt="">
                        <p class="name">{{ item.name }}</p>
                    </div>
                </div>
            </div>
            <el-divider />
            <!-- 合作品牌 -->
            <div class="flex-icon">
                <h3>合作品牌</h3>
                <div class="box" v-for="item in ocList" :key="item">
                    <img :src="item.url" alt="">
                    <p class="name">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
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
</script>
<style lang="scss" scoped>
.artist {
    width: 100%;
    height: 100%;

    .mask-box {
        position: relative;
        width: 100%;
        height: 4.8rem;

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
color: rgba(17,17,17,0.93);
        }

        .logo-list {
            display: flex;
            flex-wrap: wrap;

            .box {
                text-align: center;
                margin: 24px 24px 24px 0;
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

    /* 小型设备（电话，平板 992px 及以下） */
    @media only screen and (max-width: 992px) {
        .artist {

            .bg-poster {
                height: 180px;
            }
        }

        .contian {
            width: 100%;
            padding: 0 30px;
        }
    }
}
</style>