<template>
    <div>
        <Modal :check="check" v-model="show" width="360" @on-cancel="cancel">
            <p slot="header" style="color:#2db7f5;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>选择年级</span>
            </p>
            <div style="text-align: center">
                <Select v-model="grade"   style="width:300px">
                    <Option v-for="item in grades" :value="item.grade.id" :key="item.id">{{ item.grade.name }}</Option>
                </Select>
            </div>
            <Button type="info" size="large" long @click="sure" style="margin-top: 20px">确定</Button>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import BNService from '~/services/BNService';
    import BNUtils from '~/utils/BNUtils';
    import BNConstants from '~/utils/BNConstants';
    export default {
        name: 'CheckGrade',
        data() {
            return {
                grade:'',
                show: false,
                grades:[]
            };
        },
        props: {
            exercise: Object,
        },
        async mounted() {
            let course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
            BNService.getStudentGrade(course).then((data) => {
               this.grades = data
            });
        },
        computed: {
            check() {
                this.show = this.$store.state.checkgrade.check;
            }
        },
        methods: {
            sure() {
                 const {href} = this.$router.resolve({
                    name: 'center-learning',
                    query: {
                        exercise: this.exercise.id,
                        grade:this.grade,
                        type:1
                    }
                });
                    this.$store.commit("checkgrade/nonebox")
                    this.tempwindow = window.open('_blank')
                    this.tempwindow.location = href
                // if (!this.tempwindow) {
                //     this.$store.commit("checkgrade/nonebox")
                //     this.tempwindow = window.open('_blank')
                //     this.tempwindow.location = href
                //     if (this.tempwindow.closed) {
                //         this.tempwindow = null
                //     }
                // } else {
                //     this.$Message.error("请勿重复点击")
                // }
            },
            cancel() {
                this.$store.commit("checkgrade/nonebox")
            }
        }
    }
</script>
<style >
</style>

