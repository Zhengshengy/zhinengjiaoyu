<template>
    <div class="v3-abilityAnalysis">
        <div class="v3-abilityAnalysis-title">
            <div class="v3-abilityAnalysis-line"></div>
            <h2>线上导师</h2>
            <div class="v3-abilityAnalysis-line"></div>
        </div>
        <p>中、小学生与成人学生有不同的需求。当中小学生在遇到困难时，学生是立刻需要辅导老师帮忙的。我们的教学目的就是帮助学生。所以，我们每个科目都有当值老师在线上可以立刻辅导学生。成人学生和中、小学生更可以在线上与我们英语老师聊天。増強自己的口语能力。</p>
        <div class="abilityAnalysis-imgUrl">
            <img src="/client/images/onlineTeacher.png" />
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
                title: this.$t('onlineteachers.title')
            };
        }
    }
</script>

<style scoped>

</style>