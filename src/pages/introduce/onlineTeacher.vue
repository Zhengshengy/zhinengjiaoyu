<template>
    <div class="v3-parent">
        <div class="v3-parent-title">
            <div class="v3-parent-line"></div>
            <h2>在校老师</h2>
            <div class="v3-parent-line"></div>
        </div>
        <p>老师可创建班级，然后分配知识点、历年真题、练习题给学生。学生的进度老师一目了然。同时， 老师可以与个別学生或家长联系，亦可群发。我们的人工智能系统会自动改卷，让老师可以动用工作时间，更高效完成工作。</p>
        <div class="v3-parent-list">
            <ul>
                <li v-for="parent in group">
                    <div class="list-block">
                        <h2>{{parent.title}}</h2>
                        <p>{{parent.introduce}}</p>
                    </div>
                    <div class="list-img">
                        <img class="w100" v-bind:src="parent.srcImg"/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('offlineteacher.title')
            };
        },
        data() {
            return {
                group: [
                    {
                        title: '在线教师班级管理创建班级',
                        introduce: '创建班级、分配知识点分配真题、分配练习题掌握学生进度',
                        srcImg: '/client/images/parent1.png',
                    },{
                        title: '在线教师可以与学生发邮件',
                        introduce: '教师可给学生群发、单发个别邮件给学生、时时沟通交流',
                        srcImg: '/client/images/parent2.png',
                    },{
                        title: '在线教师可以分配选择真题',
                        introduce: '人工智能自动改卷，极大改进了教师手动阅卷的速度性',
                        srcImg: '/client/images/parent3.png',
                    },{
                        title: '在线教师可以与家长发邮件',
                        introduce: '教师可给家长群发、单发个别邮件给家长、时时沟通交流学生进度情况',
                        srcImg: '/client/images/parent4.png',
                    }

                ],
            };
        }
    }
</script>

<style scoped>

</style>