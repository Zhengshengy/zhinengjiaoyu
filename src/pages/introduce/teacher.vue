<template>
    <div class="v3-parent">
        <div class="v3-parent-title">
            <div class="v3-parent-line"></div>
            <h2>辅导老师</h2>
            <div class="v3-parent-line"></div>
        </div>
        <p>辅导老师不用备课。因为我们的真题解答和动态知识点都是非常详细的。所以老师一看就懂。从而老师把所有时间都可以花在辅导学生。</p>
        <div class="v3-teacher-list">
            <ul>
                <li>
                    <div class="list-block"></div>
                    <div class="list-img">
                        <img  src="/client/images/teacher1.png"/>
                        <img  src="/client/images/teacher2.png"/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    import '~/assets/styles/introduce/teacher.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        name: "teacher",
        head: function() {
            return {
                title: this.$t('teacher.title')
            };
        }
    }
</script>

<style scoped>

</style>