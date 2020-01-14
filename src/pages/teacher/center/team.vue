<!--Created by Bamboo on 2018/9/6.-->
<template>
    <CenterLayout activeName="c1">
        <div slot="content">
            <header>
                <span>我的班级</span>
            </header>
            banji
            <Page :total="100" />
        </div>
    </CenterLayout>

</template>
<script>
    import CenterLayout from '~/components/TeacherCenter.vue';
    import BNService from '~/services/BNService';

    export default {
        layout: 'teacher',
        middleware: ['secret'],
        components: {
            CenterLayout
        },
        mounted() {
            this.dataReady = false;
            BNService.teacherTeams().then((res) => {
                this.realityList = res;
                this.dataReady = true;
            });
        },
    }
</script>
<style scoped>
    header {
        max-width: 800px;
        font-size: large;
    }
</style>
