import mongoose from "mongoose";
import crypto from 'crypto'

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isSubscribed: {
        type: Boolean,
        default: true
    },
    unsubscribeToken: {
        type: String,
        required: true
    }
}, { timestamps: true })

subscriberSchema.statics.generateToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;