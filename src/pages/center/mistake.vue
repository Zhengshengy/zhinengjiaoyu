<!--Created by Bamboo on 2018/9/10.-->
<template>
    <CenterLayout activeName="c5">
        <div slot="content">
            <header class="title">{{$t('mistake.errors')}}</header>
            <Table border ref="selection" :columns="columns4" :data="data1"></Table>
            <Button @click="handleSelectAll(true)">Set all selected</Button>
            <Button @click="handleSelectAll(false)">Cancel all selected</Button>
        </div>
    </CenterLayout>
</template>
<script>
    import CenterLayout from '~/components/CenterLayout.vue';

    export default {
        layout: 'single',
         middleware: ['secret','center'],
        components: {
            CenterLayout
        },
        data () {
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        }
    }
</script>
<style scoped>
    .title{
        margin-bottom: 20px; font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
    }
</style>
