import { TaskManager, TaskNames } from "../tasks";
import { json } from 'co-body'
import { ActionBase } from "../tasks/TaskBase";

export type createTasksType = {
  type: TaskNames,
  params:  ActionBase["params"][]
}

export async function createTasks(ctx: Context) {
  const {
    req,
  } = ctx
  const { type, params } = await json(req) as createTasksType;

  const tasks = TaskManager.GetTaskManager(ctx as any)
  const actions = await tasks.push(type, params);

  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(actions)
  ctx.status = 200
}
