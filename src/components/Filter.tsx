"use client";

import Link from "next/link";
import { Avatar, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./utils/CustomCheckBox";
import { skills } from "./utils/Data";
import { services } from "./utils/Data";
import { ChangeEvent } from "react";
import { useGlobalContext } from "./utils/store";

const Filter = () => {
  const { groupSelected, setGroupSelected, setCheckBoxes, getAllProjects } =
    useGlobalContext();
  const handleCheckboxChange = (selectedValues: any) => {
    setGroupSelected(selectedValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedService = e.target.value;

    // Check if the checkbox is checked or unchecked
    if (e.target.checked) {
      // If checked, add the selected service to the checkBoxes array
      setCheckBoxes((prevCheckBoxes) => [...prevCheckBoxes, selectedService]);
    } else {
      // If unchecked, remove the selected service from the checkBoxes array
      setCheckBoxes((prevCheckBoxes) =>
        prevCheckBoxes.filter((service) => service !== selectedService)
      );
    }
  };

  const handleFilter = () => {
    getAllProjects();
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
              <Checkbox
                onChange={handleChange}
                value={service}
                color="primary"
                key={i}
              >
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
        <div className="mt-8 px-8">
          <button
            className="mr-4 bg-secondaryColor text-[#fff] px-4 py-2 rounded-md hover:text-secondaryColor hover:bg-[#fff] duration-300 border border-solid hover:border-secondaryColor"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filter;
