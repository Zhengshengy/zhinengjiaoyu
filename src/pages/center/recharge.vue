<template>
    <CenterLayout activeName="c10">
        <div slot="content">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="top">
                <h3 style="font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);margin-bottom: 20px">{{$t('recharge.Thewallet')}}</h3>
                <FormItem :label="this.$t('recharge.rechargeamount')" prop="amount">
                    <Input v-model="formItem.amount" size="large" style="width:300px;" :placeholder="this.$t('recharge.recharge')">
                        <span slot="append">HKD</span>
                    </Input>
                </FormItem>
                <FormItem :label="this.$t('recharge.payment')" size="large" :error="payError">
                    <RadioGroup v-model="formItem.pay_method" @on-change="change">
                        <Radio :label="item.id" style="margin-right: 20px" v-for="item in paymethod" :key="item.id">{{item.name}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem style="margin-top: 30px">
                    <Button type="primary" @click="pay('formItem')">{{$t('recharge.rechargea')}}</Button>
                </FormItem>
            </Form>
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';
    export default {
        name: 'recharge',
         middleware: ['secret', 'center'],
        layout: 'single',
        components: {
            CenterLayout
        },
        data() {
            const validateAmount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('recharge.recharge')));
                } else if (isNaN(value)) {
                    callback(new Error(this.$t('income.Pleaseamount')));
                } else if (value <= 0) {
                    callback(new Error(this.$t('recharge.amount_tip')));
                } else {
                    callback();
                }
            };
            return {
                ruleValidate: {
                    amount: [
                        { validator: validateAmount, trigger: 'blur'}
                    ]
                },
               formItem: {
                    amount: '',
                    pay_method: '',
                },
                payError: '',
                paymethod: []
            }
        },
         async mounted() {
             BNService.getPaymethod().then((data) => {
                 this.paymethod = data
             });
         },
        methods: {
            change() {
                this.payError = '';
            },
            pay(name) {
                this.$refs[name].validate((valid) => {
                    if (valid && this.formItem.pay_method) {
                        BNService.postWallet(this.formItem.amount, this.formItem.pay_method).then((data) => {
                            let type = this.formItem.pay_method
                            let order_no = data.no
                            this.$router.push({path: "/pay/", query: {type: type, order_no: order_no}})
                        });
                    } else if (!this.formItem.pay_method) {
                        this.payError = this.$t('recharge.pay_tip');
                    }
                })
            }
        }
    }
</script>