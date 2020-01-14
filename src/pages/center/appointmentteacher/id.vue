<template>
    <CenterLayout>
        <div slot="content">
            <div id="calendar">
                <!-- 年份 月份 -->
                <div class="month">
                    <div class="title">
                        <div style="float: left;margin:10px 30px;cursor: pointer;">
                            <span class="arrow" @click="pickPre(currentYear,currentMonth)">❮</span>
                        </div>
                        <div style="float: left;margin-top:10px  ;margin-left: 200px">
                            <span class="choose-year">{{ currentYear }}{{$t('_id.year')}}-{{ currentMonth }}{{$t('_id.month')}}</span>
                        </div>
                        <div style="float: right;margin:10px 30px;cursor: pointer;">
                            <span class="arrow" @click="pickNext(currentYear,currentMonth)">❯</span>
                        </div>
                    </div>
                </div>
                <!-- 星期 -->
                <ul class="weekdays">
                    <li style="border-left: 1px solid #cccccc">{{$t('_id.Monday')}}</li>
                    <li>{{$t('_id.Tuesday')}}</li>
                    <li>{{$t('_id.Wednesday')}}</li>
                    <li>{{$t('_id.Thursday')}}</li>
                    <li>{{$t('_id.Friday')}}</li>
                    <li>{{$t('_id.Saturday')}}</li>
                    <li>{{$t('_id.weekday')}}</li>
                </ul>
                <!-- 日期 -->
                <ul class="days">
                    <!-- v-for循环 每一次循环用<li>标签创建一天 -->
                    <li v-for="item in data" style="height: 70px" :id="item.id" :key="item.id"
                        @click="chooseTime(item.item)">
                        <!--本月-->
                        <!--如果不是本月  改变类名加灰色-->
                        <span v-if="item.day.getMonth()+1 != currentMonth"
                              class="other-month">{{ item.day.getDate() }}</span>
                        <!--如果是本月  还需要判断是不是这一天-->
                        <span v-else>
                        <!--今天  同年同月同日-->
                        <span v-if="item.day.getFullYear() == new Date().getFullYear() && item.day.getMonth() == new Date().getMonth() && item.day.getDate() == new Date().getDate()"
                              class="active">{{ item.day.getDate() }}</span>
                        <span v-else>{{ item.day.getDate() }}</span>
                    </span>
                        <!--显示剩余多少数量-->
                        <div class="appoin" v-if="item.status==true">
                            <span>{{item.item.length}}</span><span>{{$t('_id.canschedule')}}</span>
                        </div>
                        <div v-else></div>
                        <!---->
                    </li>
                </ul>
            </div>
            <div class="right" style="width: 30%;float: right;border: 1px solid #cccccc;margin-right: 40px">
                <h4>{{$t('_id.Maketime')}}</h4>
                <div class="ytime" v-for="(item,index) in selectDate">
                    <span>{{item.day}}  {{item.time}}</span>
                    <Icon type="md-close" class="del" style="cursor: pointer" @click="del(item)"/>
                </div>
                <div style="width: 100%;height: 1px;background: #cccccc;margin-top: 20px;margin-bottom: 20px"></div>
                <h4>{{$t('_id.Thecourses')}}</h4>
                <RadioGroup v-model="checkSubject" style="margin: 20px auto" @on-change="selectCourse(checkSubject)">
                    <Radio :label="item.course.course" :key="item.course.id" v-for="item in subject"
                           :disabled="subjectDisabled">
                        <span>{{item.course.name}}</span>
                    </Radio>
                </RadioGroup>
                <h4>{{$t('_id.Optionalgrade')}}</h4>
                <RadioGroup v-model="checkGrade" style="margin: 20px auto" @on-change="selectGrade(checkGrade)">
                    <Radio :label="item.id" :key="item.id" v-for="item in grade" :disabled="gradeDisabled">
                        {{item.name}}
                    </Radio>
                </RadioGroup>
                <h4 style="margin-top: 20px">{{$t('_id.estimatedcost')}}</h4>
                <div class="manay">
                    <span>{{$t('_id.total')}}</span>
                    <span style="display: inline-block;float: right;">{{$t('_id.Yuan')}}</span>
                    <span class="num" style="display: inline-block;float: right;margin-right: 5px">{{price}}</span>
                </div>
                <div class="manay">
                    <span>{{$t('_id.discounts')}}</span>
                    <span style="display: inline-block;float: right;">{{$t('_id.Yuan')}}</span>
                    <span class="num" style="display: inline-block;float: right;margin-right: 5px">0</span>
                </div>
                <div style="width: 100%;height: 1px;background: #cccccc;margin-top: 20px;margin-bottom: 20px"></div>
                <div class="top_up">
                    <span>{{$t('buycourse.balance')}} : &nbsp</span>
                    <span>{{wallet}}</span>
                    <span style="margin-left: 5px">{{$t('_id.Yuan')}}</span>
                    <span v-show="showTopUp">
                        <nuxt-link :to="path"
                                   style="display: inline-block;float: right;">{{$t('evaluation.Recharge')}}</nuxt-link>
                        <span style="display: inline-block;float: right;margin-right:5px">{{$t('evaluation.please')}}</span>
                    </span>
                </div>
                <div class="top_up">
                    <span>{{$t('buycourse.freeze')}} : &nbsp</span>
                    <span>{{freeze}}</span>
                    <span style="margin-left: 5px">HKD</span>
                </div>
                <div class="butto" :class="{ forbidButto: isforbidButto}" @click="submitBefore">
                    {{$t('_id.subscribe')}}
                </div>
            </div>
            <div class="bottom">
                <h4>{{$t('_id.Theoptional')}}</h4>
                <div style="width: 100%;">
                    <div ref="xuan" class="time" :class="{make:item.status, clicked: item.isclick}"
                         v-for="(item,index) in times" :id="item.id" @click="makeTime(item,index) ">
                        <span>{{item.start_at}}-{{item.end_at}}</span>
                    </div>
                </div>
            </div>
        </div>
    </CenterLayout>
