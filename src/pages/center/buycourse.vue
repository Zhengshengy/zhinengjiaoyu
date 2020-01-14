<template>
    <CenterLayout activeName="c14">
        <div slot="content">
            <div>
                <h1 class="class_top">{{$t('buycourse.Online')}}</h1>
            </div>
            <div class="select_class margin">
                <span>{{$t('buycourse.ChooseSubject')}}</span>
                <ul class="subject1 margin">
                    <li style="float: left" :class="{active:index==isActive}" v-for="(item,index) in subject"
                        @click="choose(index)">{{item.name}}
                    </li>
                </ul>
            </div>
            <div class="period ">
                <span>{{$t('buycourse.SelectCycle')}}</span>
                <div :class="{active:index==isActive1}" v-for="(item,index) in cycle" :id="item.id"
                     :duration="item.duration" @click="check(index)">
                    <span style="display: block; width: 100%;height: 20%;">{{item.title}}</span>
                    <span>{{item.money}}</span><span>{{item.time}}</span>
                </div>
            </div>
            <div class="cost">
                <span>{{$t('buycourse.totalcost')}}</span>
                <br>
                <div class="manary">
                    <span v-text="money"></span><span>{{$t('buycourse.monetary')}}</span>
                </div>
                <br>
                <span>{{$t('evaluation.balance')}}：</span><span v-text="wallet"></span><span>{{$t('buycourse.monetary')}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-show="showTopUp">{{$t('evaluation.please')}}<nuxt-link
                        :to="path">{{$t('evaluation.Recharge')}}</nuxt-link>  </span>
                <br>
                <span>{{$t('buycourse.freeze')}}：</span><span v-text="freeze"></span><span>{{$t('buycourse.monetary')}}</span>
            </div>
            <div class="butto" :class="{ forbidButto: isforbidButto}" @click="submit(isforbidButto)">
                {{$t('buycourse.submitOrder')}}
            </div>
        </div>
    </CenterLayout>
</template>
<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        layout: 'single',
        middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                freeze: 0,
                subject: [],
                isActive: -1,
                isActive1: -1,
                wallet: 0,
                money: 0,
                id: '',
                cycle: [
                    {
                        id: '',
                        duration: '',
                        title: this.$t('buycourse.Monthlybilling'),
                        time: this.$t('buycourse.Yuanmonth'),
                        money: ''
                    },
                    {
                        id: '',
                        duration: '',
                        title: this.$t('buycourse.Quarterlybilling'),
                        time: this.$t('buycourse.Yuanquarter'),
                        money: ''
                    },
                    {
                        id: '',
                        duration: '',
                        title: this.$t('buycourse.semiannual'),
                        time: this.$t('buycourse.Yuanyear'),
                        money: ''
                    },
                    {
                        id: '',
                        duration: '',
                        title: this.$t('buycourse.billing'),
                        time: this.$t('buycourse.year'),
                        money: ''
                    },
                ],
                path: '',
                showTopUp: false,
                isforbidButto: true
            }
        },
        async mounted() {
            let str = this.$route.path.substr(0, 3)
            if (str === '/en') {
                this.path = '/en/center/recharge';
            } else {
                this.path = '/center/recharge';
            }

            BNService.getSubjects().then((data) => {
                this.subject = data
            });
            BNService.getClientBalance().then((data) => {
                this.wallet = data.wallet ? data.wallet : this.wallet;
            });
            BNService.getClientFreeze().then((data) => {
                this.freeze = data.freeze ? data.freeze : this.freeze;
            });
        },
        methods: {
            choose(index) {
                this.isActive = index
                this.isActive1 = -1
                this.money = 0
                let obj = {}
                obj.course = this.subject[index].course
                //清空数据
                this.cycle.forEach((val, index) => {
                    this.cycle[index].money = ''
                    this.cycle[index].id = ''
                    this.cycle[index].duration = ''
                })
                BNService.getCourseFees(obj).then((data) => {
                    let cycle = this.cycle
                    cycle.forEach((val, index) => {
                        cycle[index].money = data[index].price
                        cycle[index].id = data[index].id
                        cycle[index].duration = data[index].duration
                    })
                })
            },
            check(index) {
                this.id = ''
                this.isActive1 = index
                this.money = this.cycle[index].money
                this.id = this.cycle[index].id
                if (+this.money + this.freeze > this.wallet) {
                    this.showTopUp = true
                    this.isforbidButto = true
                } else {
                    this.showTopUp = false
                    this.isforbidButto = false
                }
            },
            submit() {
                let obj = {}
                obj.course_fee_id = this.id
                obj.amount = this.money
                if (this.money && this.id) {
                    if (this.wallet > this.money) {
                        this.$Modal.confirm({
                            title: this.$t('links.buycourse'),
                            content: `<p>${this.$t('buycourse.con')}?</p>`,
                            onOk: () => {
                                BNService.postOrderPackage(obj).then((data) => {
                                    BNService.putPackage(data.id).then((data) => {
                                        BNService.getClientBalance().then((data) => {
                                            this.$Message.success(this.$t('buycourse.complete'))
                                            this.wallet = data.wallet
                                        });
                                    })
                                })
                            },
                            onCancel: () => {
                            }
                        });
                    } else if (this.wallet < this.money) {
                        this.$Message.error(this.$t('buycourse.shortof'))
                    }
                }
            },
        }
    }
</script>
<style>
    .ivu-modal-footer {
        display: block;
    }

    .butto {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background-color: #0087DD;
        text-align: center;
        line-height: 40px;
        border-radius: 25px 25px 25px 25px;
        margin: auto;
        color: white;
    }

    .forbidButto {
        cursor: auto;
        background-color: #ccc;
    }

    .active {
        background-color: #EEFAFF;
    }

    .manary {
        margin-top: 10px;
    }

    .cost > span:first-child {
        font-size: 16px;
    }

    .cost {
        width: 450px;
        height: 160px;
        margin-left: 20px;
        font-size: 16px;
    }

    .period div {
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
    }

    .period > div {
        width: 200px;
        height: 200px;
        border: 1px solid #cccccc;
        display: inline-block;
        margin-left: 20px;
        margin-top: 10px;
        border-radius: 10px 10px 10px 10px;
    }

    .period > span {
        display: block;
        font-size: 16px;
        margin-left: 20px;
    }

    .period {
        width: 950px;
        height: 280px;
        font-size: 16px;
        margin-left: 20px;
    }

    .active {
        border: 1px solid #C1EDFF;
        background-color: #EEFAFF;
    }

    .subject1 > li {
        text-align: center;
        line-height: 30px;
        float: left;
        width: 70px;
        height: 30px;
        cursor: pointer;
    }

    .margin {
        margin-left: 10px;
        margin-top: 20px;
    }

    .select_class > span {
        font-size: 16px;
        margin-left: 10px;
    }

    .select_class {
        width: 100%;
        height: 130px;
    }

    .class_top {
        text-align: center;
    }
</style>
