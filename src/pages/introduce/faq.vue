<template>
    <div class="Content">
        <div class="container license">
            <h2>如何购买服务？</h2>
            <p>很多公司要你预付一大笔款，或者销售人员会游说你预购很多课程。我们并不会这样，你需要购买什么课程，就充值多少即可。</p>

            <h2>如何退款？</h2>
            <p>你可随时通知我们，把你账户上剩余的款项，扣除第三方费用后（比如你的银行收费），退回给你。但如果你账户上的余款不足以付第三方费用，则无法退还。</p>

            <h2>如何投诉？</h2>
            <p>我们很重视用户的体验。请电邮我们你的宝贵意见。我们有专门的部门处理。我们的高管会亲自管理所有的用户意见。</p>

            <h2>李铮教授的</h2>
            <p>微信公众号：DLI201807public</p>
            <p>微博公众号手机：http://weibo.cn/lizhengjiaoshou</p>
            <p>微信公众号PC：http://weibo.com/lizhengjiaoshou</p>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('faq.title')
            };
        }
    };
</script>


<style scoped>

</style>