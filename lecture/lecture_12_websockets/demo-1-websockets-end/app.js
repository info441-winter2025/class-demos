import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

let socketCounter = 1;
let allSockets = [];

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})
app.ws('/chatSocket', (ws, res) => {
    console.log('chatsocket', ws);
    let mySocketNum = socketCounter;
    socketCounter++;
    console.log("user " + mySocketNum + " connected")

    //add to global array
    allSockets.push(ws)

    ws.on('message', chat => {
        console.log("msg user "+ mySocketNum + chat)
        // TODO: send to all
        allSockets.forEach(socket => {
            socket.send(mySocketNum + ": " + chat)
        })
    })

    ws.on('close', () => {
        console.log("user " + mySocketNum + "disconnected")
        // TODO probably should disconnect, delete from array, etc.
    })
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})