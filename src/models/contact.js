import mongoose from "mongoose";

const contactShema = new mongoose.Schema(
    {
        name: {
            type: String,
            requaired: true
        },
        phoneNumber: {
            type: Number,
            requaired: true
        },
        email: {
            type: String
        },
        isFavourite: {
            type: Boolean,
            default: false
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            default: 'personal',
            requaired: true,
         },
        },
        {timestamps: true},
);

const Contact = mongoose.model('Contact', contactShema);

export {Contact};
