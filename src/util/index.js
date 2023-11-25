// Importing the 'bs58' library for base58 encoding and decoding
import bs58 from 'bs58';

// Character map for base58 encoding, excluding characters that might look similar
const BASE58_CHAR_MAP = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Function to encode a string using base58
export const encodeBs58 = (str) => {
  // First convert the string to base58
  const base58str = stringToBase58(str);
  // Then convert the base58 string to an integer
  const int = base58ToInt(base58str);
  return int;
};

// Function to decode an integer using base58
export const decodeBs58 = (int) => {
  // Convert the integer back to a base58 string
  const bs58str = intToBase58(BigInt(int));
  // Convert the base58 string back to the original string
  const str = base58ToString(bs58str);
  return str;
};

// Function to convert an integer to a base58 string
function intToBase58(int) {
  let base58 = '';
  // Iterating over the integer value to construct a base58 string
  while (int > 0n) {
    // Calculate remainder when dividing by 58
    const remainder = Number(int % 58n);
    // Append corresponding character to base58 string from the character map
    base58 = BASE58_CHAR_MAP[remainder] + base58;
    // Divide integer by 58 for next iteration
    int = int / 58n;
  }
  return base58;
}

// Function to convert a base58 string to an integer
function base58ToInt(base58) {
  return base58
    .split('')
    .reverse() // Reversing the string for correct calculation
    // Reduce the array to calculate the integer value from base58
    .reduce((value, char, index) => value + BigInt(BASE58_CHAR_MAP.indexOf(char)) * 58n ** BigInt(index), BigInt(0))
    .toString();
}

// Function to convert a base58 string to a regular string
function base58ToString(base58) {
  // Decode base58 string into bytes and then convert bytes to a string
  const bytes = bs58.decode(base58);
  return new TextDecoder().decode(bytes);
}

// Function to convert a string to base58
function stringToBase58(str) {
  // Convert string into bytes and then encode bytes into base58
  const bytes = new TextEncoder().encode(str);
  return bs58.encode(bytes);
}

// Function to format a numeric value as a dollar amount
export const formatDollar = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    // Return original value if it's not a numeric value
    return value;
  } else {
    // Format the numeric value as a dollar amount
    return Intl.NumberFormat('en-US', {
      notation: 'standard',
    }).format(numericValue);
  }
};

// Constant representing the separator for options
export const optionSeparator = "-&&&&&-";



// Function to display a truncated version of an address
export function displayAddress(address = '') {
  // Truncate and format the address for display
  return address?.slice(0, 4) + '...' + address?.slice(-8);
}
