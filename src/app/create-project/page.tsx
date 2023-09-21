"use client";

import { useUser } from "@clerk/nextjs/app-beta/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { typeList } from "@/components/utils/Data";

const page = () => {
  const { user } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     // Check if user is defined
  //     const role = user.publicMetadata?.role;
  //     if (role !== "admin") {
  //       // Delay the redirection by wrapping it in a setTimeout
  //       router.push("/");
  //     }
  //   }
  // }, [user]);
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
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Type</h3>
          <Select variant="bordered" label="Select a type" className="max-w-md">
            {typeList.map((data, i) => (
              <SelectItem key={i} value={data}>
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
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Posted At</h3>
          <Input type="date" variant="bordered" className="max-w-md" />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Github Url</h3>
          <Input
            type="text"
            label="Github Url"
            variant="bordered"
            className="max-w-md"
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Url</h3>
          <Input
            type="text"
            label="Url"
            variant="bordered"
            className="max-w-md"
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
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="font-bold mb-4">Upload Photos</h3>
          <input type="file" className="uploadButton" />
        </div>
      </div>
    </section>
  );
};

export default page;
