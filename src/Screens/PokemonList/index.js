import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import PokemonImage from '../../Components/PokemonImage';
import {PokemonList} from '../../PokemonData';

function PokemonListScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {PokemonList.map(p => {
        return (
          <List.Item
            key={p.name}
            title={p.name}
            description={p.description}
            left={() => <PokemonImage name={p.name} />}
            onPress={() => {
              navigation.navigate('Detail', {pokemon: p, allowCreate: true});
            }}
          />
        );
      })}
    </ScrollView>
  );
}

export default PokemonListScreen;
