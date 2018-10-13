import {Connection, r} from 'rethinkdb-ts';

type Todo = {
  task: string
}

async function insertTasks(conn: Connection) {
  console.log('------------- insertTasks -----------------');
  const result = await r.table<Todo>('tasks').insert([
    {
      task: 'hello1'
    }, {
      task: 'hello2'
    }
  ]).run(conn);
  console.log(result);
}

async function createTable(conn: Connection) {
  console.log('------------- createTable -----------------');
  const result = await r.db('test').tableCreate('tasks').run(conn);
  console.log(result);
}

async function loadTasks(conn: Connection) {
  console.log('------------- loadTasks -----------------');
  const result = await r.table('tasks').run(conn);
  console.log(result)
}

async function dropTableIfExist(conn: Connection) {
  console.log('------------- dropTableIfExist -----------------');
  const exists = await r.tableList().contains('tasks').run(conn);
  if (exists) {
    const result = await r.tableDrop('tasks').run(conn);
    console.log(result);
  }
}

async function start() {
  await r.connectPool({});
  const conn = await r.connect({});

  await dropTableIfExist(conn);
  await createTable(conn);
  await insertTasks(conn);
  await loadTasks(conn)
}

start();
