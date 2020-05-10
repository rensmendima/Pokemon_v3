import React, {useEffect, useState} from "react";
import "./styles.css";
import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services';

function App() {

 const [pokemonData, setPokemonData] = useState([]);
 const [search, setSearch] = useState('');
 const [loading, setLoading] = useState(true);
 //const [query, setQuery] = useState('');

const initialURL = 'https://pokeapi.co/api/v2/pokemon/'
useEffect(() => {
  async function fetchData() {
    let response = await getAllPokemon(initialURL)
    await loadPokemon(response.results);
    setLoading(false);
  }
  fetchData();
}, [search])

const loadPokemon = async (data) => {
  let _pokemonData = await Promise.all(data.map(async pokemon => {
    let pokemonRecord = await getPokemon(pokemon)
    return pokemonRecord;
  }));
setPokemonData(_pokemonData);
};

const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
}

const getSearch = e => {
  e.preventDefault();
  //setQuery(search);
  setSearch(search)
};

  return (
    
   <div className="App">

      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text" 
        value={search} 
        onChange={updateSearch} />
        <button  className="search-button" type="submit">
          Search
          </button>
        </form>
        <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}

            </div>
      </div>
  );
};

export default App;