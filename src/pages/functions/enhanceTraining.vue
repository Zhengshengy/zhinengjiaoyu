<template>
    <div class="v3-parent">
        <div class="v3-parent-title">
            <div class="v3-parent-line"></div>
            <h2>强化知识点练习</h2>
            <div class="v3-parent-line"></div>
        </div>
        <p>对于每一个知识点，学生都可以针对性练习。当本人功智能系统测试到学生需要強化时，也会让学生做相应的巩固练习题。从而巩固学生的知识点及训练学生考得好成绩。</p>
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
        head: function() {
            return {
                title: this.$t('enhanceTraining.title')
            };
        }
    }
</script>

<style scoped>

</style>