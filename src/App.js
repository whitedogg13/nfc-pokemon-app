import React from 'react';
import {Provider as AppCtxProvider} from './AppContext';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './AppNavigator';
import * as HexUtils from './HexUtils';
import * as Signer from './Signer';

function test() {
  const msgHex = HexUtils.bytesToHex([0x12, 0x34, 0xab, 0xcd]);
  const signature = Signer.sign(msgHex);
  const result = Signer.verify(msgHex, signature);
  console.warn(result, signature);
}

function App(props) {
  test();

  return (
    <PaperProvider>
      <AppCtxProvider>
        <AppNavigator />
      </AppCtxProvider>
    </PaperProvider>
  );
}

export default App;
