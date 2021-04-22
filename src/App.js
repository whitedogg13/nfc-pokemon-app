import React from 'react';
import {Provider as AppCtxProvider} from './AppContext';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './AppNavigator';

function App(props) {
  return (
    <PaperProvider>
      <AppCtxProvider>
        <AppNavigator />
      </AppCtxProvider>
    </PaperProvider>
  );
}

export default App;
