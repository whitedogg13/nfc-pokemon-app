import NfcManager from 'react-native-nfc-manager';
import * as HexUtils from '../HexUtils';
import * as Signer from '../Signer';

async function verifySignature(pokemonBytes) {
  const tag = await NfcManager.getTag();
  const msgHex = HexUtils.bytesToHex(pokemonBytes) + tag.id;
  console.warn('msg', msgHex);

  const sigPageIdx = 12;
  let sigBytes = [];
  let pageData = [];
  pageData = await NfcManager.nfcAHandler.transceive([0x30, sigPageIdx]);
  sigBytes = [...sigBytes, ...pageData];
  pageData = await NfcManager.nfcAHandler.transceive([0x30, sigPageIdx + 4]);
  sigBytes = [...sigBytes, ...pageData];
  pageData = await NfcManager.nfcAHandler.transceive([0x30, sigPageIdx + 8]);
  sigBytes = [...sigBytes, ...pageData];
  pageData = await NfcManager.nfcAHandler.transceive([0x30, sigPageIdx + 12]);
  sigBytes = [...sigBytes, ...pageData];

  const sigHex = HexUtils.bytesToHex(sigBytes);
  console.warn('sig', sigHex);
  const result = Signer.verify(msgHex, {
    r: sigHex.slice(0, 64),
    s: sigHex.slice(64, 128),
  });
  return result;
}

export default verifySignature;
