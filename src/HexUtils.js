/* eslint-disable no-bitwise */

function strToHex(src) {
  if (src.length > 64) {
    throw new Error('src must less than 64');
  }

  let result = '';
  for (const c of src) {
    const code = c.charCodeAt(0);
    result += ('00' + code.toString(16)).slice(-2);
  }

  let padding = 64 - result.length;
  while (padding > 0) {
    result += '0';
    padding -= 1;
  }

  return result;
}

function bytesToHex(src) {
  if (src.length > 32) {
    throw new Error('src must less than 32');
  }

  let result = '';
  for (const b of src) {
    result += ('00' + b.toString(16)).slice(-2);
  }

  let padding = 64 - result.length;
  while (padding > 0) {
    result += '0';
    padding -= 1;
  }

  return result;
}

function hexToBytes(hex) {
  if (hex.length % 2 !== 0) {
    throw new Error('hex string should have even length');
  }

  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    const b = parseInt(hex.slice(i, i + 2), 16);
    bytes.push(b);
  }

  return bytes;
}

export {strToHex, bytesToHex, hexToBytes};
