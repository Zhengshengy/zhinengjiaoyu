/*
    错误403页面
*/
<template>
    <Error>
        <div slot="title" class="error-body-con-title">
            4
            <span class="error403-0-span"><Icon type="android-lock"></Icon></span>
            <span class="error403-key-span"><Icon size="220" type="ios-bolt"></Icon></span>
        </div>
        <div slot="message">You don't have permission</div>
    </Error>
</template>

<script type="text/ecmascript-6">
import Error from '~/components/Error.vue';
export default {
    name: 'errors_403',
    components: {
        Error
    }
};
</script>
<style scoped lang="less">
    @keyframes error_animation {
        0% {
            transform: rotateZ(0deg);
        }
        40% {
            transform: rotateZ(-20deg);
        }
        45% {
            transform: rotateZ(-15deg);
        }
        50% {
            transform: rotateZ(-20deg);
        }
        55% {
            transform: rotateZ(-15deg);
        }
        60% {
            transform: rotateZ(-20deg);
        }
        100% {
            transform: rotateZ(0deg);
        }
    }
    .error {
        &-body-con{
            &-title {
                text-align: center;
                font-size: 240px;
                font-weight: 700;
                color: #2d8cf0;
                height: 260px;
                line-height: 260px;
                margin-top: 40px;
                .error403-0-span{
                    display: inline-block;
                    position: relative;
                    width: 170px;
                    height: 170px;
                    border-radius: 50%;
                    border: 20px solid #ed3f14;
                    color: #ed3f14;
                    margin-right: 10px;
                    i{
                        display: inline-block;
                        font-size: 120px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }
                }
                .error403-key-span {
                    display: inline-block;
                    position: relative;
                    width: 100px;
                    height: 190px;
                    border-radius: 50%;
                    margin-right: 10px;
                    i{
                        display: inline-block;
                        font-size: 190px;
                        position: absolute;
                        left: 20px;
                        transform: translate(-50%,-60%);
                        transform-origin: center bottom;
                        animation: error_animation 2.8s ease 0s infinite;
                    }
                }
            }
        }
    }
</style>
