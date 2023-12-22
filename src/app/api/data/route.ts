import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import type { Project } from ".prisma/client";
import { MongoClient } from "mongodb";

export const ApiHeaderProjectID = "Project-ID";
export const ApiHeaderProjectKey = "Project-Key";

async function findProjectByHeaders(request: NextRequest): Promise<Project> {
  if (
    request.headers.has(ApiHeaderProjectID) &&
    request.headers.has(ApiHeaderProjectKey)
  ) {
    const id = request.headers.get(ApiHeaderProjectID);
    const key = request.headers.get(ApiHeaderProjectKey);
    if (id && key) {
      const prisma = new PrismaClient();
      return prisma.project.findUniqueOrThrow({
        where: {
          id: parseInt(id as string),
          key: key as string,
        },
      });
    }
  }

  throw new Error();
}

const mongoURI = process.env.MONGO_URL as string;
const mongoClient = new MongoClient(mongoURI);

export const GET = async (request: NextRequest) => {
  try {
    const project = await findProjectByHeaders(request);
    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, { status: 403 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const project = await findProjectByHeaders(request);

    const body = await request.json();

    const envelope = {
      receivedAt: Date.now(),
      ip: request.ip,
      projectId: project.id,
      projectKey: project.key,
      payload: body,
    };

    await mongoClient.connect();
    const projectCollection = await mongoClient
      .db()
      .collection(project.id + "");
    const result = await projectCollection.insertOne(envelope);
    await mongoClient.close();

    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, { status: 403 });
  }
};
