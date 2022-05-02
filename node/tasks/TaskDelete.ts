import { ActionBase, TaskBase } from "./TaskBase";
import { TaskManager, TaskNames } from ".";

export type ActionDelete = ActionBase & {
  task: TaskNames.DELETE
  params: {
    id: number | string
  }
}

export class TaskDelete extends TaskBase{
  public constructor(public manager: TaskManager, public action: ActionDelete){
    super(manager, action);
  }

  async RUN(){
    await this.manager.ctx.clients.collection.deleteCollection(this.action.params.id);
  }

  async UPDATE(action: ActionDelete){
    return this.manager.updateAction(action);
  }
}
