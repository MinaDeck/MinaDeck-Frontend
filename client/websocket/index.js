const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Create a map to store data for each gameId
const dataMap = new Map();

wss.on('connection', function connection(ws, req) {
  const gameId = new URLSearchParams(req.url.split('?')[1]).get('gameId');
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', gameId);

    // Parse the message
    const newData = JSON.parse(message);
    console.log(newData)

    let gameData = dataMap.get(gameId) || [];

    if (newData.state == undefined) {
      // Check if gameData already contains an object with a 'user' key
      const existingUserData = gameData.find(obj => obj.hasOwnProperty('user'));

      if (existingUserData) {
        // Append the new data to the 'user' array
        const existingUser = existingUserData.user.find(user => user.userId === newData.user[0].userId);

        if (!existingUser) {
          // If the new user data doesn't exist, append it to the 'user' array
          existingUserData.user.push(...newData.user);
        }
      } else {
        // Insert the complete object into gameData
        gameData.push(newData);
      }

      // Store the updated data array back in the map
      dataMap.set(gameId, gameData);
    }
    console.log(JSON.stringify(gameData))
    if (gameData) {
      ws.send(JSON.stringify(gameData));
    } else {
      ws.send(JSON.stringify({ state: 'error', message: 'Data not found' }));
    }
  });


  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running at ws://localhost:8080/');
