import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonSearch.css";

const PokemonSearch = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [opponentPokemon, setOpponentPokemon] = useState([]);
  const [error, setError] = useState(null);
  const [pokemonSelected, setPokemonSelected] = useState([]);

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get("/api/random-pokemons");
      setPokemonData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao buscar Pokémon");
    }
  };

  const togglePokemonSelection = (pokemon) => {
    const isAlreadySelected = pokemonSelected.find((p) => p.id === pokemon.id);

    if (isAlreadySelected) {
      setPokemonSelected(pokemonSelected.filter((p) => p.id !== pokemon.id));
    } else if (pokemonSelected.length < 3) {
      setPokemonSelected([...pokemonSelected, pokemon]);
    } else {
      alert("Você só pode selecionar até 3 Pokémons");
    }
  };

  const isSelected = (id) => {
    return pokemonSelected.some((p) => p.id === id);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  //Pegar dados dos oponentes

  const fetchOpponentPokemon = async () => {
    try {
      const response = await axios.get("/api/opponent-pokemons");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao buscar oponentes");
    }
  };

  const startBattle = async () => {
    // if(pokemonSelected !== 3){
    //   alert("Você precisa selecionar exatamente 3 pokemons");
    //   return;
    // }

    try {
      const opponents = await fetchOpponentPokemon();
      setOpponentPokemon(opponents)

      const playerTotalExperience = pokemonSelected.reduce(
        (acc, p) => acc + (p.experience || 0 || 0),
        0
      );
      const opponentTotalExperience = opponents.reduce(
        (acc, p) => acc + (p.experience || 0 || 0),
        0
      );

      console.log("Seus", playerTotalExperience);
      console.log("Oponente", opponentTotalExperience);

      if (playerTotalExperience > opponentTotalExperience) {
        alert("Você venceu");
      } else if (playerTotalExperience < opponentTotalExperience) {
        alert("Você perdeu");
      } else {
        alert("Empate");
      }
    } catch {
      console.log("erro");
    }
  };

  console.log("Seus pokemons", pokemonSelected);

  console.log("Oponente", opponentPokemon);

  return (
    <div className="pokemon-search-container">
      <h1 className="title">A</h1>

      {pokemonData.length > 0 ? (
        <div className="pokemon-grid">
          {pokemonData.map((pokemon) => (
            <button
              onClick={() => {
                togglePokemonSelection(pokemon);
              }}
              key={pokemon.id}
              className={`pokemon-card ${
                isSelected(pokemon.id) ? "selected" : ""
              }`}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <p className="pokemon-info">Tipos: {pokemon.types.join(", ")}</p>
              <p className="pokemon-info">Altura: {pokemon.height}</p>
              <p className="pokemon-info">Peso: {pokemon.weight}</p>
              <p className="pokemon-info">Experiencia: {pokemon.experience}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="error-message">{error || "Carregando Pokémon..."}</p>
      )}

      <button
        className="start_battle_button"
        onClick={startBattle}
        disabled={pokemonSelected.length !== 3}
      >
        Iniciar Batalha
      </button>

      
      {opponentPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {opponentPokemon.map((pokemon) => (
            <button
              onClick={() => {
                togglePokemonSelection(pokemon);
              }}
              key={pokemon.id}
              className={`pokemon-card ${
                isSelected(pokemon.id) ? "selected" : ""
              }`}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <p className="pokemon-info">Tipos: {pokemon.types.join(", ")}</p>
              <p className="pokemon-info">Altura: {pokemon.height}</p>
              <p className="pokemon-info">Peso: {pokemon.weight}</p>
              <p className="pokemon-info">Experiencia: {pokemon.experience}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="error-message">{error || "Carregando Pokémon..."}</p>
      )}
    </div>
  );
};

export default PokemonSearch;
