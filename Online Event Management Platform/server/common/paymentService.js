import 'dotenv/config.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const paymentService = async({amount, paymentGateway, userId, ticketId}) => {
    if(paymentGateway === 'Stripe'){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            description: `Ticket Purchase for ticket ID: ${ticketId}`,
            metadata:{userId, ticketId}
        })
        return{
            status:'success',
            transactionId:paymentIntent.id
        }
    }
    else{
        return {
            status:'failure',
            message:'Unsupported payment gateway'
        }
    }
}
