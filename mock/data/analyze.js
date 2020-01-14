const act = {
    "id": 1, // 测试id
    "category_id": 1,
    "active_number": 50, //当前题号
    "correct": 0,
    "total": 50, //测试题目总数
    "score": "210.00", //测试总分
    "error": 0, //做错误的题数
    "done": 0, //总共做的题数
    "gain": null, //测试总得分
    "complete_at": null,
    "is_completed": 0,
    "result": true,
    "paper": null,
    "exercise": {
        "id": 459, //源题ID
        "type_id": 3, //源题类型
        "score": "5.00", //源题分值
        "url": "https://www.iviewui.com/components/message",
        "answer": "https://www.iviewui.com/docs/guide/install",
    },
    "answer": {
        "number": 1,
        "exercise_id": 459,
        "score": "5.00",
        "answer": null,
        "gain": null,
        "answer_check": null
    },
    "topic": null,
    "ability": null
}
const next = {
    "id": 2, // 测试id
    "category_id": 1,
    "active_number": 50, //当前题号
    "correct": 1,
    "total": 50, //测试题目总数
    "score": "210.00", //测试总分
    "error": 0, //做错误的题数
    "done": 0, //总共做的题数
    "gain": null, //测试总得分
    "complete_at": null,
    "is_completed": 0,
    "result": false,
    "paper": null,
    "exercise": {
        "id": 459, //源题ID
        "type_id": 3, //源题类型
        "score": "5.00", //源题分值
        "url": "https://www.iviewui.com/",
        "answer": "https://www.iviewui.com/docs/guide/install"        
    },
    "answer": {
        "number": 1,
        "exercise_id": 459,
        "score": "5.00",
        "answer": null,
        "gain": null,
        "answer_check": null
    },
    "topic": null,
    "ability": null
}


const analyze = [
    {
        "id": 1,
        "number": "01",
        "name": "集合",
        "level": null,
        "pass2": 1,
        "pass3": 0,
        "pass4": 0,
        "pass5": 0
    },
    {
        "id": 15,
        "number": "02",
        "name": "函数的概念",
        "level": null,
        "pass2": 0,
        "pass3": 2,
        "pass4": 0,
        "pass5": 0
    }, 
    {
        "id": 29,
        "number": "03",
        "name": "二次函数",
        "level": null,
        "pass2": 0,
        "pass3": 0,
        "pass4": 1,
        "pass5": 0 
    },
    {
        "id": 33,
        "number": "04",
        "name": "指数函数",
        "level": null,
        "pass2": 0,
        "pass3": 0,
        "pass4": 0,
        "pass5": 0
    },
    {
       "id": 43, "number": "05", "name": "对数函数", "level": null, "pass2": 0, "pass3": 0, "pass4": 0, "pass5": 0
    },{
        "id": 49, "number": "06", "name": "幂函数", 
        "level": null,
        "pass2": 0,
        "pass3": 0,
        "pass4": 0,
        "pass5": 1
    },{
        "id": 52,
        "number": "07", "name": "函数的应用", "level": null, "pass2": 0, "pass3": 0, "pass4": 0, "pass5": 0
    },{
        "id": 327, "number": "27", "name": "计数原理", "level": null, "pass2": 0, "pass3": 0, "pass4": 0, "pass5": 0
    },{
        "id": 338,
        "number": "28",
        "name": "随机变量及其分布", "level": null,
        "pass2": 0,
        "pass3": 0,
        "pass4": 0,
        "pass5": 0
    },{
        "id": 352, "number": "29", "name": "统计案例", "level": null, "pass2": 0, "pass3": 0, "pass4": 0, "pass5": 0
    },{
        "id": 369,
        "number": "31",
        "name": "坐标系与参数方程", "level": null,
        "pass2": 0,
        "pass3": 0,
        "pass4": 0,
        "pass5": 0
    }
]

const trainingAct = {
    "id": 2,
    "category_id": 4,
    "active_number": 1,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "target_level": 3,
    "complete_at": null,
    "is_completed": 0,
    "paper": null,
    "exercise": {
        "id": 272,
        "type_id": 3,
        "score": "5.00",
        "url": "https://nuxtjs.org/",
        "answer": "https://nuxtjs.org/api/pages-validate"
    },
    "answer": null,
    "topic": {
        "id": 33,
        "number": "04",
        "name": "指数函数"
    },
    "ability": {
        "id": 4,
        "level": 2
    }
}

const trainingNext = {
      "id": 3,
      "category_id": 5,
      "active_number": 2,
      "correct": 1,
      "error": 0,
      "done": 1,
      "gain": "5.00",
      "target_level": 3,
      "complete_at": null,
      "is_completed": 0,
      "paper": null,
      "exercise": {
          "id": 352,
          "type_id": 3,
          "score": "5.00",
          "url": "https://www.iviewui.com/docs/guide/install",
          "answer": "https://www.iviewui.com/docs/guide/theme"
      },
      "answer": null,
      "topic": {
          "id": 1,
          "number": "01",
          "name": "集合"
      },
      "ability": {
          "id": 1,
          "level": 2
      }
}
module.exports = {
  act,
  next,
  analyze,
  trainingAct,
  trainingNext
}