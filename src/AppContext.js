import React from 'react';
import {Alert} from 'react-native';

const Context = React.createContext();
const Actions = {};

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    Actions.sayHi = (msg) => {
      Alert.alert(msg);
    };

    this.actions = Actions;
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export {Context, Provider};
