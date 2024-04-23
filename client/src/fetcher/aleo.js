// Exporting an asynchronous function named aleoFetcher
export default async function aleoFetcher(featureName, ...params) {
  // Checking if the featureName is 'walletConnected'
  if (featureName === 'walletConnected') {
    // If true, return the connection status of the wallet
    return globalThis.wallet.connected
  }
  // Checking if the featureName is 'walletAccount'
  if (featureName === 'walletAccount') {
    // If true, return the accounts of the wallet
    return globalThis.wallet.accounts
  }

  // If the featureName is neither 'walletConnected' nor 'walletAccount', 
  // return the result of the corresponding feature of the wallet
  return await globalThis.wallet?.features?.[`standard:${featureName}`]?.[featureName]?.(...params)
}
