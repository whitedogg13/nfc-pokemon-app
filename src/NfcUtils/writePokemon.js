/* eslint-disable no-bitwise */
import NfcManager from 'react-native-nfc-manager';

async function writePokemon(pokemon) {
  let pageData;
  let respBytes = [];
  let allBytes = [];

  // Page 4 (start from 0)
  // - 0, 1: serial number
  // - 3: basic type
  // - 4: special type
  pageData = [0, 0, 0, 0];
  pageData[0] = pokemon.no >>> 8;
  pageData[1] = pokemon.no & 0xff;
  pageData[2] = pokemon.type[0];
  pageData[3] = pokemon.type[1] || 0;
  respBytes = await NfcManager.nfcAHandler.transceive([0xa2, 4, ...pageData]);
  console.warn('page 4', pageData, respBytes);
  allBytes = [...allBytes, ...pageData];

  // Page 5
  // - 0: hp
  // - 1: atk
  // - 2: def
  // - 3: 0
  pageData = [0, 0, 0, 0];
  pageData[0] = pokemon.hp;
  pageData[1] = pokemon.atk;
  pageData[2] = pokemon.def;
  respBytes = await NfcManager.nfcAHandler.transceive([0xa2, 5, ...pageData]);
  console.warn('page 5', pageData, respBytes);
  allBytes = [...allBytes, ...pageData];

  // Page 6
  // - 0: satk
  // - 1: sdef
  // - 2: spd
  // - 3: 0
  pageData = [0, 0, 0, 0];
  pageData[0] = pokemon.satk;
  pageData[1] = pokemon.sdef;
  pageData[2] = pokemon.spd;
  respBytes = await NfcManager.nfcAHandler.transceive([0xa2, 6, ...pageData]);
  console.warn('page 6', pageData, respBytes);
  allBytes = [...allBytes, ...pageData];

  // Page 7 ~ N: the name of the pokemon
  let nameBytes = Array.from(pokemon.name).map((_, i) =>
    pokemon.name.charCodeAt(i),
  );

  while (nameBytes.length < 20) {
    nameBytes.push(0);
  }

  const namePageIdx = 7;
  for (let i = 0; i < 5; i++) {
    pageData = nameBytes.slice(4 * i, 4 * i + 4);
    respBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      namePageIdx + i,
      ...pageData,
    ]);
    console.warn(`page ${namePageIdx + i}`, pageData, respBytes);
  }
  allBytes = [...allBytes, ...nameBytes];

  return allBytes;
}

export default writePokemon;
