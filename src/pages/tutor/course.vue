<template>
    <div>
        <div class="class_arrange">
            <div style="font-size: 18px;">{{ $t('course.arrangement') }}</div>
            <Divider/>
            <div class="class_arrange_center">
                <div>{{ $t('course.appointment') }}</div>
                <div style="margin-left: 10px">
                    <nuxt-link to="subscribe">
                        <div style="color:#515a6e; font-size: 16px">{{ $t('course.exception') }}</div>
                    </nuxt-link>
                </div>
                <br>
            </div>
            <div class="class_arrange_top">
                <span>{{ $t('course.operation_tip') }}</span>
            </div>
            <div class="teacher_time">
                <Table size="small" border :columns="columns1" :data="data"></Table>
            </div>
        </div>
    </div>
</template>
<script>
    import BNService from '~/services/BNService'

    export default {
        layout: 'tutor',
        name: "course",
        middleware: ['secret', 'tutor'],
        data() {
            return {
                columns1: [
                    {
                        title: ' ',
                        key: 'time',
                        align: 'center',
                    },
                    {
                        title: this.$t('course.monday'),
                        key: 'mon',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.mon = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer',
                                        with: '100%',
                                        height: '100%',
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.mon = false
                                        }
                                    }
                                }, params.row.mon ? this.$t('course.subscribe') : ''),
                            ]);
                        }

                    },

                    {
                        title: this.$t('course.tuesday'),
                        key: 'tues',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.tues = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer',
                                        with: '100%',
                                        height: '100%',
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.tues = false
                                        }
                                    }
                                }, params.row.tues ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                    {
                        title: this.$t('course.wednesday'),
                        key: 'wed',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.wed = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.wed = false
                                        }
                                    }
                                }, params.row.wed ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                    {
                        title: this.$t('course.thursday'),
                        key: 'thur',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.thur = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.thur = false
                                        }
                                    }
                                }, params.row.thur ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                    {
                        title: this.$t('course.friday'),
                        key: 'fri',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.fri = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.fri = false
                                        }
                                    }
                                }, params.row.fri ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                    {
                        title: this.$t('course.saturday'),
                        key: 'sat',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.sat = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.sat = false
                                        }
                                    }
                                }, params.row.sat ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                    {
                        title: this.$t('course.sunday'),
                        key: 'sun',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        width: '100%',
                                        height: '10px',
                                    }, on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.sun = true
                                        }
                                    }
                                }),
                                h('strong', {
                                    style: {
                                        color: '#19be6b',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.appointment(params)
                                            params.row.sun = false
                                        }
                                    }
                                }, params.row.sun ? this.$t('course.subscribe') : ''),
                            ]);
                        }
                    },
                ],
                data: [],
            }
        },
        async mounted() {
            BNService.getTeacherTimetable().then((data) => {
                this.data = data;
            })
        },

        methods: {
            appointment(val) {
                let obj = {}
                obj.timetable_temp_id = val.row.temp_id
                obj.week = val.column.key
                BNService.postTeacherTimetable(obj).then((data) => {
                    this.$Message.success(this.$t('course.succeed_tip'))
                }).catch(() => {
                    this.$Message.error(this.$t('course.failure_tip'))
                })
            },
        },

    }

</script>
<style scoped>
    .ivu-table td .ivu-table-cell {
        padding-left: 0;
        padding-right: 0;
    }

    header {
        max-width: 800px;
        font-size: large;
    }

    .teacher_time {
        margin-top: 30px;
    }

    .class_arrange_top {
        margin-top: 20px;
    }

    .class_arrange_center > div:nth-child(1) {
        border-bottom: 2px solid #2997eb;
    }

    .class_arrange_center > div {
        height: 35px;
        font-size: 16px;
        text-align: center;
    }

    .class_arrange_center {
        display: flex;
        margin: 30px 0px;
        border-bottom: solid 1px #CCC;
    }

    .class_arrange > span {
        font-size: 20px;
        font-weight: 500;
        display: block;
    }

    .class_arrange {
        width: 100%;

    }
</style>
