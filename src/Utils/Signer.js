import * as HexUtils from './HexUtils';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const privateKeyBytes = HexUtils.strToBytes('react-native-nfc-manager');
const keyPair = ec.keyFromPrivate(privateKeyBytes);
const publicKey = ec.keyFromPublic(keyPair.getPublic('array'), 'array');

function sign(msgHex) {
  const signature = keyPair.sign(msgHex);
  return {
    r: HexUtils.bytesToHex(signature.r.toArray()),
    s: HexUtils.bytesToHex(signature.s.toArray()),
  };
}

function verify(msgHex, signature) {
  return publicKey.verify(msgHex, signature);
}

export {sign, verify};
