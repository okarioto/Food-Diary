import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Entry(props) {
  const [editing, setEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState({
    id: props.id,
    restaurant: props.restaurant,
    r_rating: props.r_rating,
    k_rating: props.k_rating,
    price: props.price,
    comment: props.comment,
  });

  async function handleDeleteClick(event) {
    const id = event.target.id;
    try {
      //delete request to db
      await axios.delete(API_URL + `/entries/${id}`);

      //delete from non persistant array
      props.setEntries((prevValue) => {
        return prevValue.filter((entry) => {
          return entry.id !== id;
        });
      });
    } catch (error) {
      console.log(error);
      console.log("Errored out with: ", error.response.data);
    }
  }

  async function handleEditClick() {
    if(editing){
            try {
              //put request to db
              await axios.put(API_URL + `/entries`, editedEntry);

            } catch (error) {
              console.log(error);
              console.log("Errored out with: ", error.response.data);
            }

    }
    setEditing(!editing);
  }

  function handleChange(event) {
    const { name: inputName, value } = event.target;

    setEditedEntry((prevValue) => {
      return {
        ...prevValue,
        [inputName]: value,
      };
    });
  }

  return (
    <>
      <tr className="entry">
        <td>
          <button id={props.id} onClick={handleEditClick} className="edit">
            {editing ? "done" : "edit"}
          </button>
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="restaurant"
              value={editedEntry.restaurant}
              onChange={handleChange}
            />
          ) : (
            editedEntry.restaurant
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="r_rating"
              value={editedEntry.r_rating}
              onChange={handleChange}
            />
          ) : (
            editedEntry.r_rating
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="k_rating"
              value={editedEntry.k_rating}
              onChange={handleChange}
            />
          ) : (
            editedEntry.k_rating
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="number"
              name="price"
              value={editedEntry.price}
              onChange={handleChange}
            />
          ) : (
            editedEntry.price
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="comment"
              value={editedEntry.comment}
              onChange={handleChange}
            />
          ) : (
            editedEntry.comment
          )}
        </td>
        <td>
          <button id={props.id} onClick={handleDeleteClick} className="delete">
            delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default Entry;
