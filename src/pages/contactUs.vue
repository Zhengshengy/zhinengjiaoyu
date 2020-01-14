/*
    联系我们
*/
<template>
    <div class="Content">
        <div class="container license">
            <h2>欢迎访问 www.YiDianDouBuNan.com（“本网站”）。</h2>
            <h2>联系我们</h2>
            <p>
                <a>info@YiDianDouBuNan.com</a>
            </p>
         </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    layout: 'single',
    middleware: 'auth',
    head: function() {
        return {
            title: this.$t('contactUs.title')
        };
    }
};
</script>