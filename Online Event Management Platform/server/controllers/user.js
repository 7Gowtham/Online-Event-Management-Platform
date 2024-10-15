import userModel from "../models/user.js"
import {randomString} from '../common/helper.js'
import eventModel from "../models/event.js"
import auth from '../common/auth.js'
import nodemailer from 'nodemailer'
import 'dotenv/config.js'

const getAllUsers = async(req, res)=>{
    try {
        let users = await userModel.find({},{name:1, email:1, role:1, _id:0, userId:1})

        res.status(200).send({
            message:"Fetched all the users Successfully",
            data: users
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getAllRegiteredEvents = async(req, res)=>{
    try {
        const users = await userModel.aggregate([
            {
                $match: {}
            },
            {
                $lookup:{
                    from:'events',
                    localField:'registeredEvents.eventId',
                    foreignField:'eventId',
                    as:'eventDetails'
                }
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    registeredEvents:1,
                    'eventDetails.eventId':1,
                    'eventDetails.title':1,
                    'eventDetails.date':1,
                    'eventDetails.time':1,
                    'eventDetails.location':1
                }
            }
        ])

        res.status(200).send({
            message:"Fetched all the registered events successfully",
            data: users
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getAllRegisteredEventsByUserId = async(req, res)=>{
    try {
        const userId = req.headers.userId
        const user = await userModel.aggregate([
            {
                $match:{userId},
            },
            {
                $unwind: '$registeredEvents'
            },
            {
                $lookup:{
                    from:'events',
                    localField:'registeredEvents.eventId',
                    foreignField:'eventId',
                    as:'eventDetails'
                }
            },
            {
                $unwind: '$eventDetails'
            },
            {
                $project:{
                    _id: 0,
                    name: 1,
                    'eventDetails.eventId':1,
                    'eventDetails.title': 1,
                    'eventDetails.date': 1,
                    'eventDetails.time': 1,
                    'eventDetails.location': 1,
                    'registeredEvents.status': 1 
                }
            }
        ])
        console.log(user); 
        res.status(200).send({
            message: `Fetched registered events for userId ${userId} successfully`,
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
} 

const getProfile = async(req, res)=>{
    try {
        let user = await userModel.findOne({userId: req.headers.userId})
        if(!user){
            return res.status(400).send({
                message:"User not found"
            })
        }

        res.status(200).send({
            message:"Profile fetched Successfully",
            user:{
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error',
        });
    }
}


const updateProfile = async(req, res)=>{
    try {
        const {name, email} = req.body
        let user = await userModel.findOne({userId: req.headers.userId})
        if(!user){
           return res.status(400).send({
                message: "User not Found"
            })
        }
        
        user.name = name || user.name
        user.email = email || user.email
        await user.save();
        res.status(200).send({
            message:"Profile Updated Successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const registerEvent = async(req, res)=>{
    try {
        const userId = req.headers.userId
        const {eventId} = req.body

        const event = await eventModel.findOne({eventId})
        if(!event){
            return res.status(404).send({
                message:"Event not found"
            })
        }
        const user = await userModel.findOne({userId})
        if(!user){
            return res.status(404).send({
                message:"User not found"
            })
        }
        if(user.registeredEvents.find((ev=>ev.eventId === eventId))){
            return res.status(400).send({
                message:"User is already registered for this event"
            })
        }
        const registrationId = randomString(3);
        
        req.body.registrationId = registrationId;

        user.registeredEvents.push({eventId, registrationId})
        await user.save()

        res.status(200).send({
            message:"User registered for the event successfully",
            registrationId
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const signup = async(req, res)=>{
    const {name, email, password, role} = req.body

    if (role === "Admin") {
        return res.status(403).json({ message: "Admin registration is not allowed." });
    }
    try {
        let user = await userModel.findOne({email: req.body.email})
        if(!user){
            req.body.password = await auth.hashPassword(req.body.password)

            req.body.userId = randomString(4)

            await userModel.create(req.body)

            res.status(201).send({
                message:"User Registered Successfully"
            })
        }
        else{
            res.status(400).send({
                message:`User with email ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const login = async(req, res)=>{
    const { email, password } = req.body;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin@123";
    
    if (email === adminEmail) {
        if (password === adminPassword) {
          // Generate token for admin
          const adminPayload = {
            userId: "admin-id",
            name: "Admin",
            email: adminEmail,
            role: "Admin"
          };
    
          const token = await auth.createToken(adminPayload); 
    
          return res.status(200).json({
            message: "Admin login successful",
            role: "Admin",
            token
          });
        } else {
          return res.status(400).json({ message: "Invalid admin credentials." });
        }
      }

    try {
        const user = await userModel.findOne({email: req.body.email})
        if(user){
            if(await auth.hashCompare(req.body.password, user.password)){
                let payload = {
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id:user._id
                }
                let token = await auth.createToken(payload)
                res.status(200).send({
                    message:"Login Successful",
                    token,
                    role: user.role
                })
            }
            else{
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else{
            res.status(400).send({
                message:"User not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getUserRegistrationStatus = async(req, res)=>{
    const userId = req.headers.userId
    const {eventId} = req.params;
    try {
        const user = await userModel.findOne({userId, 'registeredEvents.eventId': eventId})
        console.log(user)
        if(!user){
            return res.status(404).send({
                message: "User not registered for this event"
            })
        }

        const eventRegistration = user.registeredEvents.find(reg => reg.eventId === eventId)
        console.log('eventRegistration', eventRegistration)
        res.status(200).send({
            message:"Fetched the user registration status",
            data: eventRegistration
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getAllApprovedRegisteredEventsByUserId = async(req, res) => {
    try {
        const userId = req.headers.userId;
        const user = await userModel.aggregate([
            {
                $match: { userId },
            },
            {
                $unwind: '$registeredEvents'
            },
            {
                $match: { 'registeredEvents.status': 'Approved' } 
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'registeredEvents.eventId',
                    foreignField: 'eventId',
                    as: 'eventDetails'
                }
            },
            {
                $unwind: '$eventDetails'
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    'eventDetails.eventId': 1,
                    'eventDetails.title': 1,
                    'eventDetails.date': 1,
                    'eventDetails.time': 1,
                    'eventDetails.location': 1,
                    'registeredEvents.status': 1 
                }
            }
        ]);
        
        res.status(200).send({
            message: `Fetched registered events for userId ${userId} successfully`,
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

const forgotPassword = async(req, res)=>{
    try {
        let user = await userModel.findOne({email: req.body.email})
        if(user){
            let payload = {
                name: user.name,
                email: user.email
            }
            let token = await auth.createToken(payload)
            
            const transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 587,
                secure: false,
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
            })

            console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
            
            async function main(){
                const info = await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Password Reset",
                    text: `You requested for a password reset. Click here: https://event-management7.netlify.app/reset-password/${token}`
                })
                console.log("Message sent: %s", info.messageId);
            }
            await main();
            
            res.status(200).send({
                message:"Sent Mail with Reset Link",
                token
            })
        }
        else{
            res.status(400).send({
                message:"User does not exists"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params
        const {password} = req.body
        let payload;
        if(token){
            payload = await auth.decodeToken(token)
            if(payload.exp <= (Math.floor(Date.now()/1000))){
                res.status(401).send({
                    message:"Token Expired"
                })
            }
        }

        const user = await userModel.findOne({email: payload.email})
        if(!user){
            return res.status(400).send({
                message:"User does not exist"
            })
        }

        const hashedPassword = await auth.hashPassword(password)
        
        user.password = hashedPassword
        await user.save()

        res.status(200).send({
            message: "Password Reset Successful"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    getAllUsers,
    getAllRegiteredEvents,
    getAllRegisteredEventsByUserId,
    getProfile,
    updateProfile,
    registerEvent,
    signup,
    login,
    getUserRegistrationStatus,
    getAllApprovedRegisteredEventsByUserId,
    forgotPassword,
    resetPassword
}