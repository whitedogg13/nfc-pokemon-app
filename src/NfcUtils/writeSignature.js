import NfcManager from 'react-native-nfc-manager';
import * as HexUtils from '../HexUtils';
import * as Signer from '../Signer';

async function writeSignature(pokemonBytes) {
  const tag = await NfcManager.getTag();
  const msgHex = HexUtils.bytesToHex(pokemonBytes) + tag.id;
  console.warn('msg', msgHex);

  const sig = Signer.sign(msgHex);
  console.warn('sig', sig);
  const sigBytes = HexUtils.hexToBytes(sig.r + sig.s); // 64 bytes

  const sigPageIdx = 12;
  for (let i = 0; i < sigBytes.length; i += 4) {
    const pageIdx = sigPageIdx + i / 4;
    const pageData = sigBytes.slice(i, i + 4);
    const respBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      pageIdx,
      ...pageData,
    ]);
    console.warn(`page ${pageIdx}`, pageData, respBytes);
  }
}

export default writeSignature;
