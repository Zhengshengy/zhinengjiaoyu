<template>
    <Form :model="formItem" label-position="top" ref='formItem'>
        <div style="font-size: 18px;">{{ $t('profile.basic') }}</div>
        <Divider />
        <FormItem :label="this.$t('profile.first_name')" :error="error_first_name">
            <Input v-model="formItem.first_name" :disabled="!!state" size="large" style="width:300px;" :placeholder="this.$t('profile.first_name_tip')"></Input>
        </FormItem>
        <FormItem :label="this.$t('profile.last_name')" :error="error_last_name">
            <Input v-model="formItem.last_name" size="large" style="width:300px;" :placeholder="this.$t('profile.last_name_tip')" :disabled="!!state"></Input>
        </FormItem>
        <FormItem :label="this.$t('profile.sex')" :error="error_sex">
            <Select v-model="formItem.sex" size="large" style="width:300px;" :disabled="!!state">
                <Option :value="1">{{ $t('profile.sir') }}</Option>
                <Option :value="2">{{ $t('profile.lady') }}</Option>
            </Select>
        </FormItem>
        <FormItem :label="this.$t('profile.country')" :error="error_country">
            <Select v-model="formItem.country_id"
                filterable
                size="large" style="width:300px;" :placeholder="cname" :disabled="!!state" @on-change="changeCname" >
                <Option v-for="item1 in country" :key="item1.id"  :value="item1.id">{{item1.name_zh}}</Option>
            </Select>
        </FormItem>
        <FormItem :label="this.$t('profile.language')" :error="error_language">
            <Select v-model="formItem.language_id" size="large" style="width:300px;" @on-change="changeLname" :placeholder="lname" :disabled="!!state">
                <Option v-for="item in language" :key="item.id" v-text="item.name" :value="item.id"></Option>
            </Select>
        </FormItem>
        <FormItem :label="this.$t('profile.language_skill')" size="large">
          <div class="" v-for="(item,i) in language">
            <span style="line-height:32px; float:left; margin:0px 30px 0px 0px; display:inline-block; vertical-align:middle" v-text="item.name"></span>
            <RadioGroup :id="item.id" v-model="formItem.bindData[i].value">
                <Radio :label="1" :disabled="!!state">{{ $t('profile.excellent') }}</Radio>
                <Radio :label="2" :disabled="!!state">{{ $t('profile.ordinary') }}</Radio>
                <Radio :label="3" :disabled="!!state">{{ $t('profile.incapable') }}</Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <FormItem :label="this.$t('profile.on_duty')" size="large">
            <i-switch v-model="formItem.is_full" :disabled="!!state" size="large">
                <span slot="open">{{ $t('profile.on_duty_yes') }}</span>
                <span slot="close">{{ $t('profile.on_duty_no') }}</span>
            </i-switch>
        </FormItem>
        <FormItem :label="this.$t('profile.introduce')"  size="large" :error="error_description">
            <Input v-model="formItem.description" :disabled="!!state" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="this.$t('profile.introduce_tip')"></Input>
        </FormItem>
        <FormItem :label="this.$t('profile.upload_video')" :error="error_video">
<<<<<<< HEAD
          <Upload v-if="static_video==false" action="/api/v3/teacher/teacher-base/upload" :headers="headers" name="video" :on-success="handleSuccess" v-model="formItem.video" :max-size=7168 :format="Format" :before-upload="amedit" :disabled="!!state">
              <div class="static" v-text="formItem.video"></div>
            <Button icon="ios-cloud-upload-outline" :disabled="!!state">{{ $t('profile.upload_file') }}</Button>
          </Upload>
        <Upload v-else-if="static_video==true" action="/api/v3/teacher/teacher-base/upload" :headers="headers" name="video" :on-success="handleSuccess" v-model="formItem.video" :max-size=7168 :format="Format" :before-upload="amedit" :disabled="!!state">
=======
          <Upload v-if="static_video==false" action="/api/v3/teacher/teacher-base/upload" :headers="headers" name="video" :on-success="handleSuccess" v-model="formItem.video" :max-size=7168 accept='.mp4,.avi,.3gp,.rm,.qlv,.rmvb,.avi,.mpeg,.mpg,.mkv,.dat,.asf,.wmv,.flv,.mov,.ogg,.ogm' :before-upload="amedit" :disabled="!!state">
              <div class="static" v-text="formItem.video"></div>
            <Button icon="ios-cloud-upload-outline" :disabled="!!state">{{ $t('profile.upload_file') }}</Button>
          </Upload>
        <Upload v-else-if="static_video==true" action="/api/v3/teacher/teacher-base/upload" :headers="headers" name="video" :on-success="handleSuccess" v-model="formItem.video" :max-size=7168 accept='.mp4,.avi,.3gp,.rm,.qlv,.rmvb,.avi,.mpeg,.mpg,.mkv,.dat,.asf,.wmv,.flv,.mov,.ogg,.ogm'  :before-upload="amedit" :disabled="!!state">
