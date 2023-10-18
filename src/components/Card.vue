<template>
  <div class="ent-item">
    <!-- <img class="bg-poster" :src="imageUrl + item.image" alt=""> -->
    <video
      :id="'myVideo' + item.id"
      class="bg-poster"
      src="https://media.w3.org/2010/05/sintel/trailer.mp4"
      :poster="imageUrl + item.image"
      x5-playsinline="true"
      playsinline="true"
      webkit-playsinline="true"
      preload="auto"
      loop
    ></video>
    <div class="ent-info">
      <div class="ent-box">
        <div>
          <img :src="imageUrl + item.platform.image" alt="icon" v-if="icon" />
          <div class="touch">
            <p class="name">{{ item.name }}</p>
            <p class="id">{{ item.number }}</p>
          </div>
        </div>
        <p class="tip">
          <span v-if="item.play">
            <span class="span1">播放</span>
            <span class="span2">{{ item.play }}</span>
          </span>
          <span v-if="item.fans">
            <span class="span1">粉丝</span>
            <span class="span2">{{ item.fans }}</span>
          </span>
          <el-divider direction="vertical" />
          <span class="span1">获赞</span>
          <span class="span2">{{ item.like }}</span>
        </p>
        <p class="u-line-1 info">{{ item.editor }}</p>
      </div>
      <el-icon
        style="flex-shrink: 0"
        size="30"
        color="#FFFFFF"
        class="touch"
        v-if="icon"
        @click="playVideo"
      >
        <img src="../assets/images/icons/pause.svg" alt="" v-if="isPlay" />
        <img src="../assets/images/icons/play.svg" alt="" v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { imageUrl } from "../assets/js/request.js";
const props = defineProps({
  item: Object,
  icon: {
    type: Boolean,
    default: true,
  },
});

const isPlay = ref(false);
const playVideo = () => {
  const video = document.querySelector("#myVideo" + props.item.id);
  console.log(video);
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    video.play();
  } else {
    video.pause();
  }
};
</script>

<style lang="scss" scoped>
.ent-item {
  position: relative;
  width: 100%;
  height: 3.5rem;
  cursor: pointer;

  .bg-poster {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ent-info {
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.15rem;
    text-align: left;
    background: linear-gradient(
      180deg,
      rgba(17, 17, 17, 0) 0%,
      rgba(17, 17, 17, 0.77) 100%
    );

    .ent-box {
      width: calc(100% - 40px);

      & > div {
        width: 100%;
        display: flex;
        align-items: center;
        line-height: 24px;

        img {
          width: 36px;
          height: 36px;
          margin-right: 10px;
        }

        .name {
          font-size: 16px;
          font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.93);
        }

        .id {
          font-size: 10px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
        }
      }

      .tip {
        margin: 10px 0;
        color: rgba(255, 255, 255, 0.55);

        .span1 {
          font-size: 14px;
          font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
        }

        .el-divider {
          height: 13px;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .span2 {
          margin-left: 5px;
          font-size: 15px;
          font-family: NotoSans-Regular, NotoSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.93);
        }
      }

      .info {
        width: 100%;
        font-size: 14px;
        font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
        font-weight: 400;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.77);
      }
    }
  }

  .el-icon {
    img {
      width: 28px;
      height: 28px;
    }
  }
}

@media only screen and (max-width: 1250px) {
  .ent-item {
    height: 5rem;
  }
}

@media only screen and (max-width: 992px) {
  .ent-item {
    height: 700px;
  }
}
</style>
