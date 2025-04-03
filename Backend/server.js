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
      while (randomPokemonID > 5){
        const randomID = Math.floor(Math.random() * 898) + 1;
        if(!randomPokemonID.includes(randomID)){
          randomPokemonID.push(randomID);
        }
      }
        const pokemonPromises = randomPokemonID.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
        const pokemonResponses = await Promise.all(pokemonPromises);
    
        const randomPokemon = pokemonResponses.map((response) => {
          const pokemon = response.data;
          return {
            id: pokemon.id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: pokemon.sprites.front_default,
            types: pokemon.types.map((type) => type.type.name),
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

