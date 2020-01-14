/*
    知识点做题页面
*/
<template>
    <div class="main-container">
        <div class="exam-main">
            <Error v-if="error && error.message">
                <div slot="message"><div class="bn-active">{{error.message}}</div></div>
            </Error>
            <div v-else class="exam-main-container">
                <!-- left side -->
                <div v-if="paperInfo && paperInfo.topic" class="exam-main-left">
                    <header>
                        <div>
                            {{paperInfo.topic.name}}
                        </div>
                        <div v-if="resultState || (paperInfo.exercise && paperInfo.exercise.skipped)">
                            <span v-if="paperInfo.answer">{{ $t(`types.answer.${paperInfo.answer.answer_check}`)}}</span>
                            <Button type="primary" size="small" @click="handleNext">
                                {{ paperInfo.active_number === paperInfo.topic.total ? $t('exam.finish') : $t('exam.next')}}
                            </Button>
                        </div>
                        <div v-else>
                            {{paperInfo.active_number}}/{{paperInfo.topic.total}}
                            <Button v-if="paperInfo.complete_at" type="primary" size="small" @click="handleNext">
                                {{ $t('exam.finish') }}
                            </Button>
                        </div>
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
                <div v-if="paperInfo && paperInfo.topic" class="exam-main-right">
                    <header>{{$t('exam.answer')}}</header>
                    <div class="exam-answer-main">
                        <div class="answer-state bn-theme-color" v-if="resultState">
                            <span>{{$t('exam.correct')}} ：{{paperInfo.correct}} </span>
                            <span>{{$t('exam.error')}} ：{{paperInfo.error}} </span>
                        </div>
                        <AnswerInput :exercise="paperInfo.exercise" :resultState="resultState" :testInfo="paperInfo" v-model="answer" />
                        <ExerciseControls
                            :answer="answer"
                            :testInfo="paperInfo"
                            :exercise="paperInfo.exercise"
                            :resultState="resultState"
                            :handleSubmit="handleSubmit"
                            :viewAnswer="viewAnswer"
                            :handleSkip="handleSkip"
                            :changeFeedbackState="changeFeedbackState"
                            :showTopic="false"
                            :goBack="goBack"
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
import BNService from '~/services/BNService';
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
        AnswerInput,
        KeynotePreview,
        ExerciseControls,
        ExerciseType,
        FeedbackBox,
        Error,
        CheckGrade
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
    async mounted() {
        const topic_id = this.$route.query.topic_id;
        this.getTopicPaper({
            topic_id
        }).catch((error) => {
            this.$Message.error(error.message);
            this.error = error;
        });
    },
    methods: {
        ...mapMutations({
            viewAnswer: Constants.PAPER.VIEW_ANSWER_MUTATION
        }),
        ...mapActions({
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK,
            getTopicPaper: Constants.PAPER.GET_TOPIC_PAPER,
            submitTopicExercise: Constants.PAPER.SUBMIT_TOPIC_EXERCISE,
            nextTopicExercise: Constants.PAPER.NEXT_TOPIC_EXERCISE,
            finishTopicExercise: Constants.PAPER.FINISH_TOPIC_EXERCISE,
            skipTopicExercise: Constants.PAPER.SKIP_TOPIC_EXERCISE,
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
            self.submitTopicExercise({
                id: self.paperInfo.id,
                number: self.paperInfo.active_number,
                answer: self.answer
            });
            self.answer = '';
        },
        handleNext() {
            const self = this;
            this.changeFeedbackState(false);
            if (self.paperInfo.active_number === self.paperInfo.topic.total) {
                this.finishTopicExercise({
                    id: self.paperInfo.id
                }).then(() => {
                    BNRouteHelper.topicCheck(this.$router, { topic_id: self.paperInfo.topic.id });
                });
            } else {
                this.nextTopicExercise({
                    id: self.paperInfo.id
                });
            }
            this.answer = '';
        },
        handleSkip() {
            const self = this;
            this.changeFeedbackState(false);
            // if (self.paperInfo.active_number === self.paperInfo.topic.total) {
            //    this.finishTopicExercise({
            //        id: self.paperInfo.id
            //    }).then(() => {
            //        BNRouteHelper.topicCheck(this.$router, { topic_id: self.paperInfo.topic.id });
            //    });
            // } else {
            this.skipTopicExercise({
                id: self.paperInfo.id,
                exercise_id: self.paperInfo.exercise.id
            }).then(() => {
                this.$Message.success(this.$t('exam.skip_tip'));
            });
            // }
            self.answer = '';
        },
        goBack() {
            this.changeFeedbackState(false);
            BNRouteHelper.topicCheck(this.$router, { topic_id: this.paperInfo.topic.id });
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