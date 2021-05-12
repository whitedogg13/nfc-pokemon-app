import * as HexUtils from '../src/Utils/HexUtils';

test('hex utils', async () => {
  const hex1 = HexUtils.strToHex('abcd');
  const hex2 = HexUtils.bytesToHex([97, 98, 99, 100]);
  expect(hex1).toEqual(hex2);

  const bytes1 = HexUtils.hexToBytes('1234abcd');
  expect(bytes1).toEqual([0x12, 0x34, 0xab, 0xcd]);

  const bytes2 = HexUtils.strToBytes('abcd');
  expect(bytes2).toEqual([97, 98, 99, 100]);
});
