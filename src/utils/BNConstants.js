/*
    业务相关常量封装
*/
const BNConstants =  {
    COURSE: {
        MATH: 'M',
        PHYSICS: 'P',
        CHEMISTRY: 'C',
        BIOLOGY: 'B',
        ENGLISH: 'E',
        TOEFL: 'T',
        SAT: 'S'
    },
    USER_TYPE: {
        STUDENT: 1,
    },
    COOKIES: {
        COURSE: 'course',
        TOPIC: 'topic',
        PAPER: 'paper',
        LOCK: 'lock',
        ERROR_CODE: 'error_code',
        ERROR_MESSAGE: 'error_msg',
        LAST_PAGE: 'last_page'
    },
    QUESTION_TYPE: {
        CHOICE: '1',
        FILL: '2',
        ANSWER: '3'
    },
    LEVEL_TYPE: {
        LEVEL_WEAK: '2',
        LEVEL_0: '3',
        LEVEL_1: '4',
        LEVEL_2: '5',
    },
    USER_ROLE: {
        STUDENT: 1,
        TEACHER: 2,
        PARENT: 3,
        TEACHERINSHOOL: 4,
    },
     STRIPE_PAY: {
        CREDITORDEBITCARD: 1,
        ALIPAY: 2,
        WECHATPAY: 3,
    },
    STRIPE: {
        PUBLISHABLE_KEY: 'pk_test_d8kWHzokEfnuwPbfYG4DpfAB',
        PUBLISHABLE_KEY_LIVE: 'pk_live_V9l9jc7MTCTjwgrL1BpJl4vI',
    },
    COURSE_FEE_DURATION: {
        MONTHLY: 1,
        QUARTERLY: 2,
        SEMIANNUAL: 3,
        ANNUAL: 4
    },
    PAY_STATUS: {
        FAILED: 2,
        CANCELLED: 3,
        SUCCEEDED: 1,
        WAITING:0
    },
    CONSULTING: {
        TIME_LENGTH: 10000,
        MINUTE:1,
    }
};

export default BNConstants;
