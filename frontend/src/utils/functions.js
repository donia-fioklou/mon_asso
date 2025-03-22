import React from "react";

export const formatDate = (dateString) => {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Extract the day, month, and year from the Date object
    const day = date.getDate().toString().padStart(2, '0'); // Pad single-digit days with a leading zero
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1 and pad
    const year = date.getFullYear();

    // Return the formatted date string in DD/MM/YYYY format
    return `${day}/${month}/${year}`;
};

export const formatTextWithBreaks = (text) => {
    console.log('text',text);
    
    return text.split(/\r?\n/).map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  