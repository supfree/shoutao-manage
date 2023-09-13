<template>
    <div class="footer-box">
        <div class="footer-list">
            <div>
                <div>
                    <p>直播</p>
                    <router-link to="/">娱乐直播</router-link>
                    <router-link to="/">电商直播</router-link>
                </div>
                <div>
                    <p>达人</p>
                    <router-link to="/">达人列表</router-link>
                    <router-link to="/">电商直播</router-link>
                </div>
            </div>

            <div>
                <div>
                    <p>加入我们</p>
                    <router-link to="/">加入光生</router-link>
                    <router-link to="/">员工生活</router-link>
                </div>
                <div>
                    <p>新闻中心</p>
                    <router-link to="/">最新新闻</router-link>
                </div>
            </div>

            <div>
                <div>
                    <p>关于光生</p>
                    <router-link to="/">关于光生</router-link>
                    <router-link to="/">触达平台</router-link>
                    <router-link to="/">品牌合作</router-link>
                    <router-link to="/">团队介绍</router-link>
                    <router-link to="/">服务内容</router-link>
                    <router-link to="/">公司地址</router-link>
                </div>
            </div>

            <div>
                <div>
                    <p>管理后台</p>
                    <router-link to="/">艺人管理</router-link>
                </div>
            </div>
        </div>
        <el-collapse id="el-footer-list">
            <el-collapse-item title="直播" name="1">
                <router-link to="/">娱乐直播</router-link>
                <router-link to="/">电商直播</router-link>
            </el-collapse-item>
            <el-collapse-item title="达人" name="2">
                <router-link to="/">达人列表</router-link>
                <router-link to="/">电商直播</router-link>
            </el-collapse-item>
            <el-collapse-item title="加入我们" name="3">
                <router-link to="/">加入光生</router-link>
                <router-link to="/">员工生活</router-link>
            </el-collapse-item>
            <el-collapse-item title="新闻中心" name="4">
                <router-link to="/">最新新闻</router-link>
            </el-collapse-item>
            <el-collapse-item title="关于光生" name="5">
                <router-link to="/">关于光生</router-link>
                <router-link to="/">触达平台</router-link>
                <router-link to="/">品牌合作</router-link>
                <router-link to="/">团队介绍</router-link>
                <router-link to="/">服务内容</router-link>
                <router-link to="/">公司地址</router-link>
            </el-collapse-item>
            <el-collapse-item title="管理后台" name="6">
                <router-link to="/">艺人管理</router-link>
            </el-collapse-item>
        </el-collapse>
        <div class="footer-info">
            <div>
                <p>Copyright © 2023 光生传媒。 保留所有权利。</p>
                <p>京ICP备10214630 营业执照</p>
            </div>
            <div class="language">
                <img src="../assets/images/icons/icon-earth.png" alt="">
                <el-select class="inputDeep" v-model="value" placeholder="中文" size="large">
                    <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("简体中文");
const language = [{
    value: '简体中文',
    label: '简体中文'
},
{
    value: 'english',
    label: 'english'
}]
</script>

<style lang="scss" scoped>
.footer-box {
    width: 60%;
    min-height: 360px;
    padding: 20px 0;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;

    .footer-list {
        width: 100%;
        display: flex;
        line-height: 38px;

        &>div {
            margin-right: 7vw;
        }

        p {
            width: max-content;
            margin-top: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #111111;
        }

        a {
            display: block;
            font-size: 14px;
            color: rgba(17, 17, 17, 0.77);
            text-decoration: none;

            &:hover {
                color: #111111;
            }
        }
    }

    .footer-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: .0729rem;
        color: rgba(17, 17, 17, 0.55);
        border-top: 1px solid #DBDBDB;

        div {
            p {
                margin-top: .0521rem;
            }
        }

        .language {
            display: flex;
            align-items: center;

            img {
                width: 24px;
                height: 24px;
            }

            :deep(.el-select) {
                border: none;

                .el-input {
                    width: max-content;
                    max-width: 100px;
                    border: none;
                }
            }
        }
    }

    #el-footer-list {
        display: none;
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
        padding: 0;
        background: none;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset !important;
        cursor: default;

        // .el-input__inner {
        //     cursor: default !important;
        // }
    }
}

/* 小型设备（电话，平板 992px 及以下） */
@media only screen and (max-width: 992px) {

    #el-footer-list {
        display: block !important;
    }

    :deep(.el-collapse-item__header) {
        background: none !important;
    }

    :deep(.el-collapse-item__wrap) {
        background: none !important;
        a {
            text-indent: 1em !important;
            margin-top: 10px !important;
            font-size: 14px;
            color: #111111;
            display: block;
            text-decoration: none;
        }
    }

    .footer-box {
        width: 85%;

        .footer-list {
            display: none;
        }
    }

    .language {
        margin: 20px 0;
    }

    .footer-info {
        border: none !important;
        font-size: 10px !important;
        flex-direction: column-reverse;
    }
}
</style>