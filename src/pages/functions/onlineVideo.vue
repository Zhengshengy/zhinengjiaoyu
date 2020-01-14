<template>
    <div class="v3-abilityAnalysis">
        <div class="v3-abilityAnalysis-title">
            <div class="v3-abilityAnalysis-line"></div>
            <h2>网上视频录像监考</h2>
            <div class="v3-abilityAnalysis-line"></div>
        </div>
        <p>我们的网上录像监考功能让学员随时随地都可以进行考试</p>
        <div class="abilityAnalysis-imgUrl">
            <img src="/client/images/onlineVideo.png" />
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    import '~/assets/styles/functions/abilityAnalysis.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('onlineVideo.title')
            };
        }
    }
</script>

<style scoped>

</style>