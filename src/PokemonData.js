const PokemonList = [
  {name: 'Bulbasaur', description: 'Awesome pokemon'},
  {name: 'Charmander', description: 'Awesome pokemon'},
  {name: 'Squirtle', description: 'Awesome pokemon'},
  {name: 'Pikachu', description: 'Awesome pokemon'},
  {name: 'Geodude', description: 'Awesome pokemon'},
];

const PokemonMap = PokemonList.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {});

export {PokemonList, PokemonMap};
