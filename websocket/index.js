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
    const data = JSON.parse(message);
    console.log(data)

    const gameData = dataMap.get(gameId) || [];

    // Add the new data to the array
    if (data.state == undefined) {
      gameData.push(data);

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
