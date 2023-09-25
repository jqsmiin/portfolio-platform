import connect from "@/components/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";

interface ProjectFilter {
  type?: {
    $in: string[];
  };
  skills?: {
    $regex: string[];
    $options: string;
  };
}

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const url = new URL(req.url);

    const searchParams = url.searchParams;
    const page = url.searchParams.get("page");
    const pageSize = url.searchParams.get("pageSize");
    const PAGE_SIZE = Number(pageSize) || 1000;
    const pageNum = Number(page) || 1;
    const skip = (pageNum - 1) * PAGE_SIZE;

    const keysArray = Array.from(searchParams.keys());

    if (keysArray.length !== 0) {
      const type = url.searchParams.get("type");
      const skills = url.searchParams.get("skills");

      // Fetch all projects from MongoDB
      const allProjects = await Project.find().exec();

      // Filter the projects based on the skills and type parameters
      const filteredProjects = allProjects.filter((project) => {
        // Check if the project type matches the specified type (if type is specified)

        if (type) {
          const projectTypes = project.type[0].split(","); // Assuming skills is an array with a single comma-separated string
          const desiredTypes = type.split(",");
          const hasAnyType = desiredTypes.some((desiredType) =>
            projectTypes.includes(desiredType.trim())
          );
          if (!hasAnyType) {
            return false;
          }
        }

        // Check if the project has any of the specified skills (if skills are specified)
        if (skills) {
          const projectSkills = project.skills[0].split(","); // Assuming skills is an array with a single comma-separated string
          const desiredSkills = skills.split(",");
          const hasAnySkill = desiredSkills.some((desiredSkill) =>
            projectSkills.includes(desiredSkill.trim())
          );
          if (!hasAnySkill) {
            return false;
          }
        }

        return true; // Include the project if it matches both type and skills criteria (or none if not specified)
      });

      return NextResponse.json(
        {
          length: filteredProjects.length,
          totalPages: Math.ceil(filteredProjects.length / PAGE_SIZE),
          projects: filteredProjects.slice(skip, skip + PAGE_SIZE),
        },
        { status: 200 }
      );
    } else {
      const totalProjects = await Project.countDocuments();
      const projects = await Project.find().skip(skip).limit(PAGE_SIZE);

      return NextResponse.json(
        {
          length: projects.length,
          totalPages: Math.ceil(totalProjects / PAGE_SIZE),
          projects,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const data = await req.json();

    const {
      projectTitle,
      skills,
      desc,
      url,
      githubUrl,
      screens,
      type,
      postedAt,
    } = data;

    const newProject = {
      projectTitle,
      skills,
      desc,
      url,
      githubUrl,
      screens,
      type,
      postedAt,
    };

    const projects = await Project.create(newProject);

    return NextResponse.json({ projects }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
