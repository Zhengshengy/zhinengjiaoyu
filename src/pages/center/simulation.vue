/*
用户主页，模拟题页面
*/
<template>
    <CenterLayout activeName="c2-3" :isResponse="true" >
        <div slot="content" >
            <Error :showMenu="false">
                <div slot="message"><div class="bn-active">{{$t('errors.no_simulation')}}</div></div>
            </Error>
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