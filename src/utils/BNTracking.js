/*
    Tracking 模块，纪录运行错误信息
*/
export default class BNTracking {
    static trackDebug(...params) {
        console.log('trackDebug', ...params);
    }
    static trackException(error) {
        console.log('tracking', error);
    }
}