>>>>>>> 43796bdd5bdaec435f474091fccca310018ceee3
            <Button icon="ios-cloud-upload-outline" :disabled="!!state">{{ $t('profile.upload_file') }}</Button>
          </Upload>
        </FormItem>
        <FormItem v-if="formItem.status===0">
            <Button type="primary" @click="submit(formItem)">{{ $t('profile.confirm') }}</Button>
        </FormItem>
        <FormItem v-else-if="formItem.status===1">
            <Button disabled type="primary" @click="submit(formItem)">{{ $t('profile.confirm') }}</Button>
            <span style="margin-left: 20px;color:#18DA99">{{ $t('profile.under_review') }}</span>
        </FormItem>
        <Row class-name="pull-right" v-else-if="formItem.status===2">
            <FormItem v-if="states===0">
                <Button @click="toggleState(1)">{{$t('center.cancel')}}</Button>
                <Button type="primary" @click="submit(formItem)" style="margin-left: 8px">{{$t('center.save')}}</Button>
            </FormItem>
            <FormItem v-else-if="states===1">
                <Button type="primary" @click="toggleState(0)">{{$t('center.edit')}}</Button>
                <span style="margin-left: 20px;color:#2D8CF0">{{$t('profile.Data_approval')}}</span>
            </FormItem>
        </Row>
        <FormItem v-else-if="formItem.status===3">
            <Button type="primary" @click="submit(formItem)">{{ $t('profile.confirm') }}</Button>
            <span style="margin-left: 20px;color:#E21817">{{ $t('profile.something_wrong') }}</span>
        </FormItem>
    </Form>
