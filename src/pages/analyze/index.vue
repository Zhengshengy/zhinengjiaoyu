/*
    智能分析默认页面，如果完成分析就进入结果页面，没有就开始训练
*/
<template>
    <div class="result-layout">
    </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNButton from '~/components/BNButton';
import BNUtils from '~/utils/BNUtils';
export default {
    layout: 'single',
    middleware: ['secret'],
    async mounted() {
        this.getAnalyzeExercise().then((data) => {
            if (data && data.is_completed) {
                BNRouteHelper.analyzeResult(this.$router);
            } else {
                BNRouteHelper.analyzeTraining(this.$router);
            }
        }).catch((error) => {
            this.$Message.error(error.message);
        });
    },
    methods: {
        ...mapActions({
            getAnalyzeExercise: Constants.PAPER.GET_ANALYZE_EXERCISE
        })
    }
};
</script>
