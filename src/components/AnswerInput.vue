/*
    题目答案选择展示模块
*/
<template>
    <div class="answer-input-wrap">
        <RadioGroup vertical v-if="+exercise.type_id===1" :value="value||(testInfo && testInfo.answer && testInfo.answer.answer)" @input="updateAnswer">
            <Radio label="A" :disabled="inputDisabled()"></Radio>
            <Radio label="B" :disabled="inputDisabled()"></Radio>
            <Radio label="C" :disabled="inputDisabled()"></Radio>
            <Radio label="D" :disabled="inputDisabled()"></Radio>
        </RadioGroup>
        <RadioGroup v-else :value="value||(testInfo && testInfo.answer && testInfo.answer.answer)" type="button" @input="updateAnswer">
            <Radio label="1" :disabled="inputDisabled()" @input="updateAnswer">
                {{$t('exam.correct')}}
            </Radio>
            <Radio label="0" :disabled="inputDisabled()" @input="updateAnswer">
                {{$t('exam.error')}}
            </Radio>
        </RadioGroup>
    </div>
</template>
<script>
export default {
    name: 'AnswerInput',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        exercise: Object,
        resultState: {
            type: Boolean,
            default: false,
        },
        testInfo: Object
    },
    methods: {
        inputDisabled() {
            let answered = '';
            if (this.testInfo && this.testInfo.answer) {
                answered = this.testInfo.answer.answer || this.value || '';
            }
            return (this.resultState && !this.exercise.skipped) ||
                (answered !== '') ||
                (this.testInfo && (this.testInfo.complete_at !== null));
        },
        updateAnswer(e) {
            this.$emit('input', e);
        }
    }
};
</script>