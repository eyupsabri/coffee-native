import { createContext, useState, ReactNode, useMemo } from "react";
import { DrawerContextType, DrawerIds } from "../@types/Drawer";


interface Props {
  children?: ReactNode
  // any props that come into the component
}

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerContextProvider = ({children}: Props) => {

  const [Ids, setIds] = useState<DrawerIds | null>(null)

  const setDrawerId = (Ids : DrawerIds | null) => {
   Ids ? setIds({parentId: Ids.parentId, childId: Ids.childId}) : null
  }

  return (
    <DrawerContext.Provider value={{Ids, setDrawerId }}>
      {children}
    </DrawerContext.Provider>
  )
}