import * as HexUtils from '../src/HexUtils';
import * as secp from 'noble-secp256k1';

test('signature', async () => {
  const messageHash = HexUtils.bytesToHex([0x12, 0x34, 0xab, 0xcd]);
  const privateKey = HexUtils.strToHex('react-native-nfc-manager');
  const publicKey = secp.getPublicKey(privateKey, true); // 66 chars, 33 bytes, need 9 pages
  const signature = await secp.sign(messageHash, privateKey); // 142 chars, 71 bytes, need 18 pages
  expect(secp.verify(signature, messageHash, publicKey)).toBe(true);

  const fakePrivateKey = HexUtils.strToHex('wrong-key');
  const fakeSignature = await secp.sign(messageHash, fakePrivateKey);
  expect(secp.verify(fakeSignature, messageHash, publicKey)).toBe(false);
});
