import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  return NextResponse.json(
    { message: "Hello, Next.js Version 13!" },
    { status: 200 },
  );
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log({ body });

  // Do something

  return NextResponse.json(
    { message: "Operation successful" },
    { status: 200 },
  );
};
