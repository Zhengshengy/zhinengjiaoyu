<template>
    <div class="v3-abilityAnalysis">
        <div class="v3-abilityAnalysis-title">
            <div class="v3-abilityAnalysis-line"></div>
            <h2>学生现水平强弱分析</h2>
            <div class="v3-abilityAnalysis-line"></div>
        </div>
        <p>学生做完我本系统的测试后，本人工智能系统就会大概知道该学生的知识点強在那与弱在那。之后，本人工智能系统只会集中辅导学⽣的弱点。当所有弱点都拉上来后，本人工智能系统就会把该学生的強点再拉高。目的是既能让学生的基本功扎实，从而进大学时有真功夫，又能让学生考到高分。</p>
        <div class="abilityAnalysis-imgUrl">
            <img src="/client/images/abilityAnalysis.png" />
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    import '~/assets/styles/functions/abilityAnalysis.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        name: "abilityAnalysis",
        head: function() {
            return {
                title: this.$t('abilityAnalysis.title')
            };
        }
    }
</script>

<style scoped>

</style>