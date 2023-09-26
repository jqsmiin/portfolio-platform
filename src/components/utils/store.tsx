"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ProjectType } from "./DataTypes";

interface ContextProps {
  projectsData: ProjectType[];
  setProjectsData: Dispatch<SetStateAction<ProjectType[]>>;
  getAllProjects: () => Promise<void>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  checkBoxes: string[];
  setCheckBoxes: Dispatch<SetStateAction<string[]>>;
  groupSelected: string[];
  setGroupSelected: Dispatch<SetStateAction<never[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  projectsData: [],
  setProjectsData: (): ProjectType[] => [],
  getAllProjects: async () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  checkBoxes: [],
  setCheckBoxes: () => {},
  groupSelected: [],
  setGroupSelected: () => {},
  loading: true,
  setLoading: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkBoxes, setCheckBoxes] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState([]);
  const [projectsData, setProjectsData] = useState<[] | ProjectType[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllProjects = async () => {
    const res = await fetch(
      `/api/projects?type=${checkBoxes}&skills=${groupSelected}`
    );

    setLoading(true);

    const data = await res.json();

    setProjectsData(data.projects);
    setLoading(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        checkBoxes,
        setCheckBoxes,
        groupSelected,
        setGroupSelected,
        projectsData,
        setProjectsData,
        getAllProjects,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
