import React from 'react';

function addCommas(number) {
  // Convert the number to a string and use regex to format it with commas.
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function NumberFormatter() {
  // Example number to format
  const number = 123456789;

  return (
    <div>
      <h1>Formatted Number:</h1>
      <p>{addCommas(number)}</p>
    </div>
  );
}

export default NumberFormatter;


module.exports = addCommas;