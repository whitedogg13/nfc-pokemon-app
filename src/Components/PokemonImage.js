import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';

function Unknown({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/pokeball.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function PokemonImage({name, ...props}) {
  return <Unknown {...props} />;
}

const styles = StyleSheet.create({
  base: {
    width: 50,
    height: 50,
  },
});

export default PokemonImage;
