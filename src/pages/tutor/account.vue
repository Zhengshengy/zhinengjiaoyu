<template>
    <Form :model="formItem" label-position="top" ref="formItem">
        <div style="font-size: 18px">{{ $t('account.set_up') }}</div>
        <Divider />
        <FormItem :label="this.$t('account.method')" size="large" :error="accoError">
            <RadioGroup v-model="formItem.payment_method_id" v-for="(item,index) in methods" :key="item.id">
                <Radio :label="item.id" :value="item.id">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem :label="this.$t('account.number')" :error="accountError">
            <Input v-model="formItem.account" size="large" style="width:300px;"
                   :placeholder="this.$t('account.prompt')"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit('formItem')">{{ $t('account.confirm') }}</Button>
        </FormItem>
    </Form>
</template>
<script>
    import BNService from '~/services/BNService';
    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                methods: [],
                index: '',
                accountError: '',
                accoError: '',
                formItem: {
                    account: '',
                    payment_method_id: ''
                }
            }
        },
        async mounted() {
          BNService.paymentMethod().then((data) => {
              this.methods = data
          })
            BNService.getpaymentMethod().then((data) => {
                this.formItem.account = data.account
                this.formItem.payment_method_id = data.payment_method_id
          })
        },
        methods:{
            submit() {
                if (!this.formItem.payment_method_id) {
                    this.accoError = this.$t('account.promptacco');
                } else if(!this.formItem.account){
                    this.accountError = this.$t('account.prompt');
                } else{
                   BNService.paymentMethodPut(this.formItem).then((data) => {
                            this.$Message.success(this.$t('wallet.succeed'));
                            this.accoError='';
                            this.accountError=''
                    }).catch(()=>{
                        this.$Message.error(this.$t('wallet.defeated'));
                   })
                }
            }
        }
    }
</script>
