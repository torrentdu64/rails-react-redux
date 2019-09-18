import React from 'react';


const ScrollTimer = () => {

  const elmnt = document.getElementsByClassName("react-datepicker__time-list-item react-datepicker__time-list-item--disabled");
  const start_el = document.getElementsByClassName("react-datepicker__time-list");
  const last_elmnt = elmnt[elmnt.length - 1];
  last_elmnt.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

  return (
      {true}
    );

}

export default ScrollTimer;
