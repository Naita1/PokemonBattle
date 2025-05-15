const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'front')));

app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

app.get('/api/random-pokemons', async (req, res) => {
  console.log('Rota /api/random-pokemons foi chamada'); 
  const randomPokemonIDs = [];

  try {
    while (randomPokemonIDs.length < 5) {
      const randomID = Math.floor(Math.random() * 898) + 1;
      if (!randomPokemonIDs.includes(randomID)) {
        randomPokemonIDs.push(randomID);
      }
    }

    console.log('IDs gerados:', randomPokemonIDs);

    const pokemonPromises = randomPokemonIDs.map(id =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    const pokemonResponses = await Promise.all(pokemonPromises);

    const randomPokemons = pokemonResponses.map((response) => {
      const pokemon = response.data;
      return {
        id: pokemon.id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((type) => type.type.name),
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        experience: pokemon.base_experience,
        abilities: pokemon.abilities.map((a) => a.ability.name)


      };
    });

    console.log('Pokémon formatados:', randomPokemons); 
    res.json(randomPokemons);
  } catch (error) {
    console.error('Erro na rota:', error.message); 
    res.status(500).json({ 
      error: error.response?.status === 404 ? 'Pokémon não encontrado!' : 'Erro na PokeAPI'
    });
  }
});

app.get('/api/opponent-pokemons', async (req, res) => {
  console.log('Rota /api/random-pokemons foi chamada'); 

  const opponentPokemonIDs = [];

  try {
    while (opponentPokemonIDs.length < 3) {
      const randomOpponentID = Math.floor(Math.random() * 898) + 1;
      if (!opponentPokemonIDs.includes(randomOpponentID)) {
        opponentPokemonIDs.push(randomOpponentID);
      }
    }

    console.log('IDs Oponentes:', opponentPokemonIDs);


    const pokemonPromises = opponentPokemonIDs.map(id =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );

    const pokemonResponses = await Promise.all(pokemonPromises);

    const opponents = pokemonResponses.map((response) => {
      const pokemon = response.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        experience: pokemon.base_experience
      };
    });

    res.json(opponents);

  } catch (err) {
    console.error('Erro ao buscar oponentes:', err);
    res.status(500).json({ error: 'Erro ao buscar pokémons oponentes' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
  