import * as HexUtils from './HexUtils';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const privateKeyBytes = HexUtils.strToBytes('react-native-nfc-manager');
const keyPair = ec.keyFromPrivate(privateKeyBytes);
const publicKey = ec.keyFromPublic(keyPair.getPublic('array'), 'array');

function sign(msgHex) {
  const signature = keyPair.sign(msgHex);
  return {
    r: signature.r.toString(16),
    s: signature.s.toString(16),
  };
}

function verify(msgHex, signature) {
  return publicKey.verify(msgHex, signature);
}

export {sign, verify};
