<!--Created by Bamboo on 2018/8/14.-->

<style scope>
    div[playback-rates]{
        position: fixed;
        top: 90px;
        right: 30px;
    }
    div[playback-rates] div.ivu-select-selection{
        background-color: transparent;
        border: 0;
    }
</style>

<template>
    <div>
        <video-player class="vjs-custom-skin"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="playsInline"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
                      @ended="onPlayerEnded($event)"
                      @loadeddata="onPlayerLoadeddata($event)"
                      @waiting="onPlayerWaiting($event)"
                      @playing="onPlayerPlaying($event)"
                      @timeupdate="onPlayerTimeupdate($event)"
                      @canplay="onPlayerCanplay($event)"
                      @featuresFullscreenResize="onPlayerCanplaythrough($event)"
                      @ready="playerReadied"
                      @documentFullscreenChange="onFullScreenChange($event)"
                      @statechanged="playerStateChanged($event)">
        </video-player>
        <!--<div playback-rates v-show="isMobileLayout">-->
            <!--<Select v-model="pr" style="width:60px" placeholder="1x">-->
                <!--<template v-for="(item, index) in playerOptions.playbackRates" >-->
                    <!--<Option :key="index" :value="item">{{ item }}x</Option>-->
                <!--</template>-->
            <!--</Select>-->
        <!--</div>-->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Constants from '~/actions/Constants';
    import { videoPlayer } from 'vue-video-player';
    import 'video.js/dist/video-js.css';
    import 'vue-video-player/src/custom-theme.css';

    export default {
        components: {
            videoPlayer
        },
        props: {
            srcUrl: {
                type: String,
                default: ''
            }
        },
        watch: {
            srcUrl: function (newUrl, oldUrl) {
                if (newUrl && newUrl.length > 0)
                {
                    this.playerOptions.sources = [
                        {
                            type: "video/mp4",
                            src: newUrl
                        }
                    ];
                    this.player.muted(false);
                }
            },
            pr: function (newRate, oldRate) {
                this.player.playbackRate(newRate);
            }
        },
        data() {
            return {
                playsInline: BN.isMobileLayout() ? false : true,
                fullScreen: false,
                playerOptions: {
                    height: BN.calcKeynoteHeight(),
                    autoplay: false,
                    muted: true,
                    controls: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [],
                    // controlBar: {
                    //     timeDivider: false,
                    //     durationDisplay: false,
                    //     remainingTimeDisplay: false,
                    //     fullscreenToggle: true
                    // }
                },
                pr: 1
            }
        },
        mounted() {
            console.log(this.playerOptions)
            this.resizeScreenHandle = BN.addResizeListener(this.onResizeScreen);
        },
        beforeDestroy() {
            this.resizeScreenHandle && this.resizeScreenHandle.apply();
        },
        computed: {
            ...mapGetters({
                isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
                screenHeight: Constants.INDEX.SCREEN_HEIGHT,
                screenWidth: Constants.INDEX.SCREEN_WIDTH
            }),
            player() {
                return this.$refs.videoPlayer.player;
            }
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
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                // seek to 10s
                // console.log('example player 1 readied', player)
                // player.currentTime(10)
            },
            onResizeScreen(previousVP, currentVP) {
                if (this.isMobileLayout) {
                    // this.resizeKeynote();
                } else {
                    // bamboo: ignore the full screen event
                    if (previousVP.height !== window.screen.height
                            && currentVP.height !== window.screen.height
                    ) { this.resizeKeynote(); }
                }
            },
            resizeKeynote() {
                this.playerOptions.height = BN.calcKeynoteHeight();
                this.player.muted(false);
            }
        }
    }
</script>