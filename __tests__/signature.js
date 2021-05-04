import * as HexUtils from '../src/HexUtils';
import * as Signer from '../src/Signer';

test('signature', async () => {
  const msgHex = HexUtils.bytesToHex([0x12, 0x34, 0xab, 0xcd]);
  const signature = Signer.sign(msgHex);
  console.log(signature);
  expect(Signer.verify(msgHex, signature)).toBe(true);
});
