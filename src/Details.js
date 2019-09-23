import React, {useState} from 'react';
import {Link} from '@reach/router';
import {data} from './data';

export const Details = ({id}) => {
    const [record, setRecord] = useState(getRecord(id));
    const [descendants, setDescendants] = useState(findDescendants(record));

    function getRecord(id) {
        return data.filter(person => parseInt(id) === person.id).pop();
    }

    function findDescendants(searchPerson, people = data) {
        let filteredPeople = people
          .map(person => {
            if (
              person.parents[0] === searchPerson.id ||
              person.parents[1] === searchPerson.id
            ) {
              return [].concat(findDescendants(person, people), person);
            }
          })
          .filter(person => person !== undefined)
          .flat();

          return filteredPeople;
      }

    function updateValues(newId) {
        let newRecord = getRecord(newId);
        let newDescendants = findDescendants(newRecord);

        setRecord(newRecord);
        setDescendants(newDescendants);
    }
    
    return (
        <div>
            <div>First Name: {record.firstName}</div>
            <div>Last Name: {record.lastName}</div>
            <div>Date of Birth: {record.dob}</div>
            <div>Height: {record.height}</div>
            <div>Descendants: {descendants.length < 1 ? <span><i>No Descendants</i></span> :
            descendants.map(descendant => { 
                return (<span key={descendant.id}>
                            <Link to={`/details/${descendant.id}`} onClick={() => updateValues(descendant.id)}>{descendant.firstName} {descendant.lastName}</Link>,
                        </span>)
            }) }
            </div>

        </div>
    )
}