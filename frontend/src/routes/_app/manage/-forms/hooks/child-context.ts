import { createContext, type Dispatch, type SetStateAction } from "react";


type ValidState = Record<string, boolean>;

export const AccordionValidUpdateContext = createContext<Dispatch<SetStateAction<ValidState>> | null>(null);