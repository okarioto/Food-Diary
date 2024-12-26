import { useState } from 'react'
import '../style/App.css'
import axios from "axios";
import InputCard from './InputCard';
import EntryTable from './EntryTable';


function App() {
  const [newEntry, setNewEntry] = useState({});
  const [entries, setEntries] = useState([]);



  return (
    <div className="app">
      <InputCard
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        entries={entries}
        setEntries={setEntries}
      ></InputCard>
      <EntryTable
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        entries={entries}
        setEntries={setEntries}
      ></EntryTable>
    </div>
  );
}

export default App
