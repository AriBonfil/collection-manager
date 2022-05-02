import { TaskManager } from "../tasks";

export async function tasks(ctx: Context) {
  const tasks = TaskManager.GetTaskManager(ctx as any)
  const actions = await tasks.getActionAll();
  tasks.clear(actions).then(async ()=>{
    await tasks.run_next();
  })
  ctx.set('cache-control', 'no-cache')
  ctx.body =  JSON.stringify(actions)
  ctx.status = 200
}
