import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
function PokemonDetails() {
  const [pokedata, setPokedata] = useState("hello");
  const { id } = useParams();
  const downloadPokemon = () => {
    const pokeedata = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPokedata({
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          weight: data.weight,
          height: data.height,
          types: data.types.map((t) => t.type.name),
        });

        return data;
      });
  };
  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemon-detail-wrapper text-center">
      <div className="pokemon-details">
        <div className="poke-name ">
          <h2 className="text-bold">{pokedata.name}</h2>
        </div>
        <img className="poke-img" src={pokedata.image} />
        <div>
          <h4>
            Height:<b>{pokedata.height}</b>
          </h4>
        </div>
        <div>
          <h4>
            Weight:<b>{pokedata.weight}</b>
          </h4>
        </div>
        <div className="pokemon-details-types">
          {pokedata.type && pokedata.types.map((t) => <div key={t}>{t}</div>)}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
