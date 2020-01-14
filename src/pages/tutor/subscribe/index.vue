<template>
    <div style="min-height: 550px">
        <div class="class_arrange">
            <span>{{ $t('course.arrangement') }}</span>
            <div class="class_arrange_center">
                <div >
                    <nuxt-link to="course">
                        <div style="color:#515a6e; font-size: 16px">{{ $t('course.appointment') }}</div>
                    </nuxt-link>
                </div>
                <div style="margin-left: 10px">{{ $t('course.exception') }}</div>
                <br>
            </div>
            <Button type="primary" to="subscribe/addexception">{{ $t('course.add_exception') }}</Button>
            <div class="teacher_time">
                <Table border :columns="columns" :data="data"></Table>
                <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right"
                      @on-change="changepage"/>
            </div>
        </div>
    </div>
</template>
<script>
    import BNService from '~/services/BNService'

    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 80,
                    },
                    {
                        title: this.$t('course.date'),
                        key: 'date'
                    },
                    {
                        title: this.$t('course.time'),
                        key: 'time'
                    },
                    {
                        title: this.$t('course.status'),
                        key: 'status'
                    },
                    {
                        title: this.$t('course.action'),
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.isedit) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.editor(params.index)
                                            }
                                        }
                                    }, this.$t('course.edit')),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, this.$t('course.delete'))
                                ]);
                            } else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, this.$t('course.delete'))
                                ]);
                            }
                        }
                    }
                ],
                data: [],
                total: 0,
                pageSize: 0
            }
        },
        async mounted() {
            this.getData();
        },
        methods: {
            getData() {
                BNService.getTeacherExceptional().then((data) => {
                    this.data = data.data
                    this.total = data.total
                    this.pageSize = data.per_page
                    this.data.forEach((v, k) => {
                        let curTime = Date.parse(new Date())
                        let start = v.date + ' ' + v.temp_start
                        let startTime = Date.parse(new Date(start))
                        if (curTime < startTime) {
                            v.isedit = true;
                        } else {
                            v.isedit = false;
                        }
                    });
                });
            },
            editor(index) {
                let id = this.data[index].id
                let str = this.$route.path.substr(0, 3)
                if (str === '/en') {
                    this.$router.push({path: `/en/tutor/subscribe/teaid?teaid=${id}`})
                } else {
                    this.$router.push({path: `/tutor/subscribe/teaid?teaid=${id}`})
                }
            },
            remove(index) {
                this.$Modal.confirm({
                    title: this.$t('notice.system_hint'),
                    content: this.$t('notice.confirm_hint'),
                    onOk: () => {
                        BNService.delTeacherTimetemp(this.data[index].id).then((data) => {
                                this.getData();
                                this.$Message.success(this.$t('course.succeed_del'));
                                this.data.splice(index, 1);
                        }).catch(()=>{
                            this.$Message.error(this.$t('course.failure_del'));
                        })
                    },
                });
            },
            changepage(index) {
                BNService.getTeacherExceptional(index).then((data) => {
                    this.data = data.data
                    this.data.forEach((v, k) => {
                        let curTime = Date.parse(new Date())
                        let start = v.date + ' ' + v.temp_start
                        let startTime = Date.parse(new Date(start))
                        if (curTime < startTime) {
                            v.isedit = true;
                        } else {
                            v.isedit = false;
                        }
                    });
                });
            }
        }
    }

</script>
<style scoped>
    header {
        max-width: 800px;
        font-size: large;
    }

    .teacher_time {
        margin-top: 30px;
    }

    .class_arrange_center > div:nth-child(2) {
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
