import React, {Component} from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  injectStripe
} from 'react-stripe-elements';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


class CheckoutForm extends Component {
  constructor(props) {
  super(props);
  this.state = {
    complete: false
  };
  this.submit = this.submit.bind(this);
}






async submit(ev) {
  ev.preventDefault();
  try {
    console.log('creating token');
    const { error, token } = await this.props.stripe.createToken({ email: "name"});

    console.log('token created');

      const response = await fetch(`/api/v1/profiles/${this.props.profile_id}/customer`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').attributes.content.value
        },
        credentials: 'same-origin',
        body: JSON.stringify({token, booking_id: this.props.booking_id })
      })
      if (response.ok){
        debugger
        console.log("response ok ", response)
        this.props.updateCompleted(true);
      };

  } catch(response) {
    debugger
    console.log('error', response);
    response

  }

  // let token = await this.props.stripeToken({ name: 'Name'})
  // let charge = {
  //   token: chargeToken.token.id
  // }

  // this.props.changeLoadind
  //this.setState({ complete: true});

  // this.props.updateCompleted(true);




}





render() {
//   const style = {
//   base: {
//     color: '#32325d',
//     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//     fontSmoothing: 'antialiased',
//     fontSize: '20px',
//     '::placeholder': {
//       color: '#aab7c4'
//     }
//   },
//   invalid: {
//     color: '#fa755a',
//     iconColor: '#fa755a'
//   }
// };

  if (this.props.completed) return <h1 className="msg-right">Purchase Complete bind animation Success Please Check you Phone You Will receive SmS</h1>;

    return (
      <div className="checkout">


        <p>Would you like to complete the purchase?</p>
         <p>4000005540000008</p>
        {/*<CardElement />*/}


        <label id="first-plan">
          Card number
          <CardNumberElement

            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label id="first-plan">
          Expiration date
          <CardExpiryElement

            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label id="first-plan">
          CVC
          <CardCVCElement
          {...createOptions(this.props.fontSize)}
          />
        </label>
        <button  className="btn-profile btn-pay" onClick={this.submit}> NZD 10 </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
