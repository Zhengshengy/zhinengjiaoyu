<!--Created by Bamboo on 2018/7/31.-->

<!--知识点展示页面-->

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
                        <div class="btn-group">
                            <Button size="small" long @click="onBack">
                                {{$t('analyze.back')}}
                            </Button>
                            <Button size="small" long
                                    @click="changeFeedbackState(true)">
                                {{$t('exam.want_feedback')}}
                            </Button>
                        </div>
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
    import BNService from '~/services/BNService';
    import BNRouteHelper from '~/utils/BNRouteHelper';
    import KeynotePlayer from '~/components/KeynotePlayer';
    import FeedbackBox from '~/components/FeedbackBox';

    export default {
        layout: 'single',
        middleware: ['secret'],
        components: {
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
            onBack() {
                if (this.goBack) {
                    this.goBack();
                } else {
                    this.$router.go(-1);
                }
            },
            async viewTopic() {
                this.changeFeedbackState(false);
                const topic_id = this.$route.query.topic_id;
                this.topic.topic.url += ' ';
                const topic = await BNService.getCurTopic({ id: topic_id });
                this.topic = topic;
                BNRouteHelper.refreshQuery(this.$router, { topic_id: this.topic.topic.id });
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
            }
        }
    };
</script>