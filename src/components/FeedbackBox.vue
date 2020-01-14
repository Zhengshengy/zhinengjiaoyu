/*
    回馈控件
*/
<template>
    <div class="feedback-box" v-if="feedbackState">
        <Input :value="value" @input="updateFeedBack" type="textarea" :rows="4" v-bind:placeholder="$t('default.feedback_tip')" />
        <div class="action-box">
            <Button @click="changeFeedbackState(false)">{{$t('exam.cancel')}}</Button>
            <Button type="primary" @click="handleFeedback">{{$t('exam.ok')}}</Button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FeedbackBox',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        changeFeedbackState: Function,
        handleFeedback: Function,
        feedbackState: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateFeedBack(e) {
            this.$emit('input', e);
        }
    }
};
</script>