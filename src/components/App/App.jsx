import {useState, useEffect} from 'react';
import axios from 'axios';

function App () {
 
  const [creatureList, setCreatureList] = useState([]); // array destructuring; give it array data-type, so that it and I knows
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');


  // $(document).ready
  useEffect(() => {
    fetchCreatures();
  }, [])  // run once, only on load, never again.


  // top lines are old, classic custruction for get; newer cronstruction below
  // const fetchCreatures = () => {
  //   axios({
  //     method: 'GET',
  //     url: '/creature'
  //   }).then((response) => { 
  //     console.log(response.data);
  //     setCreatureList(response.data);
  //   }).catch((error) =>{
  //     console.log(error);
  //   })
  // }

  const fetchCreatures = () => {
    axios.get('/creature') // ninja Bugatti method
    .then((response) => { 
      console.log(response.data);
      setCreatureList(response.data);
    }).catch((error) =>{
      console.log(error);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted!');
    // axios({
    //   method: 'POST',
    //   url: '/creature',
    //   data: {
    //     name: newCreatureName,
    //     origin: newCreatureOrigin
    //   }
    // })
    axios.post('/creature', {
      name: newCreatureName,
      origin: newCreatureOrigin
    }).then((response) => {
      console.log('creature posted!');
      fetchCreatures();
      setNewCreatureName('');
      setNewCreatureOrigin('');
    }).catch((error) => {
      console.log(error);
    })
  }

  // to removed very soon
  // do not use/ will cause infinite loop to place it here
  // fetchCreatures();

  return (
    <div>
      <h2>Add Creature</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" value={newCreatureName} onChange={(event) => setNewCreatureName(event.target.value)}/>
      <label htmlFor="origin">Origin:</label>
      <input id="origin" value={newCreatureOrigin} onChange={(event) => setNewCreatureOrigin(event.target.value)}/>
      <button type="submit">Add Creature</button>
      </form>
      <ul>
        {creatureList.map(creature => (
          <li key={creature.id}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
