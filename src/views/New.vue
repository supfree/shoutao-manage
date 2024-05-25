<template>
  <div class="new">
    <div class="box">
      <p class="title">{{ $t("main.Hot-news") }}</p>
      <div
        :class="['item-box animate__animated', item.class, 'item' + index]"
        :span="item.num"
        v-for="(item, index) in list.list"
        :key="index"
        @click="goInfo(item.id)"
      >
        <img :src="imageUrl + item.image1" alt="" />
        <div class="item-info">
          <p class="i-title u-line-1" v-html="item.name"></p>
          <p class="intro u-line-2" v-html="item.title_deputy"></p>
          <p class="date">
            {{
              traversalTime(item.date)[0] +
              $t("other.Month") +
              traversalTime(item.date)[1] +
              $t("other.Day")
            }}
          </p>
        </div>
      </div>
      <div class="load-box" @click="getLoadMore" v-if="!end">
        {{ end ? $t("other.No-Load-more") : $t("other.Load-more") }}
      </div>
      <el-empty :image-size="200" v-if="list.list.length == 0" />
    </div>
  </div>
</template>
<script setup>
import { WOW } from "wowjs";
import { get, imageUrl } from "../assets/js/request.js";
import { onMounted, onUnmounted, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const traversalTime =
  getCurrentInstance().appContext.config.globalProperties.$utils.traversalTime;

onMounted(() => {
  new WOW().init();
  getNewList("refresh");
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const box = document.querySelector(".item3");
  const box1 = document.querySelector(".item4");
  const box2 = document.querySelector(".item5");
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= 400) {
    if (box) {
      box.classList.add("animate__fadeInUp", "show");
      box.classList.remove("hidden");
    }
    if (box1) {
      box1.classList.add("animate__fadeInUp", "show");
      box1.classList.remove("hidden");
    }
    if (box2) {
      box2.classList.add("animate__fadeInUp", "show");
      box2.classList.remove("hidden");
    }
  }
};

const page = ref(1);
const end = ref(false);
const list = reactive({ list: [] });
const getNewList = (type) => {
  get("index/news", {
    store_id: localStorage.getItem("key") || 1,
    page: page.value,
  }).then((res) => {
    if (res.data.data.length == 0 || res.data.data.length < 9) {
      end.value = true;
    }
    if (type == "refresh") {
      list.list = res.data.data;
    } else {
      list.list = list.list.concat(res.data.data);
    }

    list.list.map((item, index) => {
      // item.date = new Date(item.date);
      if (index % 3 == 0) {
        item.num = 24;
        item.class = "long item-box";
      } else {
        item.num = 11;
        item.class = "short";
      }

      if (index % 3 == 1) {
        item.class = "short item-box mr30";
      }
      item.image1 = item.image.split(",")[0] || [];
    });
    console.log(list);
  });
};

const getLoadMore = () => {
  if (end.value) {
    return false;
  }
  page.value = page.value + 1;
  getNewList();
};

const goInfo = (e) => {
  console.log(e);
  router.push({ path: "/detail", query: { id: e } });
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped lang="scss">
.new {
  width: 100%;
  height: 100%;
  background-color: #fbfbfd;

  .box {
    display: flex;
    flex-wrap: wrap;
    width: 51%;
    max-width: 980px;
    margin: 0 auto;
    padding-bottom: 144px;

    & > div {
      margin-bottom: 40px;
    }

    .title {
      width: 100%;
      margin: 100px 0 62px;
      font-size: 36px;
      text-align: left;
      font-weight: bold;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      color: rgba(17, 17, 17, 0.93);
    }
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
    background-color: #ffffff;
    cursor: pointer;
  }

  .long {
    width: 100%;

    img {
      width: 100%;
      height: 2.86rem;
      max-height: 550px;
    }
  }

  .short {
    width: calc(50% - 15px);
    box-sizing: border-box;

    img {
      width: 100%;
      height: 1.38rem;
      max-height: 266px;
    }
  }

  .item-info {
    padding: 34px 36px;
    width: 100%;

    .i-title {
      width: 100%;
      font-size: 28px;
      font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
      font-weight: bold;
      color: rgba(17, 17, 17, 0.93);
      line-height: 1.4;
    }

    .intro {
      width: 100%;
      height: 100%;
      margin: 8px 0 20px;
      font-size: 16px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
      color: rgba(17, 17, 17, 0.77);
      line-height: 1.3;
    }

    .date {
      font-size: 14px;
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
      width: 100%;
      padding: 0 28px;

      & > div {
        margin-right: 0 !important;
      }

      .title {
        margin: 16px 0 30px;
        text-align: center;
        font-size: 32px;
      }
    }

    .long {
      width: 100%;
    }

    .item-box {
      border-radius: 8px;
      img {
        width: 100%;
        height: 180px;
      }
    }

    .item-info {
      padding: 20px 14px 25px;

      .i-title {
        font-size: 24px;
      }

      .intro {
        font-size: 14px;
      }

      .date {
        font-size: 12px;
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
