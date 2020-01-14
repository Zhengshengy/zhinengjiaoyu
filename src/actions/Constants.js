/*
    Constant 文件， 用户统一管理Vue Action 相关的常量
    INDEX: 存储默认module中定义的常量
    RESEARCH： 用于实验研究用的模块
    ME：当前登录用户信息模块
    EXAM：历史真题学习模块
    PAPER：其他题目联系模块
    约定
        LOGIN_SUCCESS: 'me/mutation_loginSuccess',
        LOGIN_SUCCESS 为常量名称
        me： 为模块名称
        mutation_：为mutation的前缀，如果是getter没有使用前缀
        mutation_loginSuccess：为函数真实名称，这个名称要与src/store文件夹中的函数名称一致
 */
const Constants =  {
    INDEX: {
        // state
        LOCALE: 'locale',
        IS_MOBILE_LAYOUT: 'isMobileLayout',
        SCREEN_WIDTH: 'screenWidth',
        SCREEN_HEIGHT: 'screenHeight',
        SCREEN_ORIENTATION: 'screenOrientation',
        SET_LANG: 'mutation_setLang',
        SET_MOBILE_LAYOUT: 'mutation_setMobileLayout',
        SET_SCREEN_WIDTH: 'mutation_setScreenWidth',
        SET_SCREEN_HEIGHT: 'mutation_setScreenHeight',
        SET_SCREEN_ORIENTATION: 'mutation_setScreenOrientation',
        SWITCH_LANG: 'switchLang',
        SWITCH_LAYOUT: 'switchLayout',
        RESIZE_SCREEN: 'resizeScreen',
    },
    RESEARCH: {
        toDos: 'research/toDos',
        addToDo: 'research/mutation_addToDo',
        toggleToDo: 'research/mutation_toggleToDo',
        loadToDoA: 'research/loadToDoA',
        loadToDos: 'research/loadToDos'
    },
    ME: {
        USER: 'me/user',
        REQUIRE_LOGIN: 'me/requireLogin',
        LOGIN_SUCCESS: 'me/mutation_loginSuccess',
        LOGOUT_SUCCESS: 'me/mutation_logoutSuccess',
        SIGN_UP_SUCCESS: 'me/mutation_signUpSuccess',
        CHECKED_AUTH: 'me/mutation_checkedAuth',
        LOCKED: 'me/mutation_locked',
        SIGN_UP: 'me/signUp',
        LOGIN: 'me/login',
        LOGOUT: 'me/logout',
        UN_LOCK: 'me/unLock',
        SELECT_COURSE: 'me/selectCourse',
        AUTHORIZATION: 'me/authorization'
    },
    EXAM: {
        // state
        TEST_INFO: 'exam/testInfo',
        PAPER: 'exam/paper',
        EXERCISE: 'exam/exercise',
        FEEDBACK_STATE: 'exam/feedbackState',
        FEEDBACK_TYPE: 'exam/feedbackType',
        FEEDBACK_HOST_ID: 'exam/feedbackHostId',
        RESULT_STATE: 'exam/resultState',
        RESULT: 'exam/result',
        // type
        GET_PAPER_EXERCISE_MUTATION: 'exam/mutation_getPaperExersise',
        CHANGE_FEEDBACK_STATE_MUTATION: 'exam/mutation_changeFeedbackState',
        CHANGE_RESULT_MUTATION: 'exam/mutation_changeResult',
        SKIP_EXERCISE_MUTATION: 'exam/mutation_skipExercise',
        START_EXERCISE_MUTATION: 'exam/mutation_startExercise',
        VIEW_ANSWER_MUTATION: 'exam/mutation_viewAnswer',
        // method
        GET_PAPER_EXERCISE: 'exam/getPaperExercise',
        SUBMIT_ANSWER: 'exam/submitAnswer',
        SKIP_EXERCISE: 'exam/skipExercise',
        NEXT_EXERCISE: 'exam/nextExercise',
        FINISH_EXERCISE: 'exam/finishExercise',
        SUBMIT_FEEDBACK: 'exam/submitFeedback',
        START_TEST: 'exam/startTest',
        VIEW_ANSWER: 'exam/viewAnswer',

        COLLECT_EXERCISE: 'exam/collectExercise',
        CANCEL_COLLECT_EXERCISE: 'exam/cancelCollectExercise',
        CHANGE_EXERCISE_COLLECT: 'exam/mutation_changeExerciseCollect'
    },
    PAPER: {
        // state
        PAPER_INFO: 'paper/paperInfo',
        RESULT_STATE: 'paper/resultState',
        FEEDBACK_TYPE: 'paper/feedbackType',
        FEEDBACK_HOST_ID: 'paper/feedbackHostId',
        // type
        GET_PAPER_MUTATION: 'paper/mutation_getPaper',
        SKIP_PAPER_MUTATION: 'paper/mutation_skipPaper',
        CHANGE_RESULT_MUTATION: 'paper/mutation_changeResult',
        VIEW_ANSWER_MUTATION: 'paper/mutation_viewAnswer',
        // action
        GET_TOPIC_PAPER: 'paper/getTopicPaper',
        SUBMIT_TOPIC_EXERCISE: 'paper/submitTopicExercise',
        NEXT_TOPIC_EXERCISE: 'paper/nextTopicExercise',
        SKIP_TOPIC_EXERCISE: 'paper/skipTopicExercise',
        FINISH_TOPIC_EXERCISE: 'paper/finishTopicExercise',

        GET_ANALYZE_EXERCISE: 'paper/getAnalyzeExercise',
        SUBMIT_ANALYZE_EXERCISE: 'paper/submitAnalyzeExercise',
        NEXT_ANALYZE_EXERCISE: 'paper/nextAnalyzeExercise',
        FINISH_ANALYZE_EXERCISE: 'paper/finishAnalyzeExercise',

        GET_TRAINING_EXERCISE: 'paper/getTrainingExercise',
        SUBMIT_TRAINING_EXERCISE: 'paper/submitTrainingExercise',
        NEXT_TRAINING_EXERCISE: 'paper/nextTrainingExercise',
        FINISH_TRAINING_EXERCISE: 'paper/finishTrainingExercise',

        GET_GENERAL_TRAINING_EXERCISE: 'paper/getGeneralTrainingExercise',
        SUBMIT_GENERAL_TRAINING_EXERCISE: 'paper/submitGeneralTrainingExercise',
        NEXT_GENERAL_TRAINING_EXERCISE: 'paper/nextGeneralTrainingExercise',
        FINISH_GENERAL_TRAINING_EXERCISE: 'paper/finishGeneralTrainingExercise',

        CLEAR_PAPER_INFO: 'paper/clearPaperInfo',

        COLLECT_EXERCISE: 'paper/collectExercise',
        CANCEL_COLLECT_EXERCISE: 'paper/cancelCollectExercise',
        CHANGE_EXERCISE_COLLECT: 'paper/mutation_changeExerciseCollect'
    }
};
export default Constants;
