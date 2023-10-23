import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import verify from "@/templates/verify";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      const response = NextResponse.json(
        {
          message: "invalid token",
        },
        { status: 409 }
      );
      response.cookies.set("token", "", {
        httpOnly: true,
      });
      return response;
    }

    // check if user already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: "User already verified" },
        { status: 409 }
      );
    }

    // check if user already have verification token and it is not expired
    if (user.verifyTokenExpiry > new Date(Date.now() + 3540000)) {
      return NextResponse.json(
        {
          message: `Please wait for atleast 1 minute before requesting another verification mail`,
        },
        { status: 409 }
      );
    }
    const hashedToken = await bcryptjs.hash(user._id.toString(), 10);
    user.verifyToken = hashedToken;
    user.verifyTokenExpiry = Date.now() + 3600000;
    await user.save();
    const res = await sendEmail({
      toMailID: user.email,
      fromMailID: "no-reply@mymuseand.me",
      emailContent: verify(`${user.firstName} ${user.lastName}`, hashedToken),
      emailSubject: "Verify your email",
    });
    if (!res.response.includes("250")) {
      return NextResponse.json(
        { message: "Error sending mail!, Please try again" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Verification mail sent successfully" },
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
