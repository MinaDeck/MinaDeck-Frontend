// Importing the 'bs58' library for base58 encoding and decoding
import bs58 from 'bs58';

// Constant representing the character map for base58 encoding
const BASE58_CHAR_MAP = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Function to encode a string using base58
export const encodeBs58 = (str) => {
  // Convert the string to base58
  const base58str = stringToBase58(str);
  // Convert the base58 string to an integer
  const int = base58ToInt(base58str);
  return int;
};

// Function to decode an integer using base58
export const decodeBs58 = (int) => {
  // Convert the integer to a base58 string
  const bs58str = intToBase58(BigInt(int));
  // Convert the base58 string to a regular string
  const str = base58ToString(bs58str);
  return str;
};

// Function to convert an integer to a base58 string
function intToBase58(int) {
  let base58 = '';
  // Iterate until the integer is greater than zero
  while (int > 0n) {
    // Calculate the remainder when dividing by 58
    const remainder = Number(int % 58n);
    // Append the corresponding character to the base58 string
    base58 = BASE58_CHAR_MAP[remainder] + base58;
    // Update the integer by dividing by 58
    int = int / 58n;
  }
  return base58;
}

// Function to convert a base58 string to an integer
function base58ToInt(base58) {
  return base58
    // Convert the string to an array of characters, reverse it
    .split('')
    .reverse()
    // Calculate the integer value using the base58 character map
    .reduce((value, char, index) => value + BigInt(BASE58_CHAR_MAP.indexOf(char)) * 58n ** BigInt(index), BigInt(0))
    .toString();
}

// Function to convert a base58 string to a regular string
function base58ToString(base58) {
  // Decode the base58 string to bytes and then decode the bytes to a string
  const bytes = bs58.decode(base58);
  return new TextDecoder().decode(bytes);
}

// Function to convert a string to base58
function stringToBase58(str) {
  // Encode the string to bytes and then encode the bytes to base58
  const bytes = new TextEncoder().encode(str);
  return bs58.encode(bytes);
}

// Function to format a numeric value as a dollar amount
export const formatDollar = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    // If the value is not numeric, return the original value
    return value;
  } else {
    // If the value is numeric, format it as a dollar amount
    return Intl.NumberFormat('en-US', {
      notation: 'standard',
    }).format(numericValue);
  }
};

// Constant representing the separator for options
export const optionSeparator = -&&&&&-;

// Function to display a truncated version of an address
export function displayAddress(address = '') {
  return address?.slice(0, 4) + '...' + address?.slice(-8);
}
