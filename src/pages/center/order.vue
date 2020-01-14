<template>
    <CenterLayout activeName="c8">
        <div slot="content">
            <header class="title">{{$t('order.study')}}</header>
            <Table width="100%" :loading="loading" :columns="columns" :data="data"></Table>
            <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage"/>
            <Modal v-model="model" style="padding-left: 20%;text-align: center;">
                <h3 style="margin-top: 30px;font-size: 20px">
                    {{$t('order.give')}}{{teacher_name}}{{$t('order.Theteacher')}}</h3>
                <p style="font-size: 18px">{{$t('order.grade')}}</p>
                <Rate v-model="score" icon="md-happy" style="font-size: 45px;color:#0087DD "/>
                <div class="butto" style="margin-bottom: 55px" @click="submit">{{$t('order.evaluate')}}</div>
            </Modal>
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        name: 'order',
        layout: 'single',
        middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                columns: [
                    {
                        title: this.$t('order.code'),
                        key: 'no',
                        width: 150,
                    },
                    {
                        title: this.$t('order.genre'),
                        key: 'type',
                        width: 100
                    },
                    {
                        title: this.$t('order.subject'),
                        key: 'name',
                        width: 100
                    },
                    {
                        title: this.$t('order.teacher'),
                        key: 'teacher_name',
                        width: 100
                    },
                    {
                        title: this.$t('order.period'),
                        key: 'length',
                        width: 100
                    },
                    {
                        title: this.$t('order.cost'),
                        key: 'amount',
                        width: 100
                    },
                    {
                        title: this.$t('order.appointment'),
                        key: 'start_at',
                        width: 200
                    },
                    {
                        title: this.$t('order.time'),
                        key: 'created_at',
                        width: 180
                    },
                    {
                        title: this.$t('order.payment'),
                        key: 'payment_at',
                        width: 200
                    },
                    {
                        title: this.$t('order.status'),
                        key: 'status',
                        width: 120
                    },
                    {
                        title: this.$t('order.operate'),
                        key: 'action',
                        width: 250,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            let texts = '';
                            let that = this.$t
                            let time2 = new Date();
                            if ((params.row.type == that('order.forthwith') && params.row.status == that('order.processed3') && params.row.is_review == 2) || (params.row.type == that('order.reserve') && params.row.status == that('order.processed3') && params.row.is_review == 2) || (params.row.type == that('order.forthwith') && params.row.status == that('order.processed') && params.row.is_review == 2)) {
                                texts = that('order.appraise')
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
                                    }, that('order.view')),
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
                                                this.evaluation(params)
                                            }
                                        }
                                    }, texts),
                                ]);
                            } else if ((params.row.type == that('order.forthwith') && params.row.status == that('order.processed3') && params.row.is_review == 1) || (params.row.type == that('order.forthwith') && params.row.status == that('order.processed') && params.row.is_review == 1) || (params.row.type == that('order.reserve') && params.row.status == that('order.processed3') && params.row.is_review == 1) || (params.row.type == that('order.reserve') && params.row.status == that('order.processed4'))||(params.row.type == that('order.reserve')&&params.row.time1<time2)) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                            }
                                        }
                                    }, that('order.view')),
                                ])
                            } else if (params.row.type == that('order.reserve')&&params.row.time3<time2 && params.row.is_study == 0) {
                                texts = that('order.Into')
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
                                    }, that('order.view')),
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
                                                this.evaluation(params)
                                            }
                                        }
                                    }, texts)
                                ]);
                            }
                            else if (params.row.type == that('order.reserve') && params.row.status == that('order.processed') && params.row.is_study == 0) {
                                texts = that('order.Into')//进入学习，取消
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
                                    }, that('order.view')),
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
                                                this.evaluation(params)
                                            }
                                        }
                                    }, texts),
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
                                                this.remove(params,params.index)
                                            }
                                        }
                                    }, that('order.cancel'))
                                ]);
                            }
                            else if (params.row.type == that('order.reserve')&&params.row.time3<time2 && params.row.is_study == 1) {
                                texts = '正在学习'//进入学习
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
                                    }, that('order.view')),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            disabled: true
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                    }, texts)
                                ]);
                            }
                            else if (params.row.type == that('order.reserve') && params.row.status == that('order.processed') && params.row.is_study == 1) {
                                texts = '正在学习'//进入学习，取消
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
                                    }, that('order.view')),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            disabled: true
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.evaluation(params)
                                            }
                                        }
                                    }, texts),

                                ]);
                            }
                        }
                    }
                ],
                data: [],
                dataReady: false,
                loading: true,
                score: 0,
                model: false,
                teacher_name: '',
                content: '',
                teacher_id: 0,
                order_id: 0,
                total: 0,
                pageSize: 0,
                wallet: null,
                tempwindow: null,
            }
        },
        async mounted() {
            this.dataReady = false;
            BNService.getClientOrder().then((data) => {
                this.method(data.data)
                this.total = data.total
                this.pageSize = data.per_page
                this.loading = false;
            });
            BNService.getClientBalance().then((data) => {
                this.wallet = +data.wallet
            });
        },
        methods: {
            method(data) {
                let that = this.$t
                data.forEach(function (v, k) {
                    data[k].no = v.order.no;
                    data[k].name = v.subject.name;
                    data[k].teacher_name = v.teacher.first_name + v.teacher.last_name;
                    data[k].last_name = v.teacher.last_name;
                    data[k].is_review = v.is_review;
                    data[k].amount = v.order.amount + 'HKD';
                    data[k].time3 = new Date(Date.parse(v.start_at.replace(/-/g, "/")))
                    if(v.end_at==null){
                        data[k].time1 = new Date(Date.parse(v.start_at.replace(/-/g, "/")))
                    }else{
                        data[k].time1 = new Date(Date.parse(v.end_at.replace(/-/g, "/")))
                    }
                    if (v.subscribe_at) {
                        data[k].subscribe_at = v.subscribe_at
                    } else {
                        data[k].subscribe_at = v.start_at
                    }
                    switch (data[k].type) {
                        case 1:
                            data[k].type = that('order.reserve')
                            break;
                        case 2:
                            data[k].type = that('order.forthwith')
                            break;
                    }
                    switch (data[k].status) {
                        case 1:
                            data[k].status = that('order.processed')
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
            remove(params,index) {
                let time1 = new Date(Date.parse(params.row.start_at.replace(/-/g, "/")))
                let time2 = new Date();
                let Hours = time1.getHours()
                time1.setHours(Hours-24)
                if(time2>=time1){
                    this.$Message.error(this.$t('order.cancellation_failed'))
                }else{
                    this.$Modal.confirm({
                    title: this.$t('message.reminder'),
                    content: this.$t('message.cancel_tip'),
                    okText: this.$t('message.confirm'),
                    cancelText: this.$t('message.cancel'),
                    onOk: () => {
                        BNService.orderDelete(this.data[index].order_id).then((data) => {
                            this.$Message.success(this.$t('order.successfully'));
                                BNService.getClientOrder().then((data) => {
                                    this.method(data.data)
                                    this.total = data.total
                                    this.pageSize = data.per_page
                                });
                            }).catch(() =>{
                                this.$Message.error(this.$t('order.failure'));
                            })
                        },
                    });
                }
            },
            show(index) {
                this.$Modal.info({
                    title: this.$t('order.details'),
                    okText: this.$t('message.confirm'),
                    content: `${this.$t('order.orderNumber')}：${this.data[index].no}<br>${this.$t('order.orderStatus')}：${this.data[index].status}<br>${this.$t('order.Ordertype')}：${this.data[index].type}<br>${this.$t('order.subject')}：${this.data[index].name}<br>${this.$t('order.teacher')}：${this.data[index].teacher_name}<br>${this.$t('order.period')}：${this.data[index].length}<br>${this.$t('order.estimatedcost')}：${this.data[index].amount}<br>${this.$t('order.time')}：${this.data[index].created_at}<br>${this.$t('order.appointment')}：${this.data[index].subscribe_at}<br>`
                })
            },
            evaluation(params) {
                let index = params.index
                let that = this.$t
                if (params.row.type == that('order.forthwith') || (params.row.type == that('order.reserve') && params.row.status == that('order.processed3'))) {
                    this.model = true
                    this.teacher_name = this.data[index].teacher_name
                    this.teacher_id = this.data[index].teacher_id
                    this.order_id = this.data[index].order_id
                    this.id = this.data[index].id
                    this.content = ''
                    this.score = 0
                } else if (params.row.type == that('order.reserve') && params.row.status == that('order.processed')) {
                    let amount = parseInt(params.row.amount.slice(0, -3), 10)
                    let time1 = new Date(Date.parse(params.row.start_at.replace(/-/g, "/")))
                    console.log(time1)
                    let time2 = new Date();
                    let time3 = new Date(Date.parse(params.row.end_at.replace(/-/g, "/")));
                    let min = time1.getMinutes()
                    time1.setMinutes(min - 5)
                    if (this.wallet >= amount) {
                        if (time2 < time1) {
                            this.$Message.error(this.$t('order.not_time'))
                        } else if (time3 < time2) {
                            this.$Message.error(this.$t('order.pass_time'))
                        } else {
                            const {href} = this.$router.resolve({
                                path: 'enterclass',
                                query: {
                                    id: params.row.id
                                }
                            })
                            this.tempwindow = window.open('_blank')
                            this.tempwindow.location = href

                        }
                    } else {
                        this.$Message.error("钱包余额不足,请充值")
                    }
                }
            },
            submit() {
                let obj = {}
                obj.teacher_id = this.teacher_id
                obj.order_id = this.order_id
                obj.score = this.score
                BNService.createreview(obj).then((data) => {
                    this.model = false
                    this.$Message.success(this.$t('order.Evaluation'))
                    obj = {}
                    BNService.getClientOrder().then((data) => {
                        this.method(data.data)
                    })
                }).catch(() => {
                    this.$Message.error(this.$t('order.Evaluationof'));
                })
            },
            changepage(index) {
                BNService.getClientOrder(index).then((data) => {
                    this.method(data.data)
                });
            }
        }
    }
</script>

<style scoped>
    .ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-footer {
        display: none;
    }
    .title {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(70, 76, 91);
    }

    .butto {
        cursor: pointer;
        width: 100px;
        height: 30px;
        background-color: #0087DD;
        text-align: center;
        line-height: 30px;
        border-radius: 25px;
        margin: 20px auto;
        color: white;
        font-size: 14px;
    }
</style>