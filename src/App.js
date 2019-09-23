import React, { useState } from 'react';
import './App.css';
import { data } from './data';
import { Record } from './Record';
import Details from './Details';


function App() {
  const [displayDatabase, setDisplayDatabase] = useState([]);
  const [searchObject, setSearchObject] = useState({});
  const [selectedPerson, setSelectedPerson] = useState();

  const filterFromDatabase = () => {
    let searchResults = [...data];

    for (const key in searchObject) {
      if (searchObject[key]) {
        searchResults = searchResults.filter(element => element[key] === searchObject[key]);
      }
    }

    setDisplayDatabase(searchResults);
  }


  function updateSelectedPerson(id) {

    setSelectedPerson(id);


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
      <div className="container">
        <div className="row main-header">
          <h1>MOST WANTED</h1>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12" id="search">
            <h1> Search</h1>
            <form onSubmit={event => {
              event.preventDefault();
              filterFromDatabase();
            }}>
              <div><input id="firstName" placeholder="First Name" onChange={e => mergeSearchObject({ firstName: capitalizeFirstLetter(e.target.value) })} /></div>
              <div><input id="lastName" placeholder="Last Name" onChange={e => mergeSearchObject({ lastName: capitalizeFirstLetter(e.target.value) })} /></div>
              <div><input id="eyeColor" placeholder="Eye Color" onChange={e => mergeSearchObject({ eyeColor: e.target.value })} /></div>
              <div><input id="gender" placeholder="Gender" onChange={e => mergeSearchObject({ gender: e.target.value })} /></div>
              <div><input id="occupation" placeholder="Occupation" onChange={e => mergeSearchObject({ occupation: e.target.value })} /></div>
              <div><input id="height" placeholder="Height" onChange={e => mergeSearchObject({ height: parseInt(e.target.value) })} /></div>
              <div><input id="weight" placeholder="Weight" onChange={e => mergeSearchObject({ weight: parseInt(e.target.value) })} /></div>
              <button>Search</button>
            </form>
            <br />
            {displayDatabase.map(person => <Record record={person} key={person.id} updateSelectedPerson={updateSelectedPerson} />)}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12" id="details">
            <h1>Details</h1>
            {!selectedPerson ? <div></div> : <Details id={selectedPerson} />}

          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
