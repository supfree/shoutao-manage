<template>
    <div class="search-box">
        <div class="header">
            <div class="header-item">
                <el-input size="large" v-model="value" placeholder="请输入您要搜索的内容" clearable prefix-icon="Search" />
            </div>
        </div>
        <div class="content">
            <div class="content-item" v-for="(item, index) in list" :key="index">
                <img :src="item.url" alt="">
                <div>
                    <p class="title">{{ item.title }}</p>
                    <p class="info u-line-2">{{ item.info }}</p>
                    <el-link class="u-line-1" type="primary" :href="item.link">{{ item.link }}</el-link>
                </div>
            </div>
            <div class="content-item" v-for="(item, index) in list" :key="index">
                <div>
                    <p class="title">{{ item.title }}</p>
                    <p class="info u-line-2">{{ item.info }}</p>
                    <el-link class="u-line-1" type="primary" :href="item.link">{{ item.link }}</el-link>
                </div>
            </div>
            <el-empty :image-size="200" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { get, imageUrl } from '../assets/js/request.js';
import { useRoute } from "vue-router";
const route = useRoute();
let value = ref(route.query.value);
console.log(value);

onMounted(() => {
    getSearch();
})

const list = []
const page = ref(1);
const detail = ref([]);
const getSearch = () => {
    get('index/search', {
        store_id: localStorage.getItem('key') || 1,
        search: value,
        page: page.value
    }).then(res => {
        detail.value = res.data;
        console.log(res, imageUrl);
    })
}

</script>

<style lang="scss" scoped>
.search-box {
    width: 100%;

    .header {
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid #f1f1f1;
        box-shadow: inset 0px 0px 0px 0px rgba(17, 17, 17, 0.15);

        &-item {
            width: 50%;
            margin: 0 auto;
        }

        .el-input {
            width: 470px;
        }
    }

    .content {
        width: 50%;
        padding: .2604rem 20px 20px;
        margin: 0 auto;

        &-item {
            display: flex;
            margin-bottom: .25rem;
            font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;

            img {
                width: .5729rem;
                height: .5729rem;
                margin-right: .1042rem;
                border-radius: 5px;
                object-fit: cover;
            }

            &>div {
                display: flex;
                flex-direction: column;
                padding: .05rem 0;
                box-sizing: border-box;
            }

            .title {
                font-size: 16px;
                font-weight: 500;
                color: rgba(17, 17, 17, 0.93);
            }

            .info {
                margin-top: 5px;
                font-size: 14px;
                color: rgba(17, 17, 17, 0.77);
            }

            .el-link {
                justify-content: flex-start;
                margin-top: auto;
                font-size: 14px;
                color: #2A62D0;
            }
        }
    }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
    .search-box {
        .header {
            &-item {
                width: 100%;
            }

            .el-input {
                width: 100%;
            }
        }

        .content {
            width: 100%;
        }
    }
}
</style>