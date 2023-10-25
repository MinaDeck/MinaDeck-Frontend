export default async function aleoFetcher(featureName, ...params) {
  if(featureName === 'walletConnected') {
    return globalThis.wallet.connected
  }
  if(featureName === 'walletAccount') {
    return globalThis.wallet.accounts
  }

  return await globalThis.wallet?.features?.[`standard:${featureName}`]?.[featureName]?.(...params)
}