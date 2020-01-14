<template>
    <div class="v3-parent">
        <div class="v3-parent-title">
            <div class="v3-parent-line"></div>
            <h2>历年真题详解</h2>
            <div class="v3-parent-line"></div>
        </div>
        <p>高考要高分，当然要做历年真题。但在同一个知识点上，学生做上大概三几十条已经足够了。因为如果该学生其实不明白该知识点，那做三千条也没用。故本人工智能系统把每一条真题都一步一步地详细解析。同时会告诉学生该题是在考那几个知识点。那学生可以一做完那条真题便立刻复习相关的知识点。从而迖到拥有扎实的基本功，又懂迅速地解答高考真题。</p>
        <div class="v3-teacher-list">
            <ul>
                <li>
                    <div class="list-block"></div>
                    <div class="list-img">
                        <img  src="/client/images/teacher1.png"/>
                        <img  src="/client/images/teacher2.png"/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    import '~/assets/styles/introduce/teacher.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('examabalysis.title')
            };
        }
    }
</script>

<style scoped>

</style>