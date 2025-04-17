"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    console.log("user connected #" + userCount);
    userCount = userCount + 1;
    socket.on("message", (message) => {
        console.log("message received :" + message.toString());
        // setTimeout(() => {
        //     socket.send(message.toString() + ": Sent from server");
        // },1000);
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s.send(message.toString() + ": Sent from server");
        }
    });
});
