import { TaskManager } from "../tasks";

let _tasks:TaskManager | undefined = undefined;

export async function tasks(ctx: Context) {
  _tasks = TaskManager.GetTaskManager(ctx as any)
  const actions = await _tasks.getActionAll();
  await _tasks.run_next();

  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(actions)
  ctx.status = 200
}
