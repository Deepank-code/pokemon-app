import { useEffect, useState } from "react";
import Search from "../search/Search.jsx";
import Loader from "../Loader.jsx";
import "./Pokemon.css";
import PokemonCard from "../Pokemon card/PokemonCard.jsx";
function Pokemon() {
  const [pokeListState, setPokeListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokemonUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextPokemonUrl: "",
    prevPokemonUrl: "",
  });
  const fetchPokemon = async () => {
    setPokeListState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
    const data = await fetch(pokeListState.pokemonUrl);

    const result = await data.json();
    console.log(result);

    setPokeListState((prevState) => {
      return {
        ...prevState,
        nextPokemonUrl: result.next,
        prevPokemonUrl: result.previous,
      };
    });

    const pokeurl = result.results;

    const allPokemon_url = pokeurl.map((poke) => {
      return poke.url;
    });

    const poke_data = allPokemon_url.map(async (url) => {
      const data = await fetch(url);
      const pokeresult = await data.json();

      return pokeresult;
    });
    const pokemon_data = await Promise.all(poke_data);

    console.log(pokemon_data);
    setPokeListState((prevState) => {
      return {
        ...prevState,
        pokemonList: pokemon_data.map((obj) => {
          return {
            id: obj.id,
            name: obj.name,
            weight: obj.weight,
            image: obj.sprites.other
              ? obj.sprites.other.dream_world.front_default
              : obj.sprites.other.front_shiny,
            // type: obj.types.type,
          };
        }),
        isLoading: false,
      };
    });
  };
  console.log(pokeListState);
  useEffect(() => {
    fetchPokemon();
  }, [pokeListState.pokemonUrl]);

  return (
    <>
      <div className="pokemon-wrapper">
        <h1 className="text-center my-4">Pokemon</h1>
        <Search />
        <div className="text-center my-5">
          {pokeListState.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="poke-desk">
                {pokeListState.pokemonList.map((poke) => {
                  return (
                    <PokemonCard
                      key={poke.id}
                      id={poke.id}
                      name={poke.name}
                      img={poke.image}
                      weight={poke.weight}
                    />
                  );
                })}
              </div>
              <div>
                <button
                  disabled={
                    pokeListState.prevPokemonUrl === null ? true : false
                  }
                  className="btn btn-outline-danger prev m-5"
                  onClick={() => {
                    setPokeListState({
                      ...pokeListState,
                      pokemonUrl: pokeListState.prevPokemonUrl,
                    });
                  }}
                >
                  Pre
                </button>
                <button
                  disabled={
                    pokeListState.nextPokemonUrl === null ? true : false
                  }
                  className="btn btn-outline-success next m-5"
                  onClick={() => {
                    setPokeListState({
                      ...pokeListState,
                      pokemonUrl: pokeListState.nextPokemonUrl,
                    });
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Pokemon;
