/*
    IView模块初始化
*/
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale_cn from 'iview/dist/locale/zh-CN';
import locale_en from 'iview/dist/locale/en-US';

Vue.use(iView, { locale_cn, locale_en });
