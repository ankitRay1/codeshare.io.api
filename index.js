const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorMiddleWare = require('./middlewares/error')
const http = require('http');
const socket = require('socket.io');
const documentModel = require('./models/document.model');
require('dotenv').config()
const app = express();
var server = http.createServer(app);


const routes = require('./routes/routes');
var io = socket(server);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use("/api", routes);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDb Connected!')).catch((error) => console.log(error));


io.on("connection", (socket) => {
    console.log('client is connected to socked id :', socket.id);

    socket.on("join", (documentId) => {
        console.log(`Document id is ${documentId}`);
        socket.join(documentId);
    });
    socket.on('disconnect', (documentId) => {

        console.log('client disconnect...on ', documentId, 'and', socket.id)

    });



    socket.on("typing", (data) => {
        socket.broadcast.to(data.room).emit("changes", data);
    });

    socket.on("save", (data) => {

        saveData(data);
    });
});

const saveData = async (data) => {
    try {
        let document = await documentModel.findOne({ databaseId: data.room });

        if (document) {
            document.content = data.delta;
            document = await document.save();
        }

    } catch (error) {
        console.log(error);
    }
};

//middleware
app.use(errorMiddleWare.errorHandler);


server.listen(PORT, '0.0.0.0', () => console.log(`Server is running on ${PORT}`));