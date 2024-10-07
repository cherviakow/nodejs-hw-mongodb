import express from "express";


const setupServer = express();
const PORT = 3000;

setupServer.get('/', (req, res) =>{
    res.send('Not found');
});

setupServer.get('/contacts', (req, res) =>{


    res.send('dsd');
});

setupServer.listen(PORT, () =>{
    `Server is running on port {PORT}`;

});

