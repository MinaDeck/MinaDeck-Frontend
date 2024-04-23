// Define an asynchronous function for fetching data via WebSocket

export default async function webSocketFetcher() {
    // WebSocket endpoint URL
    const webSocketUrl = 'wss://42.43.54.33/poker';

    // Create a WebSocket connection
    const webSocket = new WebSocket(webSocketUrl);

    // Define a promise to handle the WebSocket connection
    const webSocketPromise = new Promise((resolve, reject) => {
        // Event handler for successful WebSocket connection
        webSocket.onopen = () => {
            console.log('WebSocket connection established.');
            resolve(webSocket);
        };

        // Event handler for WebSocket errors
        webSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            reject(error);
        };
    });

    try {
        // Wait for the WebSocket connection to be established
        const socket = await webSocketPromise;

        // Event handler for receiving messages from the WebSocket server
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received data from WebSocket:', data);

            // Process the received data as needed
        };

        // Event handler for WebSocket closure
        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);

            // Handle WebSocket closure, such as attempting to reconnect
        };

    } catch (error) {
        // Handle any errors that occurred during WebSocket setup
        console.error('Error setting up WebSocket:', error);
    }
}