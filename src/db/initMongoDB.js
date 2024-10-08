import mongoose from "mongoose";

const DB_URI = `mongodb+srv://cherviakov:0994168899@myclaster.fb4mn.mongodb.net/contacts?retryWrites=true&w=majority&appName=MyClaster`;


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


