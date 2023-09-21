"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./utils/CustomCheckBox";
import { skills } from "./utils/Data";
import { services } from "./utils/Data";

const Filter = () => {
  const [groupSelected, setGroupSelected] = useState([]);
  const handleCheckboxChange = (selectedValues: any) => {
    setGroupSelected(selectedValues);
  };
  return (
    <section id="filter" className="w-70">
      <div className="flex flex-col border border-solid border-[#ccc] py-8">
        <div className="flex justify-around pl-0 items-center">
          <Avatar
            isBordered
            color="success"
            src="https://www.upwork.com/profile-portraits/c1_Sl0SduZoBgrIH-Tn5turAfM80MkD9qp2lItVyQpYLWR9nqGJkcrudNtdMVKCEuT"
            size="lg"
          />

          <Link
            className="underline text-xl font-bold"
            href="https://www.upwork.com/freelancers/~01ba206336c9c09675"
          >
            Jasmin Oruc
          </Link>
        </div>
        <div className="px-8 pt-10">
          <h3 className="text-xl font-bold">Filter by type</h3>
          <div className="flex flex-wrap mt-6 gap-6">
            {services.map((service, i) => (
              <Checkbox color="primary" key={i}>
                {service}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full px-8 pt-10">
          <h3 className="text-xl font-bold">Filter by skills</h3>
          <CheckboxGroup
            className="gap-1 mt-4"
            label="Select skills"
            orientation="horizontal"
            value={groupSelected}
            onChange={handleCheckboxChange}
          >
            {skills.map((skill, i) => (
              <CustomCheckbox key={i} value={skill}>
                {skill}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>
          {groupSelected.length !== 0 && (
            <p className="mt-4 ml-1 text-default-500">
              Selected: {groupSelected.join(", ")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Filter;
