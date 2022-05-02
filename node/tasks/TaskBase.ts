import { ActionState, TaskManager, TaskNames } from ".";

export type ActionBase = {
  id: string
  task: TaskNames
  createAt: number
  editAt: number
  params?: unknown
  state: ActionState
  ms: number
  progress:{
    value: number,
    msg?: string
  }
  error?: any
}

export class TaskBase{
  public constructor(public manager: TaskManager, public action: ActionBase){}
  async RUN(){}

  async PORCEN(value: number, msg?: string){
    this.action.progress = { value, msg };
    await this.SAVE();
  }

  async SAVE(){
    return await this.manager.updateAction(this.action);
  }
}
