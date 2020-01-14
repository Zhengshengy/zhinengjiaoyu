const Mock = require('mockjs');

const ExercisePool = [
    'exercises/1/1.htm',
    'exercises/2/2.htm',
    'exercises/3/3.htm',
    'exercises/exercise/exercise.htm',
];

const SolutionPool = [
    'solutions/1/index.html',
    'solutions/2/index.html',
    'solutions/3/index.html',
];

const Exercises = [];

for (let i = 0; i < 20; i++) {
    Exercises.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        path: ExercisePool[Mock.Random.integer(1, ExercisePool.length) - 1],
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
        options: ['A', 'B', 'C', 'D'],
        answers: ['A'],
        solution: SolutionPool[Mock.Random.integer(1, SolutionPool.length) - 1],
    }));
}

module.exports = {
    ExercisePool: ExercisePool,
    Exercises: Exercises,
    SolutionPool: SolutionPool
}