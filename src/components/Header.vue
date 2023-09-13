<template>
    <div>
        <!-- <div class="m-header-search" v-if="is_search">
            <div class="u-flex alignItems">
                <el-input class="inputDeep" size="large" v-model="key_word" placeholder="请输入您要搜索的内容"
                    suffix-icon="Search" @keydown.enter="search" />
                <el-icon style="font-weight: bold;float: right;" size="20" @click="toggleSearch">
                    <Close />
                </el-icon>
            </div>
        </div> -->
        <div class="header-box">
            <div class="header-logo mr30">
                <router-link class="header-logo" to="/">
                    <img src="../assets/logo.png" alt="">
                    <span class="logo-text">光生传媒</span>
                </router-link>
            </div>
            <div v-if="!is_search" class="header-nav">
                <div class="header-nav_item">
                    <router-link to="/live">直播</router-link>
                </div>
                <div class="header-nav_item">
                    <router-link to="/master">达人</router-link>
                </div>
                <div class="header-nav_item">
                    <router-link to="/join">加入我们</router-link>
                </div>
                <div class="header-nav_item">
                    <router-link to="/new">新闻中心</router-link>
                </div>
                <div class="header-nav_item">
                    <router-link to="/about">关于光生</router-link>
                </div>
            </div>
            <div class="right u-flex alignItems">
                <div class="search" v-if="is_search">
                    <el-input class="inputDeep" v-model="key_word" size="small" placeholder="请输入您要搜索的内容" clearable
                        @blur="toggleSearch" @keydown.enter="search"></el-input>
                </div>
                <div class="u-flex alignItems" v-else>
                    <img class="icon-search" src="../assets/images/icons/search.png" alt="menu" @click="toggleSearch">
                    <img class="icon-menu" src="../assets/images/icons/menu.png" alt="menu" @click="toggleMenu">
                </div>

            </div>
            <div class="menu" v-if="is_menu">
                <div class="menu-header">
                    <div class="header-logo mr30">
                        <img src="../assets/logo.png" alt="">
                        <span class="name">光生传媒</span>
                    </div>
                    <el-icon color="#ffffff" size="26" @click="toggleMenu">
                        <Close />
                    </el-icon>
                </div>
                <div class="menu-list">
                    <div v-for="(item, index) in menuList" :key="index" @click="goLink(item.path)">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()

let key_word = ref('');
const is_search = ref(false);
const is_menu = ref(false);

const menuList = [
    {
        name: '直播',
        path: '/live'
    },
    {
        name: '达人',
        path: '/master'
    },
    {
        name: '加入我们',
        path: '/join'
    },
    {
        name: '新闻中心',
        path: '/new'
    },
    {
        name: '关于光生',
        path: '/about'
    }
]

// 控制搜索栏显示
const toggleSearch = () => {
    console.log(key_word.value);
    is_search.value = !is_search.value;
}

// h5菜单显示
const toggleMenu = () => {
    is_menu.value = !is_menu.value;
}

// 搜索跳转
const search = () => {
    toggleSearch();
    router.push({ path: '/search', query: { value: key_word.value } })
}

// goLink
const goLink = (path) => {
    toggleMenu();
    router.push(path);
}


// key_word = router.query.value;

</script>

<style lang="scss" scoped>
.m-header-search {
    display: none;
    width: 100%;
    height: 100%;
    padding: .1rem;

    :deep(.el-input) {
        .el-icon {
            color: #111111;
            font-size: 16px;
            font-weight: bold;
        }
    }
}

.header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
    padding: 8px 0;
    margin: 0 auto;
}

.header-logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
        width: 44px;
        height: 44px;
        margin-right: 10px;
    }

    .logo-text {
        font-size: 19px;
        font-weight: bold;
        color: #111111;
    }
}

.header-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &_item {
        font-size: 14px;
        font-weight: 400;

        a {
            color: #111111;
            text-decoration: none;

            &:hover {
                color: #888888
            }
        }
    }
}

.search {
    .el-input__wrapper {
        box-shadow: none;

        :hover {
            box-shadow: none;
        }

        :focus {
            box-shadow: none;
        }
    }
}

.right {
    .icon-search {
        width: 14px;
        height: 14px;
        cursor: pointer;
    }

    .icon-menu {
        display: none;
        width: 28px;
        height: 28px;
        margin-left: 10px;
        cursor: pointer;
    }
}

.menu {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #111111;

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 56px;
        padding: 0 20px;

        .name {
            color: #FFFFFF;
            font-size: 14px;
            font-weight: 600;
        }
    }

    &-list {
        width: 100%;
        height: calc(100% - 50px);
        padding: 0 20px;
        overflow-y: auto;
        overflow-x: hidden;
        color: #FFFFFF;

        div {
            font-size: 20px;
            font-family: NotoSansCJKsc-Medium, NotoSansCJKsc;
            font-weight: 500;
            line-height: 29px;
            padding: 22px 28px;
            text-align: left;
            color: rgba(255, 255, 255, 0.93);
        }
    }
}

.inputDeep {
    :deep(.el-input) {
        .is-focus {
            border: none !important;
            box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset !important;

            :hover {
                border: none !important;
            }
        }
    }

    :deep(.el-input__wrapper) {
        cursor: default;
        background: none;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset !important;

        .el-input__inner {
            cursor: default !important;
        }
    }
}


/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {
    .header-box {
        width: 100%;
        padding: 14px;
    }

    .header-logo {
        img {
            width: 32px;
            height: 32px;
        }

        .logo-text {
            font-size: 14px;
        }
    }

    .header-nav {
        display: none;
    }

    .icon-menu {
        display: block !important;
    }
}
</style>