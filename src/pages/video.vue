<template>
    <div class="main-container">
        <!--视频-->
        <div class="bn-main-video" height="100%" width="100%" style="z-index: 1;">
            <div :style="videoStyle"
                 :playsinline="playsInline"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"
                 @ready="playerReadied"
                 @statechanged="playerStateChanged($event)"
                 v-video-player:myVideoPlayer="playerOptions">
            </div>
        </div>
    </div>
</template>

<script>
const WINDOWS_HEIGHT = BN.viewport().height;
const WINDOWS_WIDTH = BN.viewport().width;

export default {
    layout: 'single',
    middleware: 'auth',
    data() {
        return {
            videoStyle: `height: ${WINDOWS_HEIGHT - 100}px; width: 100%`,
            playStatus: '',
            muteStatus: '',
            isEn: this.$i18n.locale === 'en',
            isMute: true,
            isPlay: false,
            playsInline: false,
            playerOptions: {
                muted: false,
                height: `${WINDOWS_HEIGHT - 100}px`,
                width: `${WINDOWS_WIDTH - 10}px`,
                language: this.$i18n.locale,
                autoplay: true,
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: 'video/mp4',
                    src: '/client/videos/media-20180705.mp4'
                }],
            }
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    mounted: function () {

    },
    methods: {
        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
            console.log('player current update state', playerCurrentState)
        },
        // player is ready
        playerReadied(player) {
            console.log('example 01: the player is readied', player)
        }
    }
};
</script>

<style scoped>
    video::-internal-media-controls-download-button {
        display:none;
    }

    video::-webkit-media-controls-enclosure {
        overflow:hidden;
    }

    video::-webkit-media-controls-panel {
        width: calc(100% + 30px);
    }
</style>
