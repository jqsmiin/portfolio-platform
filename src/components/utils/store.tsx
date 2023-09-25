"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type Check = string[];

type Project = {
  createdAt: string;
  desc: string;
  githubUrl: string;
  postedAt: string;
  projectTitle: string;
  screens: string[];
  skills: string[];
  type: string[];
  updatedAt: string;
  url: string;
  __v: number;
  _id: string;
};

interface ContextProps {
  projectsData: Project[];
  setProjectsData: Dispatch<SetStateAction<Project[]>>;
  getAllProjects: () => Promise<void>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  checkBoxes: Check;
  setCheckBoxes: Dispatch<SetStateAction<string[]>>;
  groupSelected: string[];
  setGroupSelected: Dispatch<SetStateAction<never[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  projectsData: [],
  setProjectsData: (): Project[] => [],
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
  const [projectsData, setProjectsData] = useState<[] | Project[]>([]);
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
