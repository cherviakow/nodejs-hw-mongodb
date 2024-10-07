import mongoose from "mongoose";
import pino from "pino";

// const DB_URI = `mongodb+srv://cherviakov:0994168899@myclaster.fb4mn.mongodb.net/?retryWrites=true&w=majority&appName=MyClaster`;

export const initMongoConnection = async () => {


const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB} = process.env;

   try{


        // const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=MyClaster`;
        const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

        await mongoose.connect(uri);
        pino.info('Mongo connection successfully');
    } catch(error){
        pino.error(console.log(error));
        process.exit(1);

    }
};


