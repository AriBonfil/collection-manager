import { ActionBase, TaskBase } from "./TaskBase";
import { TaskManager, TaskNames } from ".";

export type ActionImport = ActionBase & {
  task: TaskNames.IMPORT
  params: {
    id: number | string
    pathFile: string
  }
}

export class TaskImport extends TaskBase{
  public constructor(public manager: TaskManager, public action: ActionImport){
    super(manager, action);
  }

  async RUN(){
    await this.manager.ctx.clients.collection.AddProductsInCollectionByFile(this.action.params.id, this.action.params.pathFile, (n)=> this.PORCEN(n));
  }

  async UPDATE(action: ActionImport){
    return this.manager.updateAction(action);
  }
}
