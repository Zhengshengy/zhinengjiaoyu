/*
    题目控制模块
*/
<template>
    <div class="exam-main-right">
        <header>{{$t('exam.answer')}}</header>
        <div class="exam-answer-main">
            <div class="exam-answer-input-control">
                <div class="answer-state" v-if="resultState">
                    <span>{{`${$t('exam.error')}：${result.error}`}}</span>
                    <span class="bn-theme-color">{{`${$t('exam.correct')}：${result.correct}`}}</span>
                    <span>{{`${$t('exam.total')}：${result.paper.score}`}}</span>
                    <span class="bn-theme-color">{{`${$t('exam.gain')}：${result.gain}`}}</span>
                </div>
                <AnswerInput :exercise="exercise" :resultState="resultState" :testInfo="testInfo" v-model="answer" />
            </div>
            <ExerciseControls
                    :answer="answer"
                    :exercise="exercise"
                    :testInfo="testInfo"
                    :resultState="resultState"
                    :handleSubmit="handleSubmit"
                    :viewAnswer="viewAnswer"
                    :handleSkip="handleSkip"
                    :clearFeedBack="clearFeedBack"
                    :changeFeedbackState="changeFeedbackState"
                    :showBack="false"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import BNService from '~/services/BNService';
import BNRouteHelper from '~/utils/BNRouteHelper';
import AnswerInput from '~/components/AnswerInput';
import ExerciseControls from '~/components/ExerciseControls';

export default {
    name: 'AnswerQuestion',
    components: {
        AnswerInput,
        ExerciseControls
    },
    props: {
        topics: {
            type: Array,
            default() {
                return [];
            }
        },
        topicId: {
            type: String,
            default: '-1'
        },
        clearFeedBack: {
            type: Function,
            default: (res) => {
                return;
            }
        }
    },
    data() {
        return {
            answer: '',
            // answerState: false,
            numberConvert: [
                this.$t('number.one'),
                this.$t('number.two'),
                this.$t('number.three'),
                this.$t('number.four'),
                this.$t('number.five'),
                this.$t('number.six'),
            ]
        };
    },
    computed: {
        ...mapGetters({
            testInfo: Constants.EXAM.TEST_INFO,
            paper: Constants.EXAM.PAPER,
            exercise: Constants.EXAM.EXERCISE,
            resultState: Constants.EXAM.RESULT_STATE,
            result: Constants.EXAM.RESULT,
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        }),
        submitDisabled() {
            return !this.answer;
        }
    },
    watch: {
        resultState(val) {
            !val && (this.answer = '');
        }
    },
    methods: {
        ...mapActions({
            submitAnswer: Constants.EXAM.SUBMIT_ANSWER,
            skipExercise: Constants.EXAM.SKIP_EXERCISE,
            viewAnswer: Constants.EXAM.VIEW_ANSWER
        }),
        ...mapMutations({
            changeFeedbackState: Constants.EXAM.CHANGE_FEEDBACK_STATE_MUTATION
        }),
        handleSubmit() {
            // id:  测试id;
            // number:  题号;
            // answer:  答案;
            this.clearFeedBack(0);
            this.submitAnswer({
                id: this.testInfo.id,
                number: this.testInfo.active_number,
                exercise_id: this.exercise.id,
                answer: this.answer,
                topic_id: this.topicId
            });
            // this.answer = '';
        },
        handleSkip() {
            this.clearFeedBack(0);
            // if (this.testInfo.total === this.testInfo.current /*&& this.testInfo.total === 1*/) {
            //    BNRouteHelper.passExam(this.$router);
            //    this.answer = '';
            // } else {
            this.skipExercise({
                id: this.testInfo.id,
                exercise_id: this.exercise.id,
                topic_id: this.topicId
            }).then(() => {
                this.$Message.success(this.$t('exam.skip_tip'));
            });
            this.answer = '';
            // }
        }
    },
};
</script>