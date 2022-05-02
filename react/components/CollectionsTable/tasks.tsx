import React, { SVGProps, useEffect, useRef, useState } from "react";
import { request, useResource } from "react-request-hook";
//@ts-ignore
import { Progress, Spinner, Tooltip, EXPERIMENTAL_Modal, ToastConsumer } from 'vtex.styleguide';
import cn from "classnames";

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


const Verificado = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 172 172"
    style={{
      fill: "#8BC34A",
    }}
    {...props}
  >
    <g
      fill="none"
      strokeMiterlimit={10}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <path d="M0 172V0h172v172z" />
      <path
        d="m149.285 31.294-11.86-8.063c-3.283-2.222-7.779-1.37-9.975 1.887l-58.143 85.741-26.72-26.72c-2.791-2.79-7.34-2.79-10.13 0L22.3 94.295c-2.79 2.79-2.79 7.339 0 10.156l41.088 41.087c2.3 2.3 5.917 4.058 9.173 4.058 3.257 0 6.538-2.042 8.657-5.117l69.979-103.236c2.222-3.256 1.37-7.727-1.913-9.95z"
        fill="#8BC34A"
      />
    </g>
  </svg>
)
const Error = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 172 172"
    style={{
      fill: "#D1011B",
    }}
    {...props}
  >
    <g
      fill="none"
      strokeMiterlimit={10}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <path d="M0 172V0h172v172z" />
      <path
        d="M40.133 22.933a5.707 5.707 0 0 0-4.053 1.68L24.613 36.08a5.727 5.727 0 0 0 0 8.107L66.426 86l-41.813 41.813a5.727 5.727 0 0 0 0 8.107l11.467 11.467a5.727 5.727 0 0 0 8.107 0L86 105.574l41.813 41.813a5.727 5.727 0 0 0 8.107 0l11.467-11.467a5.727 5.727 0 0 0 0-8.107L105.574 86l41.813-41.813a5.727 5.727 0 0 0 0-8.107L135.92 24.613a5.727 5.727 0 0 0-8.107 0L86 66.426 44.187 24.613a5.712 5.712 0 0 0-4.054-1.68z"
        fill="#D1011B"
      />
    </g>
  </svg>
)

const useSyncTasks = ()=>{
  const [cound, setCound] = useState(0);
  const reload = ()=> setCound(cound+1);

  const [{data, isLoading, error}] = useResource(()=> request<ActionBase[]>({
    url: `collections/tasks`,
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
  return "Desconocido";
}

const useTasksToast = (tasks:ActionBase[])=>{
  const [last, setLast] = useState<number | string>(0);
  const ref = useRef<any>({});

  useEffect(()=>{
    if(!tasks || tasks.length < 1) return;
    if(tasks[0].createAt <= last) return;
    const list = tasks.filter(t=> t.createAt > last);
    list.forEach((t)=>{
      ref.current?.showToast({
        message: `Se completo la tarea "${BuildText(t)}"`,
        duration: 1000,
        // action: {
        //   label: 'See cart',
        //   href: 'http://vtex.com',
        //   target: '_blank'
        // }
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

export const useTasks = ()=>{
  const [isOpen, setOpen] = useState(false);
  const {tasks} = useSyncTasks();

  const {Toast} = useTasksToast(tasks);

  var isStatus = null;
  if(tasks.find(t=> t.state === ActionState.ERROR)) isStatus = "error";
  if(tasks.find(t=> t.state === ActionState.RUNING)) isStatus = "running";
  if(tasks.find(t=> t.state === ActionState.COMPLETE)) isStatus = "complete";


   return {
     BotonTasks: isStatus && (
      <div onClick={()=> setOpen(true)}>
        {isStatus}
      </div>
     ),
      ModalTasks: (
        <>
          {Toast}
          <EXPERIMENTAL_Modal
            isOpen={isOpen}
            onClose={()=> setOpen(false)}
            size="small"
            title="Actividad"
          >
            <div className={cn("tasks-list")}>
              {tasks.map((t)=>{
                return <div className={cn("tasks","pb5", `task-${t.state}`)} >
                  <div className="flex justify-between pb3">
                    <div className="flex items-center">
                      <span className="">{BuildText(t)}</span>
                    </div>
                    <div className="flex items-center task-info">
                      {t.state===ActionState.RUNING && <>
                        <span className="mr1 gray">{((((t.editAt - t.createAt) / t.progress.value)/1000) * (1 - t.progress.value)).toFixed(0) +" s"}</span>
                        <span className="mr1 mb2 gray">.</span>
                      </>}

                      <span className="mr2 gray">{`${Math.round(t.progress.value * 100)}%`}</span>
                      <span className="task-state">
                        { t.state === ActionState.COMPLETE &&
                          <Tooltip label={ t.ms<1000? `${t.ms}ms`:`${t.ms/1000}s` }>
                            <span>
                              <Verificado/>
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
                              <Error/>
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
          </EXPERIMENTAL_Modal>
        </>
      )

   }
};
