function strToHex(src) {
  let result = '';
  for (let i = 0; i < src.length; i++) {
    const code = src.charCodeAt(i);
    result += ('00' + code.toString(16)).slice(-2);
  }
  return result;
}

function strToBytes(src) {
  let result = [];
  for (let i = 0; i < src.length; i++) {
    result.push(src.charCodeAt(i));
  }
  return result;
}

function bytesToHex(src) {
  let result = '';
  for (const b of src) {
    result += ('00' + b.toString(16)).slice(-2);
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

export {strToHex, strToBytes, bytesToHex, hexToBytes};
