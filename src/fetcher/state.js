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

export default async function stateFetcher(key, data) {
  if(!key) return null
  const [ type, realKey ] = key?.split?.(':')
  if(type === 'local') {
    if(data !== undefined) {
      memoryData[realKey] = data
    }
    return memoryData[realKey]
  } else if(type === 'http' || type === 'https') {
    if(data !== undefined) {
      const payload = await (await fetch(key, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      })).json()
      return payload
    } else {
      const payload = await (await fetch(key, {
        method: 'GET',
        credentials: 'include',
      })).json()
      return payload
    }
  }
  return null
}