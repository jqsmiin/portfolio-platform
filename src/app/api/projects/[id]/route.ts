import connect from "@/components/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";

export const GET = async (
  req: NextRequest,
  route: { params: { id: string } }
) => {
  try {
    await connect();

    const id = route.params.id;

    const project = await Project.findById(id);

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
