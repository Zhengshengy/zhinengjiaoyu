const Mock = require('mockjs');
var { Papers } = require('./paper');

const RealityPaper = Papers;

const ExerciseGroup = {
    "id": 4,
    "category_id": 2,
    "active_number": 5,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "complete_at": null,
    "is_completed": 0,
    "paper": {
        "id": 39,
        "name": "2017 全国卷3", "total": 10,
        "score": 35
    },
    "exercise": [
        {
            "id": 238,
            "number": "5",
            "score": "5.00",
            "type_id": 1,
            "url": "https://www.iviewui.com/",
            "answer": "https://www.iviewui.com/overview",
            "topics": [
                {
                    "id": 233,
                    "name": "一元二次不等式的解法"
                },
                {
                    "id": 236,
                    "name": "线性规划的实际应用问题"
                },
                {
                    "id": 237,
                    "name": "常用逻辑用语"
                }
            ]
        }
    ],
    "answer": null,
    "topic": null,
    "ability": null
}

const SkipExerciseGroup = {
    "id": 4,
    "category_id": 2,
    "active_number": 5,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "complete_at": null,
    "is_completed": 0,
    "paper": {
        "id": 39,
        "name": "2017 全国卷3", "total": 10,
        "score": 35
    },
    "exercise": [
        {
            "id": 238,
            "number": "5",
            "score": "5.00",
            "type_id": 2,
            "url": "https://www.iviewui.com/components/button",
            "answer": "https://www.iviewui.com/docs/guide/theme",
            "topics": [
                {
                    "id": 233,
                    "name": "一元二次不等式的解法"
                },
                {
                    "id": 236,
                    "name": "线性规划的实际应用问题"
                },
                {
                    "id": 237,
                    "name": "常用逻辑用语"
                }
            ]
        }
    ],
    "answer": null,
    "topic": null,
    "ability": null
}

const nextExerciseGroup = {
    "id": 4,
    "category_id": 2,
    "active_number": 5,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "complete_at": null,
    "is_completed": 0,
    "paper": {
        "id": 39,
        "name": "2017 全国卷3", "total": 10,
        "score": 35
    },
    "exercise": [
        {
            "id": 238,
            "number": "5",
            "score": "5.00",
            "type_id": 3,
            "url": "https://www.iviewui.com/components/message",
            "answer": "https://www.iviewui.com/docs/guide/install",
            "topics": [
                {
                    "id": 233,
                    "name": "一元二次不等式的解法"
                },
                {
                    "id": 236,
                    "name": "线性规划的实际应用问题"
                },
                {
                    "id": 237,
                    "name": "常用逻辑用语"
                }
            ]
        }
    ],
    "answer": null,
    "topic": null,
    "ability": null
}

const Result = {
     "id": 4,
     "category_id": 2,
     "active_number": 8,
     "correct": 0,
     "error": 1,
     "done": 1,
     "total": 100,
     "gain": "0.00",
     "complete_at": null,
     "is_completed": 0,
     "result": true,
     "score": 35,
     "paper":{
         "total": 10,
         "score": 35
     }
}

const topicContent = {
    content: '这个是知识点的内容'
}


module.exports = {
    RealityPaper,
    ExerciseGroup,
    SkipExerciseGroup,
    nextExerciseGroup,
    topicContent,
    Result
}