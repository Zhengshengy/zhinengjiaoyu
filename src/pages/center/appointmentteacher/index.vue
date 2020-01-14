<template>
    <CenterLayout activeName="c13">
    <div slot="content">
        <h3 style="text-align: center;margin-bottom: 50px;font-size: 24px">{{$t('index.teacher')}}</h3>
        <div style="background: #cccccc"></div>
        <Row type="flex" justify="start" class="code-row-bg">
            <Col  style="font-size: 14px;color:#A0A0A0 ;">{{$t('index.subject')}}：</Col>
            <Col span="1" v-for="(item,index) in subjects " :key="item.id" :class="{active:index==isactive}"
                 style="width:50px;font-size: 14px;margin-right: 20px;cursor: pointer;text-align: center">
                <span v-text="item.name" @click="checkGrade(item.course,index)"></span>
            </Col>
        </Row>
        <br>
        <Row type="flex" justify="start" class="code-row-bg">
            <Col  style="font-size: 14px;color:#A0A0A0 ;">{{$t('index.grade')}}：</Col>
            <Col span="1" v-for="(item,index) in grade " :key="item.id" :class="{active: index==isactive1}"
                 style="width:50px;font-size: 14px;margin-right: 20px;cursor: pointer;text-align: center">
                <span v-text="item.grade.name" :id="item.id" @click="check(item.grade_id,index)"></span>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="8">
                    <Checkbox v-model="exist" @on-change="exists" style="font-size: 14px">{{$t('index.formerteacher')}}</Checkbox>
                    <Checkbox v-model="lanage" @on-change="language" style="margin-left: 20px;font-size: 14px">{{$t('index.ofEnglish')}}</Checkbox>
            </Col>
            <Col span="8" offset="8" class="sorting" style="font-size: 14px">
                <div class="sort">{{$t('index.synthesize')}}</div>
                <div class="sort">
                    <span style="position: relative">{{$t('index.graded')}}</span>
                    <div>
                        <Icon type="md-arrow-dropup" style="position: absolute;top: 0;left:100px;font-size: 16px;    width: 16px;
    height: 12px;"
                              @click="scoreUp"/>
                        <Icon type="md-arrow-dropdown" style="position: absolute;top: 7px;left:100px;font-size: 16px;     width: 16px;
    height: 12px;" @click="scoreDown"/>
                    </div>
                </div>
                <div class="sort">
                    <span style="position: relative">{{$t('index.Theclass')}}</span>
                    <div>
                        <Icon type="md-arrow-dropup" style="position: absolute;top: 0;left:195px;font-size: 16px;    width: 16px;
    height: 12px;" @click="numUp"/>
                        <Icon type="md-arrow-dropdown" style="position: absolute;top: 7px;left:195px;font-size: 16px;    width: 16px;
    height: 12px;" @click="numDown"/>
                    </div>
                </div>
                <div class="sort">
                    <span style="position: relative">{{$t('index.price')}}</span>
                    <div>
                        <Icon type="md-arrow-dropup" style="position: absolute;top: 0;left:265px;font-size: 16px;    width: 16px;
    height: 12px;" @click="priceUp"/>
                        <Icon type="md-arrow-dropdown" style="position: absolute;top: 7px;left:265px;font-size: 16px;    width: 16px;
    height: 12px;" @click="priceDown"/>
                    </div>
                </div>
            </Col>
        </Row>
        <br>
        <br>
        <div class="teacher" v-for="item in teacher">
            <div class="top">
                <div class="username" v-text="item.user.first_name + item.user.last_name"></div>
                <div v-if="item.is_card === 'true'" class="approve">
                    <Icon custom="iconfont icon-webicon301" :title="$t('index.autonym')" size="22" />
                </div>
                <div v-if="item.is_edu === 'true'" class="approve">
                    <Icon custom="iconfont icon-zizhirenzheng" :title="$t('index.aptitude')" size="20" />
                </div>
            </div>
            <Row class="bottom">
                <Col span="6">
                    <div>{{$t('index.Chargingstandards')}} : <span v-text="item.price"></span><span class="con">{{$t('index.minutes')}}</span></div>
                </Col>
                <Col span="6" style="width: 20%">
                    <div>{{$t('index.Theclass')}} : <span v-text="item.teach_num"></span><span class="con">{{$t('index.Order')}}</span></div>
                </Col>
                <Col span="6">
                    <div>{{$t('index.comprehensive')}} : <span v-text="item.rate"></span><span class="con">{{$t('index.point')}}</span></div>
                </Col>
            </Row>
            <div class="btn">
                <div class="mess">
                    <span @click="details(item.id)">{{$t('index.introduced')}}</span>
                </div>
                <div to="appointeacher" class="yu" style="cursor: pointer" :id="item.id" @click="appoinTeacher(item.user_id)">{{$t('index.appointment')}}</div>
            </div>
            <div class="box" v-if="flag==item.id" :id="item.id">
                <div class="left">
                    <video width="100%" height="260px" controls autoplay>
                        <source :src="item.video" type="video/ogg">
                        <object data="movie.mp4" width="320" height="240">
                            <embed width="320" height="240" src="movie.swf">
                        </object>
                    </video>
                </div>
                <div class="right">
                    <h3 class="teach">{{$t('index.introduced')}}</h3><br>
                    <span>{{$t('index.language')}}：</span><span v-for="level in item.lang_level">{{level.name}}&nbsp({{level.level}})&nbsp&nbsp</span>
                    <br>
                    <span>{{$t('index.firstlanguage')}}：</span><span v-text="item.language.name"></span><br>
                    <span>{{$t('index.country')}}：</span><span v-text="item.country.name_zh" :id="item.country.id"></span><br>
                    <span>{{$t('index.Thecourses')}}：</span><span v-for="item1 in item.teacher_subject">{{item1.subject.name}}&nbsp({{item1.grade.name}})&nbsp&nbsp</span><br>
                    <br>
                    <span class="conent" v-text="item.description"></span>
                </div>
            </div>
        </div>
        <Divider />
        <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage" />
    </div>
        </CenterLayout>
