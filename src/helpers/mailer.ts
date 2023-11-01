import nodemailer from "nodemailer";

export const sendEmail = async ({
  toMailID,
  fromMailID,
  emailContent,
  emailSubject,
}: any) => {
  try {
    // create a hased token
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // if (emailType === "VERIFY") {
    //   await User.findByIdAndUpdate(userId, {
    //     verifyToken: hashedToken,
    //     verifyTokenExpiry: Date.now() + 7200,
    //   });
    // } else if (emailType === "RESET") {
    //   await User.findByIdAndUpdate(userId, {
    //     forgotPasswordToken: hashedToken,
    //     forgotPasswordTokenExpiry: Date.now() + 7200,
    //   });
    // }

    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });

    const mailOptions = {
      from: fromMailID,
      to: toMailID,
      subject: emailSubject,
      html: emailContent,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
