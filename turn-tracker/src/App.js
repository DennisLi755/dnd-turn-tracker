import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [order, setOrder] = useState([{name: "Name", initiative: "Initiative", health: "Health", color: "black"}]);
  const [name, setName] = useState('');
  const [init, setInit] = useState(0);
  const [hp, setHp] = useState(0);
  let [currentTurn, setCurrentTurn] = useState(null);
  let [prevTurn, setPrevTurn] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    console.log(order);
  }, [order])

  const bringUp = (index) => {
    console.log(index);
    setOrder(order => {
      const copy = [...order];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const bringDown = (index) => {
    setOrder(order => {
      const copy = [...order];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  }; 

  const TurnEntry = ({ name, init, health, color, index }) => {
    return (
      <tr>
        <td style={{ color: color }}>{name}</td>
        <td>{init}</td>
        <td>{health}</td>
        {index >= 1 ?
          <>
            <button onClick={() => bringUp(index)}>↑</button>
            <button onClick={() => bringDown(index)}>↓</button>
          </>
          : <div></div>}
      </tr>
    );
  };

  useEffect(() => {
    if (start) {
      let items = [...order];
      if (prevTurn !== null) {
        items[prevTurn] = { ...order[prevTurn], color: 'black' };
      }
      items[currentTurn] = { ...order[currentTurn], color: 'red' };
      setOrder(items);
    }
  }, [currentTurn, prevTurn, start]);

  const startTracker = () => {
    let items = [...order];
    let item = { ...order[1], color: 'red' };
    items[1] = item;
    setOrder(items);
    setCurrentTurn(1);
    setStart(true);
  }

  const nextTurn = () => {
    setPrevTurn(currentTurn);
    setCurrentTurn(currentTurn => (currentTurn < order.length - 1 ? currentTurn + 1 : 1));
  }

  const sortOrder = () => {
    setOrder(order => {
      const sorted = [...order].sort((a, b) => b.initiative - a.initiative);
      return sorted;
    });
  }

  const addElement = (e) => {
    e.preventDefault();
    const entry = { name: name, initiative: init, health: hp, color: "black"};
    setOrder([...order, entry]);
  };

  return (
    <div className="App">
      <p>Turn order:</p>
      <table>
        {order.map((elem, index) => (
          <TurnEntry name={elem.name} init={elem.initiative} health={elem.health} color={elem.color} index={index} />
        ))}
      </table>
      <form>
        <label>Name: </label>
        <input id="name" type="text" name="name" placeholder="E.g. Dammos" onChange={e => setName(e.target.value)}/>
        <label>Initiative: </label>
        <input id="init" type="number" name="init" placeholder="0" onChange={e => setInit(e.target.value)} />
        <label>Health: </label>
        <input id="health" type="number" name="health" placeholder="0" onChange={e => setHp(e.target.value)} />
        <input type="submit" value="Add" onClick={e => addElement(e)}/>
      </form>
      <button onClick={sortOrder} id="sort">Sort</button>
      {start ? <button onClick={nextTurn} id="start">Next</button> : <button onClick={startTracker} id="start">Start</button>}
    </div>
  );
}

export default App;