import { useState, type ReactNode } from "react";
import { ConditionalRenderContext } from "./ConditionalRenderContext";

type ConditionalRenderProviderProps = {
  children: ReactNode;
  renderingComponentsIdMap: Record<string, boolean>;
}


export function ConditionalRenderProvider({ children, renderingComponentsIdMap }: ConditionalRenderProviderProps) {
  const [renderingMap, setRenderingMap] = useState(renderingComponentsIdMap);

  return (
    <ConditionalRenderContext.Provider value={{ 
      renderingMap, 
      setRenderingMap: (updatedRenderingMap: typeof renderingMap) => setRenderingMap(updatedRenderingMap)
    }}
    >
      {children}
    </ConditionalRenderContext.Provider>
  );
}