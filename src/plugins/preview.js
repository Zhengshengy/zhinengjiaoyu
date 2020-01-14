/**
 * Created by Bamboo on 2018/8/13.
 */

import Vue from 'vue';
import VuePreview from 'vue2-preview';
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: { top: 0, bottom: 0 },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
});
