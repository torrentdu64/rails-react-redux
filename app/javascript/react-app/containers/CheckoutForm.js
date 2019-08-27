import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {complete: false};
  this.submit = this.submit.bind(this);
}



async submit(ev) {
  debugger
  let token = await this.props.stripeToken({ name: 'Name'})
  let charge = {
    token: chargeToken.token.id
  }


  const promise = fetch(`/api/v1/profiles/${this.props.match.params}/customer`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').attributes.content.value
    },
    credentials: 'same-origin',
    body: JSON.stringify(charge)
  })

  if (response.ok) this.setState({complete: true});
}

render() {
  if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
