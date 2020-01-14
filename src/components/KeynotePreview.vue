<!--Created by Bamboo on 2018/8/13.-->
<template>
    <Carousel v-model="value1" :arrow="keynoteArrow" style="text-align: center;">
        <CarouselItem v-for="(item, index) in list" :key="index">
            <div class="demo-carousel">
                <img class="preview-img" :src="item.src" :width="keynoteWidth" :height="keynoteHeight" v-on:click="show(index)">
            </div>
        </CarouselItem>
    </Carousel>
</template>
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import Constants from '~/actions/Constants';

    export default {
        props: {
            images: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data () {
            return {
                value1: 0,
                setting: {
                    // height: 900,
                    // arrow: 'always',
                    loop: true
                },
                list: this.images
            }
        },
        watch: {
            images: function (newImages, oldImages) {
                this.list = newImages;
            }
        },
        computed: {
            ...mapGetters({
                isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
                screenHeight: Constants.INDEX.SCREEN_HEIGHT,
                screenWidth: Constants.INDEX.SCREEN_WIDTH
            }),
            keynoteArrow () {
                if (this.isMobileLayout) return 'always';
                return 'hover';
            },
            keynoteHeight () {
                if (this.isMobileLayout)
                {
                    return this.keynoteWidth * 768 / 1024;
                }
                else
                {
                    return Math.max((this.screenHeight - 200), 491);
                }
            },
            keynoteWidth () {
                if (this.isMobileLayout)
                {
                    return this.screenWidth - 30;
                }
                else
                {
                    return this.keynoteHeight * 1024 / 768;
                }
            }
        },
        methods: {
            show (index) {
                console.log(index)
                console.log(this.images)
                console.log(this.list)
                this.$preview.open(index, this.list);
            }
        }
    }
</script>
