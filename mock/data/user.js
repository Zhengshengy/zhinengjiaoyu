const Mock = require('mockjs');

const LoginUsers = [
    {
        id: 1,
        email: 'admin@mock.com',
        password: '123456',
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
        name: '张某某',
        token: '1212154646546'
    }
];

const Users = [];

for (let i = 0; i < 86; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        email: Mock.Random.cname() + '@mock.com',
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
    }));
}

module.exports = {
    LoginUsers: LoginUsers,
    Users: Users
};
