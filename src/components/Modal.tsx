"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import LoadingSpinner from "./utils/Spinner";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { ProjectType } from "./utils/DataTypes";
import { useState, useEffect } from "react";

type ProjectDetail = {
  projectDetail: ProjectType | undefined;
  isOpen: boolean;
  onClose: () => void;
  modalLoading: boolean;
};

const ModalComponent = ({
  projectDetail,
  isOpen,
  onClose,
  modalLoading,
}: ProjectDetail) => {
  const [timeSinceCreation, setTimeSinceCreation] = useState("");

  function timeAgo(createdDate: Date) {
    const currentDate = new Date();
    const diffInSeconds = Math.floor(
      (Number(currentDate) - Number(new Date(createdDate))) / 1000
    );

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 2592000) {
      // 30 days in seconds (approximately)
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (diffInSeconds < 31536000) {
      // 365 days in seconds (approximately)
      const months = Math.floor(diffInSeconds / 2592000); // 30 days in seconds
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000); // 365 days in seconds
      const remainingMonthsInSeconds = diffInSeconds % 31536000;
      const months = Math.floor(remainingMonthsInSeconds / 2592000);

      const yearString = years > 1 ? `${years} years` : "1 year";
      const monthString = months > 1 ? `${months} months` : "1 month";

      return `${yearString} and ${monthString} ago`;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const timeAgoString = timeAgo(projectDetail?.postedAt as Date);
      setTimeSinceCreation(timeAgoString);
    }, 1000);

    return () => clearInterval(interval);
  }, [projectDetail?.postedAt]);

  return (
    <Modal
      backdrop="blur"
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      {modalLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-bold">
                    {projectDetail?.projectTitle}
                  </h3>
                  <div className="flex items-center gap-6 mr-8">
                    <Link
                      href={projectDetail ? projectDetail.githubUrl : ""}
                      target="_blank"
                      className="text-secondaryColor text-xl"
                    >
                      <BsGithub />
                    </Link>
                    <Link
                      href={projectDetail ? projectDetail.url : ""}
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
                <p>{projectDetail?.desc}</p>
                <h3 className="text-xl font-bold">Skills</h3>
                <ul className="flex gap-4 flex-wrap">
                  {projectDetail?.skills[0].split(",").map((skill, i) => (
                    <li
                      className="border border-solid border-[#ccc] px-3 py-1 rounded-2xl text-secondaryColor hover:text-[#fff] hover:bg-secondaryColor duration-200 cursor-default"
                      key={i}
                    >
                      {skill.trim()}
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-bold">Screens</h3>
                {projectDetail?.screens[0].split(",").map((photo, i) => (
                  <img key={i} src={photo} alt={projectDetail.projectTitle} />
                ))}
              </ModalBody>
              <ModalFooter>
                <hr />
                <div className="mt-4">
                  <h4 className="text-secondaryColor text-sm">
                    {timeSinceCreation}
                  </h4>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      )}
    </Modal>
  );
};

export default ModalComponent;
