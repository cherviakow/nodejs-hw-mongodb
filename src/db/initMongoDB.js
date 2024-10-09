import mongoose from "mongoose";

const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;

const DB_URI = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=MyClaster`;


// const DB_URI = `mongodb+srv://cherviakov:0994168899@myclaster.fb4mn.mongodb.net/contacts?retryWrites=true&w=majority&appName=MyClaster`;

async function initMongoConnection () {

    try{
        await mongoose.connect(DB_URI);

        console.log('Connection successfully');

    } catch(error){
        console.error(error);
        throw error;
    }
};

export {initMongoConnection};


