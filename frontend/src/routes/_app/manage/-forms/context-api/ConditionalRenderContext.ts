import { createContext, useContext } from "react";

export type ActionType = {
  triggerChildFormRender: string;
  triggerChildFormClose: string[];
  triggerRenderOnValue: string | number;
  fieldValue: any;
}

type ContextValueType = {
  renderingMap: Record<string, boolean>;
  setRenderingMap: (action: ActionType) => void;
}


export const ConditionalRenderContext = createContext<ContextValueType | null>(null);

export function useConditionalRenderContext() {
  const contextValue = useContext(ConditionalRenderContext);
  
  if (contextValue === null) {
    throw new Error("No value provided to ConditionalRenderContext");
  }

  return contextValue;
}