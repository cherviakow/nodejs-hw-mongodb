import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoDB.js";

const startApp = async () => {

    try {
        await initMongoConnection();

        setupServer();
        console.log('Mongo is running');
    }catch (error){
        console.log(error);
    }
};

startApp();




