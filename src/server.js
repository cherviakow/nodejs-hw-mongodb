import express from "express";
import { Contact } from "./models/contact.js";
import cors from 'cors';
import pino from 'pino-http';

export async function setupServer() {

    const app = express();
    const PORT = 3000;

    app.use(cors());
    app.use(pino({transport: {target: 'pino-pretty'}}));

app.get('/contacts', async (req, res) => {

    try{
       const contacts = await Contact.find();
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
        const contactsId = await Contact.findById(contactId);
        if (contactId === null) {
            return res.status(404).send('Contact not found');
        }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contactsId,
    });
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }

});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Not found'
    });
});
};
