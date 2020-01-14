/*
    知识点筛选页面
*/
<template>
    <div class="topic-fliter-layout">
        <div class="topic-fliter-wrap">
            <Collapse accordion class="topic-fliter-box">
                <Panel v-for="topic in topics" :key="topic.id">
                    {{topic.name}}
                    <ul slot="content">
                        <li v-for="child in topic.children" :key="child.id" @click="jumpToTopic(child.id)">
                            {{ child.name }}
                        </li>
                    </ul>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
import '~/assets/styles/topic/filter.scss';
import BNService from '~/services/BNService';
import BNConstants from '~/utils/BNConstants';
import BNUtils from '~/utils/BNUtils';
import BNRouteHelper from '../../utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: ['secret'],
    data() {
        return {
            value2: '1'
        };
    },
    async asyncData() {
        const course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        const topics = await BNService.getTopics({
            course
        });
        return {
            topics
        };
    },
    methods: {
        jumpToTopic(topic_id) {
            BNRouteHelper.topicCheck(this.$router, { topic_id });
        }
    },
};
</script>