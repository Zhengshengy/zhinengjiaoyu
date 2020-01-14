<template>
    <div class="bigbox wallet">
        <div style="font-size: 18px;">{{ $t('income.income') }}</div>
        <Divider/>
        <Row type="flex" align="middle" class="header">
            <Col span="4">
                <span class="total">{{ money }}</span>
                HKD
            </Col>
            <Col span="4">
                <Button type="primary" shape="circle" @click="dis">{{ $t('income.withdraw') }}</Button>
                <Button shape="circle" @click="stat" style="margin-left: 10px;">{{ $t('income.statistics') }}</Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage"/>
        <Modal v-model="income" :title="this.$t('income.withdraw')">
            <Form :model="formItem" label-position="top" ref="formItem">
                <FormItem :label="this.$t('income.way')" size="large" class="mb-0">
                    <Radio disabled :value="payment_method">{{name}}</Radio>
                </FormItem>
                <FormItem :label="this.$t('income.account')">
                    <Input v-model="formItem.account" size="large" style="width:300px;"
                           :placeholder="this.$t('income.account_hint')" disabled></Input>
                </FormItem>
                <FormItem :label="this.$t('income.amount')">
                    <Input v-model="formItem.money" size="large" style="width:300px;"
                           :placeholder="this.$t('income.amount_hint')" @on-blur="validate">
                        <span slot="append">HKD</span>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{ $t('income.cancel') }}</Button>
                <Button type="primary" @click="ok" style="margin-left: 10px;">{{ $t('income.confirm') }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import BNService from '~/services/BNService';

    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                columns: [
                    {
                        title: this.$t('income.orderid'),
                        key: 'trade_no',
                        width: 200,
                    },
                    {
                        title: this.$t('income.type'),
                        key: 'type',
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.type == this.$t('order.expend')) {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: 'red'
                                        }
                                    }, params.row.type)
                                ]);
                            } else if (params.row.type == this.$t('order.income')) {
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
                        title: this.$t('income.total'),
                        key: 'total',
                        minWidth: 100,
                    },
                    {
                        title: this.$t('income.remark'),
                        key: 'remark',
                        minWidth: 100,
                    },
                    {
                        title: this.$t('income.status'),
                        key: 'status',
                        minWidth: 100,
                    },
                    {
                        title: this.$t('income.created_time'),
                        minWidth: 160,
                        key: 'created_at',
                    },
                    {
                        title: this.$t('order.operate'),
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row)
                                        }
                                    }
                                }, this.$t('order.view')),
                            ]);
                        }
                    }
                ],
                data: [],
                money: 0,
                income: false,
                methods: [],
                formItem: {
                    account: '',
                    payment_method_id: '',
                    money: ''
                },
                payment_method: true,
                name: '',
                count: 0,
                score: 0,
                total: 0,
                pageSize: 0
            }
        },
        async mounted() {
            BNService.getTeachwallet().then((data) => {
                this.money = data.wallet ? data.wallet : this.money;
            });
            BNService.getTcashOrder().then((data) => {
                this.total = data.total
                this.pageSize = data.per_page
                let datas = data.data
                this.method(datas);
            });
            BNService.getpaymentMethod().then((data) => {
                if (data.account) {
                    this.formItem.account = data.account
                    this.formItem.payment_method_id = data.payment_method_id
                    this.name = data.payment.name;
                }
            });
            BNService.getTeachStat().then((data) => {
                this.count = data.count ? data.count : this.count
                this.score = data.score ? data.score : this.score
            });
        },
        methods: {
            method(datas) {
                let that = this.$t
                datas.forEach(function (v, k) {
                    datas[k].total = v.total + 'HKD'
                    switch (v.type) {
                        case 1:
                            datas[k].type = that('order.income');
                            break;
                        case 2:
                            datas[k].type = that('order.expend');
                            break;
                    }
                    switch (v.status) {
                        case 0:
                            datas[k].status = that('order.handle');
                            break;
                        case 1:
                            datas[k].status = that('teach.succeed_tip');
                            break;
                        case 2:
                            datas[k].status = that('teach.failure_tip');
                            break;
                    }
                })
                this.data = datas;
            },
            dis() {
                BNService.getTeacherPayment().then((data) => {
                    if (data.status==true){
                        this.income = true
                        this.formItem.money = ''
                    } else {
                        this.$Message.error(this.$t('income.your_collection'))
                    }
                })

            },
            stat() {
                this.$Modal.info({
                    title: this.$t('income.stat_info'),
                    okText: this.$t('message.confirm'),
                    content: `${this.$t('income.classTime')}：${this.count}${this.$t('income.count')}<br>${this.$t('income.Score')}：${this.score}${this.$t('income.grade')}<br>${this.$t('income.score_for1')}【60%】<br>${this.$t('income.score_for2')}【70%】<br>${this.$t('income.score_for3')}【80%】<br>${this.$t('income.score_for4')}【90%】<br>${this.$t('income.score_for5')}【100%】`
                });
            },
            validate() {
                if (isNaN(this.formItem.money)) {
                    this.formItem.money = ''
                    this.$Message.error(this.$t('income.Pleaseamount'));
                } else if (+this.formItem.money > this.money) {
                    this.$Message.error(this.$t('income.Thewallet'));
                }
            },
            ok() {
                BNService.postTcashOrder(this.formItem).then((data) => {
                    this.income = false
                    this.$Message.success(this.$t('income.succeed'));
                    BNService.getTeachwallet().then((data) => {
                        this.money = data.wallet;
                    });
                    BNService.getTcashOrder().then((data) => {
                        let datas = data.data
                        this.method(datas)
                    });
                }).catch(() => {
                    this.$Message.error(this.$t('income.Withdrawal'))
                })
            },
            cancel() {
                this.income = false
            },
            changepage(index) {
                BNService.getTcashOrder(index).then((data) => {
                    this.method(data.data)
                })
            },
            show(row) {
                let obj = {}
                obj.event = row.event
                obj.out_trade_no = row.out_trade_no
                BNService.getTeachDetail(obj).then((data) => {
                    if (data.study_order) {
                        this.$Modal.info({
                            title: this.$t('income.details'),
                            okText: this.$t('message.confirm'),
                            content: `${this.$t('income.orderid')}：${data.teacher_wallet.trade_no}<br>${this.$t('order.orderid')}：${data.teacher_wallet.out_trade_no}<br>${this.$t('order.student')}：${data.study_order.student.name}<br>${this.$t('package.subject')}：${data.study_order.subject.name}<br>${this.$t('course.start_time')}：${data.study_order.start_at}<br>${this.$t('course.end_time')}：${data.study_order.end_at}<br>${this.$t('income.total')}：${data.teacher_wallet.total}HKD<br>${this.$t('income.remark')}：${data.teacher_wallet.remark}<br>${this.$t('income.created_time')}：${data.teacher_wallet.created_at}<br>`
                        });
                    } else if (data.cash_order) {
                        this.$Modal.info({
                            title: this.$t('income.details'),
                            okText: this.$t('message.confirm'),
                            content: `${this.$t('income.orderid')}：${data.teacher_wallet.trade_no}<br>${this.$t('order.orderid')}：${data.teacher_wallet.out_trade_no}<br>${this.$t('income.total')}：${data.teacher_wallet.total}HKD<br>${this.$t('income.remark')}：${data.teacher_wallet.remark}<br>${this.$t('income.created_time')}：${data.teacher_wallet.created_at}<br>`
                        });
                    }
                });
            }
        }
    }
</script>
<style>
    .ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-footer {
        display: block;
    }

    .wallet .header {
        margin-bottom: 30px
    }

    .wallet .header .total {
        font-size: 30px
    }

    .mb-0 {
        margin-bottom: 0px
    }
</style>
