import React, { useState } from 'react';
import { useEffect } from 'react';
const Passenger = (props) => {
    return (
        <tr>
            <td>{props.UserId}</td>
            <td>{props.major}</td>
            <td>{props.sex}</td>
            <td>{props.phoneNum}</td>
            <td>{props.comment}</td>
        </tr>
    );
};
export default Passenger;
