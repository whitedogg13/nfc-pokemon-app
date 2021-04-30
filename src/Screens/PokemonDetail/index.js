import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import {Button} from 'react-native-paper';
import PokemonImage from '../../Components/PokemonImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import writePokemon from '../../NfcUtils/writePokemon';
import writeSignature from '../../NfcUtils/writeSignature';

function PokemonDetail(props) {
  const {navigation, route} = props;
  const {pokemon, allowCreate = false} = route.params;
  const [reveal, setReveal] = React.useState(allowCreate);
  const animValue = React.useRef(new Animated.Value(allowCreate ? 1 : 0))
    .current;
  const animValueLooped = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!allowCreate) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 600,
        delay: 3000,
        useNativeDriver: false,
      }).start(() => {
        setReveal(true);
      });
      Animated.loop(
        Animated.timing(animValueLooped, {
          toValue: 2,
          duration: 600,
          useNativeDriver: false,
        }),
        {iterations: 20},
      ).start();
    }
  }, [animValue, animValueLooped, allowCreate]);

  const fadeIn = {
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 1],
        }),
      },
    ],
  };

  const fadeOut = {
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        rotateZ: animValueLooped.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ['0deg', '180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={[styles.wrapper]}>
      <SafeAreaView />
      <View style={[styles.wrapper, styles.center]}>
        <Text style={styles.name}>{reveal ? pokemon.name : '???'}</Text>
        <View style={[styles.circle, styles.center]}>
          <Animated.View style={[styles.absPos, fadeIn]}>
            <PokemonImage
              name={pokemon.name}
              style={styles.img}
              resizeMode="cover"
            />
          </Animated.View>
          <Animated.View style={[styles.absPos, fadeOut]}>
            <PokemonImage style={styles.img} resizeMode="cover" />
          </Animated.View>
        </View>
        <View style={styles.profile}>
          <Text style={styles.profileTxt}>
            HP: {reveal ? pokemon.hp : '???'}
          </Text>
          <Text style={styles.profileTxt}>
            ATK: {reveal ? pokemon.atk : '???'}
          </Text>
          <Text style={styles.profileTxt}>
            DEF: {reveal ? pokemon.def : '???'}
          </Text>
          <Text style={styles.profileTxt}>
            SATK: {reveal ? pokemon.satk : '???'}
          </Text>
          <Text style={styles.profileTxt}>
            SDEF: {reveal ? pokemon.sdef : '???'}
          </Text>
          <Text style={styles.profileTxt}>
            SPD: {reveal ? pokemon.spd : '???'}
          </Text>
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
                const pokemonBytes = await writePokemon(pokemon);
                await writeSignature(pokemonBytes);
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
  absPos: {
    position: 'absolute',
    left: 5,
    top: 5,
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
