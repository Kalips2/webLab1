const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', // ваші довірені джерела
        methods: ['GET', 'POST'], // дозволені методи
        credentials: true, // дозволяє передавати кредити в разі необхідності
    },
});

let isDragging = false;
let index = null;
let input = true;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('dragStart', (indexOfDragged) => {
        console.log("Receive - ", indexOfDragged)
        isDragging = true;
        index = indexOfDragged;
        io.emit('dragStart', indexOfDragged);
    });

    socket.on('dragEnd', (indexOfDragged) => {
        isDragging = false;
        index = indexOfDragged;
        io.emit('dragEnd', indexOfDragged);
    });

    socket.on('inputStarted', () => {
        input = true;
        io.emit('dragStart');
    });

    socket.on('inputEnded', () => {
        input = false;
        io.emit('dragEnd');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
