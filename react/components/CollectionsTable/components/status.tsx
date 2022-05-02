import React, { useEffect } from "react"
//@ts-ignore
import { FilterBar, Input, Dropdown  } from "vtex.styleguide"
import { useCollectionManager } from "../../../context"

export type StatusFilterProps = {
  // statements: StatusFilterStates["statements"],
  // setStatements: (statements: StatusFilterStates["statements"])=> void
}
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

export const StatusFilter:React.FC<StatusFilterProps> = ()=>{
  const { searchParams, setSearchParams, collections } = useCollectionManager();

  const statements:StatusFilterStates["statements"] = Object.keys(searchParams).map(key=>{
    if(key === "get") {
      let value = "any";
      if(searchParams["get"] === "all")  return null;
      if(searchParams["get"] === "active") value = "active";
      if(searchParams["get"] === "inactive") value = "inactivo";

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
      alwaysVisibleFilters={['id']}
      statements={statements}
      onChangeStatements={(statements: StatusFilterStates["statements"])=>{
        var obj:any = {};
        ["id"].map(key=>{
          var value = undefined;
          var v = statements.find(s=> s.subject === key);
          if(v?.subject === "id"){
            value = "any"
            if(v?.object === "active") value = "active";
            if(v?.object === "inactivo") value = "inactive";
            obj["get"] = value;
          }
        })
        setSearchParams(obj);
        collections.setQueryParams({
          page: 0
        });
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
