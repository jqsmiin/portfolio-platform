import connect from "@/components/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";

interface ProjectFilter {
  type?: {
    $in: string[];
  };
  skills?: {
    $in: string[];
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

      const filter: ProjectFilter = {};

      if (type) {
        filter.type = { $in: type.split(",") };
        console.log(type);
      }
      if (skills) {
        const skillsArray = skills.split(",");
        filter.skills = { $in: skillsArray };
        console.log(skills);
      }
      console.log(filter);

      const totalProjects = await Project.countDocuments();
      const projects = await Project.find(filter).skip(skip).limit(PAGE_SIZE);

      console.log(projects);

      return NextResponse.json(
        {
          length: projects.length,
          totalPages: Math.ceil(totalProjects / PAGE_SIZE),
          projects,
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
