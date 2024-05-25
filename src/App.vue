<template>
  <div class="page-box">
    <el-container>
      <!-- 头部 -->
      <el-header id="globalheader">
        <Header :class="dark == 0 ? 'dark' : ''" :dark="dark"></Header>
      </el-header>

      <!-- 内容 -->
      <el-main>
        <router-view @increase="handleIncrease"></router-view>
      </el-main>

      <!-- 底部 -->
      <el-footer>
        <Footer :class="dark == 0 ? 'dark' : ''" :dark="dark"></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { toRaw } from "vue";
import "@/assets/css/normalize.css";
import "@/assets/css/common.css";
import "@/assets/css/_globals.scss";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  // 局部注册组件
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      dark: 1
    };
  },

  methods: {
    handleIncrease(e) {
      this.dark = toRaw(e).background;
    }
  },
};
</script>

<style lang="scss">
// import "@/assets/css/_globals.scss";
#app {
  font-family: NotoSansCJKsc-Regular, NotoSansCJKsc, "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-container {
  z-index: 0;
  position: relative;
  .el-header {
    z-index: 3;
    width: 100%;
    height: 56px;
    padding: 0px;
    backdrop-filter: blur(7px);
    background-color: #FFFFFF;
  }

  .el-main {
    z-index: 1;
    width: 100%;
    height: 100%;
    // min-height: calc(100vh - 416px);
    padding: 0 !important;
    overflow: visible;
  }

  .el-footer {
    z-index: 2;
    width: 100%;
    height: auto;
    padding: 0;
    background-color: #F5F5F7;
  }
}
</style>
