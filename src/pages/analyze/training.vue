/*
    智能分析开始训练页面
*/
<template>
    <div class="main-container">
        <div class="exam-main">
            <Error v-if="error && error.message">
                <div slot="message">
                    <div class="bn-active">{{error.message}}</div>
                </div>
            </Error>
            <div v-else-if="paperInfo.exercise" class="exam-main-container">
                <!-- left side -->
                <div class="exam-main-left" v-if="paperInfo">
                    <header>
                        <span class="analyze__tip">{{$t('analyze.tip')}}</span>
                        <span class="analyze__action bn-displayflex" style="min-width: 100px">
                          <span v-if="!resultState">
                              {{paperInfo.active_number || 1}}/{{paperInfo.total}}
                              <Button type="primary" size="small" v-if="paperInfo.complete_at"
                                      @click="jumpToResult"
                              >
                                  {{$t('exam.finish')}}
                              </Button>
                          </span>
                          <span v-else>
                              <span v-if="paperInfo.answer">{{$t(`types.answer.${paperInfo.answer.answer_check}`)}}</span>
                              <Button type="primary" size="small" v-if="paperInfo.active_number === paperInfo.total"
                                      @click="jumpToResult"
                              >
                                  {{$t('exam.finish')}}
                              </Button>
                              <Button type="primary" size="small" v-else @click="handleNext">
                                  {{$t('exam.next')}}
                              </Button>

                          </span>
                      </span>
                    </header>
                    <ExerciseType :exercise="paperInfo.exercise"
                                  :handleCollect="handleCollect"
                                  :handleCancelCollect="handleCancelCollect" />
                    <div class="exercise-content">
                        <KeynotePreview :images="paperInfo.exercise.images" />
                        <div v-if="isMobileLayout" class="frame-view-scroll-tip" >{{$t('exam.scroll_tip')}}</div>
                        <FeedbackBox
                                :feedbackState="feedbackState"
                                :changeFeedbackState="changeFeedbackState"
                                :handleFeedback="handleFeedback"
                                v-model="feedback"
                        />
                    </div>
                </div>

                <!-- right side -->
                <div class="exam-main-right">
                    <header>{{$t('exam.answer')}}</header>
                    <div class="exam-answer-main">
                        <div class="answer-state bn-theme-color" v-if="resultState">
                            {{$t('exam.correct')}} ：{{paperInfo.correct}} / {{paperInfo.total}}
                        </div>
                        <AnswerInput :exercise="paperInfo.exercise" :resultState="resultState" :testInfo="paperInfo" v-model="answer" />
                        <ExerciseControls
                                :answer="answer"
                                :testInfo="paperInfo"
                                :exercise="paperInfo.exercise"
                                :resultState="resultState"
                                :handleSubmit="handleSubmit"
                                :viewAnswer="viewAnswer"
                                :changeFeedbackState="changeFeedbackState"
                                :showBack="false"
                                :showSkip="false"
                                :images="paperInfo.exercise.images"
                        />
                    </div>
                </div>
            </div>
        </div>
        <CheckGrade :exercise="paperInfo.exercise" />
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import Error from '~/components/Error';
import BNRouteHelper from '~/utils/BNRouteHelper';
import AnswerInput from '~/components/AnswerInput';
import KeynotePreview from '~/components/KeynotePreview';
import ExerciseControls from '~/components/ExerciseControls';
import ExerciseType from '~/components/ExerciseType';
import FeedbackBox from '~/components/FeedbackBox';
import CheckGrade from "../../components/CheckGrade";

export default {
    layout: 'single',
    middleware: ['secret'],
    components: {
        CheckGrade,
        AnswerInput,
        KeynotePreview,
        ExerciseControls,
        ExerciseType,
        FeedbackBox,
        Error
    },
    data() {
        return {
            answer: '',
            feedbackState: false,
            feedback: '',
            error: null
        };
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
            resultState: Constants.PAPER.RESULT_STATE,
            paperInfo: Constants.PAPER.PAPER_INFO,
            feedbackHostId: Constants.PAPER.FEEDBACK_HOST_ID
        }),
        submitDisabled() {
            return !this.answer;
        }
    },
    mounted() {
        this.getAnalyzeExercise().catch((error) => {
            this.$Message.error(error.message);
            this.error = error;
        });
    },
    methods: {
        ...mapMutations({
            viewAnswer: Constants.PAPER.VIEW_ANSWER_MUTATION
        }),
        ...mapActions({
            getAnalyzeExercise: Constants.PAPER.GET_ANALYZE_EXERCISE,
            submitAnalyzeExercise: Constants.PAPER.SUBMIT_ANALYZE_EXERCISE,
            nextAnalyzeExercise: Constants.PAPER.NEXT_ANALYZE_EXERCISE,
            finishAnalyzeExercise: Constants.PAPER.FINISH_ANALYZE_EXERCISE,
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK,
            collectExercise: Constants.PAPER.COLLECT_EXERCISE,
            cancelCollectExercise: Constants.PAPER.CANCEL_COLLECT_EXERCISE
        }),
        changeFeedbackState(state) {
            if (this.feedbackState !== state) {
                this.feedbackState = state;
                this.feedback = '';
            }
        },
        async handleFeedback() {
            const content = this.feedback;
            const res = await this.submitFeedback({
                id: this.feedbackHostId,
                content
            });
            this.changeFeedbackState(false);
            this.$Message.success(this.$t('exam.thanks_feedback'));
        },
        handleSubmit() {
            const self = this;
            this.changeFeedbackState(false);
            self.submitAnalyzeExercise({
                id: self.paperInfo.id,
                number: self.paperInfo.active_number,
                answer: self.answer
            });
            self.answer = '';
        },
        handleNext() {
            const self = this;
            this.changeFeedbackState(false);
            this.nextAnalyzeExercise({
                id: self.paperInfo.id
            }).catch((error) => {
                this.$Message.error(error.message);
                this.error = error;
            });
            this.answer = '';
        },
        jumpToResult() {
            const self = this;
            this.changeFeedbackState(false);
            this.finishAnalyzeExercise({
                id: self.paperInfo.id
            });
            this.answer = '';
            BNRouteHelper.analyzeResult(this.$router);
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