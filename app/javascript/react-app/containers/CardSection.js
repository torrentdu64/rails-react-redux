import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {

  render() {
    return (
      <label className="stripe-label">
        Card details
        <CardElement  />
      </label>
    );
  }
}

export default CardSection;