</template>
<script>
     import CenterLayout from '~/components/CenterLayout.vue';
     import BNService from '~/services/BNService';
     import '@/assets/iconfont/iconfont.css';
    export default {
        layout: 'single',
         middleware: ['secret', 'center'],
         components: {
            CenterLayout
        },
        data() {
            return {
                isactive: -1,
                isactive1: -1,
                subjects: [],
                grade: [],
                teacher: [],
                checkSubject: [],
                checkGrades: [],
                exist: false,
                lanage: false,
                flag: 0,
                lang_level: [],
                lang_levels: [],
                level: [],
                teacher_subject: [],
                obj: {},
                video: '',
                total:0,
                pageSize:0
            }
        },
         async mounted() {
            BNService.getSubjects().then((data) => {
               this.subjects = data
            });
            BNService.getTeacher().then((data) => {
               this.teacher = data.data
                this.total = data.total
                this.pageSize = data.per_page
            });
         },
        methods: {
            changepage(index) {
                this.obj.page = index
                BNService.getTeacher(this.obj).then((data) => {
                    this.teacher = data.data;
                    this.total = data.total
                    this.pageSize = data.per_page
                });
            },
            getTeachers() {
                BNService.getTeacher(this.obj).then((data) => {
                    this.teacher = data.data;
                    this.total = data.total
                    this.pageSize = data.per_page
                });
            },
            existLanguage() {
                this.obj.language = ''
                this.obj.exists = false
                if (this.exist && this.lanage) {
                    this.obj.language = '2'
                    this.obj.exists = true
                    this.getTeachers();
                } else if (this.exist) {
                    this.obj.exists = true
                    this.getTeachers();
                } else if (this.lanage) {
                    this.obj.language = '2'
                    this.getTeachers();
                } else {
                    this.getTeachers();
                }
            },
            checkGrade(val, index) {
                if (this.checkSubject.indexOf(val) === -1) {
                    BNService.getStudentGrade(val).then((data) => {
                        this.checkSubject.push(val)
                        this.isactive = index
                        this.isactive1 = -1
                        this.grade = data
                        this.obj.course = val
                        this.obj.grade = ''
                        this.existLanguage();
                    });
                } else {
                    this.checkSubject = []
                    this.obj.course = ''
                    this.isactive = -1
                    this.grade = []
                    this.existLanguage();
                }
            },
            check(val, index) {
                if (this.checkGrades.indexOf(val) === -1) {
                    this.checkGrades.push(val)
                    this.isactive1 = index
                    this.obj.grade = val
                    this.existLanguage();
                } else {
                    this.checkGrades = []
                    this.obj.grade = ''
                    this.isactive1 = -1
                    this.existLanguage();
                }
            },
            isLanguage() {
                if (!this.obj.language) {
                    this.obj.language = ''
                    this.getTeachers();
                } else {
                    this.obj.language = '2'
                    this.getTeachers();
                }
            },
            exists(val) {
                if (val === true) {
                    this.obj.exists = true
                    if (!this.obj.course) {
                        this.obj.course = ''
                        this.obj.grade = ''
                        this.isLanguage();
                    } else if (!this.obj.grade) {
                        this.obj.grade = ''
                        this.isLanguage();
                    } else {
                        this.isLanguage();
                    }
                } else {
                    this.obj.exists = false
                    this.getTeachers();
               }
            },
            isExists() {
                if (!this.obj.exists) {
                    this.obj.exists = false
                    this.getTeachers();
                } else {
                    this.obj.exists = true
                    this.getTeachers();
                }
            },
            language(val) {
                if (val === true) {
                    this.obj.language = '2'
                    if (!this.obj.course) {
                        this.obj.course = ''
                        this.obj.grade = ''
                        this.isExists();
                    } else if (!this.obj.grade) {
                        this.obj.grade = ''
                        this.isExists();
                    } else {
                        this.isExists();
                    }
                } else {
                    this.obj.language = ''
                    this.getTeachers();
               }
            },
            details(id) {
                if (this.flag == "0") {
                    this.flag = id
                } else if(this.flag== id) {
                    this.flag = "0"
                }else {
                    this.flag = id
                }
            },
            scoreUp() {
               return this.teacher.sort((a,b)=>b.rate-a.rate)
            },
            scoreDown(){
                return this.teacher.sort((a,b)=>a.rate-b.rate)
            },
            numUp() {
                return this.teacher.sort((a,b)=>b.teach_num-a.teach_num)
            },
            numDown(){
                return this.teacher.sort((a,b)=>a.teach_num-b.teach_num)
            },
            priceUp() {
                 return this.teacher.sort((a,b)=>b.price-a.price)
            },
            priceDown(){
                return this.teacher.sort((a,b)=>a.price-b.price)

            },
            appoinTeacher(val){
                 this.$router.push({path: `appointmentteacher/id?id=${val}`})
                // this.$router.push({path: 'appointmentteacher/'+(val || 'new')})
            }
        }
    }
