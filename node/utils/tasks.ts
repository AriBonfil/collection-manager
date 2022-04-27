import randomstring from "randomstring";


export enum TaskNames {
  CLONE="clone",
  DELETE="delete"
}

enum ActionState {
  WAIT_FOR_RUN="wait_for_run",
  RUNING="runing",
  COMPLETE="complete",
  ERROR="error"
}

type ActionBase = {
  id: string
  task: TaskNames
  createAt: number
  params?: unknown
  state: ActionState
  ms: number
  progress:{
    value: number,
    msg?: string
  }
  error?: any
}

class TaskBase{
  public constructor(public manager: TaskManager, public action: ActionBase){}
  async RUN(){
  }

  async PORCEN(value: number, msg?: string){
    this.action.progress = { value, msg };
    await this.SAVE();
  }

  async SAVE(){
    return await this.manager.updateAction(this.action);
  }
}

export type ActionClone = ActionBase & {
  task: TaskNames.CLONE
  params: {
    id: number | string
  }
}

class TaskClone extends TaskBase{
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

// var taskManager:TaskManager = undefined as any;

export class TaskManager{
  static KEY_ENV = "fzCrs";
  static KEY_LIST = "gFRnv";

  constructor(public ctx: Context){

  }

  static GetTaskManager(ctx: Context){
    // if(!taskManager) taskManager = ;
    return new TaskManager(ctx);
  }

  async getActionAll(){
    try {
      return await this.ctx.clients.vbase.getJSON<ActionBase[]>(TaskManager.KEY_ENV, TaskManager.KEY_LIST);
    } catch (error) {
      return [] as ActionBase[];
    }
  }

  async updateAction(action: ActionBase){
    const actions = await this.getActionAll();
    actions[actions.findIndex(a=> a.id === action.id)] = action;
    await this.ctx.clients.vbase.saveJSON<ActionBase[]>(TaskManager.KEY_ENV, TaskManager.KEY_LIST, actions);
  }

  GetTask(action: ActionBase){
    switch (action.task) {
      case "clone": return new TaskClone(this, action as any)
      default: throw new Error("Action no valida");
    }
  }
  async push<ACTION extends ActionBase>(taskName: TaskNames, params: ACTION["params"]){
    const actionAll = await this.getActionAll();
    const action: ActionBase = {
      id: randomstring.generate(10),
      createAt: Date.now(),
      progress: {
        value: 0
      },
      state: ActionState.WAIT_FOR_RUN,
      task: taskName,
      ms: 0,
      params: params
    };
    actionAll.unshift(action);
    if(actionAll.length > 100) actionAll.pop();
    console.log(actionAll);
    await this.ctx.clients.vbase.saveJSON<ActionBase[]>(TaskManager.KEY_ENV, TaskManager.KEY_LIST, actionAll);
    return action;
  }
  async run_next(){
    const list = await this.getActionAll();

    var runing = list.find(l=> l.state === ActionState.RUNING);
    if(runing) return;

    var waiting = list.find(l=> l.state === ActionState.WAIT_FOR_RUN);
    if(!waiting) return;

    const task = this.GetTask(waiting);

    task.action.state = ActionState.RUNING;
    await task.SAVE()

    try {
      await task.RUN();

      task.action.state = ActionState.COMPLETE;
      task.action.progress.value = 1;
      task.action.ms = Date.now() - task.action.createAt;
      await task.SAVE()
    } catch (error) {
      console.error(error);
      task.action.error = {
        message: error?.message,
        stack: error?.stack
      };
      task.action.state = ActionState.ERROR;
      await task.SAVE()
    }

    this.run_next();
  }
}
