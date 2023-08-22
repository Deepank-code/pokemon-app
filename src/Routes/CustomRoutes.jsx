import { Routes, Route } from "react-router-dom";
import Pokemon from "../Components/pokemons/Pokemon.jsx";
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails.jsx";

function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </>
  );
}
export default CustomRoutes;
