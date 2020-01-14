/*
    全局变量初始化
*/
import Vue from 'vue';
import BNGlobalInit from '~/utils/BNGlobal';

window.history.replaceState = window.history.replaceState || function() { };
BNGlobalInit();

export default ({ app, store }) => {
    console.log('Global Init Success!');
};