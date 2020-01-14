<template>
    <div class="bigbox">
        <div style="font-size: 18px;">{{ $t('order.order') }}</div>
        <Divider/>
        <Table :columns="columns" :data="data" width="100%"></Table>
        <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage"/>
    </div>
</template>
<script>
    import BNService from '~/services/BNService';
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                columns: [
                    {
                        title: this.$t('order.orderid'),
                        key: 'no',
                        width: 180,
                    },
                    {
                        title: this.$t('order.type'),
                        key: 'type',
                        width: 130,
                    },
                    {
                        title: this.$t('order.subject'),
                        key: 'name',
                        width: 130,
                    },
                    {
                        title: this.$t('order.student'),
                        key: 'student',
                        width: 130,
                    },
                    {
                        title: this.$t('order.length'),
                        key: 'length',
                        width: 130,
                    },
                    {
                        title: this.$t('order.amount'),
                        key: 'amount',
                        width: 130,
                    },
                    {
                        title: this.$t('order.subscribe_time'),
                        key: 'subscribe_at',
                        width: 290,
                        align: 'center',
                    },
                    {
                        title: this.$t('order.created_time'),
                        key: 'created_at',
                        width: 200,
                    },
                    {
                        title: this.$t('order.payment_time'),
                        key: 'payment_at',
                        width: 250,
                        align: 'center',
                    },
                    {
                        title: this.$t('order.status'),
                        key: 'status',
                        width: 130,
                        align: 'center',
                    },
                    {
                        title: this.$t('order.operate'),
                        width: 200,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            let that = this.$t
                            let time2 = new Date();
                            if (params.row.type == that('order.forthwith') || (params.row.type == that('order.subscribe') && params.row.status == that('order.finish')) || (params.row.type == that('order.subscribe') && params.row.status == that('order.closed')) || (params.row.type == that('order.subscribe') && params.row.time1 < time2)) {
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
                                                this.show(params.index)
                                            }
                                        }
                                    }, this.$t('order.view')),
                                ]);
                            }
                            else if (params.row.type == that('order.subscribe') && params.row.is_study == 0) {
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
                                                this.show(params.index)
                                            }
                                        }
                                    }, this.$t('order.view')),
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.interac(params)
                                            }
                                        }
                                    }, this.$t('order.teach')),
                                ]);
                            }
                            else if (params.row.type == that('order.subscribe') && params.row.is_study == 1) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                            }
                                        }
                                    }, this.$t('order.view')),
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small',
                                            disabled: true
                                        },
                                    }, '正在上课'),
                                ]);
                            }
                        }
                    },
                ],
                data: [],
                dataReady: false,
                total: 0,
                pageSize: 0,
                tempwindow: null,
                index: null
            }
        },
        async mounted() {
            this.dataReady = false;
            BNService.getClassOrder().then((data) => {
                let datas = data.data
                this.total = data.total
                this.pageSize = data.per_page
                this.method(datas)
            });
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: this.$t('order.details'),
                    okText: this.$t('message.confirm'),
                    content: `${this.$t('order.orderNumber')}：${this.data[index].no}<br>${this.$t('order.orderStatus')}：${this.data[index].status}<br>${this.$t('order.Ordertype')}：${this.data[index].type}<br>${this.$t('order.subject')}：${this.data[index].name}<br>${this.$t('default.student')}：${this.data[index].student}<br>${this.$t('order.length')}：${this.data[index].length}<br>${this.$t('order.amount')}：${this.data[index].amount}<br>${this.$t('order.created_time')}：${this.data[index].created_at}<br>${this.$t('order.subscribe_time')}：${this.data[index].subscribe_at}<br>`
                })
            },
            method(datas) {
                let that = this.$t
                datas.forEach(function (v, k) {
                    datas[k].no = v.order.no;
                    datas[k].name = v.subject.name;
                    datas[k].amount = v.order.amount + that('default.yuan');
                    datas[k].subscribe_at = v.start_at + '--' + v.end_at;
                    if (v.end_at == null) {
                        datas[k].time1 = new Date(Date.parse(v.start_at.replace(/-/g, "/")));
                    } else {
                        datas[k].time1 = new Date(Date.parse(v.end_at.replace(/-/g, "/")));
                    }
                    if (v.student.last_name == null || v.student.first_name == null) {
                        datas[k].student = v.student.name
                    } else {
                        datas[k].student = v.student.last_name + v.student.first_name;
                    }
                    switch (datas[k].type) {
                        case 1:
                            datas[k].type = that('order.subscribe')
                            break;
                        case 2:
                            datas[k].type = that('order.forthwith')
                            break;
                    }
                    switch (datas[k].status) {
                        case 1:
                            datas[k].status = that('order.handle')
                            break;
                        case 2:
                            datas[k].status = that('order.paid')
                            break;
                        case 3:
                            datas[k].status = that('order.confirm')
                            break;
                        case 4:
                            datas[k].status = that('order.finish')
                            break;
                        case 5:
                            datas[k].status = that('order.closed')
                            break;
                        case 6:
                            datas[k].status = that('order.refund')
                            break;
                        case 7:
                            datas[k].status = that('order.refunded')
                            break;
                    }
                });
                this.data = datas;
            },
            changepage(index) {
                BNService.getClassOrder(index).then((data) => {
                    this.method(data.data)
                })
            },
            interac(data) {
                this.index = data.index
                let time1 = new Date(Date.parse(data.row.start_at.replace(/-/g, '/')))
                let time2 = new Date();
                let time3 = new Date(Date.parse(data.row.end_at.replace(/-/g, '/')));
                let min = time1.getMinutes()
                time1.setMinutes(min - 5)
                if (time2 < time1) {
                    this.$Message.error(this.$t('order.not_time'))
                } else if (time3 < time2) {
                    this.$Message.error(this.$t('order.pass_time'))
                } else {
                const {href} = this.$router.resolve({
                    path: 'teaching',
                    query: {
                        id: data.row.id
                    }
                })
                this.tempwindow = window.open('_blank')
                this.tempwindow.location = href
                }
            }
        },
    }
</script>
<style scoped>

    .bigbox {
        width: 100%;
        height: 100%;
    }

</style>
