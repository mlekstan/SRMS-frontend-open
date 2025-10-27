import { createContext, useContext } from "react";


type ContextValueType = {
  renderingMap: Record<string, boolean>;
  setRenderingMap: (updatedRenderingMap: Record<string, boolean>) => void
}

export const ConditionalRenderContext = createContext<ContextValueType | null>(null);

export function useConditionalRenderContext() {
  const contextValue = useContext(ConditionalRenderContext);
  
  if (contextValue === null) {
    throw new Error("No value provided to ConditionalRenderContext");
  }

  return contextValue;
}