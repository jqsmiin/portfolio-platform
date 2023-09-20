"use client";

import { useUser } from "@clerk/nextjs/app-beta/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

const page = () => {
  const { user } = useUser();
  const router = useRouter();

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
      className="container mx-auto px-6 mt-2 lg:mt-10 mb-12"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold">Post your project!</h3>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="email" label="Email" />
          <Input type="email" label="Email" placeholder="Enter your email" />
        </div>
      </div>
    </section>
  );
};

export default page;
