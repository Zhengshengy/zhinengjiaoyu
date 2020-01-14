<template>
    <div style="min-height: 550px">
        <div class="class_arrange">
            <span>{{ $t('course.arrangement') }}</span>
            <div class="class_arrange_center">
                <div>
                    <nuxt-link :to="path">
                        <div style="color:#515a6e; font-size: 16px">{{ $t('course.appointment') }}</div>
                    </nuxt-link>
                </div>
                <div>{{ $t('course.exception') }}</div>
                <br>
            </div>
        </div>
        <Form :model="formItem" label-position="top">
            <FormItem :label="this.$t('course.ex_date')">
                <DatePicker type="date" size="large" @on-change="getDate" :options="options3"
                            :value="placeholder"></DatePicker>
            </FormItem>
            <FormItem :label="this.$t('course.start_time')" :error="startError">
                <Select v-model="formItem.temp_start" style="width:200px" @on-change="changeStart"
                        :placeholder="startTime">
                    <Option v-for="item in start" :value="item.start_at" :key="item.id" v-text="item.start_at"></Option>
                </Select>
            </FormItem>
            <FormItem :label="this.$t('course.end_time')" :error="endError">
                <Select v-model="formItem.temp_end" style="width:200px" @on-change="changeEnd" :placeholder="endTime">
                    <Option v-for="item in start" :value="item.end_at" :key="item.id" v-text="item.end_at"></Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">{{ $t('course.submit') }}</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import BNService from '~/services/BNService'
    import BNRouteHelper from '~/utils/BNRouteHelper';
    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                path: '/tutor/course',
                start: [],
                placeholder: '',
                startTime: '',
                endTime: '',
                startError: '',
                endError: '',
                formItem: {
                    id: '',
                    date: '',
                    temp_start: '',
                    temp_end: ''
                },
                options3: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        },
        async mounted() {
            let obj = {}
            let str = this.$route.path.substr(0, 3)
            if (str === '/en') {
                this.path = '/en/tutor/course'
            } else {
                this.path = '/tutor/course'
            }
            obj.id = this.$route.query.teaid
            BNService.editTeacherExceptional(obj).then((data) => {
                this.formItem.id = this.$route.query.teaid
                this.formItem.temp_start = data.temp_start
                this.formItem.temp_end = data.temp_end
                this.formItem.date = data.date
                this.placeholder = data.date
                this.startTime = data.temp_start
                this.endTime = data.temp_end
            })
            BNService.getTeacherTimetemp().then((data) => {
                this.start = data
            })
        },
        methods: {
            submit() {
                if (!this.startError && !this.endError) {
                    BNService.putTeacherTimetemp(this.formItem).then((data) => {
                        this.$Message.success(this.$t('course.succeed_edit'));
                        this.formItem = {}
                        BNRouteHelper.addTeacherTimetemp(this.$router)
                    }).catch(() => {
                        this.$Message.error(this.$t('course.failure_edit'));
                        this.formItem = {}
                    })
                }
            },
            getDate(val) {
                this.formItem.date = val
                if (this.formItem.temp_start) {
                    this.changeStart(this.formItem.temp_start)
                    if (this.formItem.temp_end) {
                        this.changeEnd(this.formItem.temp_end);
                    }
                }
            },
            changeStart(val) {
                let start = this.formItem.date + ' ' + val
                let startTime = Date.parse(new Date(start))
                let curTime = Date.parse(new Date())
                if (startTime <= curTime) {
                    this.startError = this.$t('course.now_tip');
                } else {
                    this.startError = '';
                }
                if (this.formItem.temp_end) {
                    this.changeEnd(this.formItem.temp_end);
                }
            },
            changeEnd(val) {
                let start = this.formItem.date + ' ' + this.formItem.temp_start
                let end = this.formItem.date + ' ' + val
                let startTime = Date.parse(new Date(start))
                let endTime = Date.parse(new Date(end))
                if (endTime <= startTime) {
                    this.endError = this.$t('course.start_tip');
                } else {
                    this.endError = '';
                }
            }
        }
    }

</script>
<style scoped>
    .class_arrange_center > div:nth-child(2) {
        border-bottom: 2px solid #2997eb;
    }

    .class_arrange_center > div {
        width: 120px;
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