</template>
<script>
import BNService from '~/services/BNService';
import { getUploadHeaders } from '~/services/BNService';
  export default {
    layout: 'tutor',
      middleware: ['secret','tutor'],
    data () {
        return {
<<<<<<< HEAD
            Format:['.mp4','.avi','.3gp','.rm','.qlv','.mov','.mtv','.rmvb','.dat','.wmv','.amv','.dmv','.flv'] ,
=======
            list:[],
>>>>>>> 43796bdd5bdaec435f474091fccca310018ceee3
            cname:'',
            lname:'',
            isSelect: true,
            flage: false,
            states: 1,
            state: 0,
            country: [],
            language:[],
            language_ability: '',
            headers: {},
            upload:[],
            size:'',
            error_first_name: '',
            error_last_name: '',
            error_sex: '',
            error_country: '',
            error_language: '',
            error_description: '',
            error_video: '',
            static_video: false,
            formItem: {
                id: '',
                first_name: '',
                last_name: '',
                sex: '',
                country_id: '',
                language_id: '',
                bindData:[],
                is_full: '',
                description: '',
                video: '',
                status: 0,
            },
        }
    },
    async mounted() {
         this.syntony()
         BNService.getLanguage().then((data)=>{
            this.language = data
            let that = this
            data.forEach( (val)=> {
                let obj = {}
                obj.value = parseInt(val.value)
                that.formItem.bindData.push(obj)
            })
         })
         BNService.getCountry().then((data)=>{
            data.forEach((t)=>{
                this.country.push(t)
                this.list.push(t)
            })
         })
        this.headers = getUploadHeaders();
    },
      methods: {
          syntony(){
             BNService.teacherProfile().then((data) => {
                 //用户基本信息
                 this.formItem.first_name = data.first_name
                 this.formItem.last_name = data.last_name
                 this.formItem.sex = data.sex
                 //老师额外信息
                 if(data.teacher_bases != null){
                     this.formItem.id = data.teacher_bases.id
                     // this.formItem.status=data.teacher_bases.status
                     this.formItem.country_id = data.teacher_bases.country.id
                     this.formItem.language_id = data.teacher_bases.language.id
                     this.formItem.description = data.teacher_bases.description
                     this.cname = data.teacher_bases.country.name_zh
                     this.lname = data.teacher_bases.language.name
                     var str = data.teacher_bases.video;
                        var index = str .lastIndexOf("\/");
                        this.formItem.video = str .substring(index + 1, str .length);
                        this.static_video=false
                     if (data.teacher_bases.is_full == 2){
                         this.formItem.is_full = false
                     }else if(data.teacher_bases.is_full == 1){
                         this.formItem.is_full = true
                     }
                     if(data.teacher_bases.status==1){
                         this.formItem.status=1
                         this.state=1
                     }else if(data.teacher_bases.status==2){
                         this.formItem.status=2
                         this.state=1
                     }else if(data.teacher_bases.status==3){
                         this.formItem.status=3
                         this.state=0
                     }
                 }else{
                    this.formItem.status=0
                     this.state=0
                 }
             }).catch(function () {

             })
          },
          changeCname(val) {
              this.cname = val.label
          },
          changeLname(val) {
              this.lname = val.label
          },
          submit(name) {
              name.status=1
              this.state=1
              if(name.first_name == ''){
                  this.error_country= ''
                  this.error_language= ''
                  this.error_last_name = ''
                  this.error_sex = ''
                  this.error_description = ''
                  this.error_video = ''
                  this.error_first_name = this.$t('profile.lastname');
              }else if(name.last_name == ''){
                  this.error_first_name = ''
                  this.error_sex = ''
                  this.error_country= ''
                  this.error_language= ''
                  this.error_description = ''
                  this.error_video = ''
                  this.error_last_name = this.$t('profile.yourname');
              }else if(name.sex == ''){
                  this.error_first_name = ''
                  this.error_last_name = ''
                  this.error_country= ''
                  this.error_language= ''
                  this.error_description = ''
                  this.error_video = ''
                  this.error_sex = this.$t('profile.gender');
              }else if(name.country_id == ''){
                  this.error_first_name = ''
                  this.error_last_name = ''
                  this.error_country= this.$t('profile.countrys')
                  this.error_language= ''
                  this.error_description = ''
                  this.error_video = ''
                  this.error_sex = '';
              }
              else if(name.language_id == ''){
                  this.error_first_name = ''
                  this.error_last_name = ''
                  this.error_country= ''
                  this.error_language= this.$t('profile.native')
                  this.error_description = ''
                  this.error_video = ''
                  this.error_sex = '';
              }
              else if(name.description == ''){
                  this.error_first_name = ''
                  this.error_country= ''
                  this.error_language= ''
                  this.error_last_name = ''
                  this.error_sex = ''
                  this.error_video = ''
                  this.error_description = this.$t('profile.strengths');
              }else if(name.video == ''){
                  this.error_first_name = ''
                  this.error_last_name = ''
                  this.error_sex = ''
                  this.error_country= ''
                  this.error_language= ''
                  this.error_description = ''
                  this.error_video = this.$t('profile.upload');
              }else {
                  this.error_first_name = ''
                  this.error_last_name = ''
                  this.error_sex = ''
                  this.error_country= ''
                  this.error_language= ''
                  this.error_description = ''
                  this.error_video = ''
                  BNService.updateTeacherProfile(this.formItem).then((data) => {
                          this.$Message.success(this.$t('profile.succeed_tip'));
                  }).catch(()=>{
                      this.$Message.error(this.$t('profile.failure_tip'));
                  })
              }
          },
          toggleState(states) {
            if (states === 1) {
                this.syntony();
            }
            this.state = states;
            this.states = states;
          },
          handleSuccess() {
              this.$Message.info({
                  content: this.$t('profile.verifi'),
                  duration: 2,
                  closable: true,
              });
                  BNService.postUploaddate().then((data) => {
                      this.$Message.success({
                          content: this.$t('profile.verified'),
                          duration: 3,
                          closable: true
                      });
                  }).catch((e) => {
                      this.$Message.info({
                          content: this.$t('profile.verified_failed'),
                          duration: 3,
                          closable: true
                      });
                  })

          },
          amedit(file) {
              var fileName = file.name
              var extStart = fileName.lastIndexOf(".");
              var ext = fileName.substring(extStart, fileName.length).toUpperCase()
              var index = fileName .indexOf("\/");
              fileName = fileName .substring(index + 1, fileName .length);
              if (file.size > 7168000 ) {
                    this.$Notice.warning({
                        title: this.$t('profile.profile')
                    });
                    return false;
                }
<<<<<<< HEAD
              //   else if(ext != ".MP4" && ext != ".AVI" && ext != ".3GP" && ext != ".RM" && ext != ".QLV"){
              //    this.$Message.warning(this.$t('profile.uploadvideo'));
              //    return false;
              // }
=======
                else if(ext != ".MP4" && ext != ".AVI" && ext != ".3GP" && ext != ".RM" && ext != ".QLV" && ext != ".RMVB" && ext != ".AVI" && ext != ".MPEG" && ext != ".MPG" && ext != ".MKV" && ext != ".DAT" && ext != ".ASF" && ext != ".WMV" && ext != ".FLV" && ext != ".MOV" && ext != ".OGG" && ext != ".OGM"){
                 this.$Message.warning(this.$t('profile.uploadvideo'));
                 return false;
              }
>>>>>>> 43796bdd5bdaec435f474091fccca310018ceee3
              else if(fileName==''){
                 this.$Message.warning(this.$t('profile.uploaded'));
                 return false;
              }else{
                  this.formItem.video = file.name
                  this.static_video=true
                  this.$Notice.warning({
                        title: this.$t('profile.successfully')
                    });
                  return this.formItem.video;
              }
          },
      }
}
</script>
<style scoped>

</style>
