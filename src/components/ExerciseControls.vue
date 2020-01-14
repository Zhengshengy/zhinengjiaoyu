/*
做题控制按钮组，包含下一题，看不懂答案等
*/
<template>
    <div class="btn-group">
        <Button type="primary" size="small" long
                :disabled="resultState && testInfo.answer && testInfo.answer.answer!== '' || !(answer)"
                @click="handleSubmit">
            {{$t('exam.submit')}}
        </Button>
        <Button type="primary" size="small" long
                :disabled="!((resultState) || exercise.type_id !== 1) || (exercise && exercise.answer_viewed)"
                @click="viewAnswer">
            {{$t('exam.read_answer')}}
        </Button>
        <Button v-if="showSkip" :disabled="exercise && exercise.skipped" size="small" long @click="handleSkip">
            {{$t('exam.not_get')}}
        </Button>
        <Poptip v-if="showTopic" content="content" placement="left" trigger="hover">
            <Button size="small" long @click="onShowTopic">{{$t('exam.view_topic')}}</Button>
            <div class="topic-view" slot="content">
                <div v-for="(topic,idx) in exercise.topics" :key="topic.id" class="topic-view-item">
                    <h5>{{$t('exam.topic') + numberConvert[idx]}}</h5>
                    <p @click="viewTopic(topic.id,idx)">{{topic.name}}</p>
                </div>
            </div>
        </Poptip>
        <slot></slot>
        <Button size="small" long
                @click="changeFeedbackState(true)">
            {{$t('exam.want_feedback')}}
        </Button>
        <Button style="margin-top: 8px" size="small" long @click="learn" target="_blank">
            {{$t('exam.consulting')}}
        </Button>
        <Button v-if="showBack" size="small" long @click="onBack">
            {{$t('analyze.back')}}
        </Button>
        <Modal v-model="topicModal" :title="topicTitle" :footer-hide="true" width="800" height="800">
            <FrameView className="topic-model-view" :srcUrl="topicContent" :showTip="false"/>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import Constants from '~/actions/Constants';
    import BNUtils from '~/utils/BNUtils';
    import BNService from '~/services/BNService';
    import FrameView from '~/components/FrameView';
    import BNRouteHelper from '~/utils/BNRouteHelper';

    export default {
        name: 'ExerciseControls',
        components: {
            FrameView
        },
        props: {
            answer: {
                type: [String, Number],
                default: ''
            },
            exercise: Object,
            resultState: Boolean,
            handleSubmit: Function,
            viewAnswer: Function,
            handleSkip: Function,
            changeFeedbackState: Function,
            goBack: Function,
            showBack: {
                type: Boolean,
                default: true
            },
            showSkip: {
                type: Boolean,
                default: true
            },
            showTopic: {
                type: Boolean,
                default: true
            },
            clearFeedBack: {
                type: Function,
                default: (res) => {
                    return;
                }
            },
            testInfo: Object,
            images: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                numberConvert: [
                    this.$t('number.one'),
                    this.$t('number.two'),
                    this.$t('number.three'),
                    this.$t('number.four'),
                    this.$t('number.five'),
                    this.$t('number.six'),
                ],
                topicModal: false,
                topicTitle: '',
                topicContent: '',
                path: '',
                tempwindow: null,
            };
        },
        methods: {
            onBack() {
                if (this.goBack) {
                    this.goBack();
                } else {
                    this.$router.go(-1);
                }
            },
            onShowTopic() {
                this.clearFeedBack(0);
            },
            async viewTopic(topicId, idx) {
                this.clearFeedBack(0);
                BNRouteHelper.topicShow(this.$router, {topic_id: topicId});
            },
            learn() {
                this.$store.commit("checkgrade/showbox")
            }
        }
    };
</script>

