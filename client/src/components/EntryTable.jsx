import axios from "axios";
import Entry from "./Entry";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function EntryTable(props) {

  //Get entries on initial load
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
  }, [props.entries]);

  //Update entries when new entry is added from ./InputCard.jsx
  useEffect(() => {
    props.setEntries((prevValue) => {
      return [...prevValue, props.newEntry];
    });
  }, [props.newEntry]);

  return (
    <div className="entryTable">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              Restaurant 
            </th>
            <th>
              r Rating 
            </th>
            <th>
              k Rating 
            </th>
            <th>
              Price
            </th>
            <th>
              Comments
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map((entry) => (
            <Entry key={entry.id || entry.restaurant}
              id={entry.id}
              restaurant={entry.restaurant}
              r_rating={entry.r_rating}
              k_rating={entry.k_rating}
              price={entry.price}
              comment={entry.comment}
              setEntries = {props.setEntries}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntryTable;
