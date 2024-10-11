import nodemailer from 'nodemailer'
import 'dotenv/config.js'

export const sendConfirmation = async({userId, ticketId, email})=>{
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
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


export const notifyAttendees = async(event)=>{
    try {
        console.log('Event ID:', event.eventId); 
        const attendees = await attendeeModel.find({eventId: event.eventId}).select('attendeeEmail')
        console.log('Query Result:', attendees);
        const attendeeEmails = attendees.map(att=>att.attendeeEmail)

        if(attendeeEmails.length === 0){
            console.log('No attendee to notify for this event')
            return;
        }

        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        }) 
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:attendeeEmails.join(','),
            subject:`Updated schedule for ${event.title}`,
            text: `The schedule for ${event.title} has been updated. Check the latest schedule on our platform.`
        }

        const info = await transporter.sendMail(mailOptions); // Await the async function
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error notifying attendees:", error);
    }
}