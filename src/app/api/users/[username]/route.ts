import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const username = params.username;

  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      let error_response = {
        status: "fail",
        message: "No user found with the provided username",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let json_response = {
      status: "success",
      data: {
        user,
      },
    };
    return NextResponse.json(json_response);
  } catch (error) {
    // Handle any unexpected errors
    // Log error and return a server error response
  }
}
