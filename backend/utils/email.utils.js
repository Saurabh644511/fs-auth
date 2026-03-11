import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    });
    const verifyEmailLink = `http://localhost:5173/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `${process.env.EMAIL_ID}`,
        to,
        subject: "Verify your email",
        html: `
            <div>
                <h2>Verify your Email</h2>
                <p>Activate your account</p>
                <a href = "${verifyEmailLink}">Verify Email<a/>
            </div>
        `
    })
}