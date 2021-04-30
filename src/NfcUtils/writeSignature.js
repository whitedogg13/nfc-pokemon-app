import NfcManager from 'react-native-nfc-manager';
// import * as secp from 'noble-secp256k1';
import * as HexUtils from '../HexUtils';

async function writeSignature(pokemonBytes) {
  const tag = await NfcManager.getTag();
  console.warn(tag);
  const msgHex = HexUtils.bytesToHex([
    ...pokemonBytes,
    ...HexUtils.hexToBytes(tag.id),
  ]);
  console.warn('msg', msgHex);

  // const privateKey = HexUtils.strToHex('react-native-nfc-manager');
  // const signature = await secp.sign(msgHex, privateKey); // 142 chars, 71 bytes, need 18 pages
  // console.warn('sig', signature);
}

export default writeSignature;
