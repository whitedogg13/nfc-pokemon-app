import * as HexUtils from '../src/HexUtils';

test('hex utils', async () => {
  const hex1 = HexUtils.strToHex('abcd');
  const hex2 = HexUtils.bytesToHex([97, 98, 99, 100]);
  const bytes = HexUtils.hexToBytes('1234abcd');
  expect(hex1.length).toEqual(64);
  expect(hex1).toEqual(hex2);
  expect(bytes).toEqual([0x12, 0x34, 0xab, 0xcd]);
});
