const Mock = require('mockjs');

const UserInfo = {
    first_name: "",
    last_name: "",
    sex: 1,
    mobile: "",
    addresses: {
        id: 1,
        province: "",
        city: "",
        area: ""
    },
    school: "",
    grade: "",
    teachers: [
        {
            first_name: "",
            last_name: "",
            mobile: ""
        },
        {
            first_name: "",
            last_name: "",
            mobile: ""
        },
        {
            first_name: "",
            last_name: "",
            mobile: ""
        }
    ],
    parents: [{
            first_name: "",
            last_name: "",
            mobile: ""
        },
        {
            first_name: "",
            last_name: "",
            mobile: ""
        }
    ]
}

const KnowledgePoint = [
    {
        id: 1,
        name: "集合", 
        number: "01", 
        total: 5, 
        answered: 0, 
        rate: "70%",
        children: [
            {
                id: 2,
                name: "集合与元素的含义", 
                number: "01.0101", 
                total: 0,
                answered: 0,
                rate: "70%",
            },
            {
                id: 3,
                name: "集合中元素的三个特征", "number": "01.0102", "total": 0,
                number: "01.0101",
                total: 0,
                answered: 0,
                rate: "70%",
            }
        ]
    },
    {
        id: 11,
        name: "子集的性质", 
        number: "01.0206", 
        total: 2, 
        answered: 0,
        rate: "10%",
        children:[
            {
                id: 12,
                name: "并集的定义与基本运算", 
                number: "01.0301", 
                total: 2,
                answered: 0,
                rate: "0%",
            },
            {
                id: 13,
                name: "交集的定义与基本运算", 
                number: "01.0302", 
                total: 0,
                answered: 0,
                rate: "10%",
            }
        ]

    }
]

const Reality = [
    {
        id: 51,
        name: "2007 宁夏海南卷1", 
        total: 9,
        answered: 0,
        rate: "70%",
        create_time:'2018-04-04'
    },
    {
        id: 50,
        name: "2007 宁夏海南卷2", 
        total: 9,
        answered: 0,
        rate: "70%",
        create_time: '2018-04-04'
    },
    {
        id: 49,
        name: "2007 宁夏海南卷3", 
        total: 9,
        answered: 0,
        rate: "70%",
        create_time: '2018-04-04'
    },
]

const Analysis = [
    {
        id: 1,
        number: "01", 
        name: "集合", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    },
    {
        id: 2,
        number: "02", 
        name: "函数的概念", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    },
    {
        id: 3,
        number: "03", 
        name: "二次函数", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    },
    {
        id: 4,
        number: "04", 
        name: "对数函数", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    },
    {
        id: 5,
        number: "05", 
        name: "函数的应用", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    },
    {
        id: 6,
        number: "06", 
        name: "空间几何体", 
        level: null, 
        pass2: 0, 
        pass3: 0, 
        pass4: 0, 
        pass5: 0
    }
]

module.exports = {
    UserInfo,
    Reality,
    KnowledgePoint,
    Analysis
};