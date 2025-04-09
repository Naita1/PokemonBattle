import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonSearch.css";

const PokemonSearch = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [opponentPokemon, setOpponentPokemon] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState([]);
  const [hideUnselected, setHideUnselected] = useState(false);
  const [battleResult, setBattleResult] = useState();

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get("/api/random-pokemons");
      setPokemonData(response.data);
    } catch (error) {
      console.error(error.response?.data?.error || "Erro ao buscar Pokémon");
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      fire: "#f08030",
      water: "#6890f0",
      grass: "#78c850",
      electric: "#f8d030",
      ice: "#98d8d8",
      fighting: "#c03028",
      poison: "#a040a0",
      ground: "#e0c068",
      flying: "#a890f0",
      psychic: "#f85888",
      bug: "#a8b820",
      rock: "#b8a038",
      ghost: "#705898",
      dark: "#705848",
      dragon: "#7038f8",
      steel: "#b8b8d0",
      fairy: "#ee99ac",
      normal: "#a8a878",
    };
    return colors[type] || "#ccc";
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
    } catch (error) {
      console.error(error.response?.data?.error || "Erro ao buscar Pokémon");
    }
  };

  const startBattle = async () => {
    try {
      const opponents = await fetchOpponentPokemon();
      setOpponentPokemon(opponents);

      setTimeout(() => {
        const playerTotalExperience = pokemonSelected.reduce(
          (acc, p) => acc + (p.experience || 0),
          0
        );
        const opponentTotalExperience = opponents.reduce(
          (acc, p) => acc + (p.experience || 0),
          0
        );

        let resultMessage = "";

        console.log("Seus", playerTotalExperience);
        console.log("Oponente", opponentTotalExperience);

        if (playerTotalExperience > opponentTotalExperience) {
          resultMessage = `Você venceu \n Sua pontuação total: ${playerTotalExperience} \n Pontuação total do oponente: ${opponentTotalExperience}`;
        } else if (playerTotalExperience < opponentTotalExperience) {
          resultMessage = `Você perdeu \n Sua pontuação total: ${playerTotalExperience} \n Pontuação total do oponente: ${opponentTotalExperience}`;
        } else {
          resultMessage = `Empate \n Sua pontuação total: ${playerTotalExperience} \n Pontuação total do oponente: ${opponentTotalExperience}`;
        }
        setBattleResult(resultMessage);
      }, 500);
      setHideUnselected(true);
    } catch {
      console.log("erro");
    }
  };

  const resetBattle = () => {
    setPokemonSelected([]);
    setOpponentPokemon([]);
    setHideUnselected(false);
    fetchRandomPokemon();
  };

  const getPokemonHP = (exp) =>{
    if(exp > 130) return "green";
    if(exp > 70) return "gold";
    return "red"
  }

  return (
    <div className="battle_container">
      {hideUnselected && (
        <div>
          <div className="battle_grid">
            <h2>Seus Pokemons</h2>
            <div className="player_column">
              {pokemonSelected.map((pokemon) => (
                <div key={pokemon.id} className={`pokemon_card`}   style={{ backgroundColor: getTypeColor(pokemon.types[0]) }}
>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon_image"
                  />
                  <h2 className="pokemon_name">{pokemon.name}</h2>
                  <p className="pokemon_info">
                    Tipos: {pokemon.types.join(", ")}
                  </p>
                  <p className="pokemon_info">Altura: {pokemon.height}</p>
                  <p className="pokemon_info">Peso: {pokemon.weight}</p>
                  <p className="pokemon_info">
                    Experiencia: {pokemon.experience}
                  </p>
                  <div className="hp_bar">
                    <div
                      className="hp_fill"
                      style={{ width: `${(pokemon.experience / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {battleResult && (
                <div className="battle_result">
                  {battleResult.split("\n").map((line, i) => (
                    <p className="battle_result_text" key={i}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="oponnent_column">
              {opponentPokemon.map((pokemon) => (
                <div key={pokemon.id} className="pokemon_card">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon_image"
                  />
                  <h2 className="pokemon_name">{pokemon.name}</h2>
                  <p className="pokemon_info">
                    Tipos: {pokemon.types.join(", ")}
                  </p>
                  <p className="pokemon_info">Altura: {pokemon.height}</p>
                  <p className="pokemon_info">Peso: {pokemon.weight}</p>
                  <p className="pokemon_info">
                    Experiência: {pokemon.experience}
                  </p>
                  <div className="hp_bar">
                    <div
                      className="hp_fill"
                      style={{ width: `${(pokemon.experience / 200) * 100}%`, backgroundColor: getPokemonHP(pokemon.experience) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <h2>Pokémons Oponentes</h2>
          </div>
          <button onClick={resetBattle} className="reset_battle_button">
            Jogar novamente
          </button>
        </div>
      )}

      {!hideUnselected && (
        <div>
          <h1 className="title">Escolha 3 pokemons</h1>

          <button
            className="start_battle_button"
            onClick={startBattle}
            disabled={pokemonSelected.length !== 3}
          >
            Iniciar Batalha
          </button>
          <div className="pokemon_grid">
            {pokemonData.map((pokemon) => (
              <button
                onClick={() => togglePokemonSelection(pokemon)}
                key={pokemon.id}
                className={`pokemon_card ${
                  isSelected(pokemon.id) ? "selected" : ""
                }`}
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="pokemon_image"
                />
                <h2 className="pokemon_name">{pokemon.name}</h2>
                <p className="pokemon_info">
                  Tipos: {pokemon.types.join(", ")}
                </p>
                <p className="pokemon_info">Altura: {pokemon.height}</p>
                <p className="pokemon_info">Peso: {pokemon.weight}</p>
                <p className="pokemon_info">
                  Experiência: {pokemon.experience}
                </p>
                {/* <div className="hp_bar">
                    <div
                      className="hp_fill"
                      style={{ width: `${(pokemon.experience / 200) * 100}%`, backgroundColor: getPokemonHP(pokemon.experience) }}
                    ></div>
                  </div> */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
