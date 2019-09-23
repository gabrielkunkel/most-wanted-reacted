import React, { useState } from 'react';
import { Link } from '@reach/router';
import { data } from './data';

export const Details = ({ id }) => {
  const [record, setRecord] = useState(getRecord(id));
  const [descendants, setDescendants] = useState(findDescendants(record));
  const [immediateFamily, setImmediateFamily] = useState(findImmediateFamily(record));

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
    let newImmediateFamily = findImmediateFamily(newRecord);

    setRecord(newRecord);
    setDescendants(newDescendants);
    setImmediateFamily(newImmediateFamily);
  }


  //IMMIDEATE FAMILY 

  function findImmediateFamily(searchPerson, people = data) {
    let siblings = [];
    let addedAlready = false;

    let parents = people
      .filter(
        potentialParent => searchPerson.parents.indexOf(potentialParent.id) !== -1
      )
      .map(parent => Object.assign({}, parent, { relation: "parent" }));

    people.forEach(potentialSibling => {
      addedAlready = false;
      for (let sp = 0; sp < potentialSibling.parents.length; sp += 1) {
        for (let p = 0; p < parents.length; p += 1) {
          if (
            parents[p].id === potentialSibling.parents[sp] &&
            potentialSibling.id !== searchPerson.id &&
            addedAlready === false
          ) {
            let sibling = Object.assign({}, potentialSibling, {
              relation: "sibling"
            });
            siblings.push(sibling);
            addedAlready = true;
          }
        }
      }
    });

    let spouse = people
      .filter(potentialSpouse => potentialSpouse.id === searchPerson.currentSpouse)
      .map(spouse => Object.assign({}, spouse, { relation: "spouse" }));

    let familyTotal = [].concat(parents, siblings, spouse);


    return familyTotal;

  }

  ////////////
  function generateAgeFromDOB(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return age;
  }



  return (
    <div>
      <div>First Name: {record.firstName}</div>
      <div>Last Name: {record.lastName}</div>
      <div>Date of Birth: {record.dob} <i> ({generateAgeFromDOB(record.dob)} years old)</i> </div>
      <div>Height: {record.height}</div>
      <div>Descendants: {descendants.length < 1 ? <span><i>No Descendants</i></span> :
        descendants.map(descendant => {
          return (<span key={descendant.id}>
            <Link to={`/details/${descendant.id}`} onClick={() => updateValues(descendant.id)}> {descendant.firstName} {descendant.lastName} </Link>,
                        </span>)
        })}
      </div>
      <div>Immediate Family: {immediateFamily.length < 1 ? <span><i>No Family</i></span> :
        immediateFamily.map(family => {
          return (<span key={family.id}>
            <Link to={`/details/${family.id}`} onClick={() => updateValues(family.id)}>{family.firstName} {family.lastName}</Link><i>({family.relation}) </i>,
                        </span>)
        })}
      </div>

    </div>
  )
}