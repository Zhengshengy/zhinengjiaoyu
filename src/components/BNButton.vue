/*
    按钮封装类，包含动态Spinner效果
*/
<template>
    <Button @click="handleClick" :type="type" :loading="busy">
        <slot />
    </Button>
</template>
<script>
export default {
    name: 'BNButton',
    props: {
        onClick: Function,
        type: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            busy: false
        };
    },
    methods: {
        handleClick(e) {
            if (!this.busy && !this.disabled) {
                this.setBusy(true);
                this.onClick && this.onClick(e, this.done);
            }
        },
        done() {
            this.setBusy(false);
        },
        setBusy(busy) {
            this.busy = busy;
        }
    }
};
</script>