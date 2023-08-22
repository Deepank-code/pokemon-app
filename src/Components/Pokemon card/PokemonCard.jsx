import { Link } from "react-router-dom";
import "./PokemonCard.css";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function PokemonCard({ name, img, weight, id }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="poke_img  card-img-top" src={img} alt="Card image cap" />
      <div className="card-body text-start ">
        <h5 className="card-title">
          <span>Pokemon:</span> {capitalizeFirstLetter(name)}
        </h5>
        <h6 className="card-title">
          <span>Weight:</span> {weight}
        </h6>
        <p className="card-text"></p>
        <Link
          to={`/pokemon/${id}`}
          className="poke-btn btn btn-outline-danger "
        >
          More Info of {name}...
        </Link>
      </div>
    </div>
  );
}

export default PokemonCard;
