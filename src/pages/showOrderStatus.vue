<template>
<div class="pay-status-container">
        <div class="paysuccess">
            <ul>
                <li class="payIcon" :style="font_color">
                    <template v-if="pay_waiting">
                        <Icon type="ios-information-circle-outline" />
                        {{ status_text }}
                    </template>
                    <template v-if="pay_canceled">
                        <Icon type="md-checkmark-circle-outline" />
                        {{ status_text }}
                    </template>
                    <template v-if="pay_failed">
                        <Icon type="md-checkmark-circle-outline" />
                        {{ status_text }}
                    </template>
                    <template v-if="pay_succeeded">
                        <Icon type="md-checkmark-circle-outline" />
                        {{ status_text }}
                    </template>
                    <!--<template v-if="pay_processing">-->
                        <!--<Icon type="ios-information-circle-outline" />-->
                        <!--{{ status_text }}-->
                    <!--</template>-->
                </li>
                <!--<li class="payInformation">-->
                <!--您已通过招商银行网上支付<p>￥<label>2345</label></p>-->
                <!--</li>-->
                <li v-if="pay_succeeded" class="payOrder" @click="close" style="cursor: pointer;">[ {{$t('default.view_orders')}} ]</li>
                <template v-if="qrcode && pay_waiting">
                    <li>
                        <div>
                            <template v-if="pollCount >= maxPullCount">
                                <div></div>
                            </template>
                            <template v-else>
                                <div style="" v-html="qrcode"></div>
                            </template>
                        </div>
                    </li>
                    <li class="payOrder" style="cursor: pointer;">{{$t('default.pay_by_wechat_app')}}</li>
                </template>
            </ul>
        </div>

        <!--<Spin fix><a @click="close" href="javascript:void(0)">{{ pay_status }}  关闭...</a></Spin>-->
    </div>
</template>
<script>
    import BNUtils from '~/utils/BNUtils';
    import BNConstants from '~/utils/BNConstants';
    import BNService from '~/services/BNService';
    import '~/assets/styles/center/pay.scss';
    const MAX_POLL_COUNT = 150;

    export default  {
        middleware: ['secret','center'],
        layout: 'blank',
        data () {
            return {
                charge_status: this.$route.query.charge_status,
                maxPullCount: MAX_POLL_COUNT,
                pollCount: 0,
                status: 0,
                qrcode: ''
            };
        },
        computed: {
            pay_waiting() {
                return this.status === BNConstants.PAY_STATUS.WAITING;
            },
            pay_canceled() {
                return this.status === BNConstants.PAY_STATUS.CANCELLED;
            },
            pay_failed() {
                return this.status === BNConstants.PAY_STATUS.FAILED;
            },
            // pay_processing() {
            //     return this.status === BNConstants.PAY_STATUS.PROCESSING;
            // },
            pay_succeeded() {
                return this.status === BNConstants.PAY_STATUS.SUCCEEDED;
            },
            status_text() {
                return this.$t(`pay_status.${this.status}`);
            },
            font_color() {
                if (this.pay_succeeded) return 'color: #19be6b';
                if (this.pay_canceled || this.pay_failed) return 'color: #ed4014';
                // if (this.pay_processing || this.pay_waiting) return 'color: #2db7f5';
            }
        },
        mounted() {
            this.order_no = this.$route.query.order_no;
            // this.status = parseInt(this.$route.query.status, 10);

            // if (this.$route.query.qrcode && String(this.$route.query.qrcode).length > 0)
            // {
            //     this.getQrCode(this.$route.query.qrcode);
            // }
            //
            // if (this.pay_waiting || this.pay_processing)
            // {
            //     this.pollOrderStatus();
            // }
            BNService.getOrderStatus({ order_no: this.order_no }).then((res) => {
                    this.status = parseInt(res.source_status, 10);
                    if (this.pollCount >= this.maxPullCount) return;

                    if (this.pay_waiting)
                    {
                        this.pollCount++;
                        setTimeout(this.pollOrderStatus, 2000);
                    }
                });
        },
        methods: {
            previous_page(){
                console.log(window.history.length)
            },
            close() {
                window.close()
                window.parent.location.replace(`${window.parent.location.origin}/client/center/wallet`)

            },
            pollOrderStatus() {
                BNService.getOrderStatus({ order_no: this.order_no }).then((res) => {
                    this.status = parseInt(res.source_status, 10);

                    if (this.pollCount >= this.maxPullCount) return;

                    if (this.pay_waiting || this.pay_processing)
                    {
                        this.pollCount++;
                        setTimeout(this.pollOrderStatus, 2000);
                    }
                });
            },
            async getQrCode(qrcode) {
                return BNService.getQrCode({'qrcode': qrcode}).then(data => {
                    this.qrcode = data.data;
                });
            }
        }
    }
</script>
<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .pay-status-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>