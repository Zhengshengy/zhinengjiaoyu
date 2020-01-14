/*
    历史真题选择页面
*/
<template>
    <div class="main-container">
        <div class="exam-main exam-main-select">
            <div class="select-title">{{$t('exam.select_exam')}}</div>
            <Form class="select-form" :label-width="80">
                <FormItem v-bind:label="$t('exam.year_type')" prop="city">
                    <Cascader :data="paper" :value="type" @on-change="selType" v-bind:placeholder="$t('exam.select')"></Cascader>
                </FormItem>
                <FormItem v-bind:label="$t('exam.topic')" prop="city" :class="{'not-found':!topics.length}">
                    <Select v-if="!topics.length"
                        v-bind:placeholder="$t('exam.select')" not-found-text="请先选择年份/类型">
                    </Select>
                    <Select v-else v-model="topic" v-bind:placeholder="$t('exam.select')">
                        <Option v-for="item in topics" :key="item.id" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <div class="select-submit">
                    <Button class="select-submit__button" type="primary" size="large" @click="submit" >{{$t('exam.submit')}}</Button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import '~/assets/styles/pastexam/select.scss';
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNService from '~/services/BNService';
import BNUtils from '~/utils/BNUtils';
import BNTracking from '~/utils/BNTracking';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: ['secret'],
    data() {
        return {
            paper: [],
            type: [],
            topics: [],
            topic: -1,
            paperId: ''
        };
    },
    async mounted() {
        BNService.getRealityPaper(this.selectCourse()).then((orig_paper) => {
            let new_paper = {};
            orig_paper.map((item) => {
                if (new_paper[item.period]) {
                    new_paper[item.period].push(item);
                } else {
                    new_paper[item.period] = [];
                    new_paper[item.period].push(item);
                }
                return item;
            });

            const papers = [];
            for (let key in new_paper) {
                let val = new_paper[key];
                papers.push({
                    id: papers.length + 1,
                    period: key,
                    paper: val
                });
            }

            papers.map((item) => {
                item.label = item.period;
                item.value = item.id;
                item.children = item.paper;
                item.children && item.children.map(d => {
                    d.label = d.title;
                    d.value = d.id;
                    return d;
                });
                return item;
            });
            this.paper = papers;
        }).catch((error) => {
            this.$Message.error(error.message);
        });
    },
    methods: {
        selectCourse() {
            return BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        },
        selType(type) {
            if (type.length > 0) {
                const curType = this.paper.filter((d) => (d.id === type[0]));
                const curTopic = curType[0].paper.filter((d) => (d.id === type[1]));
                const selectAll = [{ id: 0, name: this.$t('exam.select_all') }];
                this.type = type;
                this.paperId = curTopic[0].id;
                this.topics = selectAll.concat(curTopic[0].topics);
                this.topic = -1;
            } else {
                this.type = type;
                this.paperId = '';
                this.topics = [];
                this.topic = -1;
            }
        },
        submit() {
            if (this.topic < 0) {
                this.$Message.info(this.$t('exam.select_year_type_topic'));
                return;
            }
            this.startTest({
                course: this.selectCourse(),
                topic: this.topic,
                paper: this.paperId
            }).then(() => {
                this.getPaperExercise({ paper_id: this.paperId, topic_id: this.topic }).then(() => {
                    BNRouteHelper.passStartExam(
                        this.$router,
                        {
                            paper_id: this.paperId,
                            topic_id: this.topic
                        }
                    );
                });
            });
        },
        ...mapActions({
            startTest: Constants.EXAM.START_TEST,
            getPaperExercise: Constants.EXAM.GET_PAPER_EXERCISE,
        })
    }
};
</script>