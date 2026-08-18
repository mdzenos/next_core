import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("[Support API] Request:", body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "[Support API] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      {
        status: 400,
      },
    );
  }
}
