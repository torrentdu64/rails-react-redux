import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createBooking } from '../actions';



class BookingsNew extends Component {

  state = { modal: ''};

  onSubmit = (values) => {

    const { id } = this.props.match.params;
    this.props.createBooking( id, values );
    // this.setState({modal:  'modal'});
    // if( errors === '' && !this.props.formError.errors ){

    // }

  }

  renderError = ({error, touched}) => {
    if(touched && error){
      return <div>{error}</div>
    }
  }



  renderField = (field) => {

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          value={field.input.value}
          type={field.type}
              {...field.input}
        />
        {this.renderError(field.meta)}
      </div>
    );
  }





  render() {
    console.log("my props",this.props.formError.errors);

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              label="date"
              name="start_time"
              type="datetime-local"
              component={this.renderField}
            />
             {this.props.formError.errors}

            {/*<Field
              label="date end"
              name="end_time"
              type="datetime-local"
              component={this.renderField}
            />*/}


            <Field
              label="time"
              name="duration"
              type="time"
              component={this.renderField}

          />
{/*data-dismiss={this.state.modal}*/}
            <button  className="btn btn-primary" type="submit"
          disabled={this.props.pristine || this.props.submitting} >
              Create Booking
            </button>
        </form>
        <div>
          {this.props.formError.errors}
        </div>
      </div>
    );
 }
}

const validate = (values) => {
  const errors = {};
  if(!values.start_time) {
        errors.start_time = "this field is require";
  }
  if(!values.duration) {
    errors.duration = "this field is require";
  }
  return errors;
};

const mapStateToProps = (state) => {
    return { formError: state.formError }
}

export default reduxForm({ form: 'newBookingForm', validate  })(
  connect(mapStateToProps, { createBooking })(BookingsNew)
);
