<template>
    <div class="v3-students" >
        <div class="v3-students-topImg" id="parent">
            <div class="topImg-left-img" >
                <img src="/client/images/parent5.png" />
                <img src="/client/images/parent6.png" />
                <img src="/client/images/parent7.png" />
            </div>
            <div class="topImg-right-video">
                <div class="video"   width="100%">
                    <video id="myvideo" :src="videoSrc" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" loop="loop" ></video>
                    <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>
                    <span class="ico ico-skip"></span>
                    <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span>
                </div>
            </div>
        </div>
    </div>


</template>

<script type="text/ecmascript-6">
    import '~/assets/styles/introduce/students.scss';
    import '~/assets/styles/introduce/onlieTeacher.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('parent.title')
            };
        },
        data(){
            return {
                _dom:"",
                videoSrc:'http://naixi.mynetgear.com:9070/src/C/P/K/JSL/zBUf7PViXA4X4kY5/1.m4v',
                videoImg:'/client/images/students4.png',
                playStatus:'autoplay',
                muteStatus:'',
                isMute:true,
                isPlay:true
            }
        },
        methods:{
            playClick(){
                this.isPlay = !this.isPlay;
                this.playStatus= 'autoplay';
            },
            closeSoundClick(){
                this.isMute = !this.isMute;
                if(this.isMute){
                    this.muteStatus = '';
                }else{
                    this.muteStatus = 'muted';
                }
            }
        }

    };
</script>

<style scoped>

</style>