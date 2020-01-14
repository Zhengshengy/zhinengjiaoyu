<template>
    <div>
        <Form ref="formDynamic" :model="formDynamic">
            <div style="font-size: 18px;">{{$t('teach.course')}}</div>
            <Divider/>
            <Row type="flex" justify="start" class="code-row-bg" style="margin-bottom: 20px">
                <Col span="3" style="font-size: 14px">{{$t('teach.subject')}}</Col>
                <Col span="3" style="font-size: 14px">{{$t('teach.grade')}}</Col>
                <Col span="3" style="font-size: 14px">{{$t('teach.rate')}}</Col>
            </Row>
            <FormItem v-for="(item1,index) in formDynamic.items" :key="index" v-if="item1.status"
                      :id="formDynamic.items[index].id">
                <Row>
                    <Col span="18" style="width: 140px">
                        <Select v-model="formDynamic.items[index].course" style="width:110px;"
                                @on-change="checkGrade(formDynamic.items[index].course,index)">
                            <Option v-for="item in subjects" :value="item.course" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="18" style="width: 140px">
                        <Select v-model="formDynamic.items[index].grade" style="width:110px;"
                                @on-open-change="checkOpen(index)">
                            <Option v-for="item in item1.grades" :value="item.id" :key="item.id">{{ item.name }}
                            </Option>
                        </Select>
                    </Col>
                    <Col span="18" style="width: 200px">
                        <Input type="text" v-model="formDynamic.items[index].price" @on-blur="validate(formDynamic.items[index].price,index)">
                            <span slot="append">HKD</span>
                        </Input>
                    </Col>
                    <Col span="4" offset="1">
                        <Button @click="handleRemove(index)">{{$t('teach.delete')}}</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" @click="handleAdd" icon="md-add" style="width: 110px">
                            {{$t('teach.add-ins')}}
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <Form ref="formDy" :model="formDy">
            <Row type="flex" justify="start" class="code-row-bg" style="margin-bottom: 20px">
                <Col span="3" style="font-size: 14px">{{$t('teach.test')}}</Col>
                <Col span="3" style="font-size: 14px">{{$t('teach.rate')}}</Col>
            </Row>
            <FormItem v-for="(item,index1) in formDy.items" :key="index1" v-if="item.status"
                      :id="formDy.items[index1].id">
                <Row>
                    <Col span="18" style="width: 140px">
                        <Select v-model="formDy.items[index1].exam" style="width:110px;">
                            <Option v-for="item in tests" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="18" style="width: 200px">
                        <Input type="text" v-model="formDy.items[index1].price" @on-blur="validate1(formDy.items[index1].price,index1)">
                            <span slot="append">HKD</span>
                        </Input>
                    </Col>
                    <Col span="4" offset="1">
                        <Button @click="hanRemove(index1)">{{$t('teach.delete')}}</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" @click="hanAdd" icon="md-add" style="width: 110px">
                            {{$t('teach.add-ins')}}
                        </Button>
                    </Col>
                </Row>
            </FormItem>
            <Divider/>
            <FormItem>
                <Button type="primary" @click="submitBefor(formDynamic,formDy)" :disabled="dis">
                    {{$t('teach.save')}}
                </Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import BNService from '~/services/BNService';

    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                dis: false,
                index: 1,
                index1: 1,
                tests: [],
                subjects: [],
                gradeinfo: [],
                formDynamic: {
                    items: [
                        {
                            course: null,
                            grade: null,
                            status: 1
                        }
                    ]
                },
                formDy: {items: []},
                formItem1: {items: []},
                formItem2: {items: []}
            }
        },
        async mounted() {
            BNService.getSubjects().then((data) => {
                this.subjects = data
            });
            BNService.getAllExam().then((data) => {
                this.tests = data
            });
            this.getdata();
        },
        methods: {
            getdata(){
                BNService.getCourses().then((data) => {
                    this.formDynamic.items = data
                    data.forEach((v, k) => {
                        this.formDynamic.items[k].id = data[k].id
                        this.formDynamic.items[k].course = data[k].course.course
                        this.formDynamic.items[k].grade = data[k].grade.id
                        this.formDynamic.items[k].grades = data[k].grades
                        this.formDynamic.items[k].index = k + 1
                        this.formDynamic.items[k].status = 1
                        this.formDynamic.items[k].price = data[k].price
                    })
                });
                BNService.getExam().then((data) => {
                    this.formDy.items = data
                    data.forEach((v, k) => {
                        this.formDy.items[k].id = data[k].id
                        this.formDy.items[k].exam = data[k].exam.id
                        this.formDy.items[k].index1 = k + 1
                        this.formDy.items[k].status = 1
                        this.formDy.items[k].price = data[k].price
                    })
                }).catch(() => {
                    this.formDy.items = []
                });
            },
            submitBefor(form1, form2) {
                let isSubmit = true
                for (let v of form1.items) {
                    if (!v.course) {
                        isSubmit = false
                        this.$Message.error(this.$t('teacher.subject'))
                        break;
                    } else if (!v.price) {
                        isSubmit = false
                        this.$Message.error(this.$t('teacher.perminute'))
                        break;
                    }
                }
                for (let v of form2.items) {
                    if (!v.exam) {
                        isSubmit = false
                        this.$Message.error(this.$t('teacher.exam'))
                        break;
                    } else if (!v.price) {
                        isSubmit = false
                        this.$Message.error(this.$t('teacher.perminute'))
                        break;
                    }
                }
                if (isSubmit) {
                    this.handleSubmit(form1, form2)
                }
            },
            isRepeatSub(arr) {
                let obj = {};
                let isRepeat = false
                for (let i = 0; i < arr.length; i++) {
                    if (obj[arr[i].course] && obj[arr[i].grade]) {
                        isRepeat = true;
                        break;
                    }
                    obj[arr[i].course] = true;
                    obj[arr[i].grade] = true;
                }
                return isRepeat;
            },
            isRepeatExam(arr) {
                let obj = {};
                let isRepeat = false
                for (let i = 0; i < arr.length; i++) {
                    if (obj[arr[i].exam]) {
                        isRepeat = true;
                        break;
                    }
                    obj[arr[i].exam] = true;
                }
                return isRepeat;
            },
            handleSubmit(form1, form2) {
                let obj = {}
                this.formItem1.items = form1.items.map(function (item) {
                    return {
                        id: item.id ? item.id : '',
                        course: item.course ? item.course : '',
                        grade: item.grade ? item.grade : '',
                        price: item.price ? item.price : ''
                    }
                })
                this.formItem2.items = form2.items.map(function (item) {
                    return {
                        id: item.id ? item.id : '',
                        exam: item.exam ? item.exam : '',
                        price: item.price ? item.price : ''
                    }
                })
                if (this.isRepeatSub(this.formItem1.items)) {
                    this.$Message.error(this.$t('teach.repeat_sub'));
                } else if (this.isRepeatExam(this.formItem2.items)) {
                    this.$Message.error(this.$t('teach.repeat_exam'));
                } else {
                    obj.top = this.formItem1
                    obj.bot = this.formItem2
                    BNService.postCourses(obj).then((data) => {
                        this.getdata()
                        this.$Message.success(this.$t('teach.succeed_tip'));
                    }).catch((data) => {
                        this.$Message.error(this.$t('teach.failure_tip'));
                    });
                }

            },
            handleAdd() {
                let isAdd = true
                this.formDynamic.items.forEach((v, k) => {
                    if (!v.course) {
                        isAdd = false
                        this.$Message.error(this.$t('teacher.subject_tip'))
                    } else if (!v.price) {
                        isAdd = false
                        this.$Message.error(this.$t('teacher.perminute_tip'))
                    }
                })
                if (isAdd) {
                    this.index++;
                    this.formDynamic.items.push({
                        course: '',
                        grade: '',
                        index: this.index,
                        status: 1
                    });
                }
            },
            hanAdd() {
                let isAdd = true
                if (this.formDy.items.length) {
                    this.formDy.items.forEach((v, k) => {
                        if (!v.exam) {
                            isAdd = false
                            this.$Message.error(this.$t('teacher.exam_tip'))
                        } else if (!v.price) {
                            isAdd = false
                            this.$Message.error(this.$t('teacher.perminute_tip'))
                        }
                    })
                } else {
                    isAdd = false
                    this.formDy.items.push({exam_id: 0, exam: null, price: null, status: 1});
                }
                if (isAdd) {
                    this.index1++;
                    this.formDy.items.push({
                        value: '',
                        index1: this.index1,
                        status: 1
                    });
                }
            },
            handleRemove(index) {
                let id = this.formDynamic.items[index].id
                if (id) {
                    BNService.deleteCourses(id).then((data) => {
                        this.formDynamic.items.splice(index, 1);
                    });
                } else {
                    this.formDynamic.items.splice(index, 1);
                }
            },
            hanRemove(index1) {
                let tid = this.formDy.items[index1].id
                if (tid) {
                    BNService.deleteExam(tid).then((data) => {
                        this.formDy.items.splice(index1, 1);
                    });
                } else {
                    this.formDy.items.splice(index1, 1);
                }
            },
            checkGrade(val, index) {
                BNService.getGrade(val).then((data) => {
                    let arr = []
                    data.forEach((v, k) => {
                        arr[k] = data[k].grade;
                    })
                    this.formDynamic.items[index].grade = arr[0].id;
                    this.formDynamic.items[index].grades = arr;
                });
            },
            checkOpen(index) {
                let course = this.formDynamic.items[index].course
                if (course) {
                    BNService.getGrade(course).then((data) => {
                        let arr = []
                        data.forEach((v, k) => {
                            arr[k] = data[k].grade
                        })
                        this.formDynamic.items[index].grades = arr
                    });
                }
            },
            validate(val,index){
                if (isNaN(val)) {
                    this.formDynamic.items[index].price = ''
                    this.$Message.error(this.$t('income.Pleaseamount'));
                }
            },
            validate1(val,index){
                if (isNaN(val)) {
                    this.formDy.items[index].price = ''
                    this.$Message.error(this.$t('income.Pleaseamount'));
                }
            }
        }
    }
</script>