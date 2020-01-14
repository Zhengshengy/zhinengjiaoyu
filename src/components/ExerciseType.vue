/*
    题目类型提示模块
*/
<template>
    <div class="exercise-type">{{type[+exercise.type_id]}}<span style="color:red">{{typeTip[+exercise.type_id]}}</span>
        <span style="float: right; cursor: pointer;">
            <template v-if="exercise && exercise.id">
                <template v-if="exercise.is_collected">
                    <Icon type="ios-star" size="24" @click="handleCancelCollect(exercise.id)" />
                </template>
                <template v-else>
                    <Icon type="ios-star-outline" size="24" @click="handleCollect(exercise.id)" />
                </template>
            </template>
        </span>
    </div>
</template>
<script>
import BNConstants from '~/utils/BNConstants';

export default {
    name: 'AnswerInput',
    props: {
        exercise: Object,
        handleCollect: Function,
        handleCancelCollect: Function
    },
    data() {
        const types = {};
        types[BNConstants.QUESTION_TYPE.CHOICE] = this.$t('types.question.choice');
        types[BNConstants.QUESTION_TYPE.FILL] = this.$t('types.question.fill');
        types[BNConstants.QUESTION_TYPE.ANSWER] = this.$t('types.question.answer');

        const typeTips = {};
        typeTips[BNConstants.QUESTION_TYPE.CHOICE] = '';
        typeTips[BNConstants.QUESTION_TYPE.FILL] = this.$t('exam.question_tip');
        typeTips[BNConstants.QUESTION_TYPE.ANSWER] = this.$t('exam.question_tip');
        return {
            type: types,
            typeTip: typeTips
        };
    }
};
</script>