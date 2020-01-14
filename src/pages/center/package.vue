<template>
    <CenterLayout activeName="c9">
        <div slot="content" v-if="isActive==true">
            <header class="title">{{this.$t('package.Setorder')}}</header>
            <Table :loading="loading" :columns="columns" :data="data"></Table>
            <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage"/>
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        name: 'package',
        layout: 'single',
        middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                isActive: true,
                columns: [
                    {
                        title: this.$t('package.OrderNumber'),
                        key: 'no',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: this.$t('package.subject'),
                        key: 'name',
                        minWidth: 100,
                    },
                    {
                        title: this.$t('package.duration'),
                        key: 'duration',
                        minWidth: 100,
                    },
                    {
                        title: this.$t('package.figure'),
                        key: 'amount',
                        minWidth: 80,
                    },
                    {
                        title: this.$t('package.typepayment'),
                        key: 'pay_method',
                        minWidth: 140,
                    },
                    {
                        title: this.$t('order.status'),
                        key: 'status',
                        minWidth: 120,
                    },
                    {
                        title: this.$t('package.creation'),
                        key: 'created_at',
                        minWidth: 160,
                    },
                    {
                        title: this.$t('package.timepayment'),
                        key: 'payment_at',
                        minWidth: 160,
                    },
                    {
                        title: this.$t('order.operate'),
                        key: 'action',
                        fixed: 'right',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.status == this.$t('package.unpaid')) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.buy(params.row)
                                            }
                                        }
                                    }, this.$t('order.buy')),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, this.$t('order.cancel'))
                                ]);
                            } else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                            }
                                        }
                                    }, this.$t('order.view'))
                                ]);
                            }
                        }
                    }
                ],
                data: [],
                dataReady: false,
                loading: true,
                total: 0,
                pageSize: 0
            }
        },
        async mounted() {
            this.dataReady = false;
            BNService.getOrderPackage().then((data) => {
                this.total = data.total
                this.pageSize = data.per_page
                this.method(data.data)
                this.loading = false;
            });
        },
        methods: {
            method(data) {
                let that = this.$t
                data.forEach(function (v, k) {
                    data[k].no = v.order.no;
                    data[k].name = v.course_fee.subject.name;
                    data[k].duration = v.course_fee.duration;
                    data[k].amount = v.order.amount + 'HKD';
                    data[k].pay_method = v.order.pay_method;
                    switch (data[k].duration) {
                        case 1:
                            data[k].duration = that('package.monthly')
                            break;
                        case 2:
                            data[k].duration = that('package.quarterly')
                            break;
                        case 3:
                            data[k].duration = that('package.halfyear')
                            break;
                        case 4:
                            data[k].duration = that('package.peryear')
                            break;
                    }
                    switch (data[k].pay_method) {
                        case 0:
                            data[k].pay_method = ''
                            break;
                        case 1:
                            data[k].pay_method = that('package.creditcard')
                            break;
                        case 2:
                            data[k].pay_method = that('package.Alipay')
                            break;
                        case 3:
                            data[k].pay_method = that('package.wechat')
                            break;
                        case 4:
                            data[k].pay_method = that('package.purse')
                            break;
                    }
                    switch (data[k].status) {
                        case 1:
                            data[k].status = that('package.unpaid')
                            break;
                        case 2:
                            data[k].status = that('order.processed2')
                            break;
                        case 3:
                            data[k].status = that('order.processed7')
                            break;
                        case 4:
                            data[k].status = that('order.processed3')
                            break;
                        case 5:
                            data[k].status = that('order.processed4')
                            break;
                        case 6:
                            data[k].status = that('order.processed5')
                            break;
                        case 7:
                            data[k].status = that('order.processed6')
                            break;
                    }
                });
                this.data = data;
            },
            buy(row) {
                this.$Modal.confirm({
                    title: this.$t('package.course'),
                    content: `<p>${this.$t('package.buycourse')}</p>`,
                    onOk: () => {
                        BNService.putPackage(row.order_id).then((data) => {
                            BNService.getOrderPackage().then((data) => {
                                this.total = data.total
                                this.pageSize = data.per_page
                                this.method(data.data)
                                this.$Message.success(this.$t('order.finish'));
                            });
                        });
                    }
                });
            },
            remove(row) {
                this.$Modal.confirm({
                    title: this.$t('message.reminder'),
                    content: this.$t('message.content'),
                    okText: this.$t('message.confirm'),
                    cancelText: this.$t('message.cancel'),
                    onOk: () => {
                        BNService.delPackage(row.order_id).then((data) => {
                            this.$Message.success(this.$t('teach.succeed_tip'))
                            BNService.getOrderPackage().then((data) => {
                                this.total = data.total
                                this.pageSize = data.per_page
                                this.method(data.data);
                            });
                        }).catch(() => {
                            this.$Message.error(this.$t('teach.failure_tip'));
                        });
                    },
                });
            },
            show(index) {
                this.$Modal.info({
                    title: this.$t('order.details'),
                    okText: this.$t('message.confirm'),
                    content: `${this.$t('package.OrderNumber')}：${this.data[index].no}<br>${this.$t('package.subject')}：${this.data[index].name}<br>${this.$t('package.duration')}：${this.data[index].duration}<br>${this.$t('package.figure')}：${this.data[index].amount}<br>${this.$t('package.typepayment')}：${this.data[index].pay_method}<br>${this.$t('order.status')}：${this.data[index].status}<br>${this.$t('package.creation')}：${this.data[index].created_at}<br>${this.$t('package.timepayment')}：${this.data[index].payment_at}<br>`
                })
            },
            changepage(index) {
                BNService.getOrderPackage(index).then((data) => {
                    this.method(data.data)
                });
            }
        }
    }
</script>

<style scoped>
    .title {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(70, 76, 91);
    }
</style>