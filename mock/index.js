var Express = require('express');
var Mock = require('mockjs');
var Morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var jwtMiddleware = require('express-jwt');

// data
var { ExercisePool, Exercises } = require('./data/exercise');
var { LoginUsers, Users } = require('./data/user');
var { UserInfo, KnowledgePoint, Reality, Analysis} = require('./data/center');
var { RealityPaper, ExerciseGroup,  SkipExerciseGroup, nextExerciseGroup,topicContent ,Result } = require('./data/exam');
var {
    act,
    next,
    analyze,
    trainingAct,
    trainingNext
} = require('./data/analyze');

var {
    topics,
    nextTopic,
    curTopic,
    prevTopic,
    skipTopic,
    topicAct,
    topicNext
} = require('./data/topic');

const CODE = {
    SUCCESS: 200,
    DATA_ERROR: 100,
    NEED_LOGIN: 101,
    RESOURCE_NOT_FOUND: 102,
    TOKEN_EXPIRED: 103,
    LOGIN_FAILED: 104
};


const SECRET_TOKEN = '0129laksjfadjs9asdmlkajdsfjakldsf';

// server set up
const app = Express();

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());

app.use(Morgan('combined'));

// server routers
app.get('/api/success', function (req, res) {
    res.json({ msg: 'hello world success' });
});

app.get('/api/client/user/info', function (req, res) {
    console.log('/api/client/user/info', req.headers['authorization']);

    let d = LoginUsers[0];
    let hasUser = req.headers['authorization'] === `Bearer ${d.token}`;

    if (hasUser) {
        res.status(200).json({ c: 200, m: '', d });
    } else {
        res.status(401).json({ c: 401, m: '账号或密码错误', d });
    }
});

app.post('/api/client/login', function (req, res) {
    let { name, password } = req.body;
    let user = null;
    let hasUser = LoginUsers.some(u => {
        if ((u.name === name || u.email === name) && u.password === password) {
            user = JSON.parse(JSON.stringify(u));
            user.password = '';
            return true;
        }
        return false;
    });

    let d = user;

    if (hasUser) {
        res.status(200).json({ c: 200, m: '', d });
    } else {
        res.status(401).json({ c: 200, m: '账号或密码错误', d });
    }
});

app.post('/api/client/logout', function (req, res) {
    res.status(200).json({ c: 200, m: '', d: {}});
});

app.post('/api/lang/switch', function (req, res) {
    res.status(200).json({ c: 200, m: '', d: {}});
});

app.post('/api/client/register', function(req, res) {
    if (req.body.email.includes('error')) {
        res.status(200).json(
            {
                c: 500,
                m: '已经注册',
                d: {
                    name: req.body.name,
                    email: req.body.email,
                    token: SECRET_TOKEN
                }
            });
    } else {
        res.status(200).json(
            {
                c: 200,
                m: '',
                d: {
                    name: req.body.name,
                    email: req.body.email,
                    token: SECRET_TOKEN
                }
            });
    }
});

app.post('/api/lang/switch', function(req, res) {
    res.status(200).json(
        {
            c: 200,
            m: '',
            d: {
            }
        });
});

app.post('/api/client/forgot-password', function(req, res) {
    res.status(200).json(
        {
            c: 200,
            m: '',
            d: {
                email: req.body.email
            }
        });
});

app.post('/api/client/verify-code', function(req, res) {
    res.status(200).json(
        {
            c: 200,
            m: '',
            d: {
            }
        });
});

app.post('/api/client/new-password', function(req, res) {
    res.status(200).json(
        {
            c: 200,
            m: '',
            d: {
            }
        });
});

app.get('/api/logout', function (req, res) {
    res.status(200).json({c: 200, m: ''});
});


app.post('/api/lang/switch', function (req, res) {
    const legalLangs = ['en', 'cn'];
    let {lang} = req.body;
    if (legalLangs.includes(lang)) {
        res.status(200).json({
            "c": 200,
            "m": "",
            "d": {},
            "r": ""
        });
    }else{
        res.status(401).json({c: 200, m: '参数错误'});
    }
});


// 个人中心相关数据 
app.get('/api/client/user', (req, res)=>{
    res.status(200).json({ c: 200, m: '', d: UserInfo });
})
app.post('/api/client/user', (req, res)=>{
    res.status(200).json(
        {
            c: 200,
            m: '',
            d: {
            }
        }
    );
})
app.get('/api/client/user/history-learn-reality', (req, res)=>{
    res.status(200).json({ c: 200, m: '', d: Reality});
})
app.get('/api/client/user/history-learn-topic', (req, res)=>{
    res.status(200).json({ c: 200, m: '', d: KnowledgePoint});
})
app.get('/api/client/ability/analysis', (req, res)=>{
    res.status(200).json({ c: 200, m: '', d: Analysis});
})

// 真题相关
app.get('/api/client/reality-paper', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: RealityPaper });
})

app.post('/api/client/reality/act', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: ExerciseGroup });
})
app.post('/api/client/reality-topic/act', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: ExerciseGroup });
})
app.post('/api/client/reality/answer', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: Result });
})
app.post('/api/client/reality-topic/answer', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: Result });
})
app.post('/api/client/reality/skip', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: SkipExerciseGroup });
})
app.post('/api/client/reality-topic/skip', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: SkipExerciseGroup });
})
app.post('/api/client/reality/next', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: nextExerciseGroup });
})
app.post('/api/client/reality-topic/next', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: nextExerciseGroup });
})
app.post('/api/client/feedback/topic', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: "感谢您的反馈1" });
})
app.post('/api/client/feedback/solution', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: "感谢您的反馈2" });
})
app.post('/api/client/feedback/exercise', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: "感谢您的反馈3" });
})
app.get('/api/client/topic/*', (req, res) => {
    res.status(200).json({ c: 200, m: '', d: topicContent });
})


// 个人强弱分析

app.post('/api/client/ability/act', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: act
    });
})
app.post('/api/client/ability/answer', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: act
    });
})
app.post('/api/client/ability/next', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: next
    });
})
app.get('/api/client/ability/analysis', (req, res)=>{
    res.status(200).json({
        c: 200,
        m: '',
        d: analyze
    });
})

app.post('/api/client/special-training/act', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: trainingAct
    });
})
app.post('/api/client/special-training/answer', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: trainingAct
    });
})
app.post('/api/client/special-training/next', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: trainingNext
    });
})

// 知识点
app.get('/api/client/topic', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: topics
    });
})
app.post('/api/client/learn-topic/act', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: curTopic
    });
})
app.post('/api/client/learn-topic/next', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: nextTopic
    });
})
app.post('/api/client/learn-topic/previous', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: prevTopic
    });
})
app.post('/api/client/learn-topic/skip', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: skipTopic
    });
})

app.post('/api/client/topic/act', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: topicAct
    });
})
app.post('/api/client/topic/skip', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: topicAct
    });
})
app.post('/api/client/topic/next', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: topicNext
    });
})
app.post('/api/client/topic/answer', (req, res) => {
    res.status(200).json({
        c: 200,
        m: '',
        d: topicAct
    });
})

// 404， Always keep this as the last router.
app.get('*', function(req, res){
    res.status(404);
    
    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }
    
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    
    // default to plain-text. send()
    res.type('txt').send('Not found');
});



// start to run server.
app.listen(8100, () => {
    console.log('mock server listen 8100')
});