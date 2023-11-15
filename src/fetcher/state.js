// Define a global object to hold the state of the game
const memoryData = {
  players: [],
  chips: [],
  tabledChips: [],
  gameRoom: {},
  gameUsers: [],
  gamePlayerCard: [],
  gamePlayersCard: {},
  roundResult: {},
  gameResult: {},
  gameCurrentBetChips: 0,
  gameMessages: [],
 }
 globalThis.$DATA$ = memoryData
 
 // Define a function to fetch state data
 export default async function stateFetcher(key, data) {
  // If no key is provided, return null
  if(!key) return null
 
  // Split the key into type and realKey
  const [ type, realKey ] = key?.split?.(':')
 
  // If the type is 'local', update or return the value in memoryData
  if(type === 'local') {
    if(data !== undefined) {
      memoryData[realKey] = data
    }
    return memoryData[realKey]
  }
 
  // If the type is 'http' or 'https', fetch data from the provided URL
  else if(type === 'http' || type === 'https') {
    // If data is provided, send a POST request with the data
    if(data !== undefined) {
      const payload = await (await fetch(key, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      })).json()
      return payload
    }
    // If no data is provided, send a GET request
    else {
      const payload = await (await fetch(key, {
        method: 'GET',
        credentials: 'include',
      })).json()
      return payload
    }
  }
 
  // If the type is neither 'local' nor 'http' or 'https', return null
  return null
 }
 