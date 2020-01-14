<template>
    <div class="v3-dynamicTopic">
        <div class="v3-abilityAnalysis">
            <div class="v3-abilityAnalysis-title">
                <div class="v3-abilityAnalysis-line"></div>
                <h2>动态知识点</h2>
                <div class="v3-abilityAnalysis-line"></div>
            </div>
            <p>什么？听和看一个视频课要40分钟！时间太宝贵了。本人工智能系统会一步一步地详解，郤一句沒用的话和动作都没有。故学生可以高效地明瞭每个知识点。当学生学懂一个知识点后，本人工智能系统会给出该知识点的练习或历年真题，从而巩固学生的知识点及训练学生考得好成绩。</p>
        </div>
        <div class="dynamicTopic-video">
            <div class="v3-students-topImg">
                <div class="topImg-left-img"><img src="/client/images/students1.png" /><img src="/client/images/students2.png" /></div>
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
    </div>

</template>

<script type="text/ecmascript-6">
    import '~/assets/styles/functions/dynamicTopic.scss';
    import '~/assets/styles/functions/abilityAnalysis.scss';

    export default {
        layout: 'single',
        middleware: 'auth',
        head: function() {
            return {
                title: this.$t('dynamicTopic.title')
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