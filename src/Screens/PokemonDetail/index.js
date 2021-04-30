import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button} from 'react-native-paper';
import PokemonImage from '../../Components/PokemonImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import writePokemon from '../../NfcUtils/writePokemon';

function PokemonDetail(props) {
  const {navigation, route} = props;
  const {pokemon, allowCreate = false} = route.params;

  return (
    <View style={[styles.wrapper]}>
      <SafeAreaView />
      <View style={[styles.wrapper, styles.center]}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={[styles.circle, styles.center]}>
          <PokemonImage
            name={pokemon.name}
            style={styles.img}
            resizeMode="cover"
          />
        </View>
        <View style={styles.profile}>
          <Text style={styles.profileTxt}>HP: {pokemon.hp}</Text>
          <Text style={styles.profileTxt}>ATK: {pokemon.atk}</Text>
          <Text style={styles.profileTxt}>DEF: {pokemon.def}</Text>
          <Text style={styles.profileTxt}>SATK: {pokemon.satk}</Text>
          <Text style={styles.profileTxt}>SDEF: {pokemon.sdef}</Text>
          <Text style={styles.profileTxt}>SPD: {pokemon.spd}</Text>
        </View>
      </View>

      {allowCreate && (
        <View style={styles.center}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={async () => {
              try {
                await NfcManager.requestTechnology(NfcTech.NfcA);
                await writePokemon(pokemon);
              } catch (ex) {
                console.warn(ex);
              } finally {
                NfcManager.cancelTechnologyRequest();
              }
            }}>
            CREATE
          </Button>
        </View>
      )}

      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={30} />
      </TouchableOpacity>

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'orange',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 220,
    height: 220,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  circle: {
    width: 230,
    height: 230,
    backgroundColor: 'white',
    borderRadius: 115,
    marginVertical: 60,
  },
  profile: {
    padding: 15,
    borderRadius: 9,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginHorizontal: 40,
  },
  profileTxt: {
    fontSize: 18,
    lineHeight: 24,
  },
  btn: {
    width: 300,
  },
  close: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 20,
    left: 10,
    width: 32,
    height: 32,
  },
});

export default PokemonDetail;