</script>
<style scoped>
    .active{
        border: 1px solid #C1EDFF;
        background: #EEFAFF;
    }
    .conent{
        display: block;
        width: 100%;
        height: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sorting .sort {
        float: left;
        margin-right: 40px;
    }

    i {
        cursor: pointer;
    }

    .teacher {
        width: 100%;
        margin-bottom: 40px;
        position: relative;
    }

    .teacher .top {
        width: 50%;
        height: 40px;
        overflow: hidden;
    }
    .teacher .top .username {
        float: left;
        font-size: 22px;
        font-weight: 600;
        margin-right: 10px;
    }

    .teacher .top .approve {
        float: left;
        margin-right: 5px;
        margin-top: 10px;
    }

    .teacher .bottom {
        width: 75%;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .teacher .bottom .con {
        /*margin-right: 35px;*/
    }

    .teacher .btn {
        width: 180px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: 85px;
        text-align: center;
        color: #ffffff;
    }

    .teacher .btn .mess {
        width: 100px;
        height: 30px;
        border-radius: 20px;
        background: rgb(0, 146, 239);
        float: left;
        line-height: 30px;
        cursor: pointer;
        font-size: 16px;
    }

    .teacher .btn .yu {
        color: #FFFFFF;
        width: 60px;
        height: 30px;
        border-radius: 20px;
        background: rgb(0, 146, 239);
        float: left;
        line-height: 30px;
        margin-left: 20px;
        font-size: 16px;
    }

    .box {
        width: 93%;
        height: 300px;
        border: 1px solid rgb(223, 223, 223);
        padding: 20px;
    }

    .box .left {
        width: 35%;
        float: left;
    }

    .box .right {
        width: 48%;
        height: 280px;
        float: left;
        margin-left: 40px;
        overflow: hidden;
    }
</style>
