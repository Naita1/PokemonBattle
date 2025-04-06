import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonSearch.css'; 

const PokemonSearch = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get(`/api/random-pokemons`);
      setPokemonData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar Pokémon');
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div className="pokemon-search-container">
      <h1 className="title">LUTAAAAa</h1>

      {pokemonData.length > 0 ? (
        <div className="pokemon-grid">
          {pokemonData.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <p className="pokemon-info">Tipos: {pokemon.types.join(', ')}</p>
              <p className="pokemon-info">Altura: {pokemon.height}</p>
              <p className="pokemon-info">Peso: {pokemon.weight}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-message">{error || 'Carregando Pokémon...'}</p>
      )}
    </div>
  );
};

export default PokemonSearch;
