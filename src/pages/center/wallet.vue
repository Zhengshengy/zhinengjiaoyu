<template>
    <CenterLayout activeName="c10">
        <div slot="content" class="wallet">
            <header class="title">{{$t('wallet.balance')}}</header>
            <Row type="flex" align="middle" class="header">
                <Col span="4">
                    <span class="total">{{ wallet }}</span>
                    HKD
                </Col>
                <Col span="2">
                    <Button to="recharge" type="primary" shape="circle">{{$t('wallet.recharge')}}</Button>
                </Col>
            </Row>
            <Table :loading="loading" :columns="columns" :data="data"></Table>
            <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage" />
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        name: 'wallet',
        layout: 'single',
         middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                columns: [
                    {
                        title: this.$t('wallet.OrderNumber'),
                        key: 'trade_no',
                    },
                    {
                        title: this.$t('wallet.tradetype'),
                        key: 'type',
                        render: (h, params) => {
                            if (params.row.type == this.$t('wallet.payment')) {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: 'red'
                                        }
                                    }, params.row.type)
                                ]);
                            } else if (params.row.type == this.$t('wallet.Recharge')) {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: 'green'
                                        }
                                    }, params.row.type)
                                ]);
                            }
                        }
                    },
                    {
                        title: this.$t('wallet.amount'),
                        key: 'total'
                    },
                    {
                        title: this.$t('recharge.payment'),
                        key: 'payment_method'
                    },
                    {
                        title: this.$t('wallet.remark'),
                        key: 'remark'
                    },
                    {
                        title: this.$t('order.status'),
                        key: 'status'
                    },
                    {
                        title: this.$t('wallet.operation'),
                        key: 'created_at'
                    }
                ],
                data: [],
                dataReady: false,
                loading: true,
                wallet: 0,
                total: 0,
                pageSize: 0
            }
        },
        async mounted() {
            this.dataReady = false;
            BNService.getClientWallet().then((data) => {
                this.method(data.data)
                this.loading = false;
                this.total = data.total
                this.pageSize = data.per_page
            });

            BNService.getClientBalance().then((data) => {
                this.wallet = data.wallet ? data.wallet : this.wallet;
            });
        },
        methods: {
            method(data){
                 let that = this.$t
                    data.forEach(function (v, k) {
                        data[k].total = v.total + 'HKD'
                        switch (data[k].type) {
                            case 1:
                                data[k].type = that('wallet.Recharge')
                                break;
                            case 2:
                                data[k].type = that('wallet.payment')
                                break;
                        }
                        switch (data[k].status) {
                            case 0:
                                data[k].status = that('wallet.processing')
                                break;
                            case 1:
                                data[k].status = that('wallet.succeed')
                                break;
                            case 2:
                                data[k].status = that('wallet.defeated')
                                break;
                        }
                        switch (data[k].payment_method) {
                            case 1:
                                data[k].payment_method = that('package.creditcard')
                                break;
                            case 2:
                                data[k].payment_method = that('package.Alipay')
                                break;
                            case 3:
                                data[k].payment_method = that('package.wechat')
                                break;
                            case 4:
                                data[k].payment_method = that('package.purse')
                                break;
                        }
                    });
                this.data = data;
            },
             changepage(index) {
                BNService.getClientWallet(index).then((data) => {
                    this.method(data.data)
                });
            }
        }
    }
</script>

<style scoped>
    .wallet .title{
        margin-bottom: 20px; font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
    }

    .wallet .header {margin-bottom: 30px}
    .wallet .header .total {font-size: 30px}
</style>