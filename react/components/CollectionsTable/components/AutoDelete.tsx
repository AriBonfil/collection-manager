
import {
  //@ts-ignore
  Alert
} from 'vtex.styleguide'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCollectionManager } from "../../../context";
import { DeleteManyCollections } from "../utils/TasksCollections";

export const AutoDelete:React.FC = ()=>{
  const { collections: {itemsAll=[]} } = useCollectionManager();
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(true);
  const [seconds, setSeconds] = useState(10);

  const {total, items} = useMemo(()=>{
    const items = itemsAll.filter(item=> !item.persistent && Date.parse(item.dateTo) + 1000 * 60 * 60 * 24 * 35 < new Date().getTime());
    return {
      total: items.length,
      items
    };
  },[itemsAll.length]);

  const _ref = {
    runTick: ()=>{
      if(!active) return;
      if(seconds > -1) setSeconds(seconds - 1)
      if(seconds === 0){
        setShow(false);
        DeleteManyCollections(items.map(i=> i.id));
      }
    },
    total,
    show
  }
  const ref = useRef<typeof _ref>();
  ref.current = _ref;

  useEffect(()=>{
    const event = ()=>{
      if(!ref.current?.total) return;
      ref.current?.runTick();
    }
    const code = setInterval(event,1000);
    return ()=> clearInterval(code);
  },[]);


  if(itemsAll.length === 0 || total === 0 || !show) return null;

  return (
    <Alert
      action={{ label: 'Cancelar', onClick: () => {
        setActive(false)
        setShow(false)
      }}}
      type="warning"
      onClose={() => setShow(false)}
    >
      Se eliminaran {total} colecciones inactivas en {seconds}s
    </Alert>
  )
};
