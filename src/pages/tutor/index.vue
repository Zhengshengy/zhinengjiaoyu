<!--Created by Bamboo on 2018/9/6.-->
<template>
  <div slot="content">
    {{ $t('console.content') }}
  </div>
</template>
<script>
    import BNService from '~/services/BNService';
    export default {
        layout: 'tutor',
        middleware: ['secret','tutor'],
        components: {},
    }
</script>
<style scoped>
    header {
        max-width: 800px;
        font-size: large;
    }
</style>
