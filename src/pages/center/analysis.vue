/*
    用户主页，智能分析结果展示页面
*/
<template>
    <CenterLayout activeName="c1">
        <div slot="content" class="center-analysis">
            <div class="title">{{$t('links.analysis')}}</div>
            <Table :columns="tableTit" :data="analysisList"></Table>
        </div>
    </CenterLayout>
</template>

<script>
import '~/assets/styles/center/analysis.scss';
import BNService from '~/services/BNService';
import CenterLayout from '~/components/CenterLayout.vue';
import BNUtils from '~/utils/BNUtils';
import BNTracking from '~/utils/BNTracking';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: ['secret','center'],
    components: {
        CenterLayout
    },
    data() {
        const self = this;
        const level = {
            0: '/',
            1: '×',
            2: '✓',
        };
        const color = {
            0: 'black',
            1: 'red',
            2: 'green'
        };
        const fontSize = {
            0: '14px',
            1: '16px',
            2: '16px'
        };
        const mylevels = {};
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_WEAK] = this.$t('types.level.level_weak');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_0] = this.$t('types.level.level_0');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_1] = this.$t('types.level.level_1');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_2] = this.$t('types.level.level_2');
        return {
            level,
            mylevels,
            pass_level: {
                0: '/',
                1: '/',
                2: self.$t('types.pass.l2'),
                3: self.$t('types.pass.l3'),
                4: self.$t('types.pass.l4'),
                5: self.$t('types.pass.l5'),
            },
            tableTit: [
                {
                    title: this.$t('center.tab_no'),
                    key: 'id',
                    type: 'index'
                },
                {
                    title: this.$t('center.tab_topic'),
                    key: 'name'
                },
                {
                    title: this.$t('types.difficulty2.easy'),
                    key: 'pass2',
                    render: (h, params) => {
                        return h('span',
                            {
                                style: {
                                    color: color[params.row.pass2],
                                    'font-size': fontSize[params.row.pass2]
                                }
                            },
                            self.level[params.row.pass2]
                        );
                    }
                },
                {
                    title: this.$t('types.difficulty2.normal'),
                    key: 'pass3',
                    render: (h, params) => {
                        return h('span',
                            {
                                style: {
                                    color: color[params.row.pass3],
                                    'font-size': fontSize[params.row.pass3]
                                }
                            },
                            self.level[params.row.pass3]
                        );
                    }
                },
                {
                    title: this.$t('types.difficulty2.hard'),
                    key: 'pass4',
                    render: (h, params) => {
                        return h('span',
                            {
                                style: {
                                    color: color[params.row.pass4],
                                    'font-size': fontSize[params.row.pass4]
                                }
                            },
                            self.level[params.row.pass4]
                        );
                    }
                },
                {
                    title: this.$t('types.difficulty2.very_hard'),
                    key: 'pass5',
                    render: (h, params) => {
                        return h('span',
                            {
                                style: {
                                    color: color[params.row.pass5],
                                    'font-size': fontSize[params.row.pass5]
                                }
                            },
                            self.level[params.row.pass5]
                        );
                    }
                },
                {
                    title: this.$t('center.current_level'),
                    key: 'level',
                    render: (h, params) => {
                        return h('span',
                            params.row.level ? self.mylevels[params.row.level] : '/'
                        );
                    }
                },
            ],
            analysisList: []
        };
    },
    async mounted() {
        const data = await BNService.userAnalysis(this.selectCourse());
        const analysisList = data.abilities;
        analysisList.map((item) => {
            !item.pass2 && (item.pass2 = 0);
            !item.pass3 && (item.pass3 = 0);
            !item.pass4 && (item.pass4 = 0);
            !item.pass5 && (item.pass5 = 0);
            !item.pass5 && (item.pass5 = 0);
            !item.level && (item.level = 0);
            return item;
        });
        this.analysisList = analysisList;
    },
    methods: {
        selectCourse() {
            return BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        }
    }
};
</script>
<style scoped>
    .title{
        margin-bottom: 20px; font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
    }
</style>