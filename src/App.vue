<template>
  <div class="page-box">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header></Header>
      </el-header>

      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>

      <!-- 底部 -->
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
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
    return {};
  },

  methods: {},
};
</script>

<style lang="scss">
// import "@/assets/css/_globals.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

  }

  .el-main {
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0 !important;
  }

  .el-footer {
    z-index: 2;
    width: 100%;
    height: auto;
    padding: 0;
    background-color: #F5F5F7;
  }
}

@media only screen and (max-width: 992px) {
  // .el-main {
  //   min-height: calc(100vh - 416px);
  // }
  html {
    font-size: 110px !important;
  }
}
</style>
