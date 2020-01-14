<template>
    <div class="bigbox">
        <div style="font-size: 16px">{{ $t('aptitude.approve') }}</div>
        <Divider/>
        <div class="education">
            <div class="education_top">
                <div class="title" style="height: 28px;width:100%" v-if="statick==0">
                    <span>{{ $t('aptitude.upload_diploma') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="statick==1">
                    <span>{{ $t('aptitude.upload_diploma') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#80CDAE">{{ $t('aptitude.certification') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="statick==2">
                    <span>{{ $t('aptitude.upload_diploma') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#338BD8">{{ $t('aptitude.passed') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="statick==3">
                    <span>{{ $t('aptitude.upload_diploma') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#87939A">{{ $t('aptitude.authentication') }}</span>
                </div>
                <div class="demo-upload-list" v-for="item in uploadList">
                    <div class="fiteat" v-if="statick==1 || (statick==2 && states==1) || (statick==3&& states==1)">
                        <img :src="item.url">
                    </div>
                    <div class="fiteat" v-else-if="states==0 || statick==0">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </div>
                </div>
                <Upload
                        v-if="(states==0&&(statick==2||statick==3)) ||statick==0 "
                        ref="uploadcard"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="handleBeforeUpload"
                        :headers="headers"
                        action="/api/v3/teacher/authentication/upload"
                        multiple
                        name="education"
                        type="drag"
                        style="display: inline-block;width:58px;">
                    <div style="width: 100%;height:100%;line-height: 118px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Upload
                        v-else-if="(statick==1&&states==1) || statick==2 || statick==3"
                        ref="uploadcard"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="handleBeforeUpload"
                        :headers="headers"
                        action="/api/v3/teacher/authentication/upload"
                        multiple
                        name="education"
                        type="drag"
                        style="display:none;width:58px;">
                </Upload>
            </div>
            <div class="education_top">
                <div class="title" style="height: 28px;width:100%" v-if="staticle==0">
                    <span>{{ $t('aptitude.upload_certificate') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="staticle==1">
                    <span>{{ $t('aptitude.upload_certificate') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#80CDAE">{{ $t('aptitude.certification') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="staticle==2">
                    <span>{{ $t('aptitude.upload_certificate') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#338BD8">{{ $t('aptitude.passed') }}</span>
                </div>
                <div class="title" style="height: 28px;width:100%" v-else-if="staticle==3">
                    <span>{{ $t('aptitude.upload_certificate') }}</span>
                    <span style="margin-left: 20px;font-size: 12px;color:#87939A">{{ $t('aptitude.authentication') }}</span>
                </div>
                <div class="demo-upload-list" v-for="item in upload">
                    <div class="fiteat" v-if="staticle==1 || (staticle==2&&states==1) || (staticle==3&& states==1)">
                        <img :src="item.url">
                    </div>
                    <div class="fiteat" v-else-if="states==0 || staticle==0">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="remove(item)"></Icon>
                        </div>
                    </div>
                </div>
                <Upload
                        v-if="(states==0&&(staticle==2||staticle==3)) || staticle==0"
                        ref="uploadIdentity"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="success"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="beforeUpload"
                        multiple
                        :headers="headers"
                        action="/api/v3/teacher/authentication/uploads"
                        type="drag"
                        name="identity"
                        style="display: inline-block;width:58px;">
                    <div style="width: 100%;height:100%;line-height: 118px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Upload
                        v-else-if="(staticle==1&&states==1) || staticle==2 || staticle==3"
                        ref="uploadIdentity"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="success"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="beforeUpload"
                        multiple
                        :headers="headers"
                        action="/api/v3/teacher/authentication/uploads"
                        type="drag"
                        name="identity"
                        style="display: none;width:58px;">
                </Upload>
            </div>
            <div class="clsubmit" style="margin-top: 20px" v-if="(staticle== 1 && statick== 1)">
                <Button type="primary" disabled @click="submit()">{{ $t('course.submit') }}</Button>
            </div>
            <div class="clsubmit" style="margin-top: 20px" v-else>
                <div class="clsubmit" style="margin-top: 20px" v-if="states===2||(staticle== 0 && statick== 0)||(states===1&&staticle== 0 && statick== 0)||(states===1&&(staticle== 1 && statick== 1))">
                <Button type="primary" @click="submit()">{{ $t('course.submit') }}</Button>
            </div>
                <div v-else-if="states===0">
                    <Button @click="toggleState(1)">{{$t('center.cancel')}}</Button>
                    <Button type="primary" @click="submit()" style="margin-left: 8px">{{$t('center.save')}}</Button>
                </div>
                <div v-else>
                    <Button type="primary" @click="toggleState(0)">{{$t('center.edit')}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BNService from '~/services/BNService';
    import {getUploadHeaders} from '~/services/BNService';

    export default {
        layout: 'tutor',
        middleware: ['secret', 'tutor'],
        data() {
            return {
                statick: 0,
                states:1, // 0 编辑状态 1 预览状态
                staticle: 0,
                defaultList: [],
                imgName: '',
                uploadList: [],
                upload: [],
                headers: {}
            }
        },
        async mounted() {
            this.tecame()
            this.seniori()
        },
        methods: {
            tecame() {
                this.uploadList = this.$refs.uploadcard.fileList;
                this.headers = getUploadHeaders()
                this.position()
            },
            seniori() {
                this.upload = this.$refs.uploadIdentity.fileList;
                this.headers = getUploadHeaders()
                this.iftrue()
            },
            position() {
                BNService.getTeacherAuthentic().then((data) => {
                    if (data.education == '') {
                        this.statick = 0
                    } else if (data.status.is_edu == 1) {
                        this.statick = 1
                    } else if (data.status.is_edu == 2) {
                        this.statick = 2
                        this.states=1
                    } else if (data.status.is_edu == 3) {
                        this.statick = 3
                    }
                    data.education.sort((a,b)=>a.id-b.id)
                    this.uploadList = data.education
                })
            },
            iftrue() {
                BNService.getTeacherAuthentic().then((data) => {
                    if (data.identity == '') {
                        this.staticle = 0
                    } else if (data.status.is_card == 1) {
                        this.staticle = 1
                    } else if (data.status.is_card == 2) {
                        this.staticle = 2
                        this.states=1
                    } else if (data.status.is_card == 3) {
                        this.staticle = 3
                    }
                    data.identity.sort((a,b)=>a.id-b.id)
                    this.upload = data.identity
                })
            },
            handleRemove(file) {
                let id = file.id
                let fileList = []
                if (id) {
                    BNService.delAuthentication(id).then((data) => {
                        fileList = this.uploadList;
                        this.uploadList.splice(fileList.indexOf(file), 1);
                        // if(fileList.length){
                        //     this.statick=1
                        // }else{
                        //     this.statick=0
                        // }
                    })
                } else {
                    fileList = this.uploadList;
                    this.uploadList.splice(fileList.indexOf(file), 1);
                }
            },
            handleSuccess(res, file) {
                this.uploadList.push(file)
                file.url = file.response.d
                // this.statick = 1
                BNService.getTeacherAuthentic().then((data) => {
                for(var i=0;i<this.uploadList.length;i++){
                    if(!this.uploadList[i].id){
                        data.education.forEach((v, k)=> {
                                if(this.uploadList[i].url==v.url){
                                    this.uploadList[i].id=v.id
                                }
                            })
                         }
                    }
                })
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: this.$t('aptitude.only')
                    });
                }
                return check;
            },
            remove(file) {
                let id = file.id
                let fileList = []
                if (id) {
                    BNService.delAuthentication(id).then((data) => {
                        fileList = this.upload;
                        this.upload.splice(fileList.indexOf(file), 1);
                        // if(fileList.length){
                        //     this.staticle=1
                        // }else{
                        //     this.staticle=0
                        // }
                    })
                } else {
                    fileList = this.upload;
                    this.upload.splice(fileList.indexOf(file), 1);
                }
            },
            success(res, file) {
                this.upload.push(file)
                file.url = file.response.d
                // this.staticle = 1
                BNService.getTeacherAuthentic().then((data) => {
                for(var i=0;i<this.upload.length;i++){
                    if(!this.upload[i].id){
                        data.identity.forEach((v, k)=> {
                                if(this.upload[i].url==v.url){
                                    this.upload[i].id=v.id
                                }
                            })
                         }
                    }
                })
            },
            beforeUpload() {
                const check = this.upload.length < 10;
                if (!check) {
                    this.$Notice.warning({
                        title: this.$t('aptitude.only1')
                    });
                }
                return check;
            },
            positions() {
                BNService.getTeacherAuthentic().then((data) => {
                    if (data.education == '') {
                        this.statick = 0
                    } else if (data.status.is_edu == 1) {
                        this.statick = 1
                        this.states = 1;
                        data.education.sort((a,b)=>a.rate-b.rate)
                    } else if (data.status.is_edu == 2) {
                        this.statick = 2
                        data.education.sort((a,b)=>a.id-b.id)
                        this.states = 1;
                    } else if (data.status.is_edu == 3) {
                        this.statick = 3
                        this.states = 1;
                        data.education.sort((a,b)=>a.id-b.id)
                    }
                })
            },
            iftrues() {
                BNService.getTeacherAuthentic().then((data) => {
                    if (data.identity == '') {
                        this.staticle = 0
                    } else if (data.status.is_card == 1) {
                        this.staticle = 1
                        data.identity.sort((a,b)=>a.id-b.id)
                    } else if (data.status.is_card == 2) {
                        this.staticle = 2
                        this.states = 2;
                        data.identity.sort((a,b)=>a.id-b.id)
                    } else if (data.status.is_card == 3) {
                        this.staticle = 3
                        this.states = 2;
                        data.identity.sort((a,b)=>a.id-b.id)
                    }
                })
            },
            submit(){
                BNService.getTeacherAuthentic().then((data) => {
                    if(data.identity=='' && data.education == ''){
                        this.$Message.error(this.$t('profile.failure_tip'));
                    }else{
                        this.positions()
                        this.iftrues()
                        this.$Message.success(this.$t('profile.succeed_tip'));
                    }
                })
            },
            toggleState(states) {
                if(this.upload=='' && this.uploadList == ''){
                    this.positions()
                    this.iftrues()
                }else if (states === 1) {
                    this.position()
                    this.iftrue()
                }
                this.states = states;
          },
        },
    }
</script>

<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        line-height: 120px;
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .bigbox {
        height: 100%;
    }

    .education_top > div {
        width: 170px;
        height: 120px;
        display: inline-block;
        margin-top: 15px;
        overflow: hidden;
    }

    .education_top {
        font-size: 16px;
    }

    .education_top > span {
        display: block;
    }

    .education_top {
        width: 100%;
        height: auto;
    }

    .education {
        width: auto;
        height: 100%;
    }

    .audit_all {
        width: 800px;
        height: 50px;
        font-weight: 600;
        font-size: 20px;
    }
    .fiteat{
        width: 100%;
        height: 100%;
    }
</style>
