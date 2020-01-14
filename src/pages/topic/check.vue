/*
    知识点学习页面
*/
<template>
    <div class="main-container">
        <div class="exam-main">
            <div class="exam-main-container">
                <!-- left side -->
                <div class="exam-main-left">
                    <div class="exercise-type" style="margin-top: 0">{{topic.topic.name || ''}} </div>
                    <div class="exercise-content">
                        <KeynotePlayer :srcUrl="topic.topic.url" />
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
                    <div class="exam-answer-main">
                        <div class="btn-group btn-group-topic">
                            <Button type="primary" size="small" long :disabled="!topic.previous"
                                    @click="prevTopic"
                            >
                                {{$t('topic.last_topic')}}
                            </Button>
                            <Button type="primary" size="small" long :disabled="!topic.next"
                                    @click="nextTopic"
                            >
                                {{$t('topic.next_topic')}}
                            </Button>
                        </div>

                        <div class="btn-group">
                            <Button size="small" long :disabled="!topic.next || topic.skipped"
                                    @click="skipTopic">
                                {{$t('topic.not_get')}}
                            </Button>
                            <Button size="small" long @click="viewTopic"> {{$t('topic.view_topic')}}</Button>

                            <Button size="small" long
                                    @click="jumpToExercise">
                                {{$t('topic.do_exercise')}}
                            </Button>
                            <Button size="small" long
                                    @click="changeFeedbackState(true)">
                                {{$t('exam.want_feedback')}}
                            </Button>
                            <Button size="small" long
                                    @click="learn">
                                {{$t('exam.consulting')}}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <KnowledgeCheckGrade :videoId="topic.topic.id" />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import BNService from '~/services/BNService';
import BNRouteHelper from '~/utils/BNRouteHelper';
import KeynotePlayer from '~/components/KeynotePlayer';
import FeedbackBox from '~/components/FeedbackBox';
import KnowledgeCheckGrade from "../../components/KnowledgeCheckGrade";

export default {
    layout: 'single',
    middleware: ['secret'],
    components: {
        KnowledgeCheckGrade,
        KeynotePlayer,
        FeedbackBox
    },
    data() {
        return {
            topic: {
                topic: {}
            },
            answer: '',
            feedbackState: false,
            feedback: ''
        };
    },
    computed: {
        ...mapGetters({
            paperInfo: Constants.PAPER.PAPER_INFO,
            feedbackHostId: Constants.EXAM.FEEDBACK_HOST_ID
        })
    },
    mounted() {
        this.viewTopic();
    },
    methods: {
        ...mapActions({
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK,
            clearPaperInfo: Constants.PAPER.CLEAR_PAPER_INFO
        }),
        async prevTopic() {
            this.changeFeedbackState(false);
            const id = this.topic.topic.id;
            this.topic = await BNService.getPrevTopic({ id });
            BNRouteHelper.refreshQuery(this.$router, { topic_id: this.topic.topic.id });
        },
        async nextTopic() {
            this.changeFeedbackState(false);
            const id = this.topic.topic.id;
            this.topic = await BNService.getNextTopic({ id });
            BNRouteHelper.refreshQuery(this.$router, { topic_id: this.topic.topic.id });
        },
        async skipTopic() {
            this.changeFeedbackState(false);
            const id = this.topic.topic.id;
            BNService.getSkipTopic({ id }).then(() => {
                this.topic = Object.assign({}, this.topic, { skipped: true });
                this.$Message.success(this.$t('topic.skip_tip'));
            });
            // this.topic = await BNService.getSkipTopic({ id });
            // BNRouteHelper.refreshQuery(this.$router, { topic_id: this.topic.topic.id });
        },
        async viewTopic() {
            this.changeFeedbackState(false);
            const topic_id = this.$route.query.topic_id;
            this.topic.topic.url += ' ';
            const topic = await BNService.getCurTopic({ id: topic_id });
            this.topic = topic;
            console.log(topic)
            BNRouteHelper.refreshQuery(this.$router, { topic_id: this.topic.topic.id });
        },
        jumpToExercise() {
            this.changeFeedbackState(false);
            const topic_id = this.topic.topic.id;
            this.clearPaperInfo().then(() => {
                BNRouteHelper.topicExercise(this.$router, { topic_id });
            });
        },
        changeFeedbackState(state) {
            if (this.feedbackState !== state) {
                this.feedbackState = state;
                this.feedback = '';
            }
        },
        async handleFeedback() {
            const content = this.feedback;
            const res = await this.submitFeedback({
                id: this.topic && this.topic.topic && this.topic.topic.id,
                type: 'topic',
                content
            });
            this.changeFeedbackState(false);
            this.$Message.success(this.$t('exam.thanks_feedback'));
        },
        learn() {
            this.$store.commit("checkgrade/showbox")
        }
    }
};
</script>