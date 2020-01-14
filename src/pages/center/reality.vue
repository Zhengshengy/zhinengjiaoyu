/*
    用户主页，真题页面
*/
<template>
    <CenterLayout activeName="c2-2" :isResponse="true" >
        <div v-if="!realityList.length" slot="content" >
            <Error v-if="dataReady" :showMenu="false">
                <div slot="message"><div class="bn-active">{{$t('errors.no_data')}}</div></div>
            </Error>
            <Spin v-else fix size="large"></Spin>
        </div>
        <div v-else class="reality-list" slot="content">
            <div class="reality-item ivu-card ivu-card-bordered"
                 v-for="reality in realityList" :key="reality.id">
                <div>
                    <h4>{{reality.name}}</h4>
                    <p>
                        <span><Icon type="android-time"></Icon>{{`${$t('center.create_time')}： ${reality.created_at || ''}`}}</span>
                        <span class="progress-wrap">{{$t('center.progress')}}<span class="progress">{{`${reality.done_ratio.toFixed(2)}%`}}</span></span>
                    </p>
                </div>
                <div>
                    <Button type="primary" @click="onContinue(reality)">{{$t('center.continue')}}</Button>
                </div>
            </div>
        </div>
    </CenterLayout>
</template>

<script>
import '~/assets/styles/center/reality.scss';
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNService from '~/services/BNService';
import BNUtils from '~/utils/BNUtils';
import BNTracking from '~/utils/BNTracking';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';
import CenterLayout from '~/components/CenterLayout';
import Error from '~/components/Error';

export default {
    layout: 'single',
     middleware: ['secret','center'],
    components: {
        CenterLayout,
        Error
    },
    data() {
        return {
            realityList: [],
            dataReady: false
        };
    },
    mounted() {
        this.dataReady = false;
        BNService.userReality(this.selectCourse()).then((res) => {
            this.realityList = res;
            this.dataReady = true;
        });
    },
    methods: {
        selectCourse() {
            return BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        },
        onContinue(reality) {
            this.startTest({
                course: this.selectCourse(),
                topic: -1,
                paper: reality.id
            }).then(() => {
                this.getPaperExercise({ paper_id: reality.id, topic_id: -1 }).then(() => {
                    BNRouteHelper.passStartExam(
                        this.$router,
                        {
                            paper_id: reality.id,
                            topic_id: -1
                        }
                    );
                });
            });
        },
        ...mapActions({
            startTest: Constants.EXAM.START_TEST,
            getPaperExercise: Constants.EXAM.GET_PAPER_EXERCISE
        })
    }
};
</script>