import e from 'express';
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);

    const gameRooms = new Map();

    let games = [];

    io.on('connection', (socket) => {
        let cells = [
            { id: "cell-1", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-2", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-3", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-4", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-5", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-6", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-7", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-8", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-9", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-10", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-11", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-12", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-13", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-14", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-15", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-16", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-17", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-18", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-19", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-20", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-21", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-22", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-23", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-24", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-25", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-26", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-27", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-28", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-29", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-30", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-31", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-32", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-33", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-34", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-35", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-36", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-37", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-38", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id:"cell-39", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-40", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-41", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-42", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-43", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-44", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-45", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-46", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-47", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-48", inPlay: false, cellBelowInPlay: false, belongsTo: null },
            { id: "cell-49", inPlay: false, cellBelowInPlay: false, belongsTo: null }
          ];

        //on new-game, emit game pin

        function generateRandom4DigitCombo() {
            let combo = '';
            for (let i = 0; i < 4; i++) {
              const randomDigit = Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
              combo += randomDigit;
            }
            return combo;
          }

          socket.on('request-join-game', (gamePin) => {
            // Check if the room exists before joining
            if (io.sockets.adapter.rooms.has(gamePin)) {
                socket.join(gamePin);
                // Emit a message to acknowledge the successful join
                socket.emit('joined-game', gamePin);
                console.log(`Socket ${socket.id} joined room ${gamePin}`);
            } else {
                // Emit an error message if the room does not exist
                socket.emit('game-not-found', gamePin);
                console.log('not found')
            }
        });

        socket.on('request-new-game', ()=>{
            const gamePin = generateRandom4DigitCombo();
            socket.join(gamePin);

        })

        socket.on('join-game', (gamePin) => {
            socket.join(gamePin);
            const users = io.sockets.adapter.rooms.get(gamePin);

            if (users && users.size === 2) {
                io.to(gamePin).emit('start-game');

                games.push({pin: gamePin, turn: 1});

                const usersSet = io.sockets.adapter.rooms.get(gamePin);
                let usersArray = Array.from(usersSet);
                usersArray.sort((a, b) => {
                    return a.id - b.id;
                });
                usersArray = [{Player1: `${usersArray[0]}`}, {Player2: `${usersArray[1]}`}];

                const randomNumber = Math.random();
                const result = randomNumber < 0.5 ? 1 : 2;

                io.to(socket.id).emit('your-turn');
            }
        });


        io.on('next-turn', (gamePin) => {
            const usersSet = io.sockets.adapter.rooms.get(gamePin);
            let usersArray = Array.from(usersSet);
            usersArray.sort((a, b) => {
                return a.id - b.id;
            });
            usersArray = [{Player1: `${usersArray[0]}`}, {Player2: `${usersArray[1]}`}];

            console.log(games.find((item) => item.pin === gamePin).turn)

            io.to(usersArray[result]).emit('your-turn');
        })

        socket.on('move', (cellId, gamePin) => {
          const usersSet = io.sockets.adapter.rooms.get(gamePin);
          console.log(usersSet);
          let usersArray = Array.from(usersSet);
          usersArray.sort((a, b) => {
              return a.id - b.id;
          });

          usersArray = [{Player1: `${usersArray[0]}`}, {Player2: `${usersArray[1]}`}];

          console.log(usersArray)

          if (usersArray[0].Player1 === socket.id) {
              cells[cellId].belongsTo = 'Player1';
          }else{
              cells[cellId].belongsTo = 'Player2';
          }

          const condition = (element) => {
            return element !== socket.id;
          };

          const otherSocketId = Array.from(usersSet).filter(condition);

          console.log(otherSocketId);
        
          io.to(otherSocketId).emit('your-turn');

          socket.to(gamePin).emit('move', cellId);
        });

        io.of("/").adapter.on("create-room", (room) => {
            console.log(`room ${room} was created`);
          });
          
          io.of("/").adapter.on("join-room", (room, id) => {
            console.log(`socket ${id} has joined room ${room}`);
          });
    });

    console.log('SocketIO injected');
}