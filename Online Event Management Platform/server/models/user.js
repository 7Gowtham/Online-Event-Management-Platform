import { validateEmail } from "../common/validations.js";
import { mongoose } from "./index.js";

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:[true, "User Id is required"]
    },
    name:{
        type: String,
        required:[true, 'Name is required']
    },
    email:{
        type: String,
        validate:{
            validator: validateEmail,
            message:props => `${props} is not a valid Email`
        }
    },
    password:{
        type: String,
        required:[true, "Password is required"]
    },
    role:{
        type: String,
        enum:{
            values:["Admin", "User"],
            message:`{VALUE} is not supported`
        },
        default: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    registeredEvents: [
        {
            eventId: { type: String, required: true },
            registrationId: { type: String, required: true },
            status:{
                type: String,
                enum:{
                    values:["Pending", "Approved", "Rejected"],
                    message:`{VALUE} is not supported`
                },
                default: 'Pending'
            },
        }
    ],
    status:{
        type: Boolean,
        default: false
    }
})

const userModel = new mongoose.model('users', userSchema)

export default userModel