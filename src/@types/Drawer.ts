
export type DrawerIds = {
   parentId: number; 
   childId: number;
}

export type DrawerContextType = {
  Ids : DrawerIds | null
  setDrawerId: (Ids: DrawerIds | null) => void;

  isHomePage: boolean;
  setIsHomePageHelper: (isIt: boolean) => void;
}