import bs58 from 'bs58'

const CHAR_MAP =
  '123456789' + 'ABCDEFGHJKLMNPQRSTUVWXYZ' + 'abcdefghijkmnopqrstuvwxyz'

export const encodeBs58 = (str) => {
  const base58str = stringToBase58(str)
  const int = base58ToInt(base58str)
  return int
}
export const decodeBs58 = (int) => {
  const bs58str = intToBase58(BigInt(int))
  const str = base58ToString(bs58str)
  return str
}

function intToBase58(int) {
  let base58 = ''
  while (int > 0n) {
    const remainder = Number(int % 58n)
    base58 = CHAR_MAP[remainder] + base58
    int = int / 58n
  }
  return base58
}

function base58ToInt(base58) {
  return base58
    .split('')
    .reverse()
    .reduce(
      (v, a, i) => v + BigInt(CHAR_MAP.indexOf(a)) * 58n ** BigInt(i),
      BigInt(0)
    )
    .toString()
}

function base58ToString(base58) {
  const bytes = bs58.decode(base58)
  return new TextDecoder().decode(bytes)
}

function stringToBase58(str) {
  const bytes = new TextEncoder().encode(str)
  return bs58.encode(bytes)
}


export const formatDollar = (value) => {
  const v = Number(value)
  if (Number.isNaN(v)) {
    return value
  } else {
    return Intl.NumberFormat('en-US', {
      notation: 'standard',
    }).format(v)
  }
}

export const optionSeparator = `-&&&&&-`

export function displayAddress(address = '') {
  return address?.slice(0,4) + '...' + address?.slice(-8)
}