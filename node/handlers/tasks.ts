import { TaskManager } from "../tasks";

export async function tasks(ctx: Context, next: () => Promise<any>) {
  const tasks = TaskManager.GetTaskManager(ctx as any)
  const actions = await tasks.getActionAll();
  tasks.clear(actions);
  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(actions)
  ctx.status = 200
}
