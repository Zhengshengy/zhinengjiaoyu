/*
    智能分析专项训练页面
*/
<template>
    <div class="main-container">
        <div class="exam-main">
            <Error v-if="error && error.message">
                <div slot="message"><div class="bn-active">{{error.message}}</div></div>
            </Error>
            <div v-else-if="paperInfo.exercise" class="exam-main-container">
                <!-- left side -->
                <div class="exam-main-left">
                    <header>
                        <div>
                            <span v-if="paperInfo.ability">{{$t('analyze.cur_level')}}：{{level[`${paperInfo.ability.level}`]}}</span>
                            <span style="margin-left: 20px;">{{$t('analyze.target')}}：{{level[`${paperInfo.target_level}`]}}</span>
                        </div>
                        <div v-if="resultState">
                            <span v-if="paperInfo.answer">{{$t(`types.answer.${paperInfo.answer.answer_check}`)}}</span>
                            <Button type="primary" size="small" @click="handleNext">
                                {{ paperInfo.complete_at ? $t('exam.finish') : $t('exam.next')}}
                            </Button>
                        </div>
                        <div v-else-if="paperInfo && paperInfo.complete_at" >
                            <Button type="primary" size="small" @click="handleNext">
                                {{ paperInfo.complete_at ? $t('exam.finish') : $t('exam.next')}}
                            </Button>
                        </div>
                    </header>
                    <ExerciseType :exercise="paperInfo.exercise" />
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
                        <AnswerInput :exercise="paperInfo.exercise" :resultState="resultState" :testInfo="paperInfo" v-model="answer" />
                        <ExerciseControls
                                :answer="answer"
                                :testInfo="paperInfo"
                                :exercise="paperInfo.exercise"
                                :resultState="resultState"
                                :handleSubmit="handleSubmit"
                                :viewAnswer="viewAnswer"
                                :changeFeedbackState="changeFeedbackState"
                                :goBack="goBack"
                                :showSkip="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import Error from '~/components/Error';
import BNService from '~/services/BNService';
import BNUtils from '~/utils/BNUtils';
import BNRouteHelper from '~/utils/BNRouteHelper';
import AnswerInput from '~/components/AnswerInput';
import KeynotePreview from '~/components/KeynotePreview';
import ExerciseControls from '~/components/ExerciseControls';
import ExerciseType from '~/components/ExerciseType';
import FeedbackBox from '~/components/FeedbackBox';

export default {
    layout: 'single',
    middleware: ['secret'],
    components: {
        AnswerInput,
        KeynotePreview,
        ExerciseControls,
        ExerciseType,
        FeedbackBox,
        Error
    },
    data() {
        const levels = {};
        levels[BNConstants.LEVEL_TYPE.LEVEL_WEAK] = this.$t('types.level.level_weak');
        levels[BNConstants.LEVEL_TYPE.LEVEL_0] = this.$t('types.level.level_0');
        levels[BNConstants.LEVEL_TYPE.LEVEL_1] = this.$t('types.level.level_1');
        levels[BNConstants.LEVEL_TYPE.LEVEL_2] = this.$t('types.level.level_2');
        return {
            level: levels,
            answer: '',
            feedbackState: false,
            feedback: '',
            error: null,
            target: ((this.$route.query && this.$route.query.target) || BNConstants.LEVEL_TYPE.LEVEL_0)
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
        this.getTrainingExercise({
            'ability_id': this.$route.query.ability_id
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
            getTrainingExercise: Constants.PAPER.GET_TRAINING_EXERCISE,
            submitTrainingExercise: Constants.PAPER.SUBMIT_TRAINING_EXERCISE,
            nextTrainingExercise: Constants.PAPER.NEXT_TRAINING_EXERCISE,
            finishTrainingExercise: Constants.PAPER.FINISH_TRAINING_EXERCISE,
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK
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
            self.submitTrainingExercise({
                id: self.paperInfo.id,
                answer: self.answer
            });
            self.answer = '';
        },
        handleNext() {
            const self = this;
            this.changeFeedbackState(false);
            if (self.paperInfo.complete_at || self.paperInfo.active_number === self.paperInfo.total) {
                this.finishTrainingExercise({
                    id: self.paperInfo.id
                });
                BNRouteHelper.analyzeResult(this.$router);
            } else {
                this.nextTrainingExercise({
                    id: self.paperInfo.id
                }).catch((error) => {
                    this.$Message.error(error.message);
                    this.error = error;
                });
            }
            this.answer = '';
        },
        goBack() {
            this.changeFeedbackState(false);
            this.answer = '';
            BNRouteHelper.analyzeResult(this.$router);
        }
    }
};
</script>