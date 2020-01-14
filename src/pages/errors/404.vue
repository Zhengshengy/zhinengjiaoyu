/*
    错误404页面
*/
<template>
    <Error>
        <div slot="title" class="error-body-con-title">4<span><Icon type="ios-navigate-outline"></Icon></span>4</div>
        <div slot="message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</div>
    </Error>
</template>

<script type="text/ecmascript-6">
import Error from '~/components/Error.vue';
export default {
    name: 'errors_404',
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
        20% {
            transform: rotateZ(-60deg);
        }
        40% {
            transform: rotateZ(-10deg);
        }
        60% {
            transform: rotateZ(50deg);
        }
        80% {
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
                span {
                    display: inline-block;
                    color: #19be6b;
                    font-size: 230px;
                    animation: error_animation 3s ease 0s infinite alternate;
                }
            }
        }
    }
</style>
