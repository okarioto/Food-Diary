import { useState } from 'react'
import '../style/App.css'
import axios from "axios";
import InputCard from './InputCard';
import EntryTable from './EntryTable';


function App() {
  const [count, setCount] = useState(0)

  async function handleClick(){
    try {
       const result =  await axios.get("http://localhost:3000/");
       console.log(result);
    } catch (error) {
      console.log(error);
      
    }
   
  }

  return (
   <div>
    <InputCard></InputCard>
    <EntryTable></EntryTable>
    <button onClick={handleClick} >Say hi to server</button></div>
  )
}

export default App