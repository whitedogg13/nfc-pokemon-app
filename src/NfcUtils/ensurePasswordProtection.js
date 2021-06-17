/* eslint-disable no-bitwise */
import NfcManager from 'react-native-nfc-manager';

const password = [0x12, 0x34, 0xab, 0xcd];
const pack = [0xaa, 0xbb];

async function ensurePasswordProtection() {
  let respBytes = null;
  let writeRespBytes = null;
  let authPageIdx;

  // check if this is NTAG 213 or NTAG 215
  respBytes = await NfcManager.nfcAHandler.transceive([0x30, 0]);
  const cc2 = respBytes[14];
  if (cc2 * 8 > 256) {
    authPageIdx = 131; // NTAG 215
  } else {
    authPageIdx = 41; // NTAG 213
  }

  // check if AUTH is enabled
  respBytes = await NfcManager.nfcAHandler.transceive([0x30, authPageIdx]);
  const auth = respBytes[3];

  if (auth === 255) {
    // configure the tag to support password protection
    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      authPageIdx + 3,
      ...pack,
      respBytes[14],
      respBytes[15],
    ]);
    console.warn(writeRespBytes);

    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      authPageIdx + 2,
      ...password,
    ]);
    console.warn(writeRespBytes);

    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      authPageIdx + 1,
      respBytes[4] & 0x7f,
      respBytes[5],
      respBytes[6],
      respBytes[7],
    ]);
    console.warn(writeRespBytes);

    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      authPageIdx,
      respBytes[0],
      respBytes[1],
      respBytes[2],
      4,
    ]);
    console.warn(writeRespBytes);
  } else {
    // send password to NFC tags, so we can perform write operations
    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0x1b,
      ...password,
    ]);
    console.warn(writeRespBytes);
    if (writeRespBytes[0] !== pack[0] || writeRespBytes[1] !== pack[1]) {
      throw new Error('incorrect password');
    }
  }
}

export default ensurePasswordProtection;
