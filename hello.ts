import {r} from 'rethinkdb-ts';

type Todo = {
  task: string
}

async function insertTasks() {
  console.log('------------- insertTasks -----------------');
  const result = await r.table<Todo>('tasks').insert([
    {
      id: '111',
      task: 'hello1'
    }, {
      task: 'hello2'
    }
  ]).run();
  console.log(result);
}

async function createTable() {
  console.log('------------- createTable -----------------');
  const result = await r.db('test').tableCreate('tasks').run();
  console.log(result);
}

async function loadTasks() {
  console.log('------------- loadTasks -----------------');
  const result = await r.table('tasks').run();
  console.log(result)
}

async function dropTableIfExist() {
  console.log('------------- dropTableIfExist -----------------');
  const exists = await r.tableList().contains('tasks').run();
  if (exists) {
    const result = await r.tableDrop('tasks').run();
    console.log(result);
  }
}

async function start() {
  await r.connectPool({});

  await dropTableIfExist();
  await createTable();
  await insertTasks();
  await loadTasks();

  await r.getPoolMaster()!.drain()
}

start();
