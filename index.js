const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorMiddleWare = require("./middlewares/error");
const http = require("http");
const socket = require("socket.io");
const documentModel = require("./models/document.model");
require("dotenv").config();
const app = express();
var server = http.createServer(app);

const routes = require("./routes/routes");
var io = socket(server);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
var d = new Date();
console.log(d.toLocaleTimeString());

app.use("/api", routes);

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb Connected!"))
    .catch((error) => console.log(error));

io.on("connection", (socket) => {
    console.log("client is connected to socked id :", socket.id);

    socket.on("join", (documentId) => {
        console.log(`Document id is ${documentId}`);
        socket.join(documentId);
    });
    socket.on("disconnect", (documentId) => {
        console.log("client disconnect...on ", documentId, "and", socket.id);
    });

    socket.on("typing", (data) => {
        socket.broadcast.to(data.room).emit("changes", data);
    });

    socket.on("save", (data) => {
        // console.log(data);

        saveData(data);
    });
});

const saveData = async (data) => {
    try {
        // console.log('I am databaes room ' + data.room);
        let document = await documentModel.findOne({ documentId: data.room });

        document.content = data.delta;
        document.updatedAt = Date.now();
        document = await document.save();

        // console.log('I am doc content' + document.content);
    } catch (error) {
        console.log(error);
    }
};

//middleware
app.use(errorMiddleWare.errorHandler);

server.listen(PORT, "0.0.0.0", () =>
    console.log(`Server is running on ${PORT}`)
);
