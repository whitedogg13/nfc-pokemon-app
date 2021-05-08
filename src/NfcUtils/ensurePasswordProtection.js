import NfcManager from 'react-native-nfc-manager';

const password = [0x12, 0x34, 0xab, 0xcd];
const pack = [0xaa, 0xbb];

async function ensurePasswordProtection() {
  // read cc to check memory size, so we know it's 213 or 215
  // check 0x83 to see if auth is set
  // if set, do auth command with our password
  // else, do:
  //  1. config start page to protect
  //  2. config to protect "WRITE"
  //  3. set password
  //  4. set pack
  //  in reverse order
  let respBytes = null;
  let writeRespBytes = null;

  respBytes = await NfcManager.nfcAHandler.transceive([0x30, 0]);
  const cc2 = respBytes[14];
  console.warn('tagSize', cc2 * 8);
  // TODO: check if it's NTAG 215 by tagSize

  // check if AUTH0 is enabled
  respBytes = await NfcManager.nfcAHandler.transceive([0x30, 41]);
  const auth0 = respBytes[3];
  console.warn('auth0', auth0);

  if (auth0 === 255) {
    // write password
    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      43,
      ...password,
    ]);
    console.warn(writeRespBytes);

    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      44,
      ...pack,
      respBytes[14],
      respBytes[15],
    ]);
    console.warn(writeRespBytes);

    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      41,
      respBytes[0],
      respBytes[1],
      respBytes[2],
      43,
    ]);
    console.warn(writeRespBytes);
  } else {
    writeRespBytes = await NfcManager.nfcAHandler.transceive([
      0x1b,
      ...password,
    ]);
    console.warn(writeRespBytes);
  }
}

export default ensurePasswordProtection;
