import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {complete: false};
  this.submit = this.submit.bind(this);
}



async submit(ev) {
  ev.preventDefault();
  try {
    console.log('creating token');
    const { error, token } = await this.props.stripe.createToken({ email: "name"});
    debugger
    console.log('token created');

      const response = fetch(`/api/v1/profiles/${this.props.profile_id}/customer`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').attributes.content.value
        },
        credentials: 'same-origin',
        body: JSON.stringify({token, booking_id: this.props.booking_id })
      })
      if (response.ok) this.setState({complete: true});

  } catch(err) {
    console.log('error', err);
  }
  // let token = await this.props.stripeToken({ name: 'Name'})
  // let charge = {
  //   token: chargeToken.token.id
  // }






}

render() {
  if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
         <p>4000005540000008</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
