const topics = [
  {
      "id": 1,
      "name": "集合",
      "number": "01",
      "children": [
             {
                  "id": 2,
                  "name": "集合与元素的含义",
                  "number": "01.0101"
              },
              {
                  "id": 3,
                  "name": "集合中元素的三个特征",
                  "number": "01.0102"
              },
              {
                  "id": 4,
                  "name": "元素与集合的关系",
                  "number": "01.0103"
              },{
                "id": 5,
                "name": "集合的表示方法", "number": "01.0104"
              },
              {
                "id": 6,
                "name": "子集的概念", "number": "01.0201"
              },{
                "id": 7,
                "name": "集合相等", "number": "01.0202"
              },{
                "id": 8,
                "name": "真子集", "number": "01.0203"
              },{
                "id": 9,
                "name": "空集", "number": "01.0204"
              }
            ]
  },
  {
    "id": 15,
    "name": "函数的概念", "number": "02", "children": [{
            "id": 16,
            "name": "函数的概念",
            "number": "02.0101"
        },
        {
            "id": 17,
            "name": "函数的三要素",
            "number": "02.0102"
        },
        {
            "id": 18,
            "name": "相同的函数",
            "number": "02.0103"
        },
         {
            "id": 20,
            "name": "分段函数",
            "number": "02.0202"
        }, {
            "id": 21,
            "name": "映射",
            "number": "02.0203"
        }]
  }
]

const curTopic = {
   "topic": {
       "id": 1,
       "name": "集合",
       "number": "01",
       "parent_name": ""
   },
   "previous": null,
   "next": {
       "id": 2,
       "name": "集合与元素的含义",
       "number": "01.0101",
       "parent_name": "集合"
   }
}
const nextTopic = {
  "topic": {
      "id": 2,
      "name": "集合与元素的含义",
      "number": "01.0101",
      "parent_name": "集合"
  },
  "previous": {
      "id": 1,
      "name": "集合",
      "number": "01",
      "parent_name": ""
  }, "next": {
      "id": 3,
      "name": "集合中元素的三个特征",
      "number": "01.0102",
      "parent_name": "集合"
  }
}

const prevTopic = {
   "topic": {
       "id": 3,
       "name": "集合中元素的三个特征",
       "number": "01.0102",
       "parent_name": "集合"
   },
   "previous": {
       "id": 2,
       "name": "集合与元素的含义",
       "number": "01.0101",
       "parent_name": "集合"
   }, "next": {
       "id": 4,
       "name": "元素与集合的关系",
       "number": "01.0103",
       "parent_name": "集合"
   }
}

const skipTopic = {
   "topic": {
       "id": 4,
       "name": "元素与集合的关系",
       "number": "01.0103",
       "parent_name": "集合"
   },
   "previous": {
       "id": 3,
       "name": "集合中元素的三个特征",
       "number": "01.0102",
       "parent_name": "集合"
   }, "next": {
       "id": 5,
       "name": "集合的表示方法",
       "number": "01.0104",
       "parent_name": "集合"
   }
}

const topicAct = {
    "id": 6,
    "category_id": 3,
    "active_number": 1,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "complete_at": null,
    "is_completed": 0,
    "paper": null,
    "exercise": {
        "id": 102,
        "type_id": 3,
        "score": "5.00",
        "url": "https://www.iviewui.com/components/collapse",
        "answer": "https://www.iviewui.com/"
    },
    "answer": null,
    "topic": {
        "id": 11, // 知识点id
        "number": "01.0206", //知识点编号;
        "name": "子集的性质", //知识点名称;
        "total": 2, //该知识点总题数;
        "score": 10, //该知识点所有题目的分值;
        "parent_id": 1, //知识点上级知识点id;
        "parent_number": "01",
        "parent_name": "集合"
    },
    "ability": null
}
const topicNext = {
    "id": 6,
    "category_id": 3,
    "active_number": 1,
    "correct": 0,
    "error": 0,
    "done": 0,
    "gain": null,
    "complete_at": null,
    "is_completed": 0,
    "paper": null,
    "exercise": {
        "id": 102,
        "type_id": 1,
        "score": "5.00",
        "url": "https://www.iviewui.com/docs/guide/update",
        "answer": "https://www.iviewui.com/"
    },
    "answer": null,
    "topic": {
        "id": 11, // 知识点id
        "number": "01.0206", //知识点编号;
        "name": "子集的性质", //知识点名称;
        "total": 2, //该知识点总题数;
        "score": 10, //该知识点所有题目的分值;
        "parent_id": 1, //知识点上级知识点id;
        "parent_number": "01",
        "parent_name": "集合"
    },
    "ability": null
}


module.exports = {
  topics,
  nextTopic,
  curTopic,
  prevTopic,
  skipTopic,
  topicAct,
  topicNext
}