import React, { useEffect } from "react"
//@ts-ignore
import { FilterBar, Input, Dropdown  } from "vtex.styleguide"
import { useCollectionManager } from "../../../context"
import { GetType } from "../../../context/useCollections"

export type StatusFilterStates = {
  statements: {
    error: null
    object: "inactivo" | "active" | "any"
    subject: "id"
    verb: "inactivo" | "active" | "any"
  }[]
}

function renderSimpleFilterLabel(statement:any) {
  if (!statement || !statement.object) return 'Any'
  if(statement.verb === 'active') return "Activo";
  if(statement.verb === 'inactivo') return "Inactivo";
  return "abc";
}

export type StatusFilterProps = {
  // statements: StatusFilterStates["statements"],
  // setStatements: (statements: StatusFilterStates["statements"])=> void
  disabled?: boolean
}
export const StatusFilter:React.FC<StatusFilterProps> = ({disabled})=>{
  const {collections} = useCollectionManager();

  const statements:StatusFilterStates["statements"] = Object.keys(collections.queryParams).map(key=>{
    if(key === "status") {
      let value = "any";
      if(collections.queryParams.status === GetType.ALL)  return null;
      if(collections.queryParams.status === GetType.ACTIVE) value = "active";
      if(collections.queryParams.status === GetType.INACTIVE) value = "inactivo";

      return {
        error: null,
        object: value,
        subject: "id",
        verb: value
      };
    }
    return null;
  }).filter(i=> !!i) as any;

  return (
    <FilterBar
      disabled= {disabled}
      alwaysVisibleFilters={['id']}
      statements={statements}
      onChangeStatements={(statements: StatusFilterStates["statements"])=>{
        var obj:any = {page: 0};
        ["id"].map(key=>{
          var value = GetType.ALL;
          var v = statements.find(s=> s.subject === key);
          if(v?.subject === "id"){
            if(v?.object === "active") value = GetType.ACTIVE;
            if(v?.object === "inactivo") value = GetType.INACTIVE;
          }
          obj["status"] = value;
        })
        collections.setQueryParams(obj);
      }}
      // clearAllFiltersButtonLabel="Clear Filters"
      options={{
        id: {
          label: 'Estatus',
          renderFilterLabel: renderSimpleFilterLabel,
          verbs: [
            {
              label: 'Activo',
              value: 'active',
              object: ({onChange, value}:any) => {
                useEffect(()=>{
                  if(value !== "active") onChange("active");
                });
                return null;
              },
            },
            {
              label: 'Inactivo',
              value: 'inactivo',
              object: ({onChange, value}:any) => {
                useEffect(()=>{
                  if(value !== "inactivo") onChange("inactivo");
                });
                return null;
              },
            },
          ],
        },
      }}
    />
  );
}
