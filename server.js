const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'front')));

app.get('/api/random-pokemons/', async (req, res) => {
  // const pokemonName = req.params.name.toLowerCase();
  const randomPokemonID = []

    try{
      while (randomPokemonID < 5){
        const randomID = Math.floor(Math.random() * 898) + 1;
        if(!randomPokemonID.includes(randomID)){
          randomPokemonID.push(randomID);
        }
      }
        const pokemonPromises = randomPokemonID.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
        const pokemonResponses = await Promise.all(pokemonPromises);
    
        const randomPokemon = const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'front')));

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

app.get('/api/random-pokemons', async (req, res) => {
  console.log('Rota /api/random-pokemons foi chamada'); // Log inicial
  const randomPokemonIDs = [];

  try {
    // Gera 5 IDs aleatórios
    while (randomPokemonIDs.length < 5) {
      const randomID = Math.floor(Math.random() * 898) + 1;
      if (!randomPokemonIDs.includes(randomID)) {
        randomPokemonIDs.push(randomID);
      }
    }
    console.log('IDs gerados:', randomPokemonIDs); // Log dos IDs

    // Faz requisições à PokeAPI
    const pokemonPromises = randomPokemonIDs.map(id =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    const pokemonResponses = await Promise.all(pokemonPromises);
    console.log('Requisições concluídas:', pokemonResponses.length); // Log das respostas

    // Formata os dados
    const randomPokemons = pokemonResponses.map((response) => {
      const pokemon = response.data;
      return {
        id: pokemon.id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((type) => type.type.name),
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
      };
    });

    console.log('Pokémon formatados:', randomPokemons); // Log final
    res.json(randomPokemons);
  } catch (error) {
    console.error('Erro na rota:', error.message); // Log do erro
    res.status(500).json({ 
      error: error.response?.status === 404 ? 'Pokémon não encontrado!' : 'Erro na PokeAPI'
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});pokemonResponses.map((response) => {
          const pokemon = response.data;
          return {
            id: pokemon.id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: pokemon.sprites.front_default,
            types: pokemon.types.map((type) => type.type.name),
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
          };
        });
        res.json(randomPokemon);
    } catch(error){
      res.status(404).json({ 
        error: error.response?.status === 404 ? 'Pokémon não encontrado!' : 'Erro na PokeAPI' 
      });
    }
    } 

  );

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

