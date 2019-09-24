import React, { useState } from 'react';
import './App.css';
import { data } from './data';
import { Record } from './Record';
import Details from './Details';


function App() {
  const [displayDatabase, setDisplayDatabase] = useState([]);
  const [searchObject, setSearchObject] = useState({});
  const [selectedPerson, setSelectedPerson] = useState();
  const [record, setRecord] = useState({});
  const [validForm, setValidForm] = useState('');

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

  function updateRecord(record) {
    setRecord(record);
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

  const mergeValidation = (obj, reg, name) => {
    for (const key in obj) {
        if (!reg.test(obj[key])) {
          setValidForm(name);
          if (obj[key] === '' || null || NaN || undefined) {
            setValidForm('');
          }
        } else {
          setValidForm('');
        }
        mergeSearchObject(obj)
    }
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
              <div><input id="firstName" placeholder="First Name" onChange={e => mergeValidation({ firstName: capitalizeFirstLetter(e.target.value) }, /^[a-zA-Z]+$/, "First Name")} /></div>
              <div><input id="lastName" placeholder="Last Name" onChange={e => mergeValidation({ lastName: capitalizeFirstLetter(e.target.value) }, /^[a-zA-Z]+$/, "Last Name")} /></div>
              <div><input id="eyeColor" placeholder="Eye Color" onChange={e => mergeValidation({ eyeColor: e.target.value }, /^[a-zA-Z]+$/, "Eye Color")} /></div>
              <div><input id="gender" placeholder="Gender" onChange={e => mergeValidation({ gender: e.target.value }, /^[a-zA-Z]+$/, "Gender")} /></div>
              <div><input id="occupation" placeholder="Occupation" onChange={e => mergeValidation({ occupation: e.target.value }, /^[a-zA-Z]+$/, "Occupation")} /></div>
              <div><input id="height" placeholder="Height" onChange={e => mergeValidation({ height: parseInt(e.target.value) }, /^[0-9]+$/, "Height")} /></div>
              <div><input id="weight" placeholder="Weight" onChange={e => mergeSearchObject({ weight: parseInt(e.target.value) }, /^[0-9]+$/, "Weight")} /></div>
              <button>Search</button>
            </form>
            {!validForm ? <div></div> : <div>Invalid {validForm} input!</div>}
            <br />
            {displayDatabase.map(person => <Record record={person} key={person.id} updateSelectedPerson={updateSelectedPerson} />)}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12" id="details">
            <h1>Details</h1>
            {!selectedPerson ? <div></div> : <Details id={selectedPerson} record={record} updateRecord={updateRecord} />}

          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
