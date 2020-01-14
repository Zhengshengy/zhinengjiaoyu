<template>
    <CenterLayout activeName="c11">
        <div slot="content" class="console">
            <header class="title">{{$t('consolea.nsetmenu')}}</header>
            <Divider />
            <div v-for="item in mealList" key="item.id">
                <Row>
                    <Col span="3">{{item.subject.name}}</Col>
                    <Col span="3">剩余{{item.days}}天</Col>
                    <Col span="3" v-if="item.days === 0">
                        <a class="f-12px" :href="path">{{$t('consolea.renew')}}</a>
                    </Col>
                </Row><br>
            </div>
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        layout: 'single',
        name: 'console',
        middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                path: '',
                mealList: []
            }
        },
        async mounted(){
            let str = this.$route.path.substr(0, 3)
            if (str === '/en') {
                this.path = '/client/en/center/buycourse';
            } else {
                this.path = '/client/center/buycourse';
            }
            BNService.getClientMealdosage().then((data) => {
                this.mealList = data
            });
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 20px; font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
    }
    .f-12px {font-size: 12px;}
</style>