<template>
  <div class="search-box">
    <div class="header">
      <div class="header-item">
        <el-input
          size="large"
          v-model="value"
          placeholder="请输入您要搜索的内容"
          prefix-icon="Search"
          @keydown.enter="getSearch"
          clearable
        />
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in searchList" :key="index">
        <div class="content-item" v-if="item.image1">
          <img :src="imageUrl + item.image1" alt="" />
          <div>
            <p class="title u-line-2">{{ item.name }}</p>
            <p class="info u-line-2">{{ item.title_deputy }}</p>
            <el-link class="u-line-1" type="primary" :href="item.href">{{
              item.link
            }}</el-link>
          </div>
        </div>
        <div class="content-item" v-else>
          <div>
            <p class="title">{{ item.name }}</p>
            <p class="info u-line-2">{{ item.title_deputy }}</p>
            <el-link class="u-line-1" type="primary" :href="item.href">{{
              item.link
            }}</el-link>
          </div>
        </div>
      </div>
      <el-empty :image-size="200" v-if="searchList.length == 0" />
    </div>
    <!-- <el-pagination :total="5" layout="prev, pager, next" /> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { get, imageUrl } from "../assets/js/request.js";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let value = ref(route.query.value);

onMounted(() => {
  getSearch();
});

const page = ref(1);
const searchList = ref([]);
const getSearch = () => {
  get("index/search", {
    store_id: localStorage.getItem("key") || 1,
    search: value.value,
    page: page.value,
  }).then((res) => {
    res.data.data.forEach((element) => {
      element.image1 = element.image.split(",")[0] || "";
      element.link =
        window.location.host +
        router.resolve({ path: "/detail", query: { id: element.id } }).href;
      element.href = router.resolve({
        path: "/detail",
        query: { id: element.id },
      }).href;
    });
    searchList.value = res.data.data;
    // console.log(detail, imageUrl);
  });
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;

  .header {
    width: 100%;
    padding: 36px;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: inset 0px 0px 0px 0px rgba(17, 17, 17, 0.15);

    &-item {
      width: 50%;
      margin: 0 auto;
    }

    .el-input {
      width: 470px;
      height: 42px;
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        border-color: rgba(17, 17, 17, 0.17);
      }
    }
  }

  .content {
    width: 50%;
    padding: 0 20px 50px;
    margin: 0 auto;

    &-item {
      display: flex;
      margin-top: 56px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;

      img {
        width: 112px;
        height: 112px;
        margin-right: 23px;
        border-radius: 4px;
        object-fit: cover;
      }

      & > div {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      .title {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        color: rgba(17, 17, 17, 0.93);
        font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
      }

      .info {
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        color: rgba(17, 17, 17, 0.77);
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      }

      .el-link {
        width: max-content;
        justify-content: flex-start;
        margin-top: auto;
        font-size: 14px;
        color: #2a62d0;
        font-family: NotoSans-Regular, NotoSans;
      }
    }
  }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
  .search-box {
    .header {
      padding: 28px;
      &-item {
        width: 100%;
      }

      .el-input {
        width: 100%;
      }
    }

    .content {
      width: 100%;
      padding: 0 28px 50px;
      &-item {
        margin-top: 28px;

        img {
          width: 72px;
          height: 72px;
          margin-right: 12px;
        }

        .title {
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        }
      }
    }
  }
}
</style>
