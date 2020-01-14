/*
销售政策
*/
<template>
    <div class="Content">
        <div class="container license">
            <h2>欢迎访问 www.YiDianDouBuNan.com（“本网站”）。</h2>
            <h2>销售政策</h2>
            <p>
                行为准则<br/>
                我们努力确保提供公平、可信赖体验。<br/>
                遵守所有适用法律、法规和所有本网站的政策。<br/>
                维护当前账户信息。<br/>
                如实表述。<br/>
                不得发布有違法规道德的信息。<br/>
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
            title: this.$t('salesPolicy.title')
        };
    }
};
</script>