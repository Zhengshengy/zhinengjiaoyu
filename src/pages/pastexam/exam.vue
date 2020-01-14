/*
    历史真题考试页面
*/
<template>
    <div class="main-container">
        <div class="exam-main">
            <div class="exam-main-container">
                <div class="exam-main-left">
                    <header>
                        <span>{{testInfo.name}}</span>
                        <span>
                            <span v-if="resultState || exercise.skipped">
                                <span v-if="result.answer">{{$t(`types.answer.${result.answer.answer_check}`)}}</span>
                                <Button type="primary" size="small" @click="handleNext">
                                    {{ testInfo.current === testInfo.total ? $t('exam.finish') : $t('exam.next')}}
                                </Button>
                            </span>
                            <span v-else>
                               {{testInfo.current || 1}}/{{testInfo.total}}
                                <Button v-if="testInfo.complete_at" type="primary" size="small" @click="handleNext">
                                    {{ $t('exam.finish')}}
                                </Button>
                            </span>
                        </span>
                    </header>
                    <ExerciseType :exercise="exercise"
                                  :handleCollect="handleCollect"
                                  :handleCancelCollect="handleCancelCollect" />
                    <div class="exercise-content">
                        <KeynotePreview :images="exercise.images" />
                        <div v-if="isMobileLayout" class="frame-view-scroll-tip" >{{$t('exam.scroll_tip')}}</div>
                        <FeedbackBox
                                :feedbackState="feedbackState === 1"
                                :changeFeedbackState="changeFeedbackState"
                                :handleFeedback="handleFeedback"
                                v-model="feedback"
                        />
                    </div>
                </div>
                <AnswerQuestion :topicId="topic_id" :clearFeedBack="clearFeedBack"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import BNConstants from '~/utils/BNConstants';
import AnswerQuestion from '~/components/AnswerQuestion';
import ExerciseType from '~/components/ExerciseType';
import FeedbackBox from '~/components/FeedbackBox';
import KeynotePreview from '~/components/KeynotePreview';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: ['secret'],
    components: {
        AnswerQuestion,
        FeedbackBox,
        ExerciseType,
        KeynotePreview
    },
    data() {
        return {
            feedback: '',
            topic_id: '-1',
            paper_id: '-1'
        };
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
            testInfo: Constants.EXAM.TEST_INFO,
            paper: Constants.EXAM.PAPER,
            exercise: Constants.EXAM.EXERCISE,
            feedbackState: Constants.EXAM.FEEDBACK_STATE,
            feedbackType: Constants.EXAM.FEEDBACK_TYPE,
            feedbackHostId: Constants.EXAM.FEEDBACK_HOST_ID,
            resultState: Constants.EXAM.RESULT_STATE,
            result: Constants.EXAM.RESULT
        })
    },
    mounted() {
        this.paper_id = `${this.$route.query.paper_id || BNUtils.readCookie(BNConstants.COOKIES.PAPER)}`;
        this.topic_id = `${this.$route.query.topic_id || BNUtils.readCookie(BNConstants.COOKIES.TOPIC)}`;
        this.getPaperExercise({ paper_id: this.paper_id, topic_id: this.topic_id });
        this.feedback = '';
        this.changeFeedbackState(0);
    },
    methods: {
        ...mapMutations({
            changeFeedbackState: Constants.EXAM.CHANGE_FEEDBACK_STATE_MUTATION
        }),
        ...mapActions({
            getPaperExercise: Constants.EXAM.GET_PAPER_EXERCISE,
            nextExercise: Constants.EXAM.NEXT_EXERCISE,
            finishExercise: Constants.EXAM.FINISH_EXERCISE,
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK,
            collectExercise: Constants.EXAM.COLLECT_EXERCISE,
            cancelCollectExercise: Constants.EXAM.CANCEL_COLLECT_EXERCISE
        }),
        clearFeedBack() {
            this.feedback = '';
            this.changeFeedbackState(0);
        },
        async handleFeedback() {
            const content = this.feedback;
            const res = await this.submitFeedback({
                type: this.feedbackType,
                id: this.feedbackHostId,
                content
            });
            this.feedback = '';
            this.changeFeedbackState(0);
            this.$Message.success(this.$t('exam.thanks_feedback'));
        },
        handleNext() {
            this.feedback = '';
            this.changeFeedbackState(0);
            if (this.testInfo.current === this.testInfo.total) {
                this.finishExercise({
                    topic_id: this.topic_id,
                    id: this.testInfo.id,
                    exercise_id: this.exercise.id,
                }).then((data) => {
                    BNRouteHelper.passExam(this.$router);
                });
            } else {
                this.nextExercise({
                    topic_id: this.topic_id,
                    id: this.testInfo.id,
                    exercise_id: this.exercise.id,
                });
            }
        },
        handleCollect(exercise_id) {
            this.collectExercise({"exercise_id": exercise_id}).then((res) => {
                this.$Message.success(res.message);
            }).catch((error) => {
                this.$Message.error(error.message);
            });
        },
        handleCancelCollect(exercise_id) {
            this.cancelCollectExercise({"exercise_id": exercise_id}).then((res) => {
                this.$Message.success(res.message);
            }).catch((error) => {
                this.$Message.error(error.message);
            });
        }
    }
};
</script>