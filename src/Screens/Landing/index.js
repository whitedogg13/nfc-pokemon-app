import React from 'react';
import {View, StyleSheet, Animated, ActivityIndicator} from 'react-native';
import Image from '../../Components/Image';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function LandingScreen(props) {
  const opacityAnimValue = React.useRef(new Animated.Value(0)).current;
  const scaleAnimValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    async function initialize() {
      Animated.timing(opacityAnimValue, {
        duration: 600,
        toValue: 1,
        useNativeDriver: true,
      }).start();

      await delay(600);

      Animated.parallel([
        Animated.timing(opacityAnimValue, {
          duration: 350,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimValue, {
          duration: 350,
          toValue: 6,
          useNativeDriver: true,
        }),
      ]).start();

      await delay(500);

      props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }

    initialize();
  }, [props.navigation, opacityAnimValue, scaleAnimValue]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={{
          opacity: opacityAnimValue,
          transform: [{scale: scaleAnimValue}],
        }}>
        <Image
          source={require('../../../images/pokeball.png')}
          style={styles.banner}
          resizeMode="contain"
        />
      </Animated.View>
      <ActivityIndicator style={{marginTop: 10}} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: 240,
    height: 240,
  },
});

export default LandingScreen;
