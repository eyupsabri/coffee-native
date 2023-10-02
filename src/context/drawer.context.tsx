// import { createContext, useState, ReactNode, useMemo } from "react";
// import { DrawerContextType, DrawerIds } from "../@types/Drawer";


// interface Props {
//   children?: ReactNode
//   // any props that come into the component
// }

// export const DrawerContext = createContext<DrawerContextType | null>(null);

// export const DrawerContextProvider = ({children}: Props) => {

//   const [Ids, setIds] = useState<DrawerIds | null>(null)
//   const [isHomePage, setIsHomePage] = useState(false);

//   const setDrawerId = (selectedIds : DrawerIds | null) => {
//     if(selectedIds){
//       setIsHomePage(false);
//       setIds({parentId: selectedIds.parentId, childId: selectedIds.childId})
//     }else{
//       Ids ? setIds({parentId: Ids.parentId, childId: Ids.childId}) : null
//     }
  
//   }

//   const setIsHomePageHelper = (isIt: boolean ) => {
//     if(isIt)
//       setIds(null);
//     setIsHomePage(isIt)
//   }

//   return (
//     <DrawerContext.Provider value={{Ids, setDrawerId, isHomePage, setIsHomePageHelper }}>
//       {children}
//     </DrawerContext.Provider>
//   )
// }