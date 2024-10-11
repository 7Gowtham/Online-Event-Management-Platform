import 'dotenv/config.js'
import Stripe from 'stripe'
import Razorpay from 'razorpay'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

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
    else if(paymentGateway === 'Razorpay'){
        const paymentOptions = {
            amount: amount * 100,
            currency: 'INR',
            payment_capture: 1
        };
        const order = await razorpay.orders.create(paymentOptions)
        return{
            status:'success',
            transactionId: order.id
        }
    }
    else{
        return {
            status:'failure',
            message:'Unsupported payment gateway'
        }
    }
}
