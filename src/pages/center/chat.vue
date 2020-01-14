<template>
    <div style="width: 75%;margin: 20px auto;">
        <h3 style="text-align: center;margin-bottom: 50px;font-size: 24px">咨询老师</h3>
        <br>
        <div class="teacher" v-for="item in teacher">
            <div class="top" v-text="item.user.first_name + item.user.last_name"></div>
            <Row class="bottom">
                <Col span="6">
                    <div>{{$t('index.Chargingstandards')}} : <span v-text="item.teacher_base.price"></span><span class="con">每分钟</span></div>
                </Col>
                <Col span="6" style="width: 20%">
                    <div>{{$t('index.Theclass')}} : <span v-text="item.teacher_base.teach_num"></span><span class="con">{{$t('index.Order')}}</span></div>
                </Col>
                <Col span="6">
                    <div>{{$t('index.comprehensive')}} : <span v-text="item.teacher_base.rate"></span><span class="con">{{$t('index.point')}}</span></div>
                </Col>
            </Row>
            <div class="btn">
                <div class="mess">
                    <span @click="details(item.teacher_base.id)">{{$t('index.introduced')}}</span>
                </div>
                <div class="yu" style="cursor: pointer" :id="item.teacher_base.id" @click="appoinTeacher(item.id,item.room_id)">咨询老师</div>
            </div>
            <div class="box" v-if="flag==item.teacher_base.id" :id="item.teacher_base.id">
                <div class="left">
                    <video width="100%" height="260px" controls autoplay>
                        <source :src="item.teacher_base.video" type="video/ogg">
                        <object data="movie.mp4" width="320" height="240">
                            <embed width="320" height="240" src="movie.swf">
                        </object>
                    </video>
                </div>
                <div class="right">
                    <h3 class="teach">{{$t('index.introduced')}}</h3><br>
                    <span>{{$t('index.language')}}：</span><span v-for="level in item.teacher_base.language">{{level.name}}&nbsp({{level.level}})&nbsp&nbsp</span>
                    <br>
                    <span>{{$t('index.firstlanguage')}}：</span><span v-text="item.teacher_base.language.name"></span><br>
                    <span>{{$t('index.country')}}：</span><span v-text="item.teacher_base.country.name_zh" :id="item.teacher_base.country.id"></span><br>
                    <span>{{$t('index.Thecourses')}}：</span><span v-for="item1 in item.teacher_base.teacher_subject">&nbsp</span><br>
                    <br>
                    <span class="conent" v-text="item.teacher_base.description"></span>
                </div>
            </div>
            <Divider />
        </div>
        <Page :total=total :page-size=pageSize style="margin-top: 10px;float: right" @on-change="changepage" />
    </div>
</template>
<script>
     import BNService from '~/services/BNService';
    export default {
        layout: 'single',
         middleware: ['secret', 'center'],
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
                video: '',
                total:0,
                pageSize:0,
                fromItem:{},
            }
        },
         async mounted() {
             this.fromItem.course = this.$route.query.course
             this.fromItem.grade = this.$route.query.grade_id
             BNService.getfindSign(this.fromItem).then((data) => {
                 this.teacher = data.data
                 this.total = data.total
                 this.pageSize = data.per_page
             });
         },
        methods: {
            changepage(index) {
                this.fromItem.page = index
                BNService.getfindSign(this.fromItem).then((data) => {
                    this.teacher = data.data
                    this.total = data.total
                    this.pageSize = data.per_page
                });
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
            appoinTeacher(val1,val2){
                console.log(val1,val2)
                this.$router.push({path:"learning",query:{course:this.fromItem.course,grade:this.fromItem.grade,id:val1,roomid:val2}})
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
        font-size: 20px;
        font-weight: 600;
        margin: 15px 0;
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
        width: 250px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: 0;
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
        width: 100px;
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