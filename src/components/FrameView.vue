/*
    IFrame封装
*/
<template>
    <div :class="className" :style="iframeStyle">
        <iframe :src="srcUrl" :height="iframeHeight" :id="frameId" :onload="onKeynoteLoaded()" frameborder="0" scrolling="no" style="-webkit-overflow-scrolling:touch;width: 1px; min-width: 100%; *width: 100%;">
        </iframe>
        <div v-if="showTip && !isMobileLayout" class="frame-view-tip">{{$t('exam.frame_view_tip')}}</div>
        <!--<div class="frame-view-tip2" style="text-align: right" v-show="isKeynoteLoaded">-->
            <!--<ButtonGroup vertical>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-arrow-up" @click="previousKeynotePage()" ></Button>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-arrow-down" size="large" @click="nextKeyNotePage()"></Button>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-rewind-outline" size="large"></Button>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-fastforward-outline" size="large"></Button>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-play-outline" size="large"></Button>-->
                <!--<Button class="ivu-btn-ghost" icon="ios-pause-outline" size="large"></Button>-->
            <!--</ButtonGroup>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Constants from '~/actions/Constants';

const WINDOWS_WIDTH = BN.viewport().width;

export default {
    props: {
        className: {
            type: String,
            default: 'exercise-view'
        },
        srcUrl: {
            type: String,
            default: ''
        },
        showTip: {
            type: Boolean,
            default: true
        },
        frameId: {
            type: Number,
            default: Math.ceil(Math.random()*100000000)
        }
    },
    data() {
        return {
            keynote_loaded: false,
            keynote_page: 1
        };
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
            screenWidth: Constants.INDEX.SCREEN_WIDTH
        }),
        iframeStyle() {
            if (this.isMobileLayout) {
                return `width: 100%;-webkit-overflow-scrolling:touch;overflow-y: scroll;`;
            } else {
                return 'width:100%;';
            }
        },
        iframeHeight() {
            if (this.isMobileLayout) {
                let width = this.screenWidth - 50;
                let height = width * 768 / 1024;
                return height + 'px';
            } else {
                return '100%';
            }
        },
        isKeynoteLoaded() {
            return this.keynote_loaded;
        }
    },
    methods: {
        onBack() {
            this.$router.go(-1);
        },
        onKeynoteLoaded() {
            // console.log($("#" + this.frameId).attr('src'));
            // this.keynote_page == 1;
            // this.keynote_loaded = true;
        },
        previousKeynotePage() {console.log(`this.keynote_page=${this.keynote_page}`);
            // // console.log('this.frameId=' + this.frameId);return;
            // var $frame = $("#" + this.frameId);
            // if (this.keynote_page == 1)
            // {
            //     this.$Message.success("已经是第一页");
            // }
            // else
            // {
            //     this.keynote_page = Math.max(--this.keynote_page, 1);
            //     $frame.contents().find(".navigatorThumbnailItem").eq(this.keynote_page - 1).trigger('click');
            // }
        },
        nextKeyNotePage() {console.log(`this.keynote_page=${this.keynote_page}`);
            // let $frame = $("#" + this.frameId);
            // let total_page = $frame.contents().find(".navigatorThumbnailItem").length;
            //
            // if (this.keynote_page == total_page)
            // {
            //     this.$Message.success("已经是最后一页");
            // }
            // else
            // {
            //     this.keynote_page = Math.min(++this.keynote_page, total_page);
            //     $frame.contents().find(".navigatorThumbnailItem").eq(this.keynote_page - 1).trigger('click');
            // }
        }
    }
};
</script>

