import { TaskManager, TaskNames } from "../tasks";
import { ActionImport } from "../tasks/TaskImport";

// import { form } from 'co-body'
const formidable = require('formidable');

export async function readBody(ctx: Context, next: ()=> void) {
  const form = formidable({ multiples: true });
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err:any, fields:any, files:any) => {
        if (err) {
          reject(err);
          return;
        }
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
        ctx.state = { fields, files } as any;
        ctx.body = JSON.stringify(ctx.state, null, 2);
        resolve(1);
      });
    });
    await next();
    return;
}

export async function importProducts(ctx: Context, next: ()=> void) {
    const id : string = ctx.url.split("/")[ctx.url.split("/").length-1]

    const tasks = new TaskManager(ctx);

    const importParams: ActionImport["params"] = {
        id,
        pathFile: (ctx.state as any).files.multipleFiles.filepath
    }

    const task = await tasks.push(TaskNames.IMPORT, [importParams]);

    ctx.status = 200;
    ctx.body = JSON.stringify(task[0], null, 2);
    await next();
    return;
}
