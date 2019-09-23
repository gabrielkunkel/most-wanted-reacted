import React from "react";

export const Record = ({record}) => {

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
        <div>{record.firstName} {record.lastName}, <i>{record.occupation}</i></div>
        <div>Ht: {record.height} inches tall, Wt: {record.weight} lb</div>
        <div>Born: {record.dob} <i>({generateAgeFromDOB(record.dob)} years old)</i></div>
        <br />
    </div>
    )

}