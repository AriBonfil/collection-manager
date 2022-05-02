import { ActionBase, TaskBase } from "./TaskBase";
import { TaskManager, TaskNames } from ".";

export type ActionClone = ActionBase & {
  task: TaskNames.CLONE
  params: {
    id: number | string
  }
}

export class TaskClone extends TaskBase{
  public constructor(public manager: TaskManager, public action: ActionClone){
    super(manager, action);
  }

  async RUN(){
    await this.manager.ctx.clients.collection.cloneCollection(this.action.params.id, (n)=> this.PORCEN(n));
  }

  async UPDATE(action: ActionClone){
    return this.manager.updateAction(action);
  }
}
