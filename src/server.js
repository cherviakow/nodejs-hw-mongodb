import express from "express";

const setupServer = express();
const PORT = 3000;

setupServer.get('/', (req, res) =>{
    res.send('Not found');
});

setupServer.listen(PORT, () =>{
    `Server  running on port {PORT}`;

});


