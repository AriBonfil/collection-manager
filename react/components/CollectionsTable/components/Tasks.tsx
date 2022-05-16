import React, { useEffect, useRef, useState } from "react";
import { request, useResource } from "react-request-hook";
//@ts-ignore
import { Progress, Spinner, Tooltip, EXPERIMENTAL_Modal, ToastConsumer } from 'vtex.styleguide';
import cn from "classnames";
import { ErrorIcon, VerificadoIcon } from "../../../resources/icons";

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

const useSyncTasks = ()=>{
  const [cound, setCound] = useState(0);
  const reload = ()=> setCound(cound+1);

  const [{data, isLoading, error}] = useResource(()=> request<ActionBase[]>({
    url: `collections/tasks?t=${Date.now()}`,
    method: "GET",
    params:{}})
  ,[cound] as any);

  const _ref = { reload };
  const ref = useRef<typeof _ref>();
  ref.current = _ref;

  useEffect(()=>{
    const code = setInterval(()=>{
      ref.current?.reload();
    }, 1000)
    return ()=> clearInterval(code);
  },[]);

  return {
    tasks: data || [],
    isLoading,
    error
  }
}

const BuildText = (action: ActionBase)=>{
  if(action.task === "clone") return `Clonado (${(action.params as any).id})`;
  if(action.task === "delete") return `Eliminado (${(action.params as any).id})`;
  if(action.task === "import") return `Importar (${(action.params as any).id})`;
  return "Desconocido";
}

const useTasksToast = (tasks:ActionBase[],{setOpen}:{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
})=>{
  const [last, setLast] = useState<number | string>(Date.now());
  const ref = useRef<any>({} as any);
  ref.current.setOpen = setOpen;

  useEffect(()=>{
    if(!tasks || tasks.length < 1) return;
    if(tasks[0].createAt <= last) return;
    const list = tasks.filter(t=> t.createAt > last);
    list.forEach((t)=>{
      ref.current?.showToast({
        message: `Se completo la tarea "${BuildText(t)}"`,
        duration: 4000,
        action: {
          label: 'Ir a tareas',
          onClick: ()=> ref.current?.setOpen(true)
        }
      });
    });
    setLast(tasks[0].createAt);
  },[tasks]);

  return {
    Toast: (
      <ToastConsumer>
        {({showToast}: any) => {
          ref.current.showToast = showToast;
          return null;
        }}
      </ToastConsumer>
    )
  };
}

type ModalTasksProps= {
  tasks: ActionBase[]
}
const ModalTasks:React.FC<ModalTasksProps> = ({tasks})=>{
  return (
    <div className={cn("tasks-list")}>
      {tasks.map((t)=>{
        const seconds = ((((t.editAt - t.createAt) / t.progress.value)/1000) * (1 - t.progress.value)).toFixed(0);
        return <div key={t.id} className={cn("tasks","pb5", `task-${t.state}`)} >
          <div className="flex justify-between pb3">
            <div className="flex items-center">
              <span className="">{BuildText(t)}</span>
            </div>
            <div className="flex items-center task-info">
              {t.state===ActionState.RUNING && !Number.isFinite(seconds) && <>
                <span className="mr1 gray">{ seconds +" s"}</span>
                <span className="mr1 mb2 gray">.</span>
              </>}

              <span className="mr2 gray">{`${Math.round(t.progress.value * 100)}%`}</span>
              <span className="task-state">
                { t.state === ActionState.COMPLETE &&
                  <Tooltip label={ t.ms<1000? `${t.ms}ms`:`${t.ms/1000}s` }>
                    <span>
                      <VerificadoIcon/>
                    </span>
                  </Tooltip>
                  }
                { t.state === ActionState.ERROR &&
                  <Tooltip label={
                    <div style={{overflowWrap: "anywhere"}}>
                      <div className="pb2">{t.error.message}</div>
                      <div className="f7">{t.error.stack}</div>
                    </div>
                  }>
                    <span>
                      <ErrorIcon/>
                    </span>
                  </Tooltip>
                }
                { t.state === ActionState.RUNING && <Spinner size={12}/> }
              </span>
            </div>
          </div>
          <Progress type="line" percent={t.progress.value * 100} danger={t.state === ActionState.ERROR}/>
        </div>
      })}
    </div>
  );
}


type BotonTasksProps= {
  tasks: ActionBase[],
  onClick?: ()=>void
}
const BotonTasks:React.FC<BotonTasksProps> = ({tasks, onClick})=>{

  let status = null;
  if(tasks.find(t=> t.state === ActionState.COMPLETE)) status = <VerificadoIcon size={16}/>;
  if(tasks.find(t=> t.state === ActionState.WAIT_FOR_RUN)) status = <Spinner size={14}/>;
  if(tasks.find(t=> t.state === ActionState.RUNING)) status = <Spinner size={14}/>;
  if(tasks.find(t=> t.state === ActionState.ERROR)) status = <ErrorIcon size={16}/>;

  const tasksOld = tasks.every(t=> (Date.now() - t.editAt) > 1000 * 60);
  const taskOK = tasks.filter(t=> t.state === ActionState.COMPLETE);

  if(!status) return null;

  return (
    <div onClick={onClick} className="tasks-button flex items-center" style={{...tasksOld?{opacity: 0.5}:{}}}>
      {status} <span className="ml2">{`${taskOK.length}/${tasks.length}`}</span>
    </div>
  );
};

export const useTasks = ()=>{
  const [isOpen, setOpen] = useState(false);
  const {tasks} = useSyncTasks();

  const {Toast} = useTasksToast(tasks, {setOpen});

  return {
      BotonTasks: <BotonTasks onClick={()=> setOpen(true)} tasks={tasks}/>,
      ModalTasks: (
        <>
          {Toast}
          <EXPERIMENTAL_Modal
            isOpen={isOpen}
            onClose={()=> setOpen(false)}
            size="small"
            title="Actividad"
          >
            <ModalTasks tasks={tasks}/>
          </EXPERIMENTAL_Modal>
        </>
      )
   }
};
