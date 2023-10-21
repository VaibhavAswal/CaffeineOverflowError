import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import verify from "@/templates/verify";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const hashedToken = await bcryptjs.hash(savedUser._id.toString(), 10);
    savedUser.verifyToken = hashedToken;
    savedUser.verifyTokenExpiry = Date.now() + 3600000;
    await savedUser.save();
    const res = await sendEmail({
      toMailID: email,
      fromMailID: "no-reply@mymuseand.me",
      emailContent: verify(
        `${savedUser.firstName} ${savedUser.lastName}`,
        hashedToken
      ),
      emailSubject: "Verify your email",
    });
    if (!res.response.includes("250")) {
      await User.findByIdAndDelete(savedUser._id);
      return NextResponse.json(
        { message: "Error creating account!, Try again" },
        { status: 500 }
      );
    }

    //create token data
    const tokenData = {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      isVerfied: savedUser.isVerfied,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        isVerfied: savedUser.isVerfied,
      },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
