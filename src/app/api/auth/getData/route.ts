import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select(
      "-password -createdAt -updatedAt -__v -verifyToken -verifyTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry"
    );
    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    return NextResponse.json(
      {
        mesaaage: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  }
}
