import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch = () => {
  const [pokemonID, setPokemonID] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonID}`);
      setPokemonData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar Pokémon');
    }
  };

  return (
    <div>
      <h1>LUTAAAA</h1>
      
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.image} alt={pokemonData.name} />
          <p>Tipos: {pokemonData.types.join(', ')}</p>
          <p>Altura: {pokemonData.height} m</p>
          <p>Peso: {pokemonData.weight} kg</p>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
