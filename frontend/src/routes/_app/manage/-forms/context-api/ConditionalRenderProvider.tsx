import { useReducer, type ReactNode } from "react";
import { ConditionalRenderContext, type ActionType } from "./ConditionalRenderContext";

type ConditionalRenderProviderProps = {
  children: ReactNode;
  renderingComponentsIdMap: Record<string, boolean>;
}


function reducer(state: Record<string, boolean>, action: ActionType) {
  const { 
    triggerChildFormRender, 
    triggerChildFormClose, 
    triggerRenderOnValue, 
    fieldValue 
  } = action;
  const newState = {...state};

  if (fieldValue === triggerRenderOnValue) {
    newState[triggerChildFormRender] = true;
  } else {
    triggerChildFormClose.forEach(cf => newState[cf] = false)
  }

  return newState;
}

export function ConditionalRenderProvider({ children, renderingComponentsIdMap }: ConditionalRenderProviderProps) {
  const [renderingMap, setRenderingMap] = useReducer(reducer, renderingComponentsIdMap);

  return (
    <ConditionalRenderContext.Provider value={{ 
      renderingMap, 
      setRenderingMap: (action: ActionType) => setRenderingMap(action)
    }}
    >
      {children}
    </ConditionalRenderContext.Provider>
  );
}