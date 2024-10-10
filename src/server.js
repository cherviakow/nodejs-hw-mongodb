import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/.env.js';
import dotenv from "dotenv";
import { getAllContacts, getContactById } from "./serviceContacts/contacts.js";
dotenv.config();



export async function setupServer() {

    const app = express();
    const PORT = Number(env('PORT', '3000'));
    app.use(express.json());

    app.use(cors());
    app.use(pino({transport: {target: 'pino-pretty'}}));

app.get('/contacts', async (req, res) => {

    try{
       const contacts = await getAllContacts();
       res.status(200).json({
        status: 200,
        message: 'Found all contacts',
        data: contacts,
       });
    } catch (error){
        res.status(500).send(error);
    }
});

app.get('/contacts/:contactId', async (req, res) => {
    const {contactId} = req.params;

    try{
        const contact = await getContactById(contactId);
        if (!contact) {
            return res.status(404).json({message: 'Contact not found'});
        }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
    });
    } catch(error) {
        res.status(500).json({
            message:'Server error',
        error: error.message,
    });
    }

});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found!'
    });
});
};
