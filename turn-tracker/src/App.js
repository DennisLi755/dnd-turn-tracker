import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [init, setInit] = useState(0);
  const [hp, setHp] = useState(0);

  useEffect(() => {
    setOrder(order.sort((a, b) => b.initiative - a.initiative));
  }, [order])

  const addElement = (e) => {
    e.preventDefault();
    const entry = { name: name, initiative: init, health: hp };
    setOrder([...order, entry]);
  };

  return (
    <div className="App">
      <p>Turn order:</p>
      <ul>
        {order.map(elem => (
          <li>Name: {elem.name} | Initiative: {elem.initiative} | Health: {elem.health}</li>
        ))}
      </ul>
      <form>
        <label>Name: </label>
        <input id="name" type="text" name="name" placeholder="E.g. Dammos" onChange={e => setName(e.target.value)}/>
        <label>Initiative: </label>
        <input id="init" type="number" name="init" placeholder="0" onChange={e => setInit(e.target.value)} />
        <label>Health: </label>
        <input id="health" type="number" name="health" placeholder="0" onChange={e => setHp(e.target.value)} />
        <input type="submit" value="Add" onClick={e => addElement(e)}/>
      </form>
    </div>
  );
}

export default App;
