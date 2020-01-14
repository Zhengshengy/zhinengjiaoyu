/*
    智能分析结果页面
*/
<template>
    <div class="main-container">
        <div class="result-layout">
            <div class="result-title">{{$t('analyze.result')}}</div>
            <div class="flex-layout">
                <div class="left">
                        <Table :columns="tableTit" :data="tableContent"></Table>
                </div>
                <div class="right">
                    <div class="result-right-item">{{$t('analyze.short_objective')}}</div>
                    <div class="targe-box">
                        <RadioGroup v-model="choose">
                            <p>{{$t('analyze.want')}}</p>
                            <Radio label="3" :disabled="current_level>'3'">{{$t('types.level.level_0')}}</Radio>
                            <Radio label="4" :disabled="current_level>'4'">{{$t('types.level.level_1')}}</Radio>
                            <Radio label="5" :disabled="current_level>'5'">{{$t('types.level.level_2')}}</Radio>
                            <p>{{$t('analyze.or')}}</p>
                            <Radio label="0">{{$t('analyze.do_past')}}</Radio>
                        </RadioGroup>
                    </div>
                    <div class="result-right-item">
                        <Button type="primary" @click="goTraining">{{$t('exam.submit')}}</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNUtils from '~/utils/BNUtils';
import BNService from '~/services/BNService';

export default {
    layout: 'single',
    middleware: ['secret'],
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
        // {
        //     0: '/',
        //     1: self.$t('types.analyze.level_get'),
        //     2: self.$t('types.analyze.level_not_get')
        // };
        const mylevels = {};
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_WEAK] = this.$t('types.level.level_weak');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_0] = this.$t('types.level.level_0');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_1] = this.$t('types.level.level_1');
        mylevels[BNConstants.LEVEL_TYPE.LEVEL_2] = this.$t('types.level.level_2');
        return {
            level,
            mylevels,
            choose: '3',
            ability_id: 0,
            current_level: '3',
            tableTit: [
                {
                    title: self.$t('types.analyze.order'),
                    key: 'number',
                    render: (h, params) => {
                        return h('span',
                            params.row.number.slice(1) || ''
                            // (params.row.number || '').replace('M', '')
                        );
                    }
                },
                {
                    title: self.$t('types.analyze.point'),
                    key: 'name'
                },
                {
                    title: self.$t('types.difficulty2.easy'),
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
                    title: self.$t('types.difficulty2.normal'),
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
                    title: self.$t('types.difficulty2.hard'),
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
                    title: self.$t('types.difficulty2.very_hard'),
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
                    title: self.$t('types.difficulty.cur_level'),
                    key: 'level',
                    render: (h, params) => {
                        return h('span',
                            params.row.level ? self.mylevels[params.row.level] : '/'
                        );
                    }
                },
                {
                    title: self.$t('types.analyze.major'),
                    key: 'target',
                    render: (h, params) => {
                        return h('input', {
                            attrs: {
                                type: 'radio',
                                name: 'major'
                            },
                            on: {
                                click: function () {
                                    self.ability_id = params.row.id;
                                    self.clearPaperInfo().then(() => {
                                        BNRouteHelper.analyzeSpecialTraining(self.$router, {ability_id: self.ability_id});
                                    });
                                }
                            }
                        },
                        params.row.number
                        );
                    }
                }
            ],
            tableContent: []
        };
    },
    async mounted() {
        const course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
        const result = await BNService.getAnalyzeResult({ course });
        this.tableContent = result.abilities;
        this.choose = `${result.default_general_level}`;
        this.current_level = `${result.default_general_level}`;
    },
    methods: {
        ...mapActions({
            submitFeedback: Constants.EXAM.SUBMIT_FEEDBACK,
            clearPaperInfo: Constants.PAPER.CLEAR_PAPER_INFO
        }),
        goTraining() {
            if (this.choose === '0') {
                BNRouteHelper.passExam(this.$router);
            } else {
                this.clearPaperInfo().then(() => {
                    BNRouteHelper.analyzeGeneralTraining(this.$router, {target: this.choose});
                });
            }
        }
    }
};
</script>

<style scoped lang="less">
    .ivu-table:before{
        background-color: transparent;
    }
    .result-layout {
        width: 100%;
        min-width: 760px;
        min-height: 100vh;
        padding-bottom: 40px;
        background: url('/client/images/analyze-bg.jpg') no-repeat center -80px;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
    }

    .result-title {
        text-align: center;
        font-size: 20px;
        padding-top: 20px;
        margin-bottom: 50px;
        color: #fff;
    }

    .ivu-table th {
        text-align: center;
        background: #fff;
    }

    .flex-layout {
        display: flex;
        //width: 1300px;
        min-width: 760px;
        min-height: 600px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0 0 5px #ccc;
        .left {
            min-width: 500px;
            flex: 1;
        }
        .right {
            flex: 1;
            max-width: 250px;
            table {
                width: 100%;
                text-align: center;
            }
        }
        .result-right-item {
            height: 42px;
            line-height: 42px;
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
        }
        .targe-box {
            border: 1px solid #efefef;
            width: 180px;
            // box-sizing: border-box;
            padding: 15px 10px;
            margin: 40px auto;
            text-align: left;
            p {
                margin-bottom: 15px;
            }
            .ivu-radio-wrapper {
                display: block;
                margin-bottom: 20px;
            }
        }
    }
</style>