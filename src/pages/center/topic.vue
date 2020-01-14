/*
    用户主页，知识点页面
*/
<template>
    <CenterLayout activeName="c2-1" class="bn-topic-con">
        <div slot="content" v-if="!topicList.length">
            <Error v-if="dataReady" :showMenu="false">
                <div slot="message"><div class="bn-active">{{$t('errors.no_data')}}</div></div>
            </Error>
            <Spin v-else fix size="large"></Spin>
        </div>
        <Collapse v-else slot="content" class="center-topic-box">
            <Panel v-for="topic in topicList" :key="topic.id" :name="String(topic.id)" class="topic-item">
                {{ topic.name }}<span v-if="false" @click="onViewTopic(topic.id)">{{`${(topic.answered * 100/(topic.total || 1)).toFixed(0)}%`}}</span>
                <div slot="content" v-for="(item,index) in topic.children" :key="index" class="topic-sub-item">
                        <p>{{ item.name }}<span @click="onViewTopic(item.id)" style="cursor: pointer; color: #2A73FB">{{`${(item.answered * 100/(item.total || 1)).toFixed(0)}%`}}</span></p>
                </div>
            </Panel>
        </Collapse>
    </CenterLayout>
</template>

<script>
import '~/assets/styles/center/topic.scss';
import BNService from '~/services/BNService';
import CenterLayout from '~/components/CenterLayout';
import Error from '~/components/Error';
import BNUtils from '~/utils/BNUtils';
import BNTracking from '~/utils/BNTracking';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: ['secret','center'],
    components: {
        CenterLayout,
        Error
    },
    data() {
        return {
            topicList: [],
            dataReady: false
        };
    },
    async mounted() {
        this.dataReady = false;
        BNService.userKnowledge(this.selectCourse()).then((data) => {
            this.topicList = data;
            this.dataReady = true;
        });
    },
    methods: {
        selectCourse() {
            return BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        },
        onViewTopic(topic_id) {
            BNRouteHelper.topicExercise(this.$router, { topic_id });
        }
    }
};
</script>