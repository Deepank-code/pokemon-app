import { useEffect, useState } from "react";
import Search from "../search/Search.jsx";
import Loader from "../Loader.jsx";
import "./Pokemon.css";
import PokemonCard from "../Pokemon card/PokemonCard.jsx";
function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPokemon, setNextPokemon] = useState("");
  const [prevPokemon, setPrevPokemon] = useState("");
  const fetchPokemon = async () => {
    setIsLoading(true);
    const data = await fetch(pokemonUrl);

    const result = await data.json();
    console.log(result);
    setNextPokemon(result.next);
    setPrevPokemon(result.previous);
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

    setPokemonList(
      pokemon_data.map((obj) => {
        return {
          id: obj.id,
          name: obj.name,
          weight: obj.weight,
          image: obj.sprites.other
            ? obj.sprites.other.dream_world.front_default
            : obj.sprites.other.front_shiny,
          // type: obj.types.type,
        };
      })
    );

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonUrl]);
  return (
    <>
      <div className="pokemon-wrapper">
        <h1 className="text-center my-4">Pokemon</h1>
        <Search />
        <div className="text-center my-5">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="poke-desk">
                {pokemonList.map((poke) => {
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
                  disabled={prevPokemon === null ? true : false}
                  className="btn btn-outline-danger prev m-5"
                  onClick={() => {
                    setPokemonUrl(nextPokemon);
                  }}
                >
                  Pre
                </button>
                <button
                  disabled={nextPokemon === null ? true : false}
                  className="btn btn-outline-success next m-5"
                  onClick={() => {
                    setPokemonUrl(nextPokemon);
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
