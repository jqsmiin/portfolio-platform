"use client";

import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { useGlobalContext } from "./utils/store";
import LoadingSpinner from "./utils/Spinner";
import ModalComponent from "./Modal";
import { ProjectType } from "./utils/DataTypes";

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [modalLoading, setModalLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const { getAllProjects, projectsData, loading } = useGlobalContext();

  const handleOpen = (id: string) => {
    setBackdrop("blur");
    setModalLoading(true);
    const getProjectDetail = async (id: string) => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      setProjectDetail(data.project);
      setModalLoading(false);
    };

    getProjectDetail(id);

    onOpen();
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading || projectsData.length === 0) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <section id="projects" className="flex flex-col">
      <h3 className="text-xl font-bold">All Projects</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {projectsData &&
          projectsData.map((project, i) => (
            <div
              key={i}
              onClick={() => handleOpen(project._id)}
              className="flex flex-col border border-solid border-[#ccc] pb-[1.7rem] p-3 rounded-2xl cursor-pointer"
            >
              <div>
                <img
                  className="w-full rounded-xl h-[237px]"
                  src={
                    project.screens && project.screens[0]
                      ? project.screens[0].split(",")[0]
                      : ""
                  }
                  alt="project"
                />
              </div>
              <div className="flex gap-4 pb-4 mt-4 justify-between items-center">
                <h3 className="text-xl font-bold">{project.projectTitle}</h3>
                <div className="border border-solid py-1 px-3 border-[#ccc] rounded-3xl">
                  <h3 className="text-secondaryColor font-bold">
                    {project.type}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="mt-8 flex justify-between">
                <h4 className="text-[#a1a0a0] text-sm">
                  <span className="font-bold">Published:</span>{" "}
                  {project.postedAt as string}
                </h4>
                <h4 className="text-gray-400 text-sm">
                  {typeof project.postedAt === "string" &&
                    (project.postedAt.split("-")[0] as string)}
                </h4>
              </div>
            </div>
          ))}
        {isOpen && backdrop == "blur" ? (
          <>
            <ModalComponent
              projectDetail={projectDetail}
              isOpen={isOpen}
              onClose={onClose}
              modalLoading={modalLoading}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Projects;
