import { useConditionalRenderContext } from "@/routes/_app/manage/-forms/context-api/ConditionalRenderContext";
import type { ReactNode } from "react";

export function ConditionalRender({ children, renderedComponentId }: { children: ReactNode, renderedComponentId: string }) {
  const { renderingMap } = useConditionalRenderContext();

  const render = renderingMap[renderedComponentId];

  return (
    <>
      { 
        render && children
      }
    </>
  );
}