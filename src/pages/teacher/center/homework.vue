<!--Created by Bamboo on 2018/9/6.-->
<template>
    <CenterLayout activeName="c2">
        <div slot="content">
            homework
            <Page :total="100" />
        </div>
    </CenterLayout>

</template>
<script>
    import CenterLayout from '~/components/TeacherCenter.vue';

    export default {
        layout: 'teacher',
        middleware: ['secret'],
        components: {
            CenterLayout
        },
    }
</script>
