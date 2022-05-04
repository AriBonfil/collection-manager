import randomstring from "randomstring";
import { ActionBase } from "./TaskBase";
import { TaskClone } from "./TaskClone";
import { TaskDelete } from "./TaskDelete";

export enum TaskNames {
  CLONE="clone",
  DELETE="delete"
}

export enum ActionState {
  WAIT_FOR_RUN="wait_for_run",
  RUNING="runing",
  COMPLETE="complete",
  ERROR="error"
}

// var taskManager:TaskManager = undefined as any;

type TableA = string[];
type TableB = ActionBase[];


export class TaskManager{
  static KEY_TABLE_A = "phI6o";
  static KEY_TABLE_B = "61ZfG";

  constructor(public ctx: Context){

  }

  static GetTaskManager(ctx: Context){
    // if(!taskManager) taskManager = new TaskManager(ctx);
    // return taskManager;
    return new TaskManager(ctx);
  }

  async getIndexAll(){
    return await this.ctx.clients.vbase.getJSON<TableA>(TaskManager.KEY_TABLE_A, "INDEX", true) || [];
  }

  async saveIndexAll(list: TableA){
    await this.ctx.clients.vbase.saveJSON<TableA>(TaskManager.KEY_TABLE_A, "INDEX", list);
  }

  async pushIndex(ids:TableA){
    const list = await this.getIndexAll();
    list.unshift(...ids);
    await this.saveIndexAll(list);
  }

  async getActionAll(){
    const listIds = await this.getIndexAll();
    var list = await Promise.all(listIds.map(id=> this.ctx.clients.vbase.getJSON<TableB[0]>(TaskManager.KEY_TABLE_B, id, true)))
    list.map(l=>{
      if((l.editAt || 0) + (1000 * 20) < Date.now() && l.state === ActionState.RUNING){
        l.state = ActionState.ERROR;
        l.error = {
          message: "La tarea no se completo bien."
        }
      }
    })
    return list;
  }

  async updateAction(action: ActionBase){
    // const actions = await this.getActionAll();
    // actions[actions.findIndex(a=> a.id === action.id)] = action;
    action.editAt = Date.now()
    await this.ctx.clients.vbase.saveJSON<ActionBase>(TaskManager.KEY_TABLE_B, action.id, action);
  }

  async deleteAction(action: ActionBase){
    const list = await this.getIndexAll();
    list.splice(list.findIndex(id=> id === action.id), 1)
    await this.saveIndexAll(list);;
  }

  GetTask(action: ActionBase){
    switch (action.task) {
      case TaskNames.CLONE: return new TaskClone(this, action as any)
      case TaskNames.DELETE: return new TaskDelete(this, action as any)
      default: throw new Error("Action no valida");
    }
  }

  async clear(actions:ActionBase[]){
    const brokeList = actions.filter(i=> (i.editAt || 0) + (1000 * 60 * 2.5) < Date.now() && i.state === ActionState.RUNING);
    if(brokeList.length > 0){
      for (let index = 0; index < brokeList.length; index++) {
        const element = brokeList[index];
        element.state = ActionState.ERROR;
        element.error = {
          message: "La tarea no se completo bien."
        }
        await this.updateAction(element);
      }
    }
    const oldList = actions.filter(i=> (i.editAt || 0) + (1000 * 60 * 1) < Date.now() && (i.state === ActionState.COMPLETE || i.state === ActionState.ERROR));
    if(oldList.length > 0){
      for (let index = 0; index < oldList.length; index++) {
        await this.deleteAction(oldList[index]);
      }
    }
  }


  async push<ACTION extends ActionBase>(taskName: TaskNames, params: ACTION["params"][]){
    var actionAll = await this.getActionAll();

    if(actionAll.find(a=> a.state === ActionState.WAIT_FOR_RUN || a.state === ActionState.RUNING))
      throw new Error("Existen tareas pendientes!!");

    const actions = params.map((param)=>{
      const action: ActionBase = {
        id: randomstring.generate(10),
        createAt: Date.now(),
        editAt: Date.now(),
        progress: {
          value: 0
        },
        state: ActionState.WAIT_FOR_RUN,
        task: taskName,
        ms: 0,
        params: param
      };
      return action;
    });

    await Promise.all(actions.map(a=> this.updateAction(a)))
    await this.saveIndexAll(actions.map(a=> a.id));
    return actions;
  }

  async run_next(){
    const list = await this.getActionAll();

    const runing = list.filter(l=> l.state === ActionState.RUNING);
    if(runing.length > 0) return;

    const waiting = list.find(l=> l.state === ActionState.WAIT_FOR_RUN);
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