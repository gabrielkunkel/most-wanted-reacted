import React, { useState } from 'react';
import './App.css';
import { data } from './data';
import { Record } from './Record'


function App() {
  const [displayDatabase, setDisplayDatabase] = useState([]);
  const [searchObject, setSearchObject] = useState({});

  const filterFromDatabase = () => {
    let searchResults = [...data];

    for (const key in searchObject) {
      if (searchObject[key]) {
        searchResults = searchResults.filter(element => element[key] === searchObject[key]);
      }
    }

    setDisplayDatabase(searchResults);
  }

  ////// CAPITALIZE FIRST LETTER // VALIDATION?
  const capitalizeFirstLetter = (string) => {
    let letters = string.split("");
    for (let i = 0; i < letters.length; i++) {
      if (i !== 0) {
        letters[i] = letters[i].toLowerCase();
      } else {
        letters[0] = letters[i].toUpperCase();
      }
    }
    let newWord = letters.join("");
    return newWord;
  }
  ///////////////
  const mergeSearchObject = (obj) => {
    let searchObjectUpdated = Object.assign({}, searchObject, obj);
    setSearchObject(searchObjectUpdated);
  }

  return (
    <div className="App">
      <form onSubmit={event => {
        event.preventDefault();
        filterFromDatabase();
      }}>
        <div><input id="firstName" placeholder="First Name" onChange={e => mergeSearchObject({ firstName: capitalizeFirstLetter(e.target.value) })} /></div>
        <div><input id="lastName" placeholder="Last Name" onChange={e => mergeSearchObject({ lastName: e.target.value })} /></div>
        <div><input id="eyeColor" placeholder="Eye Color" onChange={e => mergeSearchObject({ eyeColor: e.target.value })} /></div>
        <div><input id="occupation" placeholder="Occupation" onChange={e => mergeSearchObject({ occupation: e.target.value })} /></div>
        <div><input id="height" placeholder="Height" onChange={e => mergeSearchObject({ height: parseInt(e.target.value) })} /></div>
        <div><input id="weight" placeholder="Weight" onChange={e => mergeSearchObject({ weight: parseInt(e.target.value) })} /></div>
        <button>Search</button>
      </form>

      <br />

      {displayDatabase.map(person => <Record record={person} key={person.id} />)}

    </div>
  );
}

export default App;
