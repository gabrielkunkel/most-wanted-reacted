import React from "react";
import { Link } from "@reach/router";

export const Record = ({ record }) => {

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
    <div className="record">
      <div><Link to={"/details/" + record.id}>{record.firstName} {record.lastName}</Link>, <i>{record.occupation}</i></div>
      <div>Ht: {record.height} inches tall, Wt: {record.weight} lb</div>
      <div>Born: {record.dob} <i>({generateAgeFromDOB(record.dob)} years old)</i></div>
      <br />
    </div>
  )

}