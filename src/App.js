import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './AppNavigator';

function App(props) {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
