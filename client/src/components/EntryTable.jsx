import axios from "axios";
import Entry from "./Entry";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function EntryTable(props) {
  const [isAsc, setIsAsc] = useState(true);

  //Get entries on initial load and when entries gets updated
  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(API_URL + "/entries");
        props.setEntries(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  //Update entries when new entry is added from ./InputCard.jsx
  useEffect(() => {
    props.setEntries((prevValue) => {
      return [...prevValue, props.newEntry];
    });
  }, [props.newEntry]);

async function handleClick(event){
  const inputName = event.target.name;
  
  try {
    const result = await axios.get(API_URL + "/entries", {
      params :{
        column: inputName,
        direction: isAsc? 'ASC':'DESC'
      }
    })
    props.setEntries(result.data);
    setIsAsc(!isAsc);
  } catch (error) {
    console.log(error);
  }

}

  return (
    <div className="entryTable">
      <table>
        <thead>
          <tr>
            <th>
              <button
                className="order"
                name="id"
                onClick={handleClick}
              ></button>
            </th>
            <th>
              Restaurant
              <button
                className="order"
                name="restaurant"
                onClick={handleClick}
              ></button>
            </th>
            <th>
              r Rating
              <button
                className="order"
                name="r_rating"
                onClick={handleClick}
              ></button>
            </th>
            <th>
              k Rating
              <button
                className="order"
                name="k_rating"
                onClick={handleClick}
              ></button>
            </th>
            <th>
              Price
              <button
                className="order"
                name="price"
                onClick={handleClick}
              ></button>
            </th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map((entry) => (
            <Entry
              key={entry.id || entry.restaurant}
              id={entry.id}
              restaurant={entry.restaurant}
              r_rating={entry.r_rating}
              k_rating={entry.k_rating}
              price={entry.price}
              comment={entry.comment}
              setEntries={props.setEntries}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntryTable;
