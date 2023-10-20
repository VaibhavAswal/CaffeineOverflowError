import { disconnect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    disconnect();
    return response;
  } catch (error: any) {
    disconnect();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
