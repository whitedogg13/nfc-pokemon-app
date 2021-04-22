import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as AppContext from '../../AppContext';
import Image from '../../Components/Image';
import {Button} from 'react-native-paper';
import {PokemonMap} from '../../PokemonData';

function HomeScreen(props) {
  const {navigation} = props;
  const ctx = React.useContext(AppContext.Context);

  return (
    <View style={[styles.wrapper, styles.center]}>
      <Image
        source={require('../../../images/pokeball.png')}
        style={styles.banner}
        resizeMode="contain"
      />
      <Button
        mode="contained"
        style={styles.btn}
        onPress={() => {
          navigation.navigate('List');
        }}>
        Create Pokemon
      </Button>
      <Button
        mode="contained"
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Detail', {
            pokemon: PokemonMap.Pikachu,
          });
        }}>
        Identify Pokemon
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 240,
    marginBottom: 20,
  },
  banner: {
    width: 240,
    height: 240,
    marginBottom: 60,
  },
});

export default HomeScreen;