</template>

<script>
    import CenterLayout from '~/components/CenterLayout.vue';
    import BNService from '~/services/BNService';

    export default {
        name: 'date',
        layout: 'single',
        middleware: ['secret', 'center'],
        components: {
            CenterLayout
        },
        data() {
            return {
                times: [],
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                data: [],
                path: '',
                selectDate: [],
                day: {},
                num: 0,
                subject: [],
                checkSubject: '',
                grade: [],
                checkGrade: '',
                wallet: 0,
                freeze: 0,
                price: 0,
                year: 0,
                month: 0,
                subjectDisabled: true,
                gradeDisabled: true,
                isforbidButto: true,
                showTopUp: false

            }
        },
        watch: {
            selectDate: function () {
                if (this.selectDate.length === 0) {
                    this.price = 0
                    this.checkSubject = ''
                    this.checkGrade = ''
                    this.subjectDisabled = true
                    this.gradeDisabled = true
                    this.isforbidButto = true
                    this.showTopUp = false
                }
            }
        },
        async mounted() {
            this.initData(null);
            let id = this.$route.query.id
            this.year = this.currentYear
            this.month = this.currentMonth
            let time = this.year + '-' + this.month
            let str = this.$route.path.substr(0, 3)
            if (str === '/en') {
                this.path = '/en/center/recharge';
            } else {
                this.path = '/center/recharge';
            }
            this.getAppointment(id, time)
            BNService.getTeacherCourse(id, time).then((data) => {
                this.subject = data
                this.grade = data[0].grades
            });
            BNService.getTimetable().then((data) => {
                data.forEach((val, index) => {
                    data[index].status = false
                    data[index].isclick = false
                    data[index].start_at = data[index].start_at.substring(0, 5)
                    data[index].end_at = data[index].end_at.substring(0, 5)
                })
                this.times = data
            });
            BNService.getClientBalance().then((data) => {
                this.wallet = +data.wallet ? +data.wallet : this.wallet;
            });
            BNService.getClientFreeze().then((data) => {
                this.freeze = data.freeze ? data.freeze : this.freeze;
            });
        },
        methods: {
            getAppointment: function (id, time) {
                BNService.getAppoin(id, time).then((data) => {
                    this.days.forEach((v, k) => {
                        this.days[k].id = data[k].id
                        this.days[k].status = data[k].status
                        this.days[k].item = []
                        for (let key in data[k].item) {
                            if (data[k].item[key].status) {
                                this.days[k].item.push(data[k].item[key]);
                            }
                        }
                    })
                    this.data = this.days;
                });
            },
            initData: function (cur) {
                var date;
                var index = 0;   //控制显示预定的天数 ，比如下面设置只能预定三天的
                if (cur) {
                    date = new Date(cur);
                } else  {
                    var now = new Date();
                    if (now.getMonth()==0){
                        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth()+1, 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() , 1));
                    } else {
                        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                    }

                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth()+1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject = {};
                    dayobject.day = d;
                    var now = new Date();
                    if (d.getDate() === (now.getDate()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                        dayobject.index = index++;//从今天开始显示供预定的数量
                    }
                    else if (index != 0 && index < 3)
                        dayobject.index = index++;//从今天开始3天内显示供预定的数量
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 35 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject = {};
                    dayobject.day = d;
                    var now = new Date();
                    if (d.getDate() === (now.getDate()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                        dayobject.index = index++;
                    }
                    else if (index != 0 && index < 3)
                        dayobject.index = index++;
                    this.days.push(dayobject);
                }
            },
            pickPre: function (year, month) {
                this.days = []
                this.data = []
                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                let id = this.$route.query.id
                this.year = this.currentYear
                this.month = this.currentMonth
                let time = this.year + '-' + this.month
                this.times.forEach((v, k) => {
                    this.times[k].status = false
                    this.times[k].isclick = false
                })
                this.getAppointment(id, time);
            },
            pickNext: function (year, month) {
                this.days = []
                this.data = []
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                let id = this.$route.query.id
                this.year = this.currentYear
                this.month = this.currentMonth
                let time = this.year + '-' + this.month
                this.times.forEach((v, k) => {
                    this.times[k].status = false
                    this.times[k].isclick = false
                })
                this.getAppointment(id, time);
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function (year, month, day) {

                var y = year;
                var m = month;
                if (m < 10) m = "0" + m;
                var d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            chooseTime(val) {
                this.day = {}
                this.num++
                this.day.id = this.num
                this.day.day = val[0].day
                this.times.forEach((v, k) => {
                    this.times[k].status = false
                    this.times[k].isclick = false
                })
                val.forEach((v, k) => {
                    let id = val[k].timetable_temp_id
                    let data = this.times
                    data.forEach((v, k) => {
                        if (id === data[k].id) {
                            data[k].status = true
                        }
                    })
                })
                this.selectDate.forEach((v, k) => {
                    let tid = this.selectDate[k].tid
                    let day = this.selectDate[k].day
                    let data = this.times
                    data.forEach((v, k) => {
                        if (tid === data[k].id && day === this.day.day) {
                            data[k].isclick = true
                        }
                    })
                })
            },
            makeTime(val, index) {
                if (val.status === true) {
                    let curr = true
                    let arr = this.selectDate
                    this.day.time = val.start_at + '-' + val.end_at
                    this.day.tid = val.id
                    for (let key in arr) {
                        if (arr[key].tid === this.day.tid && arr[key].day === this.day.day) {
                            this.selectDate.splice(key, 1)
                            this.times.forEach((v, k) => {
                                if (k === index) {
                                    this.times[k].isclick = false
                                }
                            })
                            curr = false
                            break;
                        }
                    }
                    if (curr) {
                        this.selectDate.push(this.day)
                        this.num++
                        let day = this.day.day
                        this.day = {}
                        this.day.id = this.num
                        this.day.day = day
                        this.subjectDisabled = false
                        this.times.forEach((v, k) => {
                            if (k === index) {
                                this.times[k].isclick = true
                            }
                        })
                    }
                    if (this.selectDate.length) this.selectGrade();
                }
            },
            del(val) {
                let index = this.selectDate.indexOf(val)
                this.selectDate.splice(index, 1)
                this.times.forEach((v, k) => {
                    this.times[k].isclick = false
                })
                this.selectDate.forEach((v, k) => {
                    let tid = this.selectDate[k].tid
                    let day = this.selectDate[k].day
                    let data = this.times
                    data.forEach((v, k) => {
                        if (tid === data[k].id && day === this.day.day) {
                            data[k].isclick = true
                        }
                    })
                })
                if (this.selectDate.length) this.selectGrade();
            },
            selectCourse(val) {
                let teacher_id = this.$route.query.id
                BNService.getClientTeacherGrade(val, teacher_id).then((data) => {
                    this.grade = []
                    data.forEach((v, k) => {
                        this.grade[k] = data[k].grade
                    })
                });
                this.price = 0
                this.checkGrade = ''
                this.isforbidButto = true
                this.gradeDisabled = false;
            },
            selectGrade() {
                if (this.checkSubject && this.checkGrade) {
                    let obj = {}
                    obj.teacher_id = this.$route.query.id
                    obj.course = this.checkSubject
                    obj.grade_id = this.checkGrade
                    obj.count = this.selectDate.length
                    BNService.getAmount(obj).then((data) => {
                        this.price = data.price ? data.price.toFixed(2) : this.price
                        if (+this.price + this.freeze > this.wallet) {
                            this.showTopUp = true
                            this.isforbidButto = true;
                        } else {
                            this.showTopUp = false
                            this.isforbidButto = false;
                        }
                    });
                }
            },
            submitBefore() {
                let nondelay = true
                let disabled = this.isforbidButto
                let curdate = Date.parse(new Date())
                let datelist = this.selectDate.map(function (item) {
                    return {
                        time: item.day + ' ' + item.time.substr(0, 5) + ':00'
                    };
                })
                for (let key in datelist) {
                    if (Date.parse(new Date(datelist[key].time)) < curdate) {
                        nondelay = false
                        break;
                    }
                }
                this.submit(nondelay, disabled);
            },
            submit(nondelay, disabled) {
                if (nondelay) {
                    let teacher_id = this.$route.query.id
                    let str = this.$route.path.substr(0, 3)
                    let obj = {}
                    obj.teacher_id = teacher_id
                    obj.course = this.checkSubject
                    obj.grade_id = this.checkGrade
                    obj.timetable = this.selectDate
                    if (!disabled) {
                        BNService.createOrder(obj).then((data) => {
                            this.$Message.success(this.$t('_id.Makesuccess'))
                            if (str === '/en') {
                                this.$router.push({path: '/en/center/order'});
                            } else {
                                this.$router.push({path: '/center/order'});
                            }
                        }).catch((data) => {
                            this.$Message.error(data.message);
                        })
                    }
                } else {
                    this.$Message.error(this.$t('_id.delay_tip'))
                }
            }
        }
    }

</script>

<style scoped>
    .appoin {
        width: 80%;
        height: 40%;
        background: #0087DD;
        color: #FFFFFF;
        border-radius: 20px;
        margin: 8px auto;
        line-height: 24px;
    }

    .butto {
        cursor: pointer;
        width: 100px;
        height: 40px;
        background-color: #0087DD;
        text-align: center;
        line-height: 40px;
        border-radius: 25px;
        margin: 20px auto;
        color: white;
        font-size: 16px;
    }

    .forbidButto {
        cursor: auto;
        background-color: #ccc;
    }

    .right {
        padding: 30px;
    }

    .right h4 {
        font-size: 16px;
        font-weight: 600;
    }

    .ytime {
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
    }

    .manay {
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
    }

    .right .del {
        display: inline-block;
        float: right;
        background: #0087DD;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        line-height: 20px;
        color: #FFFFFF;
        text-align: center;
    }

    .num {
        display: inline-block;
        float: right;
    }

    .top_up {
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
    }

    .bottom {
        width: 65%;
        float: left;
        margin-top: 20px;
    }

    .time {
        cursor: pointer;
        background: #EEEEEE;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        width: 14.4%;
        border: 1px solid #cccccc;
        float: left;
        margin-right: -1px;
        margin-bottom: -1px;
    }

    .make {
        cursor: pointer;
        background: #CEF0BF;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        width: 14.4%;
        border: 1px solid #cccccc;
        float: left;
        margin-right: -1px;
        margin-bottom: -1px;
    }

    .clicked {
        background-color: #AEF0BF;
    }

    .active {
        background: #DFF0D8;
    }

    .bottom h4 {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 600;
    }

    ul {
        list-style-type: none;
    }

    #calendar {
        width: 65%;
        float: left;
        border: 1px solid #cccccc;
        border-left: 0;
    }

    .month {
        width: 100%;
    }

    .month .title {
        width: 100%;
        height: 50px;
        font-size: 20px;
        letter-spacing: 3px;
        overflow: hidden;
        text-align: center;
        border-left: 1px solid #cccccc;
    }

    .weekdays {
        height: 65px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        font-weight: 600;
    }

    .weekdays li {
        font-size: 16px;
        line-height: 65px;
        display: inline-block;
        width: 14.2%;
        height: 100%;
        text-align: center;
        border: 1px solid #cccccc;
        border-right: 0;
        border-bottom: 0;
    }

    .days {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .days li {
        font-size: 14px;
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        border: 1px solid #cccccc;
        border-right: 0;
        border-bottom: 0;
        padding-top: 10px;
        cursor: pointer;
    }

    .days li .active {
        padding: 6px 10px;
        border-radius: 50%;
        background: #00B8EC;
        color: #fff;
    }

    .days li .other-month {
        color: #cccccc;
    }
</style>