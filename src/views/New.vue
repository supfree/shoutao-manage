<template>
    <div class="new">
        <div class="box">
            <div class="title">最近新闻</div>
            <div class="long item-box" :span="24">
                <img src="../assets/images/banner-item1.png" alt="">
                <div class="item-info">
                    <h2>光生传媒日本官网正式上线</h2>
                    <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                    <p class="date">5 月 11 日</p>
                </div>
            </div>
            <div class="double-box">
                <div class="short item-box" :span="11">
                    <img src="../assets/images/banner-item1.png" alt="">
                    <div class="item-info">
                        <h2>光生传媒日本官网正式上线</h2>
                        <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                        <p class="date">5 月 11 日</p>
                    </div>
                </div>
                <div class="short item-box" :span="11">
                    <img src="../assets/images/banner-item1.png" alt="">
                    <div class="item-info">
                        <h2>光生传媒日本官网正式上线</h2>
                        <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                        <p class="date">5 月 11 日</p>
                    </div>
                </div>
            </div>
            <div class="long item-box" :span="24">
                <img src="../assets/images/banner-item1.png" alt="">
                <div class="item-info">
                    <h2>光生传媒日本官网正式上线</h2>
                    <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                    <p class="date">5 月 11 日</p>
                </div>
            </div>
            <div class="double-box">
                <div class="short item-box" :span="11">
                    <img src="../assets/images/banner-item1.png" alt="">
                    <div class="item-info">
                        <h2>光生传媒日本官网正式上线</h2>
                        <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                        <p class="date">5 月 11 日</p>
                    </div>
                </div>
                <div class="short item-box" :span="11">
                    <img src="../assets/images/banner-item1.png" alt="">
                    <div class="item-info">
                        <h2>光生传媒日本官网正式上线</h2>
                        <p class="intro">光生传媒日本官网现已正式上线，可通过访问 www.vividtide.com/jp 浏览日本地区网站。</p>
                        <p class="date">5 月 11 日</p>
                    </div>
                </div>
            </div>
            <div class="load-box">加载更多</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.new {
    width: 100%;
    height: 100%;
    background-color: #FBFBFD;

    .box {
        width: 51%;
        margin: 0 auto;
        padding: 0.52rem 0;

        &>div {
            margin-bottom: 40px;
        }
    }

    .title {
        width: 100%;
        margin-bottom: .3125rem;
        text-align: left;
        font-size: 0.19rem;
        font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
        font-weight: bold;
        color: rgba(17, 17, 17, 0.93);
    }

    .double-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .item-box {
        width: 100%;
        border-radius: 14px;
        overflow: hidden;
        background-color: #FFFFFF;
        cursor: pointer;
    }



    .long {
        width: 100%;

        img {
            width: 100%;
            height: 2.9rem;
        }
    }

    .short {
        width: calc(50% - 20px);
        box-sizing: border-box;

        img {
            width: 100%;
            height: 1.35rem;
        }
    }

    .item-info {
        padding: .1rem .16rem;
        width: 100%;

        h2 {
            width: 100%;
            font-size: .16rem;
            font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
            font-weight: bold;
            color: rgba(17, 17, 17, 0.93);
            line-height: 0.4rem;
        }

        .intro {
            width: 100%;
            min-height: 0.25rem;
            height: 100%;
            font-size: .084rem;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.77);
            line-height: 1.4;
        }

        .date {
            margin-top: 20px;
            font-size: .073rem;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
            font-weight: 400;
            color: rgba(17, 17, 17, 0.55);
        }
    }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
    .new {
        .box {
            width: 90%;
        }

        .title {
            text-align: center;
            font-size: 32px;
        }

        .long {
            width: 100%;

            img {
                width: 100%;
                height: 180px;
            }
        }

        .short {
            width: 100% !important;
            margin-bottom: 40px;
        }
    }
}
</style>