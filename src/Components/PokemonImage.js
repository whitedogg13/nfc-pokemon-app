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

function Bulbasaur({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/Bulbasaur/figure.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function Charmander({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/Charmander/figure.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function Geodude({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/Geodude/figure.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function Pikachu({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/Pikachu/figure.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function Squirtle({style = {}, ...props}) {
  return (
    <FastImage
      source={require('../../images/Squirtle/figure.png')}
      style={[styles.base, style]}
      resizeMode="contain"
      {...props}
    />
  );
}

function PokemonImage({name, ...props}) {
  if (name === 'Bulbasaur') {
    return <Bulbasaur {...props} />;
  } else if (name === 'Charmander') {
    return <Charmander {...props} />;
  } else if (name === 'Geodude') {
    return <Geodude {...props} />;
  } else if (name === 'Pikachu') {
    return <Pikachu {...props} />;
  } else if (name === 'Squirtle') {
    return <Squirtle {...props} />;
  }
  return <Unknown {...props} />;
}

const styles = StyleSheet.create({
  base: {
    width: 50,
    height: 50,
  },
});

export default PokemonImage;
