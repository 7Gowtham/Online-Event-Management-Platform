import nodemailer from 'nodemailer'
import 'dotenv/config.js'

export const sendConfirmation = async({userId, ticketId, email})=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Ticket Purchase Confirmation",
        text:`Thank you for purchasing ticket #${ticketId}. Your ticket details are in your account.`,
    }

    await transporter.sendMail(mailOptions)

    console.log(`Confirmation sent to email: ${email}`);
}
