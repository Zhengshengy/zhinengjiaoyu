<template>
    <div class="pay-container">
        <iframe :src="srcUrl"></iframe>
    </div>
</template>
<script>
    import BNUtils from '~/utils/BNUtils';
    export default  {
       middleware: ['secret','center'],
        layout: 'single',
        data () {
            return {
                srcUrl: `${BNUtils.domain()}pay/?type=${this.$route.query.type}&order_no=${this.$route.query.order_no}`
            };
        },
        mounted() {},
        methods: { }
    }
</script>
<style>
    .pay-container{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    iframe{
        -webkit-overflow-scrolling:touch;
        border: none;
        width: 100%;
        height: 100%;
    }
</style>
