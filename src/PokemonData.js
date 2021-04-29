const Type = {
  Grass: 1,
  Fire: 2,
  Wather: 3,
  Electric: 4,
  Ground: 5,
  Bug: 6,
  Rock: 7,
  Poison: 8,
};

const PokemonList = [
  {
    name: 'Bulbasaur',
    description: 'Awesome pokemon',
    no: 1,
    type: [Type.Grass, Type.Poison],
    hp: 3,
    atk: 3,
    def: 3,
    satk: 4,
    sdef: 4,
    spd: 3,
  },
  {
    name: 'Charmander',
    description: 'Awesome pokemon',
    no: 4,
    type: [Type.Fire],
    hp: 3,
    atk: 4,
    def: 3,
    satk: 4,
    sdef: 3,
    spd: 4,
  },
  {
    name: 'Squirtle',
    description: 'Awesome pokemon',
    no: 7,
    type: [Type.Wather],
    hp: 3,
    atk: 3,
    def: 4,
    satk: 3,
    sdef: 4,
    spd: 3,
  },
  {
    name: 'Pikachu',
    description: 'Awesome pokemon',
    no: 25,
    type: [Type.Electric],
    hp: 3,
    atk: 4,
    def: 3,
    satk: 3,
    sdef: 3,
    spd: 6,
  },
  {
    name: 'Geodude',
    description: 'Awesome pokemon',
    no: 74,
    type: [Type.Ground, Type.Rock],
    hp: 3,
    atk: 5,
    def: 6,
    satk: 2,
    sdef: 2,
    spd: 2,
  },
];

const PokemonMap = PokemonList.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {});

export {PokemonList, PokemonMap};
