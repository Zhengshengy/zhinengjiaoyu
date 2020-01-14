<template>
    <div class="v3-abilityAnalysis">
        <div class="v3-abilityAnalysis-title">
            <div class="v3-abilityAnalysis-line"></div>
            <h2>实体店导师</h2>
            <div class="v3-abilityAnalysis-line"></div>
        </div>
        <p>中小学生和成人学生亦可以到我们实体店学习和练习口语</p>
        <div class="abilityAnalysis-imgUrl">
            <img src="/client/images/offlineTeacher.png" />
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
                title: this.$t('offlineTeacher.title')
            };
        }
    }
</script>

<style scoped>

</style>