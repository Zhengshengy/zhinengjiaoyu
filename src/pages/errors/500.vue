/*
    错误500页面
*/
<template>
    <Error>
        <div slot="title" class="error-body-con-title">
            5
            <span class="error500-0-span">
                <Icon type="social-freebsd-devil"></Icon>
            </span>
            <span class="error500-0-span">
                <Icon type="social-freebsd-devil"></Icon>
            </span>
        </div>
        <div slot="message">Oops! the server is wrong</div>
    </Error>
</template>

<script type="text/ecmascript-6">
import Error from '~/components/Error.vue';
export default {
    name: 'errors_500',
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
            transform: rotateZ(-10deg);
        }
        40% {
            transform: rotateZ(5deg);
        }
        60% {
            transform: rotateZ(-5deg);
        }
        80% {
            transform: rotateZ(10deg);
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
                .error500-0-span{
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
                        bottom: -10px;
                        left: 10px;
                        transform-origin: center bottom;
                        animation: error_animation 3s ease 0s infinite alternate;
                    }
                }
            }
        }
    }
</style>