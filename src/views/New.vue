<template>
    <div class="new">
        <div class="box">
            <div class="title">{{ $t('main.Hot-news') }}</div>
            <div :class="['item-box animate__animated', item.class, 'item' + index]" :span="item.num"
                v-for="(item, index) in list.list" :key="index" @click="goInfo(item.id)">
                <img :src="imageUrl + item.image1" alt="">
                <div class="item-info">
                    <h2 class="u-line-1">{{ item.name }}</h2>
                    <p class="intro u-line-2">{{ item.title_deputy }}</p>
                    <p class="date">{{ item.date }}</p>
                </div>
            </div>
            <div class="load-box">{{ $t('other.Load-more') }}</div>
        </div>
    </div>
</template>
<script setup>
import { WOW } from 'wowjs';
import { get, imageUrl } from '../assets/js/request.js';
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
    new WOW().init();
    getNewList();
    window.addEventListener("scroll", handleScroll);
})

const handleScroll = (() => {
    const box = document.querySelector('.item3');
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 400) {
        box.classList.remove('hidden');
        box.classList.add('animate__fadeInUp', 'show');
    }
})


const page = ref(1);
const list = reactive({ list: [] });
const getNewList = () => {
    get('index/news', {
        store_id: localStorage.getItem('key') || 1,
        page: page.value
    }).then(res => {
        list.list = res.data;

        list.list.map((item, index) => {
            // item.date = new Date(item.date);
            if (index % 3 == 0) {
                item.num = 24;
                item.class = 'long item-box';
            } else {
                item.num = 11;
                item.class = 'short';
            }

            if (index % 3 == 1) {
                item.class = 'short item-box mr30';
            }
            item.image1 = item.image.split(',')[0] || [];
        })
        console.log(list);
    })
}

const goInfo = (e) => {
    console.log(e);
    router.push({ path: '/detail', query: { id: e } })
}

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
})
</script>
<style scoped lang="scss">
.new {
    width: 100%;
    height: 100%;
    background-color: #FBFBFD;

    .box {
        display: flex;
        flex-wrap: wrap;
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

            &>div {
                margin-right: 0 !important;
            }
        }

        .title {
            text-align: center;
            font-size: 32px;
        }

        .long {
            width: 100%;
        }

        .item-box {
            img {
                width: 100%;
                height: 180px;
            }
        }

        .double-box {
            margin-bottom: 0 !important;
        }

        .short {
            width: 100% !important;
            margin-bottom: 40px;
        }
    }
}
</style>