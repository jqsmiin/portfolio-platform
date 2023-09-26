"use client";

import { useUser } from "@clerk/nextjs/app-beta/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { typeList } from "@/components/utils/Data";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/components/utils/uploadthing";

const CreateProject = () => {
  const { user } = useUser();
  const router = useRouter();
  const [screens, setScreens] = useState<FileList[] | undefined | string>("");

  const [type, setType] = useState("Landing Page");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeChange = (selectedValue: string) => {
    setType(selectedValue);
  };

  const [formData, setFormData] = useState({
    projectTitle: "",
    skills: "",
    postedAt: "",
    githubUrl: "",
    url: "",
    desc: "",
    type: type,
    screens: screens,
  });

  const { projectTitle, skills, postedAt, githubUrl, url, desc } = formData;

  useEffect(() => {
    setFormData({
      ...formData, // Copy the existing formData
      type: type, // Update the type property with the new value
      screens: screens,
    });
  }, [type, screens]);

  const onSubmit = () => {
    console.log(formData);

    const createProject = async () => {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log("Data", data);
    };

    createProject();
  };

  useEffect(() => {
    if (user) {
      // Check if user is defined
      const role = user.publicMetadata?.role;
      if (role !== "admin") {
        // Delay the redirection by wrapping it in a setTimeout
        router.push("/");
      }
    }
  }, [user]);
  return (
    <section
      id="create-page"
      className="container mx-auto px-6 mt-6 lg:mt-10 mb-12"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold mb-8">Post your project!</h3>
        <div className="flex flex-col">
          <h3 className="font-bold mb-4">Project title</h3>
          <Input
            type="text"
            label="Project Title"
            variant="bordered"
            className="max-w-md"
            name="projectTitle"
            value={projectTitle}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Type</h3>
          <Select
            variant="bordered"
            name="type"
            label="Select a type"
            className="max-w-md"
          >
            {typeList.map((data, i) => (
              <SelectItem
                onClick={() => handleTypeChange(data)}
                key={i}
                value={data}
              >
                {data}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Skills</h3>
          <Input
            type="text"
            label="Skills"
            variant="bordered"
            className="max-w-md"
            name="skills"
            value={skills}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Posted At</h3>
          <Input
            type="date"
            variant="bordered"
            className="max-w-md"
            name="postedAt"
            value={postedAt}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Github Url</h3>
          <Input
            type="text"
            label="Github Url"
            variant="bordered"
            className="max-w-md"
            name="githubUrl"
            value={githubUrl}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Url</h3>
          <Input
            type="text"
            label="Url"
            variant="bordered"
            className="max-w-md"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Description</h3>
          <Textarea
            variant="bordered"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="max-w-md"
            minRows={10}
            name="desc"
            value={desc}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start mt-4">
          <h3 className="font-bold mb-4">Upload Photos</h3>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              const urls = res?.map((item) => item.url);

              setScreens(urls?.join(", "));

              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <div className="flex flex-col mt-4 items-baseline">
          <button
            className="mr-4 bg-secondaryColor text-[#fff] px-4 py-2 rounded-md hover:text-secondaryColor hover:bg-[#fff] duration-300 border border-solid hover:border-secondaryColor max-w-md w-full"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateProject;
