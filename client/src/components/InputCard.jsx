import { useState} from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function InputCard(props) {
  const [rating, setRating] = useState({
    kRating: 5,
    rRating: 5,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { restaurant, kRating, rRating, price, comment } = event.target;
      try {
        const result = await axios.post(API_URL + "/entries", {
          restaurant: restaurant.value,
          k_rating: rRating.value,
          r_rating: kRating.value,
          price: price.value,
          comment: comment.value,
        });
        props.setNewEntry(result.data);
      } catch (error) {
        console.log(error);
        console.log('Errored out with: ', error.response.data);
      }
  }

  function handleChange(event) {
    const { name: inputName, value } = event.target;
    setRating((prevValue) => {
      return {
        ...prevValue,
        [inputName]: value,
      };
    });
  }

  return (
    <div className="inputCard">
      <form onSubmit={handleSubmit}>
        <h2>CREATE NEW ENTRY</h2>
        <input type="text" name="restaurant" placeholder="Restaurant Name" />
        <label htmlFor="kRating">
          K Rating:<span>{rating.kRating}</span>
        </label>
        <input
          className="slider"
          type="range"
          name="kRating"
          onChange={handleChange}
          value={rating.kRating}
          min={0}
          max={10}
        />
        <label htmlFor="rRating">
          R Rating: <span>{rating.rRating}</span>
        </label>
        <input
          className="slider"
          type="range"
          name="rRating"
          onChange={handleChange}
          value={rating.rRating}
          min={0}
          max={10}
        />
        <input type="number" name="price" placeholder="Price ($/person)" />
        <textarea name="comment" rows={3} placeholder="Comments..."></textarea>
        <button>Create!</button>
      </form>
    </div>
  );
}

export default InputCard;
