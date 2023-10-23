const verify = (name: string, link: string) => {
  return `
    <html lang="en">
    <body>
    <h1>Dear ${name}</h1>
    <p>Please click on the given link to verify your email address</p>
    <br />
    <a href="http://localhost:3000/account/verifyemail?token=${link}" style="padding: 10px; background-color: green; color: white; border-radius: 15px;">Click Here</a>
    <br />
    <p>if the button doesn't work, you can copy and paste the following link in your browser</p>
    <p>http://localhost:3000/account/verifyemail?token=${link}</p>
    <p>Have a good day :)</p>
    </body>
    </html>
    `;
};

export default verify;
