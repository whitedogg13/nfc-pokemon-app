/* eslint-disable no-bitwise */
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

async function writePokemon(pokemon) {
  try {
    await NfcManager.requestTechnology(NfcTech.NfcA);

    let pageData;
    let respBytes = [];

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
    console.warn('page 5', pageData, respBytes);

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
    console.warn('page 6', pageData, respBytes);

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
    console.warn('page 7', pageData, respBytes);

    // Page 7 ~ N: the name of the pokemon
    let nameBytes = Array.from(pokemon.name).map((_, i) =>
      pokemon.name.charCodeAt(i),
    );
    let finished = false;
    let pageIdx = 8;
    while (!finished) {
      if (nameBytes.length <= 4) {
        finished = true;
        pageData = [...nameBytes, 0, 0, 0].slice(0, 4);
      } else {
        pageData = nameBytes.slice(0, 4);
        nameBytes = nameBytes.slice(4);
      }

      respBytes = await NfcManager.nfcAHandler.transceive([
        0xa2,
        pageIdx,
        ...pageData,
      ]);
      console.warn(`page ${pageIdx}`, pageData, respBytes);

      pageIdx += 1;
    }
  } catch (ex) {
    console.warn(ex);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

export {writePokemon};
