<template>
    <div class="v3-parent">
        <div class="v3-parent-title">
            <div class="v3-parent-line"></div>
            <h2>成人学生</h2>
            <div class="v3-parent-line"></div>
        </div>
        <p>本人工智能系统面对两类成人学生：成人自考高考生和成人英语学生（身在国内便可学习英语日语等语言，本系统会根据学生的基础而辅导英语语法）,最终目的是学生与英语人士日常能流利的沟通和能写出工整的电邮及短文章。</p>
        <div class="adultStudent-video">
            <div class="video"   width="100%">
                <video id="myvideo" :src="videoSrc" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" loop="loop" ></video>
                <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>
                <span class="ico ico-skip"></span>
                <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import '~/assets/styles/introduce/parent.scss';
    import '~/assets/styles/introduce/adultStudent.scss';
    export default {
        layout: 'single',
        middleware: 'auth',
        name: "parent",
        head: function() {
            return {
                title: this.$t('adultStudent.title')
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
    }
</script>

<style scoped>

</style>