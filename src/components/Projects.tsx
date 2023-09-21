"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { projects } from "./utils/Data";
import { project } from "./utils/Data";
import { useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

  const handleOpen = () => {
    setBackdrop("blur");
    onOpen();
  };
  return (
    <section id="projects" className="flex flex-col">
      <h3 className="text-xl font-bold">All Projects</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {projects.map((project, i) => (
          <div
            key={i}
            onClick={() => handleOpen()}
            className="flex flex-col border border-solid border-[#ccc] pb-[1.7rem] p-3 rounded-2xl cursor-pointer"
          >
            <div>
              <img
                className="w-full rounded-xl h-[237px]"
                src={project.screens[0]}
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
                <span className="font-bold">Published:</span> {project.postedAt}
              </h4>
              <h4 className="text-gray-400 text-sm">{project.createdAt}</h4>
            </div>
          </div>
        ))}
        {isOpen && backdrop == "blur" ? (
          <Modal
            backdrop={backdrop}
            size="4xl"
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <h3 className="text-3xl font-bold">
                        {project.projectTitle}
                      </h3>
                      <div className="flex items-center gap-6 mr-8">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="text-secondaryColor text-xl"
                        >
                          <BsGithub />
                        </Link>
                        <Link
                          href={project.url}
                          target="_blank"
                          className="text-primaryColor text-xl"
                        >
                          <FaExternalLinkAlt />
                        </Link>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <h3 className="text-xl font-bold">About Project</h3>
                    <p>{project.desc}</p>
                    <h3 className="text-xl font-bold">Skills</h3>
                    <ul className="flex gap-4 flex-wrap">
                      {project.skills[0].split(",").map((skill, i) => (
                        <li
                          className="border border-solid border-[#ccc] px-3 py-1 rounded-2xl text-secondaryColor hover:text-white hover:bg-secondaryColor duration-200 cursor-default"
                          key={i}
                        >
                          {skill.trim()}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-bold">Screens</h3>
                    {project.screens.map((photo, i) => (
                      <img key={i} src={photo} alt={project.projectTitle} />
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <hr />
                    <div className="mt-4">
                      <h4 className="text-[#ccc] text-sm">
                        {project.createdAt}
                      </h4>
                    </div>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Projects;